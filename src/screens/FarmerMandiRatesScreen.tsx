import React, { useState } from 'react';
import { MandiRateRow, Language } from '../types';
import { CategoryFilterBar, CategoryFilterType } from '../components/CategoryFilterBar';
import { speakText } from '../utils/speech';
import { t } from '../utils/i18n';

interface FarmerMandiRatesScreenProps {
  rates: MandiRateRow[];
  language: Language;
  onSellAtRate: (crop: MandiRateRow) => void;
}

export const FarmerMandiRatesScreen: React.FC<FarmerMandiRatesScreenProps> = ({
  rates,
  language,
  onSellAtRate,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRates = rates.filter((r) => {
    const matchesCategory =
      selectedCategory === 'all' || r.category === selectedCategory;
    const matchesSearch =
      r.cropNameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.cropNameHi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.mandiName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSpeakMandi = (item: MandiRateRow, e: React.MouseEvent) => {
    e.stopPropagation();
    const textHi = `${item.cropNameHi}, ${item.mandiName}। मंडी भाव ₹${item.mandiRate} प्रति क्विंटल। FASLYNK सीधा खरीदार भाव ₹${item.faslynkRate}। अतिरिक्त फायदा ₹${item.extraBenefit}।`;
    const textEn = `${item.cropNameEn}, ${item.mandiName}. Mandi rate ₹${item.mandiRate}. Direct rate ₹${item.faslynkRate}. Extra benefit ₹${item.extraBenefit}.`;
    speakText(language === 'hi' ? textHi : textEn, language);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-3 sm:px-6 py-4 sm:py-6 space-y-4 sm:space-y-6">
      {/* Plain Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5">
        <h1 className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
          {t('mandiCompareTitle', language)}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          {t('mandiCompareSub', language)}
        </p>
      </div>

      {/* Categorized Filter Bar */}
      <div className="space-y-1.5">
        <div className="text-xs font-bold text-slate-600 px-0.5">
          {language === 'hi' ? 'श्रेणी अनुसार भाव देखें:' : 'Browse by Category:'}
        </div>
        <CategoryFilterBar
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          language={language}
        />
      </div>

      {/* Search Bar */}
      <div className="relative">
        <span className="absolute left-3 top-2.5 text-slate-400 text-sm">🔍</span>
        <input
          type="text"
          placeholder={
            language === 'hi'
              ? 'फसल या मंडी खोजें...'
              : 'Search crop or mandi...'
          }
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-lg text-xs sm:text-sm focus:outline-none focus:border-emerald-600"
        />
      </div>

      {/* Phone-Optimized Mandi Cards List */}
      <div className="space-y-2.5">
        {filteredRates.map((item, idx) => {
          return (
            <div
              key={idx}
              className="bg-white border border-slate-200 rounded-xl p-3.5 sm:p-4 hover:border-slate-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs"
            >
              {/* Header: Photo + Crop Name + Mandi + Audio button */}
              <div className="flex items-center justify-between sm:justify-start gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={item.imageUrl}
                    alt={item.cropNameEn}
                    className="w-12 h-12 rounded-lg object-cover border border-slate-100 shrink-0"
                  />
                  <div>
                    <h3 className="font-bold text-base text-slate-900 leading-tight">
                      {language === 'hi' ? item.cropNameHi : item.cropNameEn}
                    </h3>
                    <div className="text-xs text-slate-500 mt-0.5">
                      📍 {item.mandiName} ({item.state})
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={(e) => handleSpeakMandi(item, e)}
                  title="बोलकर सुनें"
                  className="sm:hidden w-8 h-8 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-xs text-slate-700 cursor-pointer active:scale-95"
                >
                  🔊
                </button>
              </div>

              {/* Price comparison strip */}
              <div className="flex items-center justify-between sm:justify-center gap-4 p-2 bg-slate-50 rounded-lg border border-slate-100 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 block">मंडी भाव</span>
                  <span className="font-bold font-mono text-slate-500">₹{item.mandiRate}</span>
                </div>
                <div className="text-slate-300">→</div>
                <div>
                  <span className="text-[10px] text-slate-400 block">FASLYNK सीधा</span>
                  <span className="font-extrabold font-mono text-emerald-800 text-sm">₹{item.faslynkRate}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                    +₹{item.extraBenefit}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={(e) => handleSpeakMandi(item, e)}
                  title="बोलकर सुनें"
                  className="hidden sm:flex w-8 h-8 rounded-lg border border-slate-200 hover:bg-slate-100 items-center justify-center text-xs text-slate-600 cursor-pointer"
                >
                  🔊
                </button>

                <button
                  type="button"
                  onClick={() => onSellAtRate(item)}
                  className="flex-1 sm:flex-initial py-2.5 px-4 bg-emerald-700 hover:bg-emerald-800 active:scale-98 text-white font-bold text-xs sm:text-sm rounded-lg shadow-xs transition-colors cursor-pointer text-center"
                >
                  {t('sellAtThisRate', language)} 👉
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
