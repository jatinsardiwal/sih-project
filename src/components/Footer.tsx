import React from 'react';
import { Language } from '../types';
import { t } from '../utils/i18n';

interface FooterProps {
  language?: Language;
}

export const Footer: React.FC<FooterProps> = ({ language = 'hi' }) => {
  return (
    <footer className="w-full bg-white border-t border-slate-200 mt-12 py-6 text-xs text-slate-500">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 font-medium text-slate-700">
          <span className="font-bold text-emerald-800">{t('appName', language)}</span>
          <span>•</span>
          <span>{t('tagline', language)}</span>
        </div>

        <div className="flex items-center gap-4 text-[11px] text-slate-500">
          <span>📞 {t('helpline', language)}</span>
          <span>•</span>
          <span>0% दलाली नीति</span>
          <span>•</span>
          <span>100% बैंक गारंटी</span>
        </div>
      </div>
    </footer>
  );
};
