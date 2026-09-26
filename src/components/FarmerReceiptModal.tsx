import React from 'react';
import { ActiveDealTracker, Language } from '../types';

interface FarmerReceiptModalProps {
  isOpen: boolean;
  deal: ActiveDealTracker;
  language: Language;
  onClose: () => void;
}

export const FarmerReceiptModal: React.FC<FarmerReceiptModalProps> = ({
  isOpen,
  deal,
  language,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div 
        className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-emerald-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">📄</span>
            <div>
              <h2 className="text-lg font-bold font-headline leading-tight">
                {language === 'hi' ? 'डिजिटल बिक्री रसीद (Bill of Supply)' : 'Digital Farmgate Bill of Supply'}
              </h2>
              <p className="text-emerald-200 text-xs font-mono">
                रसीद सं. #{deal.dealId}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-emerald-800 hover:bg-emerald-700 flex items-center justify-center text-white text-lg font-bold cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-5 text-sm">
          {/* Header Info */}
          <div className="flex justify-between border-b border-slate-200 pb-3">
            <div>
              <span className="text-xs text-slate-500">{language === 'hi' ? 'किसान (विक्रेता):' : 'Farmer (Seller):'}</span>
              <div className="font-bold text-slate-800">रामेश पटेल (Ramesh Patel)</div>
              <div className="text-xs text-slate-600">सीहोर / हरदा, मध्य प्रदेश</div>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-500">{language === 'hi' ? 'खरीदार (कंपनी):' : 'Buyer (Company):'}</span>
              <div className="font-bold text-slate-800">{deal.buyerName}</div>
              <div className="text-xs text-emerald-700 font-semibold">सत्यापित संस्थागत खरीदार ✓</div>
            </div>
          </div>

          {/* Line Item Table */}
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <div className="bg-slate-100 px-4 py-2 font-bold text-xs text-slate-700 grid grid-cols-4">
              <span>{language === 'hi' ? 'फसल' : 'Crop'}</span>
              <span className="text-center">{language === 'hi' ? 'मात्रा' : 'Qty'}</span>
              <span className="text-right">{language === 'hi' ? 'दर (प्रति Qtl)' : 'Rate'}</span>
              <span className="text-right">{language === 'hi' ? 'कुल राशि' : 'Total'}</span>
            </div>
            <div className="px-4 py-3 text-slate-800 grid grid-cols-4 items-center border-t border-slate-200">
              <span className="font-medium text-xs sm:text-sm">
                {language === 'hi' ? deal.cropNameHi : deal.cropNameEn}
              </span>
              <span className="text-center font-mono">{deal.quantityQtl} Qtl</span>
              <span className="text-right font-mono">₹{deal.ratePerQtl}</span>
              <span className="text-right font-bold font-mono text-emerald-800">
                ₹{deal.totalAmount.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* Breakdown & Zero Brokerage Note */}
          <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200 space-y-2 text-xs">
            <div className="flex justify-between text-slate-700">
              <span>{language === 'hi' ? 'फसल मूल्य:' : 'Gross Produce Value:'}</span>
              <span className="font-mono font-semibold">₹{deal.totalAmount.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-emerald-800">
              <span>{language === 'hi' ? 'दलाली / कमीशन शुल्क (Mandi Tax & Arhatiya):' : 'Brokerage & Commission:'}</span>
              <span className="font-mono font-bold">₹0.00 (शून्य दलाली)</span>
            </div>
            <div className="flex justify-between text-emerald-800">
              <span>{language === 'hi' ? 'खेत से लोडिंग और गाड़ी भाड़ा (Freight & Loading):' : 'Loading & Freight:'}</span>
              <span className="font-mono font-bold">खरीदार द्वारा भुगतान (फ्री)</span>
            </div>
            <div className="border-t border-emerald-300 pt-2 flex justify-between text-sm font-bold text-emerald-950">
              <span>{language === 'hi' ? 'किसान को शुद्ध देय राशि:' : 'Net Direct Payout to Farmer:'}</span>
              <span className="text-base text-emerald-800 font-mono">₹{deal.totalAmount.toLocaleString('en-IN')}</span>
            </div>
          </div>

          {/* Bank Transfer Details */}
          <div className="border border-slate-200 rounded-xl p-3.5 space-y-1.5 text-xs text-slate-700">
            <div className="font-bold text-slate-900 text-sm mb-1">
              🏦 {language === 'hi' ? 'बैंक खाता विवरण (Direct Bank Credit):' : 'Bank Account Details:'}
            </div>
            <div className="flex justify-between">
              <span>{language === 'hi' ? 'बैंक का नाम:' : 'Bank Name:'}</span>
              <span className="font-semibold text-slate-800">{deal.bankName}</span>
            </div>
            <div className="flex justify-between">
              <span>{language === 'hi' ? 'खाता संख्या:' : 'Account Number:'}</span>
              <span className="font-mono font-semibold text-slate-800">{deal.bankAccount}</span>
            </div>
            <div className="flex justify-between">
              <span>{language === 'hi' ? 'भुगतान सुरक्षा:' : 'Payment Security:'}</span>
              <span className="text-emerald-700 font-semibold">100% एस्क्रो बैंक गारंटी (सुरक्षित)</span>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-white border border-slate-300 hover:bg-slate-100 rounded-xl font-semibold text-xs text-slate-700 flex items-center gap-1.5 cursor-pointer"
          >
            <span>🖨️</span>
            <span>{language === 'hi' ? 'प्रिंट / सेव करें' : 'Print / Save PDF'}</span>
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs sm:text-sm cursor-pointer shadow"
          >
            {language === 'hi' ? 'बंद करें' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
