import React from 'react';
import { Language } from '../types';

export type CategoryFilterType = 'all' | 'grain' | 'oilseed' | 'pulse' | 'vegetable';

interface CategoryFilterBarProps {
  selectedCategory: CategoryFilterType;
  onSelectCategory: (cat: CategoryFilterType) => void;
  language: Language;
}

const CATEGORIES: {
  id: CategoryFilterType;
  labelHi: string;
  labelEn: string;
  icon: string;
}[] = [
  { id: 'all', labelHi: 'सभी फसलें', labelEn: 'All Crops', icon: '🌟' },
  { id: 'grain', labelHi: 'अनाज (गेहूं, धान)', labelEn: 'Grains (Wheat, Rice)', icon: '🌾' },
  { id: 'oilseed', labelHi: 'तिलहन (सरसों, सोयाबीन)', labelEn: 'Oilseeds (Mustard, Soy)', icon: '🟡' },
  { id: 'pulse', labelHi: 'दालें (चना, अरहर)', labelEn: 'Pulses (Chana)', icon: '🟤' },
  { id: 'vegetable', labelHi: 'सब्जियां (प्याज, आलू)', labelEn: 'Vegetables (Onion)', icon: '🧅' },
];

export const CategoryFilterBar: React.FC<CategoryFilterBarProps> = ({
  selectedCategory,
  onSelectCategory,
  language,
}) => {
  return (
    <div className="w-full flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
      {CATEGORIES.map((cat) => {
        const isSelected = selectedCategory === cat.id;
        return (
          <button
            key={cat.id}
            type="button"
            onClick={() => onSelectCategory(cat.id)}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
              isSelected
                ? 'bg-emerald-700 text-white shadow-xs scale-[1.02]'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <span className="text-base">{cat.icon}</span>
            <span>{language === 'hi' ? cat.labelHi : cat.labelEn}</span>
          </button>
        );
      })}
    </div>
  );
};
