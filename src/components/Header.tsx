import React, { useState } from 'react';
import { NavTab, Language, UserRole } from '../types';
import { SUPPORTED_LANGUAGES, t } from '../utils/i18n';
import { LanguageSelectorModal } from './LanguageSelectorModal';

interface HeaderProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  language: Language;
  onSelectLanguage: (lang: Language) => void;
  currentRole: UserRole;
  onChangeRole: (role: UserRole) => void;
  offersCount: number;
  onOpenSellModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  language,
  onSelectLanguage,
  currentRole,
  onChangeRole,
  offersCount,
  onOpenSellModal,
}) => {
  const [isLangModalOpen, setIsLangModalOpen] = useState(false);
  const currentLangObj = SUPPORTED_LANGUAGES.find((l) => l.code === language) || SUPPORTED_LANGUAGES[0];

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-40 bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-3 sm:px-6">
          {/* Main Top Bar: Compact on mobile, spacious on desktop */}
          <div className="h-14 sm:h-16 flex items-center justify-between gap-2 sm:gap-4">
            {/* Logo */}
            <button
              onClick={() => onSelectTab(currentRole === 'farmer' ? 'sell-crop' : 'marketplace')}
              className="flex items-center gap-2 text-left cursor-pointer shrink-0"
            >
              <img
                alt="FASLYNK"
                className="h-7 sm:h-8 w-auto object-contain"
                src="https://lh3.googleusercontent.com/aida/AEtjO1XO-2Pumxip3UaZLPU7DYJQIdUvARR2dX0KVPXKjXUt6o5bFD4fGw3VloqP6a9mq_HLv20g90GVIxd--unY9YOHHMlXgR-oe7-GgCPktJSgzG19P57ul3Oy5aMLeaiWNwzmHqccNllAJZedqS8QRL-OlTk4eQkNvV3bcwwGYk6z6EjlAB6uNJTa0eiaXtQvNCeWg4Kz1aTJ5RpYhYxpuqeh94ij-dUy2_UdVmPkLx2A6qYaZ_XLNfFuxK8K"
              />
              <div>
                <span className="font-extrabold text-base sm:text-lg text-emerald-800 tracking-tight block leading-tight">
                  {t('appName', language)}
                </span>
                <span className="text-[10px] sm:text-[11px] text-slate-500 hidden xs:block">
                  {t('tagline', language)}
                </span>
              </div>
            </button>

            {/* Role Switcher (Compact on mobile) */}
            <div className="inline-flex rounded-lg bg-slate-100 p-0.5 border border-slate-200 text-xs font-semibold">
              <button
                type="button"
                onClick={() => {
                  onChangeRole('farmer');
                  onSelectTab('sell-crop');
                }}
                className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-md transition-all cursor-pointer text-xs ${
                  currentRole === 'farmer'
                    ? 'bg-white text-emerald-800 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                🌾 <span className="hidden xs:inline">{t('farmerMode', language)}</span>
                <span className="xs:hidden">किसान</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  onChangeRole('buyer');
                  onSelectTab('marketplace');
                }}
                className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-md transition-all cursor-pointer text-xs ${
                  currentRole === 'buyer'
                    ? 'bg-white text-blue-900 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                🏢 <span className="hidden xs:inline">{t('buyerMode', language)}</span>
                <span className="xs:hidden">खरीदार</span>
              </button>
            </div>

            {/* Language & Sell Action */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                type="button"
                onClick={() => setIsLangModalOpen(true)}
                className="px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-medium text-slate-700 flex items-center gap-1 cursor-pointer"
              >
                <span className="text-sm sm:text-base">{currentLangObj.flag}</span>
                <span className="text-xs">{currentLangObj.nativeName}</span>
                <span className="text-[10px] text-slate-400">▼</span>
              </button>

              {currentRole === 'farmer' ? (
                <button
                  onClick={onOpenSellModal}
                  className="px-2.5 sm:px-3.5 py-1 sm:py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg font-bold text-xs shadow-xs cursor-pointer flex items-center gap-1"
                >
                  <span>+</span>
                  <span className="hidden sm:inline">{t('sellCrop', language)}</span>
                  <span className="sm:hidden">बेचें</span>
                </button>
              ) : (
                <a
                  href="tel:18001801551"
                  className="hidden sm:inline-block px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium"
                >
                  📞 1800-180-1551
                </a>
              )}
            </div>
          </div>

          {/* Desktop Navigation Tabs (Hidden on mobile because mobile uses the fixed thumb-friendly bottom navigation bar!) */}
          <nav className="hidden md:flex border-t border-slate-100 text-xs sm:text-sm font-semibold overflow-x-auto">
            {currentRole === 'farmer' ? (
              <>
                <button
                  onClick={() => onSelectTab('sell-crop')}
                  className={`py-2.5 px-4 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                    currentTab === 'sell-crop'
                      ? 'border-emerald-700 text-emerald-800 font-bold'
                      : 'border-transparent text-slate-600 hover:text-slate-900'
                  }`}
                >
                  🌾 {t('sellCrop', language)}
                </button>

                <button
                  onClick={() => onSelectTab('buyer-offers')}
                  className={`py-2.5 px-4 border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                    currentTab === 'buyer-offers'
                      ? 'border-emerald-700 text-emerald-800 font-bold'
                      : 'border-transparent text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span>🤝 {t('buyerOffers', language)}</span>
                  {offersCount > 0 && (
                    <span className="px-1.5 py-0.2 rounded-full bg-emerald-700 text-white text-[10px] font-bold">
                      {offersCount}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => onSelectTab('mandi-rates')}
                  className={`py-2.5 px-4 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                    currentTab === 'mandi-rates'
                      ? 'border-emerald-700 text-emerald-800 font-bold'
                      : 'border-transparent text-slate-600 hover:text-slate-900'
                  }`}
                >
                  📈 {t('mandiRates', language)}
                </button>

                <button
                  onClick={() => onSelectTab('my-deals')}
                  className={`py-2.5 px-4 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                    currentTab === 'my-deals'
                      ? 'border-emerald-700 text-emerald-800 font-bold'
                      : 'border-transparent text-slate-600 hover:text-slate-900'
                  }`}
                >
                  💵 {t('myDeals', language)}
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => onSelectTab('marketplace')}
                  className={`py-2.5 px-4 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                    currentTab === 'marketplace'
                      ? 'border-blue-800 text-blue-900 font-bold'
                      : 'border-transparent text-slate-600 hover:text-slate-900'
                  }`}
                >
                  🏢 {t('buyerPortal', language)}
                </button>

                <button
                  onClick={() => onSelectTab('mandi-rates')}
                  className={`py-2.5 px-4 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                    currentTab === 'mandi-rates'
                      ? 'border-blue-800 text-blue-900 font-bold'
                      : 'border-transparent text-slate-600 hover:text-slate-900'
                  }`}
                >
                  📈 {t('mandiRates', language)}
                </button>

                <button
                  onClick={() => onSelectTab('my-deals')}
                  className={`py-2.5 px-4 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                    currentTab === 'my-deals'
                      ? 'border-blue-800 text-blue-900 font-bold'
                      : 'border-transparent text-slate-600 hover:text-slate-900'
                  }`}
                >
                  🚚 {t('myDeals', language)}
                </button>
              </>
            )}
          </nav>
        </div>
      </header>

      {/* Language Selector Modal */}
      <LanguageSelectorModal
        isOpen={isLangModalOpen}
        currentLanguage={language}
        onSelectLanguage={onSelectLanguage}
        onClose={() => setIsLangModalOpen(false)}
      />
    </>
  );
};
