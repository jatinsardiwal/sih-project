import React, { useState } from 'react';
import { Language } from '../types';

interface FarmerQuickSellModalProps {
  isOpen: boolean;
  language: Language;
  onClose: () => void;
  onSubmit: (cropData: {
    cropNameEn: string;
    cropNameHi: string;
    variety: string;
    quantityQtl: number;
    expectedPrice: number;
    quality: 'Grade A (उत्तम)' | 'Grade B (मध्यम)' | 'Grade C (सामान्य)';
    imageUrl: string;
  }) => void;
}

const POPULAR_CROPS = [
  {
    nameEn: 'Sharbati Wheat',
    nameHi: 'गेहूं (शरबती)',
    variety: 'C-306 शरबती',
    category: 'grain' as const,
    defaultPrice: 2850,
    mandiPrice: 2540,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBRHt12gcnu-3C9AIGu_N7QISWVUCO-HUUFQpqPRG5JtwX8of0KlPdm2yJ7cZyB22ZsbfjVOrCYr2BsUguXOmC_5YLg2IGaXTSSftyaHs_NIpG1U6UbG9Ysp_54BY7C37GBLySAdi088k8T8PgcvzIkhI-aBXK_Vpgo_vKjLRJbc5_up1eHyinNeQxov_GkY-2u-XLy8udgsMRY2tM05ONS3oEJ789TM8FyVQNuGsBXzJY55kz3TmkOmg',
    icon: '🌾'
  },
  {
    nameEn: 'Basmati Rice',
    nameHi: 'बासमती धान',
    variety: '1121 सुपर फाइन',
    category: 'grain' as const,
    defaultPrice: 4200,
    mandiPrice: 3500,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAQGo73tzUs7c2lMxvX3dx2ozc70PG67KIxSiWHbeywe-w8qvOFMvbopphbrz-kuoVVu63mvcMRFjGzlAn4ERlxeUo8j-yEwFs1Fa8-Ubv2Cb5Gzx5fI5fdwUxyCZ0anUbaXh-ZlOxfFveoikj6wygi_pyKU-ki_Psl-H91TgKuJnhcPer87wUJaqk3flTov31Zm1WkE5AVmf075YxQ86KgsWkJr-flxBYlXRT_d2qb2UKwgHIrbPI3Hw',
    icon: '🍚'
  },
  {
    nameEn: 'Yellow Mustard',
    nameHi: 'सरसों',
    variety: 'मस्टर्ड 42% तेल',
    category: 'oilseed' as const,
    defaultPrice: 5650,
    mandiPrice: 5100,
    imageUrl: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=600&q=80',
    icon: '🟡'
  },
  {
    nameEn: 'Soybean',
    nameHi: 'सोयाबीन',
    variety: 'JS-9560',
    category: 'oilseed' as const,
    defaultPrice: 4850,
    mandiPrice: 4350,
    imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80',
    icon: '🌱'
  },
  {
    nameEn: 'Desi Chana',
    nameHi: 'चना (देसी)',
    variety: 'विशाल बोल्ड',
    category: 'pulse' as const,
    defaultPrice: 6050,
    mandiPrice: 5400,
    imageUrl: 'https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=600&q=80',
    icon: '🟤'
  },
  {
    nameEn: 'Red Onions',
    nameHi: 'लाल प्याज',
    variety: 'लासलगांव गरवा',
    category: 'vegetable' as const,
    defaultPrice: 1850,
    mandiPrice: 1550,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDYAQnt3V7uzOWqNLSnSy_naXwHDjYbn4alyB2UcqMjyDEVicNtzPdy29l6h-t016Nt2SILYgUDnRr00DFSViZz7fwKM_fK6H5cRbiiNPMipPlsNtmzlKsAeV8xfX0tR9NQQ3_QnqTp1PO_ccLpKxtXmakmYX6ecsJKqlXasXMuloQaEUOsGICxR6OQn45ywxyKm9iBly1MGMZBhZ5b1GnCYqhR-eUGlGcfqIOVV4zWQWOqU9bxJrJsNg',
    icon: '🧅'
  }
];

export const FarmerQuickSellModal: React.FC<FarmerQuickSellModalProps> = ({
  isOpen,
  language,
  onClose,
  onSubmit,
}) => {
  const [selectedCrop, setSelectedCrop] = useState(POPULAR_CROPS[0]);
  const [quantity, setQuantity] = useState<number>(50);
  const [expectedPrice, setExpectedPrice] = useState<number>(POPULAR_CROPS[0].defaultPrice);
  const [quality, setQuality] = useState<'Grade A (उत्तम)' | 'Grade B (मध्यम)' | 'Grade C (सामान्य)'>('Grade A (उत्तम)');

  if (!isOpen) return null;

  const handleSelectCrop = (crop: typeof POPULAR_CROPS[0]) => {
    setSelectedCrop(crop);
    setExpectedPrice(crop.defaultPrice);
  };

  const handleConfirm = () => {
    onSubmit({
      cropNameEn: selectedCrop.nameEn,
      cropNameHi: selectedCrop.nameHi,
      variety: selectedCrop.variety,
      quantityQtl: quantity,
      expectedPrice: expectedPrice,
      quality,
      imageUrl: selectedCrop.imageUrl,
    });
    onClose();
  };

  const totalEstimate = quantity * expectedPrice;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div 
        className="w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-emerald-800 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🌾</span>
            <div>
              <h2 className="text-lg md:text-xl font-bold font-headline leading-tight">
                {language === 'hi' ? 'अपनी फसल बेचें' : 'Sell Your Crop'}
              </h2>
              <p className="text-emerald-100 text-xs md:text-sm">
                {language === 'hi' ? '3 आसान चरणों में खरीदार को लिस्ट करें' : 'List directly to buyers in 3 easy steps'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-emerald-700/80 hover:bg-emerald-700 flex items-center justify-center text-white text-lg font-bold"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Step 1: Choose Crop */}
          <div>
            <label className="block text-sm font-bold text-slate-800 mb-2">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mr-2">1</span>
              {language === 'hi' ? 'फसल चुनें (Choose Crop):' : 'Select Crop:'}
            </label>
            <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-3">
              {POPULAR_CROPS.map((c) => {
                const isSelected = selectedCrop.nameEn === c.nameEn;
                return (
                  <button
                    key={c.nameEn}
                    type="button"
                    onClick={() => handleSelectCrop(c)}
                    className={`p-3 rounded-xl border text-left transition-all flex flex-col items-center text-center cursor-pointer ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-900 shadow-sm ring-2 ring-emerald-600/30'
                        : 'border-slate-200 hover:border-slate-300 bg-slate-50/50 text-slate-700'
                    }`}
                  >
                    <span className="text-2xl mb-1">{c.icon}</span>
                    <span className="font-bold text-xs sm:text-sm leading-tight">
                      {language === 'hi' ? c.nameHi : c.nameEn}
                    </span>
                    <span className="text-[11px] text-emerald-700 font-semibold mt-1">
                      ₹{c.defaultPrice}/Qtl
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Quantity in Quintals */}
          <div>
            <label className="block text-sm font-bold text-slate-800 mb-2">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mr-2">2</span>
              {language === 'hi' ? 'कितनी मात्रा बेचनी है? (Quantity in Quintals):' : 'Harvest Quantity (Quintals / 100 kg):'}
            </label>
            <div className="flex items-center gap-3">
              <input
                type="number"
                min="5"
                max="5000"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                className="w-36 text-center text-xl font-bold font-mono py-2.5 px-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
              <span className="text-slate-600 font-medium text-sm">
                {language === 'hi' ? 'क्विंटल (लगभग ' + (quantity * 2) + ' बोरी)' : 'Quintals (~' + (quantity * 2) + ' bags)'}
              </span>
            </div>

            {/* Quick Preset Buttons */}
            <div className="flex gap-2 mt-2">
              {[25, 50, 100, 200].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setQuantity(preset)}
                  className={`px-3 py-1 text-xs rounded-lg border font-medium cursor-pointer ${
                    quantity === preset
                      ? 'bg-emerald-700 text-white border-emerald-700'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {preset} Qtl
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Expected Price */}
          <div>
            <label className="block text-sm font-bold text-slate-800 mb-2">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mr-2">3</span>
              {language === 'hi' ? 'अपेक्षित भाव (₹ प्रति क्विंटल):' : 'Expected Price (₹ per Quintal):'}
            </label>
            <div className="flex items-center gap-3">
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-slate-500 font-bold">₹</span>
                <input
                  type="number"
                  min="500"
                  max="50000"
                  value={expectedPrice}
                  onChange={(e) => setExpectedPrice(Math.max(100, Number(e.target.value)))}
                  className="w-40 pl-8 pr-3 py-2.5 text-xl font-bold font-mono border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 text-emerald-800"
                />
              </div>
              <div className="text-xs text-slate-500 leading-snug">
                <div>{language === 'hi' ? 'आज का मंडी भाव:' : 'Today Mandi Rate:'} <span className="line-through text-slate-400">₹{selectedCrop.mandiPrice}</span></div>
                <div className="text-emerald-700 font-bold">
                  {language === 'hi' ? `+₹${expectedPrice - selectedCrop.mandiPrice} अतिरिक्त मुनाफा` : `+₹${expectedPrice - selectedCrop.mandiPrice} extra profit`}
                </div>
              </div>
            </div>
          </div>

          {/* Quality Grade */}
          <div>
            <label className="block text-sm font-bold text-slate-800 mb-2">
              {language === 'hi' ? 'गुणवत्ता / क्वालिटी (Quality):' : 'Quality Grade:'}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['Grade A (उत्तम)', 'Grade B (मध्यम)', 'Grade C (सामान्य)'] as const).map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setQuality(g)}
                  className={`py-2 px-3 text-xs font-semibold rounded-xl border text-center transition-colors ${
                    quality === g
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-800 ring-1 ring-emerald-600'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* Payout Summary Box */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center justify-between">
            <div>
              <span className="text-xs text-emerald-800 font-medium">
                {language === 'hi' ? 'कुल संभावित कमाई:' : 'Estimated Gross Payout:'}
              </span>
              <div className="text-2xl font-bold text-emerald-900 font-mono">
                ₹{totalEstimate.toLocaleString('en-IN')}
              </div>
              <span className="text-[11px] text-emerald-700">
                {language === 'hi' ? '✓ खेत से मुफ्त उठान • 0% कमीशन' : '✓ Free farm pickup • 0% commission'}
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-500">
                {quantity} Qtl × ₹{expectedPrice}
              </span>
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 text-sm font-semibold text-slate-600 hover:text-slate-800 rounded-xl transition-colors"
          >
            {language === 'hi' ? 'रद्द करें' : 'Cancel'}
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="px-6 py-3 bg-emerald-700 hover:bg-emerald-800 active:scale-[0.98] text-white font-bold rounded-xl shadow-md transition-all flex items-center gap-2 text-sm sm:text-base cursor-pointer"
          >
            <span>✅</span>
            <span>{language === 'hi' ? 'मार्केट में लिस्ट करें' : 'List My Crop Now'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
