/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useCallback } from 'react';
import {
  NavTab,
  Language,
  UserRole,
  CropItem,
  BuyerOfferItem,
  MandiRateRow,
  ActiveDealTracker,
} from './types';
import {
  INITIAL_FARMER_CROPS,
  INITIAL_BUYER_OFFERS,
  MANDI_RATE_COMPARISONS,
  INITIAL_ACTIVE_DEAL,
} from './data/farmerData';

import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ToastContainer, ToastData } from './components/Toast';
import { FarmerQuickSellModal } from './components/FarmerQuickSellModal';
import { FarmerCounterModal } from './components/FarmerCounterModal';
import { FarmerReceiptModal } from './components/FarmerReceiptModal';
import { CropDetailModal } from './components/CropDetailModal';

import { FarmerSellScreen } from './screens/FarmerSellScreen';
import { FarmerBuyerOffersScreen } from './screens/FarmerBuyerOffersScreen';
import { FarmerMandiRatesScreen } from './screens/FarmerMandiRatesScreen';
import { FarmerDealsScreen } from './screens/FarmerDealsScreen';
import { BuyerMarketplaceScreen } from './screens/BuyerMarketplaceScreen';
import { MobileBottomNav } from './components/MobileBottomNav';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>('sell-crop');
  const [currentRole, setCurrentRole] = useState<UserRole>('farmer');
  const [language, setLanguage] = useState<Language>('hi'); // Default Hindi for farmer accessibility
  const [crops, setCrops] = useState<CropItem[]>(INITIAL_FARMER_CROPS);
  const [offers, setOffers] = useState<BuyerOfferItem[]>(INITIAL_BUYER_OFFERS);
  const [deal, setDeal] = useState<ActiveDealTracker>(INITIAL_ACTIVE_DEAL);
  const [toasts, setToasts] = useState<ToastData[]>([]);

  // Modals state
  const [isSellModalOpen, setIsSellModalOpen] = useState(false);
  const [selectedCropForDetail, setSelectedCropForDetail] = useState<CropItem | null>(null);
  const [counterModalData, setCounterModalData] = useState<{
    isOpen: boolean;
    offer: BuyerOfferItem | null;
  }>({
    isOpen: false,
    offer: null,
  });
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);

  const notify = useCallback((message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = 'toast-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4);
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const handleDismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Adding a new crop to sell
  const handleAddNewCrop = useCallback(
    (cropData: {
      cropNameEn: string;
      cropNameHi: string;
      variety: string;
      quantityQtl: number;
      expectedPrice: number;
      quality: 'Grade A (उत्तम)' | 'Grade B (मध्यम)' | 'Grade C (सामान्य)';
      imageUrl: string;
    }) => {
      const newCrop: CropItem = {
        id: 'crop-' + Date.now(),
        nameEn: cropData.cropNameEn,
        nameHi: cropData.cropNameHi,
        variety: cropData.variety,
        category: 'grain',
        quantityQtl: cropData.quantityQtl,
        expectedPrice: cropData.expectedPrice,
        mandiPrice: cropData.expectedPrice - 300,
        bestOfferPrice: cropData.expectedPrice + 40,
        offersCount: 1,
        location: 'हरदा, मध्य प्रदेश',
        harvestDate: 'आज 26 सितंबर',
        quality: cropData.quality,
        imageUrl: cropData.imageUrl,
        status: 'active',
        moisturePct: 10.5,
        labCertification: 'Standard Farmgate Grade A Check',
        farmerName: 'रामेश पटेल',
      };

      setCrops((prev) => [newCrop, ...prev]);

      // Create matching corporate offer
      const newOffer: BuyerOfferItem = {
        id: 'offer-' + Date.now(),
        buyerName: 'Patanjali Agro Foods Ltd.',
        buyerType: 'संस्थागत खरीदार / Corporate',
        buyerPhone: '1800-180-4141',
        isVerified: true,
        cropNameEn: cropData.cropNameEn,
        cropNameHi: cropData.cropNameHi,
        offeredPrice: cropData.expectedPrice + 40,
        mandiRate: cropData.expectedPrice - 300,
        profitExtra: 340,
        volumeQtl: cropData.quantityQtl,
        pickupType: 'खेत से मुफ्त उठान',
        paymentTerm: 'तुलाई के 2 घंटे में सीधा बैंक खाते में',
        expiresIn: 'आज शाम तक',
        rating: 4.8,
        dealsCompleted: 210,
        status: 'pending',
      };

      setOffers((prev) => [newOffer, ...prev]);

      notify(
        language === 'hi'
          ? `बधाई हो! आपकी फसल '${cropData.cropNameHi}' (${cropData.quantityQtl} क्विंटल) लिस्ट हो गई है। पतंजलि एग्रो से ₹${cropData.expectedPrice + 40}/Qtl का नया ऑफर भी आया है!`
          : `Success! Crop '${cropData.cropNameEn}' listed. A verified buyer placed a direct bid at ₹${cropData.expectedPrice + 40}/Qtl!`
      );
    },
    [language, notify]
  );

  // Accept a buyer deal
  const handleAcceptOffer = useCallback(
    (offer: BuyerOfferItem) => {
      setOffers((prev) =>
        prev.map((o) => (o.id === offer.id ? { ...o, status: 'accepted' } : o))
      );

      const updatedDeal: ActiveDealTracker = {
        dealId: 'FAS-' + Math.floor(1000 + Math.random() * 9000),
        cropNameEn: offer.cropNameEn,
        cropNameHi: offer.cropNameHi,
        buyerName: offer.buyerName,
        buyerPhone: offer.buyerPhone,
        quantityQtl: offer.volumeQtl,
        ratePerQtl: offer.offeredPrice,
        totalAmount: offer.offeredPrice * offer.volumeQtl,
        truckNumber: 'PB-10-CZ-4412 (टाटा 1613)',
        driverPhone: '+91 98721 33410 (ड्राइवर सुखविंदर)',
        bankAccount: '•••• •••• 4921',
        bankName: 'State Bank of India',
        currentStep: 2,
        date: '26 सितंबर 2026',
      };

      setDeal(updatedDeal);

      notify(
        language === 'hi'
          ? `सौदा पक्का हो गया! ${offer.buyerName} के साथ ₹${offer.offeredPrice}/Qtl की दर से अनुबंध बन गया है। गाड़ी आपके खेत के लिए रवाना हो रही है।`
          : `Deal locked! Contract finalized with ${offer.buyerName} at ₹${offer.offeredPrice}/Qtl. Truck dispatched.`,
        'success'
      );

      setTimeout(() => {
        setCurrentTab('my-deals');
      }, 900);
    },
    [language, notify]
  );

  // Open counter modal
  const handleOpenCounter = useCallback((offer: BuyerOfferItem) => {
    setCounterModalData({
      isOpen: true,
      offer,
    });
  }, []);

  // Submit counter price
  const handleSubmitCounter = useCallback(
    (counterPrice: number) => {
      if (!counterModalData.offer) return;
      const targetOffer = counterModalData.offer;

      setOffers((prev) =>
        prev.map((o) =>
          o.id === targetOffer.id
            ? { ...o, offeredPrice: counterPrice, status: 'countered' }
            : o
        )
      );

      notify(
        language === 'hi'
          ? `आपका मोलभाव (₹${counterPrice}/Qtl) ${targetOffer.buyerName} को भेज दिया गया है!`
          : `Counter offer of ₹${counterPrice}/Qtl sent to ${targetOffer.buyerName}!`
      );
    },
    [counterModalData.offer, language, notify]
  );

  // Selling directly at the selected Mandi rate
  const handleSellAtRate = useCallback(
    (item: MandiRateRow) => {
      setIsSellModalOpen(true);
      notify(
        language === 'hi'
          ? `${item.cropNameHi} के लिए ₹${item.faslynkRate}/Qtl का भाव चुना गया है। मात्रा दर्ज करें।`
          : `Selected ${item.cropNameEn} at ₹${item.faslynkRate}/Qtl. Enter quantity.`
      );
    },
    [language, notify]
  );

  // Buyer submitting a bid
  const handleBuyerSubmitBid = useCallback(
    (crop: CropItem, bidPrice: number) => {
      const newOffer: BuyerOfferItem = {
        id: 'offer-buyer-' + Date.now(),
        buyerName: 'Institutional Buyer (AgriCorp)',
        buyerType: 'संस्थागत खरीदार / Corporate',
        buyerPhone: '1800-200-9922',
        isVerified: true,
        cropNameEn: crop.nameEn,
        cropNameHi: crop.nameHi,
        offeredPrice: bidPrice,
        mandiRate: crop.mandiPrice,
        profitExtra: bidPrice - crop.mandiPrice,
        volumeQtl: crop.quantityQtl,
        pickupType: 'खेत से मुफ्त उठान',
        paymentTerm: 'तुलाई के 2 घंटे में सीधा बैंक खाते में',
        expiresIn: '24 घंटे मान्य',
        rating: 4.9,
        dealsCompleted: 150,
        status: 'pending',
      };

      setOffers((prev) => [newOffer, ...prev]);
    },
    []
  );

  // Advancing demo step
  const handleAdvanceStep = useCallback(() => {
    setDeal((prev) => {
      const nextStep = prev.currentStep >= 4 ? 1 : prev.currentStep + 1;
      const msgs = [
        '',
        'चरण 1: सौदा पक्का (Deal Confirmed)',
        'चरण 2: गाड़ी खेत रवाना (Truck Dispatched)',
        'चरण 3: खेत पर धर्मकांटा तुलाई पूर्ण (Weighing Verified)',
        'चरण 4: ₹5,76,000 राशि आपके बैंक में जमा हो गई! (Payment Credited)',
      ];
      notify(
        language === 'hi'
          ? `स्थिति अपडेट: ${msgs[nextStep]}`
          : `Status Updated: Step ${nextStep} active`,
        nextStep === 4 ? 'success' : 'info'
      );
      return { ...prev, currentStep: nextStep };
    });
  }, [language, notify]);

  // Normalize tab
  const activeTab: NavTab =
    currentRole === 'buyer' && (currentTab === 'sell-crop' || currentTab === 'buyer-offers')
      ? 'marketplace'
      : currentTab;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col antialiased text-slate-800">
      {/* Farmer & Buyer Friendly Header with All Languages */}
      <Header
        currentTab={activeTab}
        onSelectTab={setCurrentTab}
        language={language}
        onSelectLanguage={setLanguage}
        currentRole={currentRole}
        onChangeRole={setCurrentRole}
        offersCount={offers.filter((o) => o.status === 'pending').length}
        onOpenSellModal={() => setIsSellModalOpen(true)}
      />

      {/* Main Screen Content Body */}
      <main className="w-full pt-16 md:pt-24 pb-20 md:pb-8 flex-1 min-h-[calc(100vh-140px)]">
        {/* Buyer View */}
        {currentRole === 'buyer' && activeTab === 'marketplace' && (
          <BuyerMarketplaceScreen
            crops={crops}
            language={language}
            onOpenCropDetail={setSelectedCropForDetail}
            onSubmitBid={handleBuyerSubmitBid}
            onNotify={notify}
          />
        )}

        {/* Farmer Views */}
        {currentRole === 'farmer' && activeTab === 'sell-crop' && (
          <FarmerSellScreen
            crops={crops}
            language={language}
            onOpenSellModal={() => setIsSellModalOpen(true)}
            onSelectTab={setCurrentTab}
            onOpenCropDetail={setSelectedCropForDetail}
          />
        )}

        {currentRole === 'farmer' && activeTab === 'buyer-offers' && (
          <FarmerBuyerOffersScreen
            offers={offers}
            language={language}
            onAcceptOffer={handleAcceptOffer}
            onOpenCounter={handleOpenCounter}
            onSelectTab={setCurrentTab}
            onNotify={notify}
          />
        )}

        {/* Shared Views: Mandi Rates & Deals Tracker */}
        {activeTab === 'mandi-rates' && (
          <FarmerMandiRatesScreen
            rates={MANDI_RATE_COMPARISONS}
            language={language}
            onSellAtRate={handleSellAtRate}
          />
        )}

        {activeTab === 'my-deals' && (
          <FarmerDealsScreen
            deal={deal}
            language={language}
            onOpenReceipt={() => setIsReceiptModalOpen(true)}
            onAdvanceStep={handleAdvanceStep}
            onNotify={notify}
          />
        )}
      </main>

      {/* Footer */}
      <Footer language={language} />

      {/* Fixed Mobile Bottom Navigation for Phone Users */}
      <MobileBottomNav
        currentTab={activeTab}
        onSelectTab={setCurrentTab}
        language={language}
        currentRole={currentRole}
        offersCount={offers.filter((o) => o.status === 'pending').length}
      />

      {/* 3-Step Simple Sell Modal */}
      <FarmerQuickSellModal
        isOpen={isSellModalOpen}
        language={language}
        onClose={() => setIsSellModalOpen(false)}
        onSubmit={handleAddNewCrop}
      />

      {/* Simple Bargaining / Counter Modal */}
      {counterModalData.offer && (
        <FarmerCounterModal
          isOpen={counterModalData.isOpen}
          language={language}
          buyerName={counterModalData.offer.buyerName}
          cropName={
            language === 'hi'
              ? counterModalData.offer.cropNameHi
              : counterModalData.offer.cropNameEn
          }
          currentOfferPrice={counterModalData.offer.offeredPrice}
          volumeQtl={counterModalData.offer.volumeQtl}
          onClose={() => setCounterModalData({ isOpen: false, offer: null })}
          onSubmitCounter={handleSubmitCounter}
        />
      )}

      {/* Digital Receipt / Bill Modal */}
      <FarmerReceiptModal
        isOpen={isReceiptModalOpen}
        deal={deal}
        language={language}
        onClose={() => setIsReceiptModalOpen(false)}
      />

      {/* Full Crop Specs & Detail Modal (Preserving 100% of Data) */}
      <CropDetailModal
        crop={selectedCropForDetail}
        language={language}
        onClose={() => setSelectedCropForDetail(null)}
        onAction={(crop) => {
          if (currentRole === 'farmer') {
            setCurrentTab('buyer-offers');
          } else {
            notify(`Selected ${crop.nameEn} for procurement quote.`, 'info');
          }
        }}
        actionLabel={
          currentRole === 'farmer'
            ? language === 'hi'
              ? 'ऑफर देखें'
              : 'View Offers'
            : language === 'hi'
            ? 'बोली लगाएं'
            : 'Make Bid'
        }
      />

      {/* Simple Toast Notifications */}
      <ToastContainer toasts={toasts} onDismiss={handleDismissToast} />
    </div>
  );
}
