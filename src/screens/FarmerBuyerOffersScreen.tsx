import React, { useState } from 'react';
import { BuyerOfferItem, Language, NavTab } from '../types';
import { speakText } from '../utils/speech';
import { t } from '../utils/i18n';

interface FarmerBuyerOffersScreenProps {
  offers: BuyerOfferItem[];
  language: Language;
  onAcceptOffer: (offer: BuyerOfferItem) => void;
  onOpenCounter: (offer: BuyerOfferItem) => void;
  onSelectTab: (tab: NavTab) => void;
  onNotify: (msg: string, type?: 'success' | 'info' | 'warning') => void;
}

export const FarmerBuyerOffersScreen: React.FC<FarmerBuyerOffersScreenProps> = ({
  offers,
  language,
  onAcceptOffer,
  onOpenCounter,
  onNotify,
}) => {
  const [filterCrop, setFilterCrop] = useState<string>('all');
  const [activeCallModal, setActiveCallModal] = useState<BuyerOfferItem | null>(null);
  const [expandedOfferId, setExpandedOfferId] = useState<string | null>(null);

  const filteredOffers = offers.filter((o) => {
    if (filterCrop === 'all') return true;
    return o.cropNameEn.toLowerCase().includes(filterCrop.toLowerCase());
  });

  const handleSpeakOffer = (offer: BuyerOfferItem, e: React.MouseEvent) => {
    e.stopPropagation();
    const textHi = `${offer.buyerName} का ऑफर। फसल ${offer.cropNameHi}। भाव ${offer.offeredPrice} रुपये प्रति क्विंटल। मंडी से ${offer.profitExtra} रुपये अधिक मुनाफा।`;
    const textEn = `Offer from ${offer.buyerName}. Crop ${offer.cropNameEn}. Price ₹${offer.offeredPrice} per quintal. Extra profit ₹${offer.profitExtra}.`;
    speakText(language === 'hi' ? textHi : textEn, language);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-3 sm:px-6 py-4 sm:py-6 space-y-4 sm:space-y-6">
      {/* Plain Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
            {t('buyerOffersTitle', language)}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            {t('buyerOffersSub', language)}
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 scrollbar-none">
          <button
            onClick={() => setFilterCrop('all')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors cursor-pointer whitespace-nowrap ${
              filterCrop === 'all'
                ? 'bg-slate-900 text-white border-slate-900'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            {t('allCrops', language)}
          </button>
          <button
            onClick={() => setFilterCrop('wheat')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors cursor-pointer whitespace-nowrap ${
              filterCrop === 'wheat'
                ? 'bg-slate-900 text-white border-slate-900'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            🌾 {language === 'hi' ? 'गेहूं' : 'Wheat'}
          </button>
          <button
            onClick={() => setFilterCrop('rice')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors cursor-pointer whitespace-nowrap ${
              filterCrop === 'rice'
                ? 'bg-slate-900 text-white border-slate-900'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            🍚 {language === 'hi' ? 'धान' : 'Rice'}
          </button>
          <button
            onClick={() => setFilterCrop('mustard')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors cursor-pointer whitespace-nowrap ${
              filterCrop === 'mustard'
                ? 'bg-slate-900 text-white border-slate-900'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            🟡 {language === 'hi' ? 'सरसों' : 'Mustard'}
          </button>
        </div>
      </div>

      {/* Phone-Optimized Offers List */}
      <div className="space-y-3">
        {filteredOffers.map((offer) => {
          const isAccepted = offer.status === 'accepted';
          const totalAmount = offer.offeredPrice * offer.volumeQtl;
          const isExpanded = expandedOfferId === offer.id;

          return (
            <div
              key={offer.id}
              className={`bg-white border rounded-xl p-3.5 sm:p-4 transition-all flex flex-col gap-3 shadow-2xs ${
                isAccepted
                  ? 'border-emerald-600 bg-emerald-50/20'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              {/* Header: Buyer Name + Verified + Audio button */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-sm sm:text-base text-slate-900 leading-tight">
                      {offer.buyerName}
                    </span>
                    {offer.isVerified && (
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                        ✓
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    🌾 <span className="font-semibold text-slate-800">{language === 'hi' ? offer.cropNameHi : offer.cropNameEn}</span> ({offer.volumeQtl} Qtl)
                  </div>
                </div>

                <button
                  type="button"
                  onClick={(e) => handleSpeakOffer(offer, e)}
                  title="बोलकर सुनें"
                  className="w-9 h-9 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-sm text-slate-700 shrink-0 cursor-pointer active:scale-95"
                >
                  🔊
                </button>
              </div>

              {/* Price Row: Big, Bold, Clean */}
              <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                <div>
                  <span className="text-[10px] text-slate-400 block">{t('mandiRate', language)} <span className="line-through">₹{offer.mandiRate}</span></span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="text-xl sm:text-2xl font-extrabold font-mono text-emerald-900">
                      ₹{offer.offeredPrice}
                    </span>
                    <span className="text-xs text-slate-500 font-semibold">/Qtl</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full inline-block">
                    +₹{offer.profitExtra} ज्यादा मुनाफा
                  </span>
                  <div className="text-[10px] text-slate-500 mt-1">
                    कुल: ₹{totalAmount.toLocaleString('en-IN')}
                  </div>
                </div>
              </div>

              {/* Delivery and payment note */}
              <div className="text-[11px] text-slate-600 flex items-center justify-between">
                <span>🚚 {offer.pickupType}</span>
                <span className="text-slate-400 font-mono">{offer.expiresIn}</span>
              </div>

              {/* Action Buttons: Phone Friendly */}
              {isAccepted ? (
                <div className="py-2.5 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-lg text-center">
                  ✓ {t('dealLocked', language)}
                </div>
              ) : (
                <div className="space-y-2 pt-1 border-t border-slate-100">
                  {/* Big primary button */}
                  <button
                    type="button"
                    onClick={() => onAcceptOffer(offer)}
                    className="w-full py-2.5 sm:py-3 bg-emerald-700 hover:bg-emerald-800 active:scale-98 text-white font-extrabold text-xs sm:text-sm rounded-lg shadow-xs transition-colors cursor-pointer text-center"
                  >
                    ✅ {t('acceptDeal', language)}
                  </button>

                  {/* Secondary actions: 3 equal buttons */}
                  <div className="grid grid-cols-3 gap-1.5">
                    <button
                      type="button"
                      onClick={() => onOpenCounter(offer)}
                      className="py-2 px-1 border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 rounded-lg text-center cursor-pointer active:scale-95"
                    >
                      💬 {t('counterPrice', language)}
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveCallModal(offer)}
                      className="py-2 px-1 border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 rounded-lg text-center cursor-pointer active:scale-95"
                    >
                      📞 {t('callBuyer', language)}
                    </button>

                    <button
                      type="button"
                      onClick={() => setExpandedOfferId(isExpanded ? null : offer.id)}
                      className="py-2 px-1 border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 rounded-lg text-center cursor-pointer active:scale-95"
                    >
                      {isExpanded ? '▲ कम' : '▼ विवरण'}
                    </button>
                  </div>
                </div>
              )}

              {/* Expandable Spec Details */}
              {isExpanded && (
                <div className="mt-1 p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-600 space-y-1">
                  <div>
                    <span className="font-semibold text-slate-700">भुगतान:</span> {offer.paymentTerm}
                  </div>
                  <div>
                    <span className="font-semibold text-slate-700">एस्क्रो बैंक:</span> {offer.escrowBank || 'YES Bank Agro Trust'}
                  </div>
                  {offer.specNotes && (
                    <div>
                      <span className="font-semibold text-slate-700">मानक:</span> {offer.specNotes}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Call Modal */}
      {activeCallModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="w-full max-w-xs bg-white rounded-xl p-5 border border-slate-200 text-center space-y-3">
            <div className="text-3xl">📞</div>
            <h3 className="font-bold text-base text-slate-900">{activeCallModal.buyerName}</h3>
            <div className="bg-slate-50 p-2.5 rounded-lg font-mono font-bold text-emerald-800">
              {activeCallModal.buyerPhone}
            </div>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setActiveCallModal(null)}
                className="flex-1 py-2 bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg"
              >
                {t('close', language)}
              </button>
              <a
                href={`tel:${activeCallModal.buyerPhone}`}
                onClick={() => {
                  onNotify(`Calling ${activeCallModal.buyerName}...`, 'info');
                  setActiveCallModal(null);
                }}
                className="flex-1 py-2 bg-emerald-700 text-white text-xs font-bold rounded-lg text-center"
              >
                Call
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
