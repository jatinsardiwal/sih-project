import React, { useState } from 'react';
import { CropItem, Language, NavTab } from '../types';
import { CategoryFilterBar, CategoryFilterType } from '../components/CategoryFilterBar';
import { speakText } from '../utils/speech';
import { t } from '../utils/i18n';

interface FarmerSellScreenProps {
  crops: CropItem[];
  language: Language;
  onOpenSellModal: () => void;
  onSelectTab: (tab: NavTab) => void;
  onOpenCropDetail: (crop: CropItem) => void;
}

export const FarmerSellScreen: React.FC<FarmerSellScreenProps> = ({
  crops,
  language,
  onOpenSellModal,
  onSelectTab,
  onOpenCropDetail,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCrops = crops.filter((crop) => {
    const matchesCategory =
      selectedCategory === 'all' || crop.category === selectedCategory;
    const matchesSearch =
      crop.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      crop.nameHi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      crop.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSpeak = (crop: CropItem, e: React.MouseEvent) => {
    e.stopPropagation();
    const textHi = `${crop.nameHi}, मात्रा ${crop.quantityQtl} क्विंटल। आज का सबसे अच्छा ऑफर ₹${crop.bestOfferPrice} प्रति क्विंटल है। मंडी से ₹${crop.bestOfferPrice - crop.mandiPrice} ज्यादा मुनाफा।`;
    const textEn = `${crop.nameEn}, quantity ${crop.quantityQtl} quintals. Best offer ₹${crop.bestOfferPrice} per quintal. Extra profit ₹${crop.bestOfferPrice - crop.mandiPrice}.`;
    speakText(language === 'hi' ? textHi : textEn, language);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-3 sm:px-6 py-4 sm:py-6 space-y-4 sm:space-y-6">
      {/* Top Banner: Friendly, Plain, Clean on Phones */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
            {t('welcomeFarmer', language)}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {t('welcomeFarmerSub', language)}
          </p>
          <div className="flex flex-wrap gap-2.5 sm:gap-4 mt-2.5 text-[11px] sm:text-xs font-semibold text-emerald-800">
            <span>✓ {t('freePickup', language)}</span>
            <span>✓ {t('extraProfit', language)}</span>
            <span>✓ {t('guaranteedPay', language)}</span>
          </div>
        </div>

        <button
          onClick={onOpenSellModal}
          className="w-full sm:w-auto py-2.5 px-5 bg-emerald-700 hover:bg-emerald-800 active:scale-98 text-white font-bold text-sm rounded-lg shadow-xs transition-colors shrink-0 cursor-pointer flex items-center justify-center gap-1.5"
        >
          <span>➕</span>
          <span>{t('sellNewCrop', language)}</span>
        </button>
      </div>

      {/* Categorized Filter Bar (Thumb-scrollable on Phone) */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs font-bold text-slate-600 px-0.5">
          <span>{language === 'hi' ? 'श्रेणी चुनें:' : 'Category:'}</span>
          <span className="font-normal text-slate-400">
            {filteredCrops.length} {language === 'hi' ? 'फसलें' : 'crops'}
          </span>
        </div>
        <CategoryFilterBar
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          language={language}
        />
      </div>

      {/* Quick Search Bar */}
      <div className="relative">
        <span className="absolute left-3 top-2.5 text-slate-400 text-sm">🔍</span>
        <input
          type="text"
          placeholder={
            language === 'hi'
              ? 'फसल या जिले का नाम लिखें...'
              : 'Search crop or location...'
          }
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-lg text-xs sm:text-sm focus:outline-none focus:border-emerald-600"
        />
      </div>

      {/* Phone-First Cards List (Categorized One by One) */}
      <div className="space-y-3">
        {filteredCrops.map((crop) => {
          const extraProfit = crop.bestOfferPrice - crop.mandiPrice;

          return (
            <div
              key={crop.id}
              className="bg-white border border-slate-200 rounded-xl p-3.5 sm:p-4 hover:border-slate-300 transition-all flex flex-col justify-between gap-3 shadow-2xs"
            >
              {/* Header: Photo + Title + Audio Button */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={crop.imageUrl}
                    alt={crop.nameEn}
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg object-cover border border-slate-100 shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-bold text-base sm:text-lg text-slate-900 leading-tight">
                        {language === 'hi' ? crop.nameHi : crop.nameEn}
                      </h3>
                      <span className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-1.5 py-0.2 rounded">
                        {crop.quality}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      {crop.variety} • 📍 {crop.location}
                    </div>
                  </div>
                </div>

                {/* Speaker Button: Large touch target for phone */}
                <button
                  type="button"
                  onClick={(e) => handleSpeak(crop, e)}
                  title="बोलकर सुनें"
                  className="w-9 h-9 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-sm text-slate-700 shrink-0 cursor-pointer active:scale-95"
                >
                  🔊
                </button>
              </div>

              {/* Middle 3-Column Metrics Strip: Super easy to read on mobile */}
              <div className="grid grid-cols-3 gap-2 p-2.5 bg-slate-50 rounded-lg text-center border border-slate-100 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 block">{language === 'hi' ? 'कुल मात्रा' : 'Quantity'}</span>
                  <span className="font-bold text-slate-800 text-xs sm:text-sm font-mono">{crop.quantityQtl} Qtl</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">{language === 'hi' ? 'मंडी भाव' : 'Mandi Rate'}</span>
                  <span className="line-through text-slate-400 text-xs sm:text-sm font-mono">₹{crop.mandiPrice}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">{language === 'hi' ? 'ऑफर भाव' : 'Offer Rate'}</span>
                  <span className="font-extrabold text-emerald-800 text-xs sm:text-sm font-mono">₹{crop.bestOfferPrice}</span>
                </div>
              </div>

              {/* Extra Profit Highlight */}
              {extraProfit > 0 && (
                <div className="text-center text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 py-1 px-2 rounded-lg">
                  💰 +₹{extraProfit}/Qtl {language === 'hi' ? 'ज्यादा मुनाफा (मंडी से अधिक)' : 'extra profit than mandi'}
                </div>
              )}

              {/* Actions: Big thumb-friendly button on phone */}
              <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => onOpenCropDetail(crop)}
                  className="px-3 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  ℹ️ {t('fullDetails', language)}
                </button>

                <button
                  type="button"
                  onClick={() => onSelectTab('buyer-offers')}
                  className="flex-1 sm:flex-initial py-2.5 px-4 bg-emerald-700 hover:bg-emerald-800 active:scale-98 text-white rounded-lg text-xs sm:text-sm font-bold shadow-xs cursor-pointer text-center"
                >
                  {t('viewOffers', language)} ({crop.offersCount}) 👉
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
