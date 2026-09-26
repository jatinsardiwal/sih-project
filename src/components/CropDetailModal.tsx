import React from 'react';
import { CropItem, Language } from '../types';
import { speakText } from '../utils/speech';

interface CropDetailModalProps {
  crop: CropItem | null;
  language: Language;
  onClose: () => void;
  onAction?: (crop: CropItem) => void;
  actionLabel?: string;
}

export const CropDetailModal: React.FC<CropDetailModalProps> = ({
  crop,
  language,
  onClose,
  onAction,
  actionLabel,
}) => {
  if (!crop) return null;

  const extraProfit = crop.bestOfferPrice - crop.mandiPrice;
  const totalValue = crop.bestOfferPrice * crop.quantityQtl;

  const handleSpeak = () => {
    const textHi = `${crop.nameHi}, कुल मात्रा ${crop.quantityQtl} क्विंटल। आज का सबसे अच्छा ऑफर ${crop.bestOfferPrice} रुपये प्रति क्विंटल है, जो मंडी से ${extraProfit} रुपये अधिक है। कुल मूल्य ${totalValue.toLocaleString('en-IN')} रुपये।`;
    const textEn = `${crop.nameEn}, quantity ${crop.quantityQtl} quintals. Best offer is ${crop.bestOfferPrice} rupees per quintal, which is ${extraProfit} rupees higher than mandi rate. Total payout ${totalValue.toLocaleString('en-IN')} rupees.`;
    speakText(language === 'hi' ? textHi : textEn, language);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div 
        className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top */}
        <div className="bg-emerald-900 text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">🌾</span>
            <div>
              <h2 className="text-lg font-bold font-headline leading-tight">
                {language === 'hi' ? crop.nameHi : crop.nameEn}
              </h2>
              <p className="text-xs text-emerald-200">
                {crop.variety} • {crop.location}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleSpeak}
              title="बोलकर सुनें"
              className="w-8 h-8 rounded-full bg-emerald-800 hover:bg-emerald-700 flex items-center justify-center text-white text-base cursor-pointer"
            >
              🔊
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-emerald-800 hover:bg-emerald-700 flex items-center justify-center text-white text-base font-bold cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-4 text-sm">
          {/* Main Visual & Key Stats */}
          <div className="flex gap-4 items-center">
            <img
              src={crop.imageUrl}
              alt={crop.nameEn}
              className="w-24 h-24 rounded-xl object-cover border border-slate-200 shrink-0"
            />
            <div className="space-y-1">
              <span className="inline-block text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                {crop.quality}
              </span>
              <div className="text-xl font-extrabold text-slate-900 font-mono">
                {crop.quantityQtl} <span className="text-sm font-normal text-slate-600">{language === 'hi' ? 'क्विंटल' : 'Quintals'}</span>
              </div>
              <div className="text-xs text-slate-500">
                {language === 'hi' ? 'कटाई:' : 'Harvest:'} {crop.harvestDate}
              </div>
              {crop.fpoName && (
                <div className="text-xs text-emerald-700 font-semibold">
                  🏛️ {crop.fpoName}
                </div>
              )}
            </div>
          </div>

          {/* Pricing Analysis Box */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-600">{language === 'hi' ? 'स्थानीय मंडी भाव:' : 'Local Mandi Modal Rate:'}</span>
              <span className="font-mono text-slate-500 line-through">₹{crop.mandiPrice}/Qtl</span>
            </div>

            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-emerald-800">{language === 'hi' ? 'FASLYNK सर्वोत्तम ऑफर:' : 'FASLYNK Best Offer:'}</span>
              <span className="font-mono font-bold text-emerald-800 text-base">₹{crop.bestOfferPrice}/Qtl</span>
            </div>

            <div className="flex justify-between items-center text-xs pt-1 border-t border-slate-200">
              <span className="font-bold text-slate-700">{language === 'hi' ? 'कुल देय राशि:' : 'Total Gross Value:'}</span>
              <span className="font-mono font-extrabold text-emerald-900 text-lg">
                ₹{totalValue.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="bg-emerald-100 text-emerald-900 rounded-lg p-2 text-center text-xs font-bold">
              💰 {language === 'hi' ? `मंडी से ₹${extraProfit}/क्विंटल अधिक मुनाफा!` : `+₹${extraProfit}/Qtl extra profit!`}
            </div>
          </div>

          {/* Quality & Specifications */}
          <div className="border border-slate-200 rounded-xl p-3.5 space-y-2 text-xs">
            <h4 className="font-bold text-slate-800 uppercase tracking-wide text-[11px]">
              🔬 {language === 'hi' ? 'गुणवत्ता एवं तकनीकी स्पेसिफिकेशन:' : 'Quality & Technical Specifications:'}
            </h4>
            {crop.moisturePct && (
              <div className="flex justify-between text-slate-700">
                <span>{language === 'hi' ? 'नमी स्तर (Moisture):' : 'Moisture Content:'}</span>
                <span className="font-semibold text-emerald-800 font-mono">{crop.moisturePct}% (आदर्श / Optimal)</span>
              </div>
            )}
            {crop.labCertification && (
              <div className="text-slate-600">
                <span className="font-semibold">{language === 'hi' ? 'लैब रिपोर्ट:' : 'Lab Certification:'}</span> {crop.labCertification}
              </div>
            )}
            {crop.farmerName && (
              <div className="flex justify-between text-slate-700">
                <span>{language === 'hi' ? 'किसान का नाम:' : 'Farmer Name:'}</span>
                <span className="font-semibold text-slate-900">{crop.farmerName}</span>
              </div>
            )}
          </div>

          {/* Zero Middleman & Escrow Assurance */}
          <div className="bg-emerald-50 rounded-xl p-3 border border-emerald-200 text-xs text-emerald-900 space-y-1">
            <div className="font-bold">🛡️ {language === 'hi' ? '100% सुरक्षित भुगतान और खेत से उठान' : '100% Guaranteed Payout'}</div>
            <p className="text-[11px] text-emerald-800">
              {language === 'hi'
                ? 'गाड़ी खेत पर आएगी। तुलाई पूर्ण होते ही बैंक खाते में सीधे आरटीजीएस/यूपीआई ट्रांसफर होगा। कोई दलाली नहीं ली जाएगी।'
                : 'Free farmgate pickup. Payment will be credited directly to your bank account upon weighing. 0% brokerage.'}
            </p>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 cursor-pointer"
          >
            {language === 'hi' ? 'बंद करें' : 'Close'}
          </button>

          {onAction && (
            <button
              type="button"
              onClick={() => {
                onAction(crop);
                onClose();
              }}
              className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 active:scale-98 text-white font-bold rounded-xl text-xs sm:text-sm shadow cursor-pointer flex items-center gap-1.5"
            >
              <span>{actionLabel || (language === 'hi' ? 'ऑफर देखें' : 'View Offers')}</span>
              <span>👉</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
