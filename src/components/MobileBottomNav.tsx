import React from 'react';
import { NavTab, Language, UserRole } from '../types';
import { t } from '../utils/i18n';

interface MobileBottomNavProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  language: Language;
  currentRole: UserRole;
  offersCount: number;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentTab,
  onSelectTab,
  language,
  currentRole,
  offersCount,
}) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-white/98 backdrop-blur-md border-t border-slate-200 shadow-lg px-2 py-1 safe-area-pb">
      <div className="flex items-center justify-around">
        {currentRole === 'farmer' ? (
          <>
            {/* 1. Crops */}
            <button
              onClick={() => onSelectTab('sell-crop')}
              className={`flex-1 py-1.5 px-1 flex flex-col items-center justify-center text-center cursor-pointer transition-colors ${
                currentTab === 'sell-crop'
                  ? 'text-emerald-800 font-bold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <span className="text-xl leading-none">🌾</span>
              <span className="text-[11px] mt-1 truncate max-w-[70px]">
                {t('sellCrop', language)}
              </span>
            </button>

            {/* 2. Offers */}
            <button
              onClick={() => onSelectTab('buyer-offers')}
              className={`flex-1 py-1.5 px-1 flex flex-col items-center justify-center text-center cursor-pointer relative transition-colors ${
                currentTab === 'buyer-offers'
                  ? 'text-emerald-800 font-bold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <span className="text-xl leading-none">🤝</span>
              <span className="text-[11px] mt-1 truncate max-w-[70px]">
                {t('buyerOffers', language)}
              </span>
              {offersCount > 0 && (
                <span className="absolute top-1 right-1/2 translate-x-4 w-4 h-4 rounded-full bg-emerald-700 text-white text-[10px] font-bold flex items-center justify-center">
                  {offersCount}
                </span>
              )}
            </button>

            {/* 3. Mandi Rates */}
            <button
              onClick={() => onSelectTab('mandi-rates')}
              className={`flex-1 py-1.5 px-1 flex flex-col items-center justify-center text-center cursor-pointer transition-colors ${
                currentTab === 'mandi-rates'
                  ? 'text-emerald-800 font-bold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <span className="text-xl leading-none">📈</span>
              <span className="text-[11px] mt-1 truncate max-w-[70px]">
                {t('mandiRates', language)}
              </span>
            </button>

            {/* 4. Deals & Payment */}
            <button
              onClick={() => onSelectTab('my-deals')}
              className={`flex-1 py-1.5 px-1 flex flex-col items-center justify-center text-center cursor-pointer transition-colors ${
                currentTab === 'my-deals'
                  ? 'text-emerald-800 font-bold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <span className="text-xl leading-none">💵</span>
              <span className="text-[11px] mt-1 truncate max-w-[70px]">
                {t('myDeals', language)}
              </span>
            </button>
          </>
        ) : (
          <>
            {/* Buyer Mode Navigation */}
            <button
              onClick={() => onSelectTab('marketplace')}
              className={`flex-1 py-1.5 px-1 flex flex-col items-center justify-center text-center cursor-pointer transition-colors ${
                currentTab === 'marketplace'
                  ? 'text-blue-900 font-bold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <span className="text-xl leading-none">🏢</span>
              <span className="text-[11px] mt-1 truncate max-w-[70px]">
                {t('buyerPortal', language)}
              </span>
            </button>

            <button
              onClick={() => onSelectTab('mandi-rates')}
              className={`flex-1 py-1.5 px-1 flex flex-col items-center justify-center text-center cursor-pointer transition-colors ${
                currentTab === 'mandi-rates'
                  ? 'text-blue-900 font-bold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <span className="text-xl leading-none">📈</span>
              <span className="text-[11px] mt-1 truncate max-w-[70px]">
                {t('mandiRates', language)}
              </span>
            </button>

            <button
              onClick={() => onSelectTab('my-deals')}
              className={`flex-1 py-1.5 px-1 flex flex-col items-center justify-center text-center cursor-pointer transition-colors ${
                currentTab === 'my-deals'
                  ? 'text-blue-900 font-bold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <span className="text-xl leading-none">🚚</span>
              <span className="text-[11px] mt-1 truncate max-w-[70px]">
                {t('myDeals', language)}
              </span>
            </button>
          </>
        )}
      </div>
    </div>
  );
};
