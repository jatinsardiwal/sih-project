import React, { useState, useMemo } from 'react';
import { NavTab } from '../types';
import { COMMODITY_PRICE_MAP, APMC_MANDI_MATRIX } from '../data/mockData';

interface PriceDiscoveryScreenProps {
  onSelectTab: (tab: NavTab) => void;
  onNotify: (msg: string, type?: 'success' | 'info' | 'warning') => void;
}

export const PriceDiscoveryScreen: React.FC<PriceDiscoveryScreenProps> = ({
  onSelectTab,
  onNotify,
}) => {
  const [selectedCropKey, setSelectedCropKey] = useState<keyof typeof COMMODITY_PRICE_MAP>('wheat');
  const [isPolling, setIsPolling] = useState(false);
  const [stateFilter, setStateFilter] = useState('all');
  const [gradeFilter, setGradeFilter] = useState('all');
  const [searchMandi, setSearchMandi] = useState('');
  const [targetTriggerSet, setTargetTriggerSet] = useState(false);
  const [godownReserved, setGodownReserved] = useState(false);

  const activeCrop = COMMODITY_PRICE_MAP[selectedCropKey];

  const handlePollNodes = () => {
    setIsPolling(true);
    setTimeout(() => {
      setIsPolling(false);
      onNotify('Mandi API nodes polled: 46 northern APMC yards refreshed with real-time arrivals.', 'success');
    }, 800);
  };

  const filteredMandiRows = useMemo(() => {
    return APMC_MANDI_MATRIX.filter((row) => {
      const matchState = stateFilter === 'all' || row.state === stateFilter;
      const matchGrade = gradeFilter === 'all' || row.grade === gradeFilter;
      const matchSearch =
        searchMandi.trim() === '' ||
        row.mandiName.toLowerCase().includes(searchMandi.toLowerCase()) ||
        row.stateDistrict.toLowerCase().includes(searchMandi.toLowerCase());
      return matchState && matchGrade && matchSearch;
    });
  }, [stateFilter, gradeFilter, searchMandi]);

  const handleLockTrade = (mandiName: string, price: number) => {
    onNotify(`Trade intent locked for ${mandiName} at ₹${price}/Qtl. Transferring to Escrow tunnel...`, 'success');
    onSelectTab('transactions');
  };

  return (
    <div className="flex flex-col w-full pb-space-xl">
      <div className="w-full max-w-[1440px] mx-auto px-margin-sm md:px-margin py-space-lg flex flex-col gap-space-lg">
        {/* Top Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
          <div className="flex flex-col">
            <div className="flex items-center gap-space-xs font-label-sm text-label-sm text-tertiary uppercase tracking-wider mb-1">
              <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
              <span>e-NAM &amp; Agmarknet Ingest Node 04</span>
              <span className="text-outline-variant">•</span>
              <span className="text-on-surface-variant font-label-sm text-label-sm">Stream Latency: 240ms</span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
              Real-Time Price Discovery &amp; Mandi Telemetry
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Equitable algorithmic pricing, spot-market dispersion indices, and predictive forward market curves.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-space-sm">
            <div className="flex items-center gap-2 bg-surface-container-low px-space-md py-space-xs rounded-full shadow-xs border border-surface-container">
              <span className="material-symbols-outlined text-[18px] text-tertiary">cloud_sync</span>
              <span className="font-label-sm text-label-sm text-on-surface font-semibold">
                Live Ingest: <span className="text-tertiary">e-NAM &amp; Agmarknet Active</span>
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">| 12 mins ago</span>
            </div>
            <button
              onClick={handlePollNodes}
              className="flex items-center gap-1.5 px-space-md py-space-xs rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-md text-label-md transition-all shadow-xs cursor-pointer"
              type="button"
            >
              <span className={`material-symbols-outlined text-[16px] text-primary ${isPolling ? 'animate-spin' : ''}`}>
                autorenew
              </span>
              <span>{isPolling ? 'Polling...' : 'Poll Nodes'}</span>
            </button>
          </div>
        </div>

        {/* Crop Selector Tabs Strip */}
        <div className="relative bg-surface-container-low p-space-xs rounded-xl shadow-xs overflow-x-auto border border-surface-container">
          <div className="flex items-center gap-1.5 min-w-max">
            {[
              { key: 'wheat', name: 'Wheat (Kanak)', sub: 'Sharbati', icon: 'grain' },
              { key: 'paddy', name: 'Paddy (Basmati 1121)', sub: 'Export', icon: 'spa' },
              { key: 'mustard', name: 'Mustard Seed (Sarson)', sub: 'Bold', icon: 'filter_vintage' },
              { key: 'chana', name: 'Chana (Desi Gram)', sub: 'Desi', icon: 'lens' },
              { key: 'onion', name: 'Red Onion (Nashik)', sub: 'Garwa', icon: 'egg' },
              { key: 'tomato', name: 'Hybrid Tomato', sub: 'Abhinav', icon: 'nutrition' },
              { key: 'soybean', name: 'Soybean (Yellow)', sub: 'JS-335', icon: 'eco' },
            ].map((c) => (
              <button
                key={c.key}
                onClick={() => {
                  setSelectedCropKey(c.key as keyof typeof COMMODITY_PRICE_MAP);
                  onNotify(`Telemetry switched to ${c.name}`, 'info');
                }}
                className={`px-space-md py-2.5 rounded-lg font-label-lg text-label-lg flex items-center gap-2 transition-all cursor-pointer ${
                  selectedCropKey === c.key
                    ? 'bg-surface-container-lowest text-on-surface shadow-xs font-bold border border-surface-container'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                }`}
                type="button"
              >
                <span className={`material-symbols-outlined text-[18px] ${selectedCropKey === c.key ? 'text-primary' : ''}`}>
                  {c.icon}
                </span>
                <span>{c.name}</span>
                <span className="px-1.5 py-0.5 rounded bg-surface-container text-[10px] font-label-sm text-on-surface-variant">
                  {c.sub}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Main 12-Col Dashboard Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-space-lg">
          {/* Left Column (8 cols): Metrics, Decomposition & Forward Forecast Chart */}
          <div className="xl:col-span-8 flex flex-col gap-space-lg">
            {/* Top 3 Cards Bento */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
              {/* Card 1: Mandi Modal */}
              <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-xs border border-surface-container flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-semibold">
                      Mandi Modal Rate
                    </span>
                    <span className="material-symbols-outlined text-[18px] text-outline">storefront</span>
                  </div>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="font-headline-lg text-headline-lg text-on-surface font-bold">
                      ₹{activeCrop.mandiModal.toLocaleString('en-IN')}
                    </span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">/ Qtl</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Weighted median across 46 northern APMC yards.
                  </p>
                </div>
                <div className="mt-4 pt-3 flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm bg-surface-container-low px-2 py-1 rounded border border-surface-container">
                  <span>MSP Benchmark</span>
                  <span className="font-semibold text-on-surface">
                    ₹{activeCrop.msp.toLocaleString('en-IN')}/Qtl (+₹{activeCrop.mandiModal - activeCrop.msp})
                  </span>
                </div>
              </div>

              {/* Card 2: AI Fair Price */}
              <div className="bg-primary p-space-md rounded-xl shadow-md text-on-primary flex flex-col justify-between relative overflow-hidden">
                <div className="absolute -right-4 -bottom-4 w-24 h-24 rounded-full bg-primary-fixed-dim/20 blur-xl"></div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-label-sm text-label-sm text-on-primary-container uppercase font-semibold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-tertiary-fixed animate-ping"></span>
                      AI Fair Price
                    </span>
                    <span className="material-symbols-outlined text-[20px] text-tertiary-fixed">verified</span>
                  </div>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="font-headline-lg text-headline-lg text-on-primary font-bold">
                      ₹{activeCrop.faslynkFair.toLocaleString('en-IN')}
                    </span>
                    <span className="font-label-sm text-label-sm text-on-primary-container">/ Qtl</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-primary-container">
                    Dynamic real-time algorithmic valuation based on telemetry.
                  </p>
                </div>
                <div className="mt-4 pt-3 flex items-center justify-between font-label-sm text-label-sm bg-primary-container px-2 py-1.5 rounded text-on-primary">
                  <span className="font-semibold">Gain over Intermediaries</span>
                  <span className="font-headline-sm text-headline-sm text-tertiary-fixed font-bold">
                    +{(
                      ((activeCrop.faslynkFair - activeCrop.mandiModal) / activeCrop.mandiModal) *
                      100
                    ).toFixed(1)}
                    %
                  </span>
                </div>
              </div>

              {/* Card 3: Highest Active Bid */}
              <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-xs border border-surface-container flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-label-sm text-label-sm text-secondary uppercase font-semibold">
                      Highest Active Bid
                    </span>
                    <span className="material-symbols-outlined text-[18px] text-secondary">gavel</span>
                  </div>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="font-headline-lg text-headline-lg text-on-surface font-bold">
                      ₹{activeCrop.highestBid.toLocaleString('en-IN')}
                    </span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">/ Qtl</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant font-medium">
                    {activeCrop.bidder}
                  </p>
                </div>
                <div className="mt-4 pt-3 flex items-center justify-between font-label-sm text-label-sm bg-secondary-fixed/20 px-2 py-1 rounded text-on-secondary-fixed border border-secondary-fixed/40">
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                    Escrow Pre-Funded
                  </span>
                  <span className="font-semibold">Lot: {activeCrop.bidVolume}</span>
                </div>
              </div>
            </div>

            {/* AI Fair Price Structural Decomposition */}
            <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-xs border border-surface-container">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm mb-space-md">
                <div>
                  <h2 className="font-headline-sm text-headline-sm text-on-surface">
                    AI Fair Price Structural Decomposition
                  </h2>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Explainable machine-learning weighting factors vs local mandi base price (₹{activeCrop.mandiModal.toLocaleString('en-IN')}).
                  </p>
                </div>
                <span className="font-label-sm text-label-sm text-primary px-3 py-1 bg-surface-container rounded-full font-semibold self-start sm:self-center">
                  Model v2.4 (99.2% Conf.)
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
                <div className="p-space-md rounded-lg bg-surface-container-low flex flex-col justify-between border border-surface-container">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 rounded bg-tertiary-fixed text-on-tertiary-fixed">
                      <span className="material-symbols-outlined text-[18px]">humidity_mid</span>
                    </div>
                    <div>
                      <h3 className="font-label-md text-label-md text-on-surface font-semibold">Moisture Credit</h3>
                      <span className="font-label-sm text-label-sm text-tertiary font-bold">+₹120 / Qtl</span>
                    </div>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mb-3">
                    10.4% moisture measured via optical lot probe (Standard baseline: 12.0%). Low spoilage probability.
                  </p>
                  <div className="w-full bg-surface-container-highest h-1.5 rounded-full overflow-hidden">
                    <div className="bg-tertiary h-full w-[85%] rounded-full"></div>
                  </div>
                </div>

                <div className="p-space-md rounded-lg bg-surface-container-low flex flex-col justify-between border border-surface-container">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 rounded bg-secondary-fixed text-on-secondary-fixed">
                      <span className="material-symbols-outlined text-[18px]">near_me</span>
                    </div>
                    <div>
                      <h3 className="font-label-md text-label-md text-on-surface font-semibold">Distance Logistics Parity</h3>
                      <span className="font-label-sm text-label-sm text-secondary font-bold">+₹80 / Qtl</span>
                    </div>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mb-3">
                    Hub situated within 28km of Eastern Dedicated Freight Corridor depot, eliminating transit overhead.
                  </p>
                  <div className="w-full bg-surface-container-highest h-1.5 rounded-full overflow-hidden">
                    <div className="bg-secondary-container h-full w-[65%] rounded-full"></div>
                  </div>
                </div>

                <div className="p-space-md rounded-lg bg-surface-container-low flex flex-col justify-between border border-surface-container">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 rounded bg-primary-fixed text-on-primary-fixed">
                      <span className="material-symbols-outlined text-[18px]">hub</span>
                    </div>
                    <div>
                      <h3 className="font-label-md text-label-md text-on-surface font-semibold">Direct Aggregation Bonus</h3>
                      <span className="font-label-sm text-label-sm text-primary font-bold">+₹120 / Qtl</span>
                    </div>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mb-3">
                    Elimination of 3 intermediary commission layers (Arhtiya cut 2.5% + loading splits saved directly).
                  </p>
                  <div className="w-full bg-surface-container-highest h-1.5 rounded-full overflow-hidden">
                    <div className="bg-primary h-full w-[92%] rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* 6-Month Price Trajectory & 30-Day Forward Forecast */}
            <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-xs border border-surface-container">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-md mb-space-lg">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="font-headline-sm text-headline-sm text-on-surface">
                      6-Month Price Trajectory &amp; 30-Day Forward Forecast
                    </h2>
                    <span className="px-2 py-0.5 rounded bg-primary-container text-on-primary-container font-label-sm text-label-sm font-semibold">
                      AI Predictive
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Realized APMC wholesale price trajectory coupled with seasonal arrivals econometric projection.
                  </p>
                </div>
                <div className="flex items-center gap-space-sm font-label-sm text-label-sm">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-1 bg-primary rounded-full"></span>
                    <span className="text-on-surface-variant">Historical Realized</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-0.5 border-t-2 border-dashed border-tertiary"></span>
                    <span className="text-tertiary font-semibold">30-Day Forecast</span>
                  </div>
                </div>
              </div>

              {/* Responsive SVG Chart */}
              <div className="w-full h-72 relative">
                <svg className="w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 800 240">
                  <defs>
                    <linearGradient id="chartGradient" x1="0%" x2="0%" y1="0%" y2="100%">
                      <stop offset="0%" stopColor="#00652c" stopOpacity="0.18"></stop>
                      <stop offset="100%" stopColor="#00652c" stopOpacity="0.0"></stop>
                    </linearGradient>
                    <linearGradient id="forecastGradient" x1="0%" x2="0%" y1="0%" y2="100%">
                      <stop offset="0%" stopColor="#4ae176" stopOpacity="0.22"></stop>
                      <stop offset="100%" stopColor="#4ae176" stopOpacity="0.0"></stop>
                    </linearGradient>
                  </defs>

                  <line stroke="#dae2fd" strokeDasharray="4 4" strokeWidth="1" x1="40" x2="780" y1="30" y2="30"></line>
                  <line stroke="#dae2fd" strokeDasharray="4 4" strokeWidth="1" x1="40" x2="780" y1="80" y2="80"></line>
                  <line stroke="#dae2fd" strokeDasharray="4 4" strokeWidth="1" x1="40" x2="780" y1="130" y2="130"></line>
                  <line stroke="#dae2fd" strokeDasharray="4 4" strokeWidth="1" x1="40" x2="780" y1="180" y2="180"></line>

                  <text fill="#3f493f" fontFamily="JetBrains Mono" fontSize="10" textAnchor="end" x="35" y="34">₹3,000</text>
                  <text fill="#3f493f" fontFamily="JetBrains Mono" fontSize="10" textAnchor="end" x="35" y="84">₹2,700</text>
                  <text fill="#3f493f" fontFamily="JetBrains Mono" fontSize="10" textAnchor="end" x="35" y="134">₹2,400</text>
                  <text fill="#3f493f" fontFamily="JetBrains Mono" fontSize="10" textAnchor="end" x="35" y="184">₹2,100</text>

                  <path d="M 50 160 L 150 145 L 250 155 L 350 120 L 450 110 L 550 78 L 550 200 L 50 200 Z" fill="url(#chartGradient)"></path>
                  <path d="M 50 160 Q 100 152 150 145 T 250 155 T 350 120 T 450 110 T 550 78" fill="none" stroke="#00652c" strokeLinecap="round" strokeWidth="3"></path>
                  <path d="M 550 78 L 620 62 L 700 48 L 760 38 L 760 200 L 550 200 Z" fill="url(#forecastGradient)"></path>
                  <path d="M 550 78 Q 585 70 620 62 T 700 48 T 760 38" fill="none" stroke="#008138" strokeDasharray="6 6" strokeLinecap="round" strokeWidth="3"></path>

                  <circle cx="50" cy="160" fill="#ffffff" r="4" stroke="#00652c" strokeWidth="2"></circle>
                  <circle cx="150" cy="145" fill="#ffffff" r="4" stroke="#00652c" strokeWidth="2"></circle>
                  <circle cx="250" cy="155" fill="#ffffff" r="4" stroke="#00652c" strokeWidth="2"></circle>
                  <circle cx="350" cy="120" fill="#ffffff" r="4" stroke="#00652c" strokeWidth="2"></circle>
                  <circle cx="450" cy="110" fill="#ffffff" r="4" stroke="#00652c" strokeWidth="2"></circle>
                  <circle cx="550" cy="78" fill="#00652c" r="6" stroke="#ffffff" strokeWidth="2"></circle>
                  <circle cx="760" cy="38" fill="#4ae176" r="5" stroke="#00652c" strokeWidth="2"></circle>

                  <line stroke="#00652c" strokeOpacity="0.3" strokeWidth="1.5" x1="550" x2="550" y1="20" y2="200"></line>
                  <rect fill="#131b2e" height="18" rx="4" width="100" x="500" y="8"></rect>
                  <text fill="#ffffff" fontFamily="JetBrains Mono" fontSize="9" fontWeight="600" textAnchor="middle" x="550" y="21">
                    TODAY: ₹{activeCrop.faslynkFair}
                  </text>

                  <rect fill="#00652c" height="18" rx="4" width="80" x="705" y="10"></rect>
                  <text fill="#d5ffd5" fontFamily="JetBrains Mono" fontSize="9" fontWeight="600" textAnchor="middle" x="745" y="22">
                    DAY +30: ₹2,930
                  </text>

                  <text fill="#3f493f" fontFamily="JetBrains Mono" fontSize="11" textAnchor="middle" x="50" y="220">May</text>
                  <text fill="#3f493f" fontFamily="JetBrains Mono" fontSize="11" textAnchor="middle" x="150" y="220">Jun</text>
                  <text fill="#3f493f" fontFamily="JetBrains Mono" fontSize="11" textAnchor="middle" x="250" y="220">Jul</text>
                  <text fill="#3f493f" fontFamily="JetBrains Mono" fontSize="11" textAnchor="middle" x="350" y="220">Aug</text>
                  <text fill="#3f493f" fontFamily="JetBrains Mono" fontSize="11" textAnchor="middle" x="450" y="220">Sep</text>
                  <text fill="#00652c" fontFamily="JetBrains Mono" fontSize="11" fontWeight="700" textAnchor="middle" x="550" y="220">Oct (Now)</text>
                  <text fill="#008138" fontFamily="JetBrains Mono" fontSize="11" fontWeight="600" textAnchor="middle" x="655" y="220">Nov (Proj.)</text>
                  <text fill="#008138" fontFamily="JetBrains Mono" fontSize="11" fontWeight="600" textAnchor="middle" x="760" y="220">Dec (Proj.)</text>
                </svg>
              </div>

              {/* 4-Metric Strip */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-space-md mt-space-md pt-space-md bg-surface-container-low p-space-md rounded-xl border border-surface-container">
                <div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant block uppercase">Rainfall Telemetry</span>
                  <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">{activeCrop.rainfall}</span>
                  <p className="font-body-sm text-body-sm text-on-surface-variant text-[12px]">North-Western Wheat Belt</p>
                </div>
                <div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant block uppercase">Arrival Volume</span>
                  <span className="font-headline-sm text-headline-sm text-secondary font-semibold">{activeCrop.arrivals}</span>
                  <p className="font-body-sm text-body-sm text-on-surface-variant text-[12px]">Peak harvest wave passing</p>
                </div>
                <div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant block uppercase">Export Parity</span>
                  <span className="font-headline-sm text-headline-sm text-primary font-semibold">{activeCrop.exportParity}</span>
                  <p className="font-body-sm text-body-sm text-on-surface-variant text-[12px]">Port Kandla active loading</p>
                </div>
                <div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant block uppercase">Forecast Confidence</span>
                  <span className="font-headline-sm text-headline-sm text-tertiary font-semibold">{activeCrop.confidence}</span>
                  <p className="font-body-sm text-body-sm text-on-surface-variant text-[12px]">Monte Carlo 50k runs</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (4 cols): AI Sell Advisory, Field Quality Telemetry & Demand Depth */}
          <div className="xl:col-span-4 flex flex-col gap-space-lg">
            {/* AI Sell Advisory Bento */}
            <div className="bg-gradient-to-br from-surface-container-lowest to-surface-container-low p-space-lg rounded-xl shadow-md border border-surface-container flex flex-col gap-space-md relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-bold flex items-center gap-1.5 shadow-xs">
                  <span className="material-symbols-outlined text-[16px]">psychology</span>
                  <span>AI SELL ADVISORY</span>
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">Kisan Copilot</span>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-[26px]">front_hand</span>
                  <h2 className="font-headline-md text-headline-md text-on-surface">RECOMMENDATION: HOLD</h2>
                </div>
                <p className="font-body-md text-body-md text-on-surface font-semibold">Recommended hold horizon: 7 – 10 Days</p>
              </div>

              <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-xs border border-surface-container">
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  Predicted supply tightening across Haryana &amp; Western UP spot terminals will likely yield an additional{' '}
                  <strong className="text-primary font-bold">+₹60 to ₹90 per Quintal</strong> in net realizations over local mandi spot auctions.
                </p>
                <div className="mt-space-sm pt-space-xs flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm border-t border-surface-container">
                  <span>Carrying Cost Buffer: <strong className="text-on-surface font-mono">₹14/Qtl</strong></span>
                  <span>Net Benefit Index: <strong className="text-tertiary font-bold">+3.2x</strong></span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between font-label-sm text-label-sm text-on-surface-variant">
                  <span>Warehouse Stock Holding Risk</span>
                  <span className="text-tertiary font-semibold">Low (Clean Storage Assured)</span>
                </div>
                <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden">
                  <div className="bg-tertiary h-full w-[24%] rounded-full"></div>
                </div>
              </div>

              <div className="flex flex-col gap-space-xs mt-2">
                <button
                  onClick={() => {
                    setTargetTriggerSet(!targetTriggerSet);
                    onNotify(
                      targetTriggerSet
                        ? 'Target price trigger cancelled'
                        : 'Target price alert set at ₹2,900/Qtl! SMS alert will ping on crossing.',
                      'success'
                    );
                  }}
                  className={`w-full h-12 rounded-lg font-body-md text-body-md font-semibold transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer ${
                    targetTriggerSet
                      ? 'bg-tertiary-container text-on-tertiary-container'
                      : 'bg-primary hover:bg-tertiary text-on-primary'
                  }`}
                  type="button"
                >
                  <span className="material-symbols-outlined text-[20px]">notifications_active</span>
                  <span>{targetTriggerSet ? '✓ Target Alert Active (₹2,900)' : 'Set Target Price Trigger (₹2,900)'}</span>
                </button>

                <button
                  onClick={() => {
                    setGodownReserved(!godownReserved);
                    onNotify(
                      godownReserved
                        ? 'Godown slot unreserved'
                        : 'Subsidized WDRA Godown (Punjab Sector 4) reserved for 14 days.',
                      'info'
                    );
                  }}
                  className="w-full h-10 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[16px]">warehouse</span>
                  <span>{godownReserved ? '✓ Godown Slot Reserved' : 'Reserve Subsidized WDRA Godown (Punjab)'}</span>
                </button>
              </div>
            </div>

            {/* Field Quality Telemetry */}
            <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-xs border border-surface-container flex flex-col gap-space-sm">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-label-lg text-label-lg text-on-surface font-semibold">Field Quality Telemetry</h3>
                <span className="font-label-sm text-label-sm text-tertiary font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
                  Sensor Linked
                </span>
              </div>
              <div className="relative h-44 rounded-xl overflow-hidden shadow-xs border border-surface-container">
                <img
                  className="w-full h-full object-cover"
                  alt="Wheat grains inspected under crosshairs"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZsCxT2TFTQSxHfEh7O16w3HUwAqxtOv97qZwtSU0JC21QEeeVTvnlp7n4KAU-pmpWbdfnejuqYVHXthZVfVWhQQbSHXzVCEnbEmi6QBvLFHsfiMH99nPO-o1YoC3--1fy7V39zZyzuwQMiR_pVof8voKFabdX0o0_ml2BLobKl8x7lcPckoB0Al_CB8lMF1tOeyMwUGz6NEGUrk1uh5KWoROcclU4nZzd7Pl1oTdsDPnx1Ln_CTNhKQ"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-on-background/80 via-transparent to-transparent flex items-end p-space-md">
                  <div className="flex items-center justify-between w-full text-white">
                    <span className="font-label-md text-label-md font-semibold">Sample Lot #PB-KHN-8841</span>
                    <span className="px-2 py-0.5 rounded bg-tertiary-container text-on-tertiary font-label-sm text-label-sm font-bold">
                      Grade A Certified
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-space-xs mt-1 font-label-sm text-label-sm">
                <div className="p-2 rounded bg-surface-container-low flex flex-col border border-surface-container">
                  <span className="text-on-surface-variant">Foreign Matter</span>
                  <span className="font-semibold text-on-surface">0.42% <span className="text-tertiary">(Optimal)</span></span>
                </div>
                <div className="p-2 rounded bg-surface-container-low flex flex-col border border-surface-container">
                  <span className="text-on-surface-variant">Gluten Index</span>
                  <span className="font-semibold text-on-surface">28.4% <span className="text-primary">(Premium)</span></span>
                </div>
                <div className="p-2 rounded bg-surface-container-low flex flex-col border border-surface-container">
                  <span className="text-on-surface-variant">Test Weight</span>
                  <span className="font-semibold text-on-surface">78.2 kg/hL</span>
                </div>
                <div className="p-2 rounded bg-surface-container-low flex flex-col border border-surface-container">
                  <span className="text-on-surface-variant">Damage Grains</span>
                  <span className="font-semibold text-on-surface">&lt; 0.5%</span>
                </div>
              </div>
            </div>

            {/* Live Institutional Demand Depth */}
            <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-xs border border-surface-container flex flex-col gap-space-sm">
              <div className="flex items-center justify-between">
                <h3 className="font-label-lg text-label-lg text-on-surface font-semibold">Live Institutional Demand Depth</h3>
                <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-surface-container-low border border-surface-container">
                  <div className="flex flex-col">
                    <span className="font-body-sm text-body-sm text-on-surface font-semibold">Flour Mills Consortium</span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">Req: 2,400 Qtl • Delhi NCR</span>
                  </div>
                  <div className="text-right">
                    <span className="font-label-lg text-label-lg text-primary font-bold">₹2,890</span>
                    <span className="block font-label-sm text-label-sm text-tertiary">Verified RFP</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-lg bg-surface-container-low border border-surface-container">
                  <div className="flex flex-col">
                    <span className="font-body-sm text-body-sm text-on-surface font-semibold">Adani Agri Logistics Hub</span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">Req: 8,000 Qtl • Moga Terminal</span>
                  </div>
                  <div className="text-right">
                    <span className="font-label-lg text-label-lg text-on-surface font-bold">₹2,860</span>
                    <span className="block font-label-sm text-label-sm text-on-surface-variant">Immediate Escrow</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-lg bg-surface-container-low border border-surface-container">
                  <div className="flex flex-col">
                    <span className="font-body-sm text-body-sm text-on-surface font-semibold">ITC Choupal Sagar</span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">Req: 1,500 Qtl • Khanna Yard</span>
                  </div>
                  <div className="text-right">
                    <span className="font-label-lg text-label-lg text-on-surface font-bold">₹2,835</span>
                    <span className="block font-label-sm text-label-sm text-on-surface-variant">Direct Gate Loading</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pan-India State APMC Mandi Price Matrix */}
        <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-xs border border-surface-container flex flex-col gap-space-md">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="font-headline-sm text-headline-sm text-on-surface">Pan-India State APMC Mandi Price Matrix</h2>
                <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-label-sm text-label-sm">
                  {filteredMandiRows.length} Mandis Filtered
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Real-time daily modal benchmark across major producing states, arrival flows, and procurement spread.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-space-xs">
              <div className="flex items-center gap-1.5 bg-surface-container-low px-space-sm py-1.5 rounded-lg border border-surface-container">
                <span className="material-symbols-outlined text-[16px] text-on-surface-variant">filter_alt</span>
                <select
                  value={stateFilter}
                  onChange={(e) => setStateFilter(e.target.value)}
                  className="bg-transparent font-label-sm text-label-sm text-on-surface outline-none cursor-pointer"
                >
                  <option value="all">All States (Pan-India)</option>
                  <option value="punjab">Punjab</option>
                  <option value="haryana">Haryana</option>
                  <option value="mp">Madhya Pradesh</option>
                  <option value="rajasthan">Rajasthan</option>
                </select>
              </div>

              <div className="flex items-center gap-1.5 bg-surface-container-low px-space-sm py-1.5 rounded-lg border border-surface-container">
                <span className="material-symbols-outlined text-[16px] text-on-surface-variant">verified</span>
                <select
                  value={gradeFilter}
                  onChange={(e) => setGradeFilter(e.target.value)}
                  className="bg-transparent font-label-sm text-label-sm text-on-surface outline-none cursor-pointer"
                >
                  <option value="all">All Grades</option>
                  <option value="A">Grade A (FAQ)</option>
                  <option value="B">Grade B (Fair)</option>
                </select>
              </div>

              <div className="flex items-center gap-1.5 bg-surface-container-low px-space-sm py-1.5 rounded-lg border border-surface-container">
                <span className="material-symbols-outlined text-[16px] text-on-surface-variant">search</span>
                <input
                  type="text"
                  value={searchMandi}
                  onChange={(e) => setSearchMandi(e.target.value)}
                  placeholder="Search Mandi..."
                  className="bg-transparent font-label-sm text-label-sm text-on-surface outline-none w-28 md:w-36"
                />
              </div>
            </div>
          </div>

          <div className="w-full overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
                  <th className="py-3 px-space-md rounded-l-lg">Mandi / Terminal</th>
                  <th className="py-3 px-space-md">State &amp; District</th>
                  <th className="py-3 px-space-md">Grade Spec</th>
                  <th className="py-3 px-space-md text-right">Daily Arrivals</th>
                  <th className="py-3 px-space-md text-right">Mandi Modal Rate</th>
                  <th className="py-3 px-space-md text-right">FASLYNK AI Calculated</th>
                  <th className="py-3 px-space-md text-right">Farmer Direct Spread</th>
                  <th className="py-3 px-space-md text-center rounded-r-lg">Action</th>
                </tr>
              </thead>
              <tbody className="font-body-sm text-body-sm text-on-surface">
                {filteredMandiRows.map((row) => (
                  <tr key={row.id} className="hover:bg-surface-container-low/60 transition-colors border-b border-surface-container/60">
                    <td className="py-3.5 px-space-md font-semibold flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px] text-primary">location_on</span>
                      <span>{row.mandiName}</span>
                      {row.badge && (
                        <span className="px-1.5 py-0.2 rounded bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-[10px] font-bold">
                          {row.badge}
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-space-md text-on-surface-variant">{row.stateDistrict}</td>
                    <td className="py-3.5 px-space-md">
                      <span className="px-2 py-0.5 rounded bg-surface-container-highest text-primary font-label-sm text-label-sm font-semibold">
                        {row.gradeLabel}
                      </span>
                    </td>
                    <td className="py-3.5 px-space-md text-right font-label-md text-label-md">
                      {row.dailyArrivalsQtl.toLocaleString('en-IN')} Qtl
                    </td>
                    <td className="py-3.5 px-space-md text-right font-label-lg text-label-lg font-bold">
                      ₹{row.mandiModalRate.toLocaleString('en-IN')}
                      <span className="text-[11px] font-normal text-on-surface-variant">/Qtl</span>
                    </td>
                    <td className="py-3.5 px-space-md text-right font-label-lg text-label-lg text-primary font-bold">
                      ₹{row.faslynkPrice.toLocaleString('en-IN')}
                      <span className="text-[11px] font-normal text-on-surface-variant">/Qtl</span>
                    </td>
                    <td className="py-3.5 px-space-md text-right">
                      <span className="px-2 py-1 rounded bg-surface-container font-label-sm text-label-sm text-tertiary font-bold">
                        +₹{row.spreadInr} (+{row.spreadPct}%)
                      </span>
                    </td>
                    <td className="py-3.5 px-space-md text-center">
                      <button
                        onClick={() => handleLockTrade(row.mandiName, row.faslynkPrice)}
                        className="px-space-sm py-1 rounded bg-primary-container text-on-primary-container hover:bg-primary hover:text-on-primary transition-colors font-label-sm text-label-sm font-semibold shadow-xs cursor-pointer"
                        type="button"
                      >
                        Lock Trade
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-space-sm pt-space-xs text-on-surface-variant font-label-sm text-label-sm">
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-tertiary">check_circle</span>
              <span>e-NAM interoperable settlement ledger audited by NABARD Agri-Node</span>
            </span>
            <div className="flex items-center gap-2">
              <span>Showing {filteredMandiRows.length} active major APMC gateways</span>
              <button
                onClick={() => onNotify('Exported APMC Mandi price matrix as CSV.', 'info')}
                className="text-primary hover:underline font-semibold ml-2 cursor-pointer"
                type="button"
              >
                Export CSV
              </button>
            </div>
          </div>
        </div>

        {/* 3 Pillars Footer Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
          <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-xs border border-surface-container flex items-start gap-space-sm">
            <div className="p-3 rounded-lg bg-primary-container text-on-primary-container">
              <span className="material-symbols-outlined text-[24px]">balance</span>
            </div>
            <div>
              <h3 className="font-label-lg text-label-lg text-on-surface font-semibold mb-1">
                Government MSP Guarantee
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                FASLYNK automated smart contracts reject any buyer inquiry bidding under the national minimum support price floor.
              </p>
            </div>
          </div>

          <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-xs border border-surface-container flex items-start gap-space-sm">
            <div className="p-3 rounded-lg bg-surface-container-high text-on-surface">
              <span className="material-symbols-outlined text-[24px]">lock</span>
            </div>
            <div>
              <h3 className="font-label-lg text-label-lg text-on-surface font-semibold mb-1">
                Instant T+0 Escrow Clearing
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Buyer funds are pre-locked in RBI-approved escrow prior to dispatch. Zero counterparty payment default risk for producers.
              </p>
            </div>
          </div>

          <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-xs border border-surface-container flex items-start gap-space-sm">
            <div className="p-3 rounded-lg bg-secondary-fixed text-on-secondary-fixed">
              <span className="material-symbols-outlined text-[24px]">local_shipping</span>
            </div>
            <div>
              <h3 className="font-label-lg text-label-lg text-on-surface font-semibold mb-1">
                Aggregated FPO Dispatch
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Group your lot with nearby village clusters to unlock bulk rail cargo tariffs, saving an average of ₹42/Quintal on transport.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
