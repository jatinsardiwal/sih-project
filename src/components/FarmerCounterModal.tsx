import React, { useState } from 'react';
import { Language } from '../types';

interface FarmerCounterModalProps {
  isOpen: boolean;
  language: Language;
  buyerName: string;
  cropName: string;
  currentOfferPrice: number;
  volumeQtl: number;
  onClose: () => void;
  onSubmitCounter: (counterPrice: number) => void;
}

export const FarmerCounterModal: React.FC<FarmerCounterModalProps> = ({
  isOpen,
  language,
  buyerName,
  cropName,
  currentOfferPrice,
  volumeQtl,
  onClose,
  onSubmitCounter,
}) => {
  const [counterPrice, setCounterPrice] = useState<number>(currentOfferPrice + 30);

  if (!isOpen) return null;

  const handleAdjust = (diff: number) => {
    setCounterPrice((prev) => Math.max(100, prev + diff));
  };

  const handleConfirm = () => {
    onSubmitCounter(counterPrice);
    onClose();
  };

  const totalAmount = counterPrice * volumeQtl;
  const extraGain = (counterPrice - currentOfferPrice) * volumeQtl;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div 
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-emerald-800 text-white px-5 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold font-headline leading-tight">
              {language === 'hi' ? 'अपना मोलभाव बताएं (Counter Price)' : 'Send Counter Offer'}
            </h2>
            <p className="text-emerald-100 text-xs mt-0.5">
              {buyerName}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-emerald-700/80 hover:bg-emerald-700 flex items-center justify-center text-white text-lg font-bold cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 text-sm">
            <div className="text-slate-600 font-medium">
              {language === 'hi' ? 'फसल:' : 'Crop:'} <span className="font-bold text-slate-800">{cropName}</span>
            </div>
            <div className="text-slate-600 font-medium mt-1">
              {language === 'hi' ? 'कंपनी का मौजूदा ऑफर:' : 'Current Buyer Offer:'}{' '}
              <span className="font-bold text-slate-900">₹{currentOfferPrice} / क्विंटल</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-800 mb-2 text-center">
              {language === 'hi' ? 'आप क्या भाव चाहते हैं? (₹/क्विंटल)' : 'Your Proposed Price (₹/Quintal)'}
            </label>
            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => handleAdjust(-20)}
                className="w-11 h-11 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-xl font-bold text-slate-700 flex items-center justify-center cursor-pointer active:scale-95"
              >
                -
              </button>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-slate-400 font-bold text-lg">₹</span>
                <input
                  type="number"
                  value={counterPrice}
                  onChange={(e) => setCounterPrice(Number(e.target.value))}
                  className="w-36 pl-8 pr-2 py-2 text-center text-2xl font-bold font-mono border-2 border-emerald-600 rounded-xl text-emerald-900 focus:outline-none"
                />
              </div>
              <button
                type="button"
                onClick={() => handleAdjust(20)}
                className="w-11 h-11 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-xl font-bold text-slate-700 flex items-center justify-center cursor-pointer active:scale-95"
              >
                +
              </button>
            </div>

            {/* Quick Presets */}
            <div className="flex justify-center gap-2 mt-3">
              {[+20, +50, +100].map((add) => (
                <button
                  key={add}
                  type="button"
                  onClick={() => setCounterPrice(currentOfferPrice + add)}
                  className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 cursor-pointer"
                >
                  +{add} (₹{currentOfferPrice + add})
                </button>
              ))}
            </div>
          </div>

          <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-3 text-center">
            <span className="text-xs text-slate-600">
              {language === 'hi' ? 'कुल कमाई होगी:' : 'Total Payout at this rate:'}
            </span>
            <div className="text-xl font-bold text-emerald-900 font-mono">
              ₹{totalAmount.toLocaleString('en-IN')}
            </div>
            {extraGain > 0 && (
              <span className="text-xs text-emerald-700 font-bold">
                {language === 'hi' ? `(+₹${extraGain.toLocaleString('en-IN')} अतिरिक्त फायदा)` : `(+₹${extraGain.toLocaleString('en-IN')} additional profit)`}
              </span>
            )}
          </div>
        </div>

        <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
          >
            {language === 'hi' ? 'वापस' : 'Back'}
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 active:scale-98 text-white font-bold rounded-xl text-sm shadow cursor-pointer"
          >
            {language === 'hi' ? 'ऑफर भेजें' : 'Send Counter'}
          </button>
        </div>
      </div>
    </div>
  );
};
