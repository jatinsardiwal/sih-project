import React, { useState } from 'react';
import { BuyerMatch, NegotiationEntry, NavTab } from '../types';
import { BUYER_MATCHES, INITIAL_NEGOTIATION_TABLE } from '../data/mockData';

interface SmartMatchScreenProps {
  onOpenAddModal: () => void;
  onOpenCounterModal: (buyerName: string, currentPrice: number, volumeQtl: number) => void;
  onSelectTab: (tab: NavTab) => void;
  onNotify: (msg: string, type?: 'success' | 'info' | 'warning') => void;
  negotiationLedger: NegotiationEntry[];
  onAcceptDeal: (buyerName: string, price: number, volume: number) => void;
  isDealAccepted: boolean;
}

export const SmartMatchScreen: React.FC<SmartMatchScreenProps> = ({
  onOpenAddModal,
  onOpenCounterModal,
  onSelectTab,
  onNotify,
  negotiationLedger,
  onAcceptDeal,
  isDealAccepted,
}) => {
  const [isRefreshingWeights, setIsRefreshingWeights] = useState(false);
  const [sortBy, setSortBy] = useState('match');

  const handleRefresh = () => {
    setIsRefreshingWeights(true);
    setTimeout(() => {
      setIsRefreshingWeights(false);
      onNotify('Neural Match engine weights calibrated with latest 14:00 Mandi auction data.', 'success');
    }, 700);
  };

  const handleAggregateFPO = () => {
    onNotify('Tender aggregation request submitted to Malwa KPO #204. Peer bundling active!', 'success');
    onSelectTab('produce-management-and-fpo');
  };

  const sortedMatches = [...BUYER_MATCHES].sort((a, b) => {
    if (sortBy === 'price') return b.offeredPrice - a.offeredPrice;
    if (sortBy === 'distance') return a.distanceKm - b.distanceKm;
    return b.matchScore - a.matchScore;
  });

  return (
    <div className="flex flex-col w-full pb-space-xl">
      <div className="w-full max-w-[1440px] mx-auto px-margin-sm md:px-margin space-y-space-lg mb-space-xl pt-space-md">
        {/* Top Notification Banner: AI Runtime */}
        <div className="w-full bg-surface-container-low rounded-xl p-space-md shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-space-sm border border-surface-container">
          <div className="flex items-center gap-space-sm">
            <span className="p-2 rounded-lg bg-tertiary-container text-on-tertiary-container flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">psychology</span>
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-headline-sm text-headline-sm text-on-surface">
                  Agri-Match Neural Engine v2.4
                </span>
                <span className="px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm uppercase tracking-wider font-semibold">
                  Active Run
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Continuous multi-factor telemetry scanning 148 verified corporate mills, FPOs, and processing clusters within a 120km geo-fence.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-space-sm self-end md:self-center">
            <span className="font-label-sm text-label-sm text-on-surface-variant">Last Synced: 2 mins ago</span>
            <button
              onClick={handleRefresh}
              className="px-space-md py-2 rounded-lg bg-surface-container-highest hover:bg-surface-container-high text-primary font-label-md text-label-md flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
              type="button"
            >
              <span className={`material-symbols-outlined text-[16px] ${isRefreshingWeights ? 'animate-spin' : ''}`}>
                sync
              </span>
              <span>{isRefreshingWeights ? 'Re-optimizing...' : 'Refresh Weights'}</span>
            </button>
          </div>
        </div>

        {/* Profile Hero & Executive Telemetry Bento */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-md">
          {/* Profile Card (7 cols) */}
          <div className="lg:col-span-7 bg-surface-container-lowest rounded-xl p-space-lg shadow-xs border border-surface-container flex flex-col justify-between relative overflow-hidden">
            <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-primary/5 blur-3xl pointer-events-none"></div>
            <div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-md pb-space-md">
                <div className="flex items-center gap-space-md">
                  <div className="relative">
                    <img
                      className="w-16 h-16 rounded-xl object-cover shadow-sm ring-2 ring-primary/20"
                      alt="Farmer Ramesh Kumar Patel portrait"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHwLNplPslA7h1Awolyvv35TarviYWX-jIS4f_vlx7CjGvdh0rgNFPujpNgMjxnXuQt-0NhXxy339uyb88vCtKhvqOtGSg8e2LzbFJpl4KLXtTN_p9nDSMaTv9tKT2AdlFhyGceqjtn_of5UWTiBasGYGkdWDn00JaZqEVElkR8zbmeDu7LMk9MPE8yjW_Pm_7YRWFBMkqt-6nll81KD7f_4MEO5tERT1-GzcE4BFl1AVibiAh70ElUw"
                    />
                    <span className="absolute -bottom-1 -right-1 p-1 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-xs">
                      <span className="material-symbols-outlined text-[14px]">verified</span>
                    </span>
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h1 className="font-headline-md text-headline-md text-on-surface">Ramesh Kumar Patel</h1>
                      <span className="px-2 py-0.5 rounded bg-tertiary/10 text-tertiary font-label-sm text-label-sm font-semibold">
                        Tier-1 Producer
                      </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1.5 mt-0.5">
                      <span className="material-symbols-outlined text-[16px] text-outline">location_on</span>
                      <span>Ludhiana, Punjab • Khasra No. 412/18 (Zone B-4)</span>
                    </p>
                  </div>
                </div>
                <button
                  onClick={onOpenAddModal}
                  className="w-full sm:w-auto px-space-lg py-3 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-body-md text-body-md flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer active:scale-95"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[20px]">add_circle</span>
                  <span>Add New Produce</span>
                </button>
              </div>

              {/* Metadata Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-space-sm pt-space-sm">
                <div className="p-space-sm rounded-lg bg-surface-container-low flex flex-col border border-surface-container">
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">e-KYC Status</span>
                  <span className="font-body-sm text-body-sm text-primary font-semibold flex items-center gap-1 mt-0.5">
                    <span className="material-symbols-outlined text-[14px]">badge</span> Aadhaar &amp; PM-Kisan
                  </span>
                </div>
                <div className="p-space-sm rounded-lg bg-surface-container-low flex flex-col border border-surface-container">
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Cultivable Land</span>
                  <span className="font-headline-sm text-headline-sm text-on-surface mt-0.5">
                    8.5 <span className="font-body-sm text-body-sm font-normal text-on-surface-variant">Acres</span>
                  </span>
                </div>
                <div className="p-space-sm rounded-lg bg-surface-container-low flex flex-col border border-surface-container">
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Active Listings</span>
                  <span className="font-headline-sm text-headline-sm text-primary mt-0.5">
                    3 <span className="font-body-sm text-body-sm font-normal text-on-surface-variant">Crops</span>
                  </span>
                </div>
                <div className="p-space-sm rounded-lg bg-surface-container-low flex flex-col border border-surface-container">
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">FPO Affiliation</span>
                  <span className="font-body-sm text-body-sm text-on-surface font-semibold truncate mt-0.5" title="Malwa Kisan Producer Org">
                    Malwa KPO #204
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Listing Strip */}
            <div className="mt-space-md pt-space-md bg-surface-container-lowest flex items-center justify-between flex-wrap gap-2 text-on-surface-variant border-t border-surface-container">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-label-sm text-label-sm uppercase font-semibold">Active Lots:</span>
                <span className="px-2.5 py-1 rounded-md bg-surface-container text-on-surface font-label-md text-label-md">
                  Sharbati Wheat (320 Qtl)
                </span>
                <span className="px-2.5 py-1 rounded-md bg-surface-container text-on-surface font-label-md text-label-md">
                  Mustard Bold (80 Qtl)
                </span>
                <span className="px-2.5 py-1 rounded-md bg-surface-container text-on-surface font-label-md text-label-md">
                  Basmati 1121 (140 Qtl)
                </span>
              </div>
              <span className="font-label-sm text-label-sm text-tertiary font-semibold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-tertiary"></span> 100% Traceable
              </span>
            </div>
          </div>

          {/* Quick Metrics Grid (5 cols) */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-space-sm">
            <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-xs border border-surface-container flex items-center justify-between">
              <div className="flex items-center gap-space-md">
                <div className="p-3 rounded-lg bg-secondary-container/30 text-on-secondary-container">
                  <span className="material-symbols-outlined text-[24px]">local_offer</span>
                </div>
                <div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                    Active Bids Received
                  </span>
                  <div className="font-headline-md text-headline-md text-on-surface">4 Verified Offers</div>
                </div>
              </div>
              <span className="px-2 py-1 rounded bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold">
                +2 today
              </span>
            </div>

            <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-xs border border-surface-container flex items-center justify-between">
              <div className="flex items-center gap-space-md">
                <div className="p-3 rounded-lg bg-surface-container-high text-primary">
                  <span className="material-symbols-outlined text-[24px]">local_shipping</span>
                </div>
                <div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                    Pending Deliveries
                  </span>
                  <div className="font-headline-md text-headline-md text-on-surface">1 In-Transit</div>
                </div>
              </div>
              <span className="px-2 py-1 rounded bg-surface-container text-on-surface-variant font-label-sm text-label-sm">
                ETA: 6h
              </span>
            </div>

            <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-xs border border-surface-container flex items-center justify-between">
              <div className="flex items-center gap-space-md">
                <div className="p-3 rounded-lg bg-primary-container text-on-primary-container">
                  <span className="material-symbols-outlined text-[24px]">account_balance_wallet</span>
                </div>
                <div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                    Total Season Settlement
                  </span>
                  <div className="font-headline-md text-headline-md text-primary font-bold">₹3,42,800</div>
                </div>
              </div>
              <span className="px-2 py-1 rounded bg-tertiary/10 text-tertiary font-label-sm text-label-sm font-semibold">
                100% Escrowed
              </span>
            </div>
          </div>
        </div>

        {/* MAIN TWO-COLUMN SPLIT: MATCH ENGINE + BUYER OPPORTUNITIES */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
          {/* LEFT COLUMN: ALGORITHM RADAR & WEIGHTS (4 cols) */}
          <div className="lg:col-span-4 space-y-space-md">
            {/* Algorithm Parameter Card */}
            <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-xs border border-surface-container">
              <div className="flex items-center justify-between pb-space-sm">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[22px]">tune</span>
                  <h2 className="font-headline-sm text-headline-sm text-on-surface">Matching Weights</h2>
                </div>
                <span className="font-label-sm text-label-sm bg-surface-container px-2 py-0.5 rounded text-on-surface-variant">
                  Weights Sum: 100%
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">
                AI Model matches farm lots with verified mill tenders using automated distance telemetry and moisture calibration.
              </p>

              {/* Weights Breakdown */}
              <div className="space-y-space-md">
                <div>
                  <div className="flex justify-between font-label-md text-label-md mb-1">
                    <span className="text-on-surface font-semibold flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-primary"></span> Crop Specs &amp; Grade Match
                    </span>
                    <span className="text-primary font-bold">40%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-surface-container">
                    <div className="h-2 rounded-full bg-primary w-[40%]"></div>
                  </div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant mt-0.5 block">
                    Moisture ≤ 11.8%, Kernel size &gt; 6.8mm
                  </span>
                </div>

                <div>
                  <div className="flex justify-between font-label-md text-label-md mb-1">
                    <span className="text-on-surface font-semibold flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-tertiary"></span> Freight Feasibility &amp; Geo
                    </span>
                    <span className="text-tertiary font-bold">25%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-surface-container">
                    <div className="h-2 rounded-full bg-tertiary w-[25%]"></div>
                  </div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant mt-0.5 block">
                    Radius &lt; 50km optimizes transport margin
                  </span>
                </div>

                <div>
                  <div className="flex justify-between font-label-md text-label-md mb-1">
                    <span className="text-on-surface font-semibold flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-secondary"></span> Price Overlap Tolerance
                    </span>
                    <span className="text-secondary font-bold">25%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-surface-container">
                    <div className="h-2 rounded-full bg-secondary w-[25%]"></div>
                  </div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant mt-0.5 block">
                    Expected ± ₹50/Qtl mandi benchmark
                  </span>
                </div>

                <div>
                  <div className="flex justify-between font-label-md text-label-md mb-1">
                    <span className="text-on-surface font-semibold flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-outline"></span> Buyer Settlement Trust
                    </span>
                    <span className="text-on-surface font-bold">10%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-surface-container">
                    <div className="h-2 rounded-full bg-outline w-[10%]"></div>
                  </div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant mt-0.5 block">
                    3-day e-Escrow auto-clearance history
                  </span>
                </div>
              </div>

              {/* Live Diagnostic Visualization */}
              <div className="mt-space-lg p-space-md rounded-xl bg-surface-container-low border border-surface-container">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-label-sm text-label-sm text-on-surface font-semibold uppercase">
                    Benchmark Comparison
                  </span>
                  <span className="font-label-sm text-label-sm text-tertiary font-bold">
                    Ludhiana Mandi: ₹2,740
                  </span>
                </div>
                {/* SVG bar graphic */}
                <svg className="w-full h-14 text-on-surface" fill="none" viewBox="0 0 280 60">
                  <rect fill="currentColor" fillOpacity="0.1" height="8" rx="4" width="280" x="0" y="26"></rect>
                  <rect fill="#6f7a6e" height="8" rx="4" width="130" x="0" y="26"></rect>
                  <rect fill="#805600" fillOpacity="0.8" height="8" rx="4" width="190" x="0" y="26"></rect>
                  <rect fill="#00652c" height="8" rx="4" width="230" x="0" y="26"></rect>

                  <circle cx="130" cy="30" fill="#ffffff" r="6" stroke="#6f7a6e" strokeWidth="2"></circle>
                  <text fill="#6f7a6e" fontFamily="JetBrains Mono" fontSize="9" x="90" y="16">Mandi ₹2740</text>

                  <circle cx="190" cy="30" fill="#ffffff" r="6" stroke="#805600" strokeWidth="2"></circle>
                  <text fill="#805600" fontFamily="JetBrains Mono" fontSize="9" x="165" y="52">Ask ₹2850</text>

                  <circle cx="230" cy="30" fill="#00652c" r="7" stroke="#ffffff" strokeWidth="2"></circle>
                  <text fill="#00652c" fontFamily="JetBrains Mono" fontSize="10" fontWeight="bold" x="205" y="16">ITC ₹2880</text>
                </svg>
                <div className="font-label-sm text-label-sm text-primary text-center font-semibold mt-1">
                  + ₹140/Qtl Gain vs Open Mandi Auction
                </div>
              </div>
            </div>

            {/* Realtime Soil & Crop Telemetry Card */}
            <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-xs border border-surface-container">
              <div className="flex items-center gap-space-sm mb-space-sm">
                <span className="material-symbols-outlined text-secondary text-[20px]">sensors</span>
                <span className="font-label-lg text-label-lg text-on-surface">Lot 306-A Live Lab Data</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="bg-surface-container-low p-2 rounded-lg border border-surface-container">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Grain Moisture</span>
                  <div className="font-headline-sm text-headline-sm text-on-surface mt-0.5">10.8%</div>
                  <span className="font-label-sm text-label-sm text-tertiary">Optimal (&lt;12%)</span>
                </div>
                <div className="bg-surface-container-low p-2 rounded-lg border border-surface-container">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Foreign Matter</span>
                  <div className="font-headline-sm text-headline-sm text-on-surface mt-0.5">0.4%</div>
                  <span className="font-label-sm text-label-sm text-tertiary">Grade-A Max 0.7%</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: MATCHED CORPORATE & FPO BUYERS (8 cols) */}
          <div className="lg:col-span-8 space-y-space-md">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div>
                <h2 className="font-headline-md text-headline-md text-on-surface">Top Verified Buyer Matches</h2>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Matched against your listed lot: <strong>Sharbati 306 Wheat (320 Qtl)</strong>
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-label-sm text-label-sm text-on-surface-variant">Sort:</span>
                <select
                  aria-label="Sort Buyer Matches"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-surface-container-low text-on-surface font-label-md text-label-md px-3 py-1.5 rounded-lg outline-none cursor-pointer border border-surface-container"
                >
                  <option value="match">Highest Match Score (AI)</option>
                  <option value="price">Highest Offered Rate</option>
                  <option value="distance">Closest Distance</option>
                </select>
              </div>
            </div>

            {/* Buyer Match Cards */}
            {sortedMatches.map((buyer) => (
              <div
                key={buyer.id}
                className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm transition-all hover:shadow-md border border-surface-container relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-36 h-36 bg-tertiary/5 rounded-bl-full pointer-events-none"></div>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md pb-space-md">
                  <div className="flex items-start gap-space-md">
                    {buyer.imageUrl ? (
                      <img
                        className="w-16 h-16 rounded-xl object-cover shadow-xs border border-surface-container"
                        src={buyer.imageUrl}
                        alt={buyer.buyerName}
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-xl bg-surface-container flex items-center justify-center text-primary font-headline-md">
                        <span className="material-symbols-outlined text-[32px]">warehouse</span>
                      </div>
                    )}
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-headline-sm text-headline-sm text-on-surface">
                          {buyer.buyerName}
                        </h3>
                        <span className="px-2 py-0.5 rounded bg-tertiary/10 text-tertiary font-label-sm text-label-sm font-semibold flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">verified</span>
                          <span>{buyer.badge}</span>
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 font-body-sm text-body-sm text-on-surface-variant mt-1">
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-[16px] text-outline">near_me</span>
                          <span>{buyer.location} ({buyer.distanceKm} km)</span>
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-[16px] text-tertiary">star</span>
                          <span>{buyer.rating} Buyer Trust ({buyer.dealsCount}+ Deals)</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* AI Compatibility Tag */}
                  <div className="flex md:flex-col items-center md:items-end justify-between gap-1 bg-surface-container-low md:bg-transparent p-2 md:p-0 rounded-lg">
                    <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                      AI Compatibility
                    </span>
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-label-lg text-label-lg font-bold shadow-xs">
                      <span className="w-2.5 h-2.5 rounded-full bg-primary animate-ping"></span>
                      <span>{buyer.matchScore}% MATCH</span>
                    </div>
                  </div>
                </div>

                {/* Specs / FPO notice */}
                {buyer.requiresFPO ? (
                  <div className="p-space-md bg-secondary-fixed/30 rounded-xl mb-space-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-sm border border-secondary-fixed">
                    <div className="flex items-center gap-space-sm">
                      <span className="material-symbols-outlined text-secondary text-[24px]">group_work</span>
                      <div>
                        <div className="font-body-md text-body-md text-on-surface font-semibold">
                          Requires FPO Bulk Aggregation (500 Qtl Minimum)
                        </div>
                        <div className="font-body-sm text-body-sm text-on-surface-variant">
                          Your lot has 320 Qtl. Bundle with 2 neighboring Malwa FPO members to unlock this tender.
                        </div>
                      </div>
                    </div>
                    <div className="text-right whitespace-nowrap">
                      <span className="font-label-sm text-label-sm text-on-surface-variant">Tender Target Price:</span>
                      <div className="font-headline-sm text-headline-sm text-on-surface font-bold">
                        ₹2,910 <span className="font-body-sm text-body-sm font-normal">/Qtl</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-space-sm p-space-md bg-surface-container-low rounded-xl mb-space-md border border-surface-container">
                    <div>
                      <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Demand Volume</span>
                      <div className="font-headline-sm text-headline-sm text-on-surface mt-0.5">
                        {buyer.demandVolumeQtl} <span className="font-body-sm text-body-sm font-normal">Qtl</span>
                      </div>
                      <span className="font-label-sm text-label-sm text-tertiary font-medium">{buyer.volumeType}</span>
                    </div>
                    <div>
                      <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Offered Price</span>
                      <div className="font-headline-sm text-headline-sm text-primary font-bold mt-0.5">
                        ₹{buyer.offeredPrice.toLocaleString('en-IN')}{' '}
                        <span className="font-body-sm text-body-sm font-normal text-on-surface">/Qtl</span>
                      </div>
                      <span className="font-label-sm text-label-sm text-tertiary font-semibold">{buyer.priceDelta}</span>
                    </div>
                    <div>
                      <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Quality Required</span>
                      <div className="font-headline-sm text-headline-sm text-on-surface mt-0.5">{buyer.qualityRequired}</div>
                      <span className="font-label-sm text-label-sm text-on-surface-variant">{buyer.qualityNote}</span>
                    </div>
                    <div>
                      <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Logistics Pickup</span>
                      <div className="font-headline-sm text-headline-sm text-on-surface mt-0.5">{buyer.logisticsPickup}</div>
                      <span className="font-label-sm text-label-sm text-tertiary font-medium">{buyer.logisticsNote}</span>
                    </div>
                  </div>
                )}

                {/* Bottom Row Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-space-md pt-2 border-t border-surface-container">
                  <div className="flex items-center gap-2 font-label-sm text-label-sm text-on-surface-variant w-full sm:w-auto">
                    <span className="material-symbols-outlined text-[16px] text-tertiary">lock_clock</span>
                    <span>
                      Price locked for next <strong>{buyer.expiresIn}</strong>
                    </span>
                  </div>

                  <div className="flex items-center gap-space-sm w-full sm:w-auto justify-end">
                    {buyer.requiresFPO ? (
                      <button
                        onClick={handleAggregateFPO}
                        className="px-space-md py-2.5 rounded-lg bg-surface-container-highest hover:bg-surface-container-high text-primary font-body-sm text-body-sm font-semibold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[18px]">hub</span>
                        <span>Aggregate via FPO</span>
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={() => onOpenCounterModal(buyer.buyerName, buyer.offeredPrice, buyer.demandVolumeQtl)}
                          className="flex-1 sm:flex-none px-space-md py-2.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-body-sm text-body-sm font-semibold transition-all cursor-pointer"
                          type="button"
                        >
                          Counter Offer
                        </button>
                        <button
                          onClick={() => onAcceptDeal(buyer.buyerName, buyer.offeredPrice, buyer.demandVolumeQtl)}
                          disabled={isDealAccepted}
                          className={`flex-1 sm:flex-none px-space-lg py-2.5 rounded-lg font-body-sm text-body-sm font-semibold shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                            isDealAccepted
                              ? 'bg-surface-container text-on-surface-variant cursor-not-allowed'
                              : 'bg-primary hover:bg-primary-container text-on-primary active:scale-95'
                          }`}
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[18px]">handshake</span>
                          <span>{isDealAccepted ? 'Deal Closed' : 'Accept Deal'}</span>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* LIVE NEGOTIATION & OFFER ACTION DRAWER / HISTORY WIDGET */}
        <div className="w-full bg-surface-container-lowest rounded-xl p-space-lg shadow-xs border border-surface-container">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md pb-space-md">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">
                  Active Negotiation Ledger &amp; Settlement Tunnel
                </h3>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                Cryptographically signed trade intents secured by National e-NAM Mandate PS-AGR-04.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded bg-surface-container font-label-md text-label-md text-on-surface-variant">
                Contract ID: FAS-2026-PB-9941
              </span>
            </div>
          </div>

          {/* Table */}
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left font-body-sm text-body-sm">
              <thead>
                <tr className="bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
                  <th className="p-space-sm rounded-l-lg">Timestamp</th>
                  <th className="p-space-sm">Party</th>
                  <th className="p-space-sm">Proposed Price</th>
                  <th className="p-space-sm">Volume</th>
                  <th className="p-space-sm">Logistics Terms</th>
                  <th className="p-space-sm">Status</th>
                  <th className="p-space-sm rounded-r-lg text-right">Quick Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container">
                {negotiationLedger.map((row) => (
                  <tr key={row.id} className="hover:bg-surface-container-low/50 transition-colors">
                    <td className="p-space-sm font-label-sm text-label-sm text-on-surface-variant">
                      {row.timestamp}
                    </td>
                    <td className="p-space-sm font-semibold text-on-surface">
                      {row.party}
                    </td>
                    <td className="p-space-sm font-headline-sm text-headline-sm text-primary">
                      ₹{row.proposedPrice.toLocaleString('en-IN')}{' '}
                      <span className="font-body-sm text-body-sm text-on-surface-variant font-normal">/Qtl</span>
                    </td>
                    <td className="p-space-sm font-label-md text-label-md">
                      {row.volumeQtl} Qtl
                    </td>
                    <td className="p-space-sm text-on-surface-variant">
                      {row.logisticsTerms}
                    </td>
                    <td className="p-space-sm">
                      <span
                        className={`px-2.5 py-1 rounded-full font-label-sm text-label-sm font-semibold ${
                          row.status.includes('Accepted')
                            ? 'bg-primary-fixed text-on-primary-fixed font-bold animate-pulse'
                            : row.status.includes('Offer Received')
                            ? 'bg-secondary-fixed text-on-secondary-fixed'
                            : 'bg-surface-container text-on-surface-variant'
                        }`}
                      >
                        {row.status}
                      </span>
                    </td>
                    <td className="p-space-sm text-right">
                      {row.status === 'Offer Received' && !isDealAccepted ? (
                        <button
                          onClick={() => onAcceptDeal(row.party, row.proposedPrice, row.volumeQtl)}
                          className="px-3 py-1.5 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md font-semibold transition-all cursor-pointer"
                          type="button"
                        >
                          Instant Accept
                        </button>
                      ) : (
                        <span className="font-label-sm text-label-sm text-outline">
                          {isDealAccepted ? 'Deal Closed' : 'Archived'}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Post-Acceptance Escrow Status Banner */}
          {isDealAccepted && (
            <div className="mt-space-md p-space-md rounded-xl bg-primary-fixed text-on-primary-fixed flex flex-col md:flex-row items-center justify-between gap-space-md animate-in fade-in slide-in-from-bottom-2">
              <div className="flex items-center gap-space-sm">
                <span className="material-symbols-outlined text-[28px] text-primary">
                  check_circle
                </span>
                <div>
                  <div className="font-headline-sm text-headline-sm text-on-primary-fixed font-bold">
                    Deal Accepted • Status: Accepted - Escrow Pending
                  </div>
                  <p className="font-body-sm text-body-sm text-on-primary-fixed-variant">
                    Buyer (ITC Agro) has received binding confirmation. ₹5,76,000 has been signaled to Canara Bank Escrow Node.
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  onSelectTab('transactions');
                  onNotify('Navigated to Escrow settlement tunnel & Bill of Supply', 'info');
                }}
                className="px-space-md py-2 rounded-lg bg-primary text-on-primary font-body-sm text-body-sm font-semibold flex items-center gap-1.5 whitespace-nowrap shadow-sm cursor-pointer hover:bg-primary-container"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">receipt_long</span>
                <span>View Settlement e-Contract</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
