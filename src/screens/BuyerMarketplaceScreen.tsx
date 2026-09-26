import React, { useState } from 'react';
import { CropItem, Language } from '../types';
import { CategoryFilterBar, CategoryFilterType } from '../components/CategoryFilterBar';
import { t } from '../utils/i18n';

interface BuyerMarketplaceScreenProps {
  crops: CropItem[];
  language: Language;
  onOpenCropDetail: (crop: CropItem) => void;
  onSubmitBid: (crop: CropItem, bidPrice: number) => void;
  onNotify: (msg: string, type?: 'success' | 'info' | 'warning') => void;
}

export const BuyerMarketplaceScreen: React.FC<BuyerMarketplaceScreenProps> = ({
  crops,
  language,
  onOpenCropDetail,
  onSubmitBid,
  onNotify,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeBidCrop, setActiveBidCrop] = useState<CropItem | null>(null);
  const [customBidPrice, setCustomBidPrice] = useState<number>(0);

  const filteredCrops = crops.filter((crop) => {
    const matchesCategory =
      selectedCategory === 'all' || crop.category === selectedCategory;
    const matchesSearch =
      crop.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      crop.nameHi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      crop.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleOpenBid = (crop: CropItem) => {
    setActiveBidCrop(crop);
    setCustomBidPrice(crop.expectedPrice + 30);
  };

  const handleConfirmBid = () => {
    if (!activeBidCrop) return;
    onSubmitBid(activeBidCrop, customBidPrice);
    onNotify(
      language === 'hi'
        ? `₹${customBidPrice}/Qtl की बोली '${activeBidCrop.nameHi}' के लिए किसान को भेज दी गई है!`
        : `Bid of ₹${customBidPrice}/Qtl for '${activeBidCrop.nameEn}' placed!`,
      'success'
    );
    setActiveBidCrop(null);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Plain Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 leading-tight">
            🏢 {language === 'hi' ? 'संस्थागत खरीद पोर्टल (Buyer Procurement Portal)' : 'Institutional Procurement Portal'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {language === 'hi'
              ? 'प्रमाणित कृषि लॉट देखें और सीधे खेत से उठाव हेतु बोली लगाएं।'
              : 'Browse verified farmgate lots with digital assay and submit direct bids.'}
          </p>
        </div>

        <div className="text-xs text-slate-600 font-mono">
          {crops.length} लॉट उपलब्ध ({crops.reduce((a, b) => a + b.quantityQtl, 0)} Qtl)
        </div>
      </div>

      {/* Categorized One by One Filter Bar */}
      <div className="space-y-2">
        <div className="text-xs font-bold text-slate-600">
          {language === 'hi' ? 'श्रेणी अनुसार फसलें (Categorized One by One):' : 'Select Category:'}
        </div>
        <CategoryFilterBar
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          language={language}
        />
      </div>

      {/* Search Input */}
      <div className="relative">
        <span className="absolute left-3.5 top-2.5 text-slate-400 text-sm">🔍</span>
        <input
          type="text"
          placeholder={
            language === 'hi'
              ? 'फसल या जिले का नाम लिखें...'
              : 'Search crop or location...'
          }
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-xs sm:text-sm focus:outline-none focus:border-blue-600"
        />
      </div>

      {/* Plain Available Lots List (One by One) */}
      <div className="space-y-2.5">
        {filteredCrops.map((crop) => {
          return (
            <div
              key={crop.id}
              className="bg-white border border-slate-200 rounded-xl p-4 hover:border-slate-300 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              {/* Col 1: Crop */}
              <div className="flex items-center gap-3.5 min-w-[220px]">
                <img
                  src={crop.imageUrl}
                  alt={crop.nameEn}
                  className="w-12 h-12 rounded-lg object-cover border border-slate-100 shrink-0"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm sm:text-base text-slate-900">
                      {language === 'hi' ? crop.nameHi : crop.nameEn}
                    </h3>
                    <span className="text-[10px] font-semibold bg-blue-50 text-blue-800 px-1.5 py-0.5 rounded">
                      {crop.quality}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    📍 {crop.location} • {crop.farmerName || 'किसान'}
                  </div>
                </div>
              </div>

              {/* Col 2: Volume & Moisture */}
              <div className="text-xs text-slate-600 min-w-[120px] space-y-0.5">
                <div>
                  <span className="text-slate-400">उपलब्ध:</span>{' '}
                  <span className="font-bold font-mono text-slate-900">{crop.quantityQtl} Qtl</span>
                </div>
                {crop.moisturePct && (
                  <div>
                    <span className="text-slate-400">नमी:</span>{' '}
                    <span className="font-semibold text-emerald-800">{crop.moisturePct}% (Optimal)</span>
                  </div>
                )}
              </div>

              {/* Col 3: Asking Price */}
              <div className="text-xs min-w-[140px] space-y-0.5">
                <span className="text-slate-400 block">किसान की मांग:</span>
                <span className="font-bold font-mono text-slate-900 text-sm">
                  ₹{crop.expectedPrice} / Qtl
                </span>
                <span className="text-[11px] text-slate-500 block">
                  (मंडी भाव: ₹{crop.mandiPrice})
                </span>
              </div>

              {/* Col 4: Action */}
              <div className="flex items-center gap-2 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
                <button
                  type="button"
                  onClick={() => onOpenCropDetail(crop)}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 cursor-pointer"
                >
                  {t('fullDetails', language)}
                </button>

                <button
                  type="button"
                  onClick={() => handleOpenBid(crop)}
                  className="px-4 py-1.5 bg-blue-800 hover:bg-blue-900 text-white font-bold text-xs rounded-lg shadow-xs transition-colors cursor-pointer"
                >
                  🤝 {t('placeBid', language)}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bid Modal */}
      {activeBidCrop && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="w-full max-w-sm bg-white rounded-xl p-5 border border-slate-200 space-y-4">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="font-bold text-sm text-slate-900">
                {activeBidCrop.nameEn} ({activeBidCrop.quantityQtl} Qtl)
              </h3>
              <button
                onClick={() => setActiveBidCrop(null)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-1 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>किसान की मांग:</span>
                <span className="font-bold">₹{activeBidCrop.expectedPrice}/Qtl</span>
              </div>
              <div className="flex justify-between">
                <span>स्थान:</span>
                <span>{activeBidCrop.location}</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                आपकी बोली दर (₹ प्रति क्विंटल):
              </label>
              <input
                type="number"
                value={customBidPrice}
                onChange={(e) => setCustomBidPrice(Number(e.target.value))}
                className="w-full px-3 py-2 text-lg font-bold font-mono border border-slate-300 rounded-lg text-slate-900 focus:outline-none"
              />
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setActiveBidCrop(null)}
                className="flex-1 py-1.5 bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg"
              >
                {t('cancel', language)}
              </button>
              <button
                onClick={handleConfirmBid}
                className="flex-1 py-1.5 bg-blue-800 text-white text-xs font-bold rounded-lg text-center"
              >
                {t('placeBid', language)}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
