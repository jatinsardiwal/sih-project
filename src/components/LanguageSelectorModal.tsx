import React from 'react';
import { Language } from '../types';
import { SUPPORTED_LANGUAGES } from '../utils/i18n';

interface LanguageSelectorModalProps {
  isOpen: boolean;
  currentLanguage: Language;
  onSelectLanguage: (lang: Language) => void;
  onClose: () => void;
}

export const LanguageSelectorModal: React.FC<LanguageSelectorModalProps> = ({
  isOpen,
  currentLanguage,
  onSelectLanguage,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div 
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-emerald-900 text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🌐</span>
            <div>
              <h2 className="text-lg font-bold font-headline leading-tight">
                अपनी भाषा चुनें / Select Language
              </h2>
              <p className="text-emerald-200 text-xs">
                सभी राज्यों की प्रमुख भाषाओं में उपलब्ध
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-emerald-800 hover:bg-emerald-700 flex items-center justify-center text-white text-base font-bold cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="p-4 overflow-y-auto grid grid-cols-2 gap-2.5">
          {SUPPORTED_LANGUAGES.map((lang) => {
            const isSelected = currentLanguage === lang.code;
            return (
              <button
                key={lang.code}
                type="button"
                onClick={() => {
                  onSelectLanguage(lang.code);
                  onClose();
                }}
                className={`p-3 rounded-xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                  isSelected
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-600/30'
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-800'
                }`}
              >
                <span className="text-2xl">{lang.flag}</span>
                <div className="min-w-0">
                  <div className="text-base font-bold leading-tight">
                    {lang.nativeName}
                  </div>
                  <div className="text-xs text-slate-500 font-normal">
                    {lang.name}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 text-center">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 cursor-pointer"
          >
            बंद करें (Close)
          </button>
        </div>
      </div>
    </div>
  );
};
