import React from 'react';
import { ActiveDealTracker, Language } from '../types';
import { t } from '../utils/i18n';

interface FarmerDealsScreenProps {
  deal: ActiveDealTracker;
  language: Language;
  onOpenReceipt: () => void;
  onAdvanceStep: () => void;
  onNotify: (msg: string, type?: 'success' | 'info' | 'warning') => void;
}

export const FarmerDealsScreen: React.FC<FarmerDealsScreenProps> = ({
  deal,
  language,
  onOpenReceipt,
  onAdvanceStep,
  onNotify,
}) => {
  const steps = [
    {
      step: 1,
      title: t('step1', language),
      desc: `${deal.buyerName} • ₹${deal.ratePerQtl}/Qtl`,
      status: deal.currentStep > 1 ? 'done' : deal.currentStep === 1 ? 'current' : 'pending',
    },
    {
      step: 2,
      title: t('step2', language),
      desc: deal.truckNumber,
      status: deal.currentStep > 2 ? 'done' : deal.currentStep === 2 ? 'current' : 'pending',
    },
    {
      step: 3,
      title: t('step3', language),
      desc: `${deal.quantityQtl} Qtl डिजिटल धर्मकांटा तुलाई`,
      status: deal.currentStep > 3 ? 'done' : deal.currentStep === 3 ? 'current' : 'pending',
    },
    {
      step: 4,
      title: t('step4', language),
      desc: `₹${deal.totalAmount.toLocaleString('en-IN')} ${deal.bankName}`,
      status: deal.currentStep === 4 ? 'done' : 'pending',
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-3 sm:px-6 py-4 sm:py-6 space-y-4 sm:space-y-6">
      {/* Top Banner: Plain, High Legibility */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 shadow-2xs">
        <div>
          <span className="text-[11px] font-mono font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 inline-block mb-1">
            अनुबंध #{deal.dealId}
          </span>
          <h1 className="text-lg sm:text-xl font-bold text-slate-900">
            {t('activeDealTitle', language)}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {deal.cropNameHi} ({deal.quantityQtl} Qtl) • {deal.buyerName}
          </p>
        </div>

        <div className="p-3 bg-slate-50 rounded-lg sm:bg-transparent sm:p-0 text-left sm:text-right border sm:border-0 border-slate-100">
          <span className="text-[11px] text-slate-400 block">{language === 'hi' ? 'कुल देय राशि:' : 'Total Amount:'}</span>
          <div className="text-xl sm:text-2xl font-extrabold font-mono text-emerald-800">
            ₹{deal.totalAmount.toLocaleString('en-IN')}
          </div>
          <span className="text-[10px] text-slate-500 block">0% दलाली • सीधा बैंक ट्रांसफर</span>
        </div>
      </div>

      {/* Step by step Progress */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 space-y-3 sm:space-y-4 shadow-2xs">
        <h2 className="text-xs sm:text-sm font-bold text-slate-800">
          {t('fourStepsTitle', language)}
        </h2>

        <div className="space-y-2.5">
          {steps.map((st) => {
            const isDone = st.status === 'done';
            const isCurrent = st.status === 'current';

            return (
              <div
                key={st.step}
                className={`p-3 rounded-lg border transition-all flex items-center justify-between gap-3 ${
                  isCurrent
                    ? 'border-emerald-600 bg-emerald-50/40'
                    : isDone
                    ? 'border-slate-200 bg-slate-50/50'
                    : 'border-slate-100 opacity-60'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                      isDone
                        ? 'bg-emerald-700 text-white'
                        : isCurrent
                        ? 'bg-emerald-600 text-white animate-pulse'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {isDone ? '✓' : st.step}
                  </span>
                  <div>
                    <h3 className="font-bold text-xs sm:text-sm text-slate-900">
                      {st.title}
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      {st.desc}
                    </p>
                  </div>
                </div>

                <span
                  className={`text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded shrink-0 ${
                    isDone
                      ? 'bg-emerald-100 text-emerald-800'
                      : isCurrent
                      ? 'bg-emerald-700 text-white'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {isDone ? 'पूर्ण ✓' : isCurrent ? 'प्रगति पर' : 'बाकी'}
                </span>
              </div>
            );
          })}
        </div>

        {/* Action Row on Mobile */}
        <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
          <div className="grid grid-cols-2 sm:flex gap-2">
            <a
              href="tel:+919872133410"
              onClick={() => onNotify('Calling driver...', 'info')}
              className="py-2 px-3 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>📞</span>
              <span>{t('callDriver', language)}</span>
            </a>

            <button
              onClick={onOpenReceipt}
              className="py-2 px-3 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>📄</span>
              <span>{t('viewReceipt', language)}</span>
            </button>
          </div>

          <button
            onClick={onAdvanceStep}
            className="text-center sm:text-right py-1 text-xs text-slate-500 hover:text-slate-800 underline cursor-pointer"
          >
            {t('advanceDemo', language)}
          </button>
        </div>
      </div>

      {/* Kisan Support Card */}
      <div className="p-3.5 sm:p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between gap-3 text-xs">
        <div>
          <span className="font-bold text-slate-800 block">📞 {t('needHelp', language)}</span>
          <span className="text-[11px] text-slate-500">किसान सहायता केंद्र (24 घंटे उपलब्ध)</span>
        </div>
        <a
          href="tel:18001801551"
          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-lg text-xs shrink-0"
        >
          1800-180-1551
        </a>
      </div>
    </div>
  );
};
