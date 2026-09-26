import React, { useState, useMemo } from 'react';
import { CropLot, UserRole, NavTab } from '../types';

interface MarketplaceScreenProps {
  cropLots: CropLot[];
  currentRole: UserRole;
  onChangeRole: (role: UserRole) => void;
  onOpenAddModal: () => void;
  onSelectTab: (tab: NavTab) => void;
  onNotify: (msg: string, type?: 'success' | 'info' | 'warning') => void;
}

export const MarketplaceScreen: React.FC<MarketplaceScreenProps> = ({
  cropLots,
  currentRole,
  onChangeRole,
  onOpenAddModal,
  onSelectTab,
  onNotify,
}) => {
  // Filters
  const [cropFilter, setCropFilter] = useState('all');
  const [gradeFilter, setGradeFilter] = useState('all');
  const [stateFilter, setStateFilter] = useState('all');

  // Simulator state
  const [simCrop, setSimCrop] = useState('wheat');
  const [simMoisture, setSimMoisture] = useState(11.5);
  const [simVolume, setSimVolume] = useState(100);

  // Filtered lots
  const filteredLots = useMemo(() => {
    return cropLots.filter((lot) => {
      const matchCrop = cropFilter === 'all' || lot.cropType === cropFilter;
      const matchGrade = gradeFilter === 'all' || lot.grade === gradeFilter;
      const matchState = stateFilter === 'all' || lot.state === stateFilter;
      return matchCrop && matchGrade && matchState;
    });
  }, [cropLots, cropFilter, gradeFilter, stateFilter]);

  // Dynamic simulation calculations
  const simResults = useMemo(() => {
    let baseMandi = 2450;
    if (simCrop === 'rice') baseMandi = 3700;
    if (simCrop === 'onion') baseMandi = 1500;
    if (simCrop === 'mustard') baseMandi = 5200;

    const optimalMoisture = 12.0;
    const moistureDiff = optimalMoisture - simMoisture;
    const moistureBonus = Math.round(moistureDiff * 35);
    const volumeIncentive = Math.round(simVolume * 0.45);
    const totalPremium = Math.max(80, 250 + moistureBonus + volumeIncentive);

    const fairRate = baseMandi + totalPremium;
    const grossTotal = fairRate * simVolume;

    return {
      baseMandi,
      totalPremium,
      fairRate,
      grossTotal,
    };
  }, [simCrop, simMoisture, simVolume]);

  const handleLotAction = (lot: CropLot) => {
    if (currentRole === 'farmer') {
      onNotify(`Viewing lot telemetry for ${lot.name} (${lot.location})`, 'info');
    } else {
      onNotify(`Escrow bid intent submitted for ${lot.name} at ₹${lot.algorithmicPrice}/Qtl`, 'success');
      onSelectTab('transactions');
    }
  };

  return (
    <div className="flex flex-col w-full pb-space-xl">
      {/* Simulation Sandbox Perspective Banner */}
      <section className="w-full bg-surface-container-low py-space-sm px-margin-sm md:px-margin border-b border-surface-container">
        <div className="max-w-[1440px] mx-auto flex flex-wrap items-center justify-between gap-space-sm">
          <div className="flex items-center gap-space-xs font-label-md text-label-md text-on-surface-variant">
            <span className="w-2.5 h-2.5 rounded-full bg-tertiary animate-ping"></span>
            <span className="font-semibold text-on-surface">Active Simulation Sandbox:</span>
            <span
              className={`px-space-xs py-0.5 rounded-full font-semibold ${
                currentRole === 'farmer'
                  ? 'bg-primary-container text-on-primary-container'
                  : 'bg-secondary-fixed text-on-secondary-fixed'
              }`}
            >
              {currentRole === 'farmer'
                ? 'Farmer View: Ramesh Patel (Punjab)'
                : 'Buyer View: AgriCorp India (Institutional)'}
            </span>
          </div>
          <div className="flex items-center gap-space-xs font-label-sm text-label-sm">
            <span className="text-on-surface-variant mr-1">Switch Perspective:</span>
            <button
              onClick={() => {
                onChangeRole('farmer');
                onNotify('Perspective switched: Ramesh Patel (Farmer)', 'info');
              }}
              className={`px-space-sm py-1 rounded-lg font-semibold transition-all flex items-center gap-1 cursor-pointer ${
                currentRole === 'farmer'
                  ? 'bg-surface-container-lowest text-primary shadow-xs'
                  : 'bg-surface-container-high text-on-surface hover:bg-surface-container'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">agriculture</span>
              <span>Ramesh Patel (Farmer)</span>
            </button>
            <button
              onClick={() => {
                onChangeRole('buyer');
                onNotify('Perspective switched: AgriCorp India (Wholesale Buyer)', 'info');
              }}
              className={`px-space-sm py-1 rounded-lg font-medium transition-all flex items-center gap-1 cursor-pointer ${
                currentRole === 'buyer'
                  ? 'bg-surface-container-lowest text-secondary font-semibold shadow-xs'
                  : 'bg-surface-container-high text-on-surface hover:bg-surface-container'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">domain</span>
              <span>AgriCorp India (Buyer)</span>
            </button>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="w-full relative overflow-hidden py-space-xl px-margin-sm md:px-margin bg-surface">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center relative z-10">
          <div className="lg:col-span-7 flex flex-col gap-space-md">
            {/* Hackathon Badge */}
            <div className="inline-flex items-center gap-space-xs w-fit px-space-sm py-1 rounded-full bg-surface-container text-primary font-label-sm text-label-sm font-semibold shadow-xs">
              <span className="material-symbols-outlined text-[16px] text-tertiary">military_tech</span>
              <span>Smart India Hackathon 2026</span>
              <span className="text-outline-variant">|</span>
              <span className="text-on-surface-variant">PS-AGR-04: Agriculture, Food Tech &amp; Rural Development</span>
            </div>

            {/* Typography Stack */}
            <div className="flex flex-col gap-1">
              <span className="font-label-lg text-label-lg uppercase tracking-wider text-secondary font-bold">
                Right Buyer, Right Price, Right Choice
              </span>
              <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight leading-tight">
                From Farm to{' '}
                <span className="text-primary underline decoration-primary-fixed decoration-wavy decoration-2">
                  Fair Price
                </span>
              </h1>
            </div>

            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
              FASLYNK is an algorithmic agricultural exchange linking farmers directly with verified institutional buyers. We eradicate middlemen leakage, automate ML-driven Grade A/B/C optical quality scoring, and execute guaranteed smart escrow payouts.
            </p>

            {/* Dynamic Action CTAs */}
            <div className="flex flex-wrap items-center gap-space-md pt-space-xs">
              <button
                onClick={onOpenAddModal}
                className="h-12 px-space-lg rounded-lg bg-primary text-on-primary font-body-md text-body-md font-semibold hover:bg-primary-container shadow-md flex items-center gap-space-xs transition-all active:scale-[0.98] cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">add_circle</span>
                <span>Sell Your Produce (+ Add Listing)</span>
              </button>
              <a
                href="#marketplace-explorer"
                className="h-12 px-space-lg rounded-lg bg-surface-container-lowest text-on-surface font-body-md text-body-md font-semibold hover:bg-surface-container shadow-xs flex items-center gap-space-xs transition-all border border-surface-container"
              >
                <span className="material-symbols-outlined text-[20px] text-secondary">storefront</span>
                <span>Explore Wholesale Catalog</span>
              </a>
            </div>

            {/* Metric Counters Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-space-md pt-space-lg">
              <div className="flex flex-col p-space-sm rounded-xl bg-surface-container-lowest shadow-xs border border-surface-container">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Settled Escrow</span>
                <span className="font-headline-md text-headline-md text-primary font-bold">₹4.8 Cr+</span>
                <span className="font-label-sm text-label-sm text-tertiary">Direct Payouts</span>
              </div>
              <div className="flex flex-col p-space-sm rounded-xl bg-surface-container-lowest shadow-xs border border-surface-container">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Producers</span>
                <span className="font-headline-md text-headline-md text-on-surface font-bold">14,200+</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">KYC-Verified Farmers</span>
              </div>
              <div className="flex flex-col p-space-sm rounded-xl bg-surface-container-lowest shadow-xs border border-surface-container">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Procurement</span>
                <span className="font-headline-md text-headline-md text-on-surface font-bold">1,850+</span>
                <span className="font-label-sm text-label-sm text-secondary font-semibold">Bulk Buyers</span>
              </div>
              <div className="flex flex-col p-space-sm rounded-xl bg-surface-container-lowest shadow-xs border border-surface-container">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Commission</span>
                <span className="font-headline-md text-headline-md text-tertiary font-bold">0%</span>
                <span className="font-label-sm text-label-sm text-tertiary">Middlemen Fee</span>
              </div>
            </div>
          </div>

          {/* Hero Visual: Real-time Telemetry & Live Contract Card */}
          <div className="lg:col-span-5 relative">
            <div className="w-full rounded-2xl bg-surface-container-lowest p-space-md shadow-xl border border-surface-container relative overflow-hidden">
              <div className="flex items-center justify-between pb-space-sm">
                <div className="flex items-center gap-space-xs">
                  <span className="w-2.5 h-2.5 rounded-full bg-tertiary animate-pulse"></span>
                  <span className="font-label-md text-label-md text-on-surface font-bold uppercase tracking-wide">
                    Live Algorithmic Clearing
                  </span>
                </div>
                <span className="px-space-xs py-0.5 rounded bg-surface-container font-label-sm text-label-sm text-on-surface-variant">
                  Slot #SIH-984
                </span>
              </div>

              <div className="rounded-xl overflow-hidden relative h-52 mb-space-md">
                <img
                  className="w-full h-full object-cover"
                  alt="Golden ripe wheat fields stretching into the horizon during harvest golden hour in Punjab"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBArmvi6WLV3_XGbSG5Ts7gDl17HMN7m408QZmlA_9EieHDjk1cosbns_0uzGhSK8IStf901u3GMzav4peDxoDWf-S5xlGfDVcTBY6Guh8bQeksf2skAx9Pr8jk5ew1WY9Iv0IMK5t8OJQAIqH755x2BTKIhcoxKXnBfq5FVGLaq9Pax250Gnbs45t5Di3D4dVPjDXnPy3dw73ips77WKF0p_I3psVBIg2nxnwwBj3UoXOY9DseGMERmg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-on-surface/80 via-transparent to-transparent flex items-end p-space-md">
                  <div className="flex items-center justify-between w-full text-on-primary">
                    <div>
                      <span className="font-label-sm text-label-sm uppercase opacity-80">Telemetry Feed</span>
                      <p className="font-headline-sm text-headline-sm font-bold">Sehore Sharbati Wheat Lot</p>
                    </div>
                    <span className="px-space-xs py-1 rounded bg-tertiary text-on-tertiary font-label-md text-label-md font-semibold">
                      Grade A Premium
                    </span>
                  </div>
                </div>
              </div>

              {/* Micro Telemetry Gauges */}
              <div className="grid grid-cols-3 gap-space-xs mb-space-md">
                <div className="p-space-xs bg-surface-container-low rounded-lg text-center">
                  <span className="font-label-sm text-label-sm text-on-surface-variant block">Moisture</span>
                  <span className="font-label-md text-label-md text-primary font-bold">11.4% (Optimal)</span>
                </div>
                <div className="p-space-xs bg-surface-container-low rounded-lg text-center">
                  <span className="font-label-sm text-label-sm text-on-surface-variant block">Local Mandi</span>
                  <span className="font-label-md text-label-md text-outline font-semibold">₹2,490/Qtl</span>
                </div>
                <div className="p-space-xs bg-primary-container/20 rounded-lg text-center">
                  <span className="font-label-sm text-label-sm text-primary font-bold block">FASLYNK Fair</span>
                  <span className="font-label-md text-label-md text-primary font-bold">₹2,850/Qtl</span>
                </div>
              </div>

              {/* Live Matching Progress Bar */}
              <div className="p-space-sm bg-surface-container rounded-xl flex flex-col gap-1">
                <div className="flex justify-between items-center font-label-sm text-label-sm">
                  <span className="text-on-surface-variant">Direct Institutional Spread</span>
                  <span className="text-tertiary font-bold">+14.4% Margin to Farmer</span>
                </div>
                <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                  <div className="bg-tertiary h-full rounded-full transition-all duration-700" style={{ width: '86%' }}></div>
                </div>
                <div className="flex justify-between items-center text-[11px] text-on-surface-variant font-label-sm pt-1">
                  <span>Smart Contract Verified</span>
                  <span>ICAR-Accredited Parameters</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem vs Solution Matrix */}
      <section className="w-full py-space-xl px-margin-sm md:px-margin bg-surface-container-low">
        <div className="max-w-[1440px] mx-auto flex flex-col gap-space-lg">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-sm">
            <div className="flex flex-col">
              <span className="font-label-md text-label-md uppercase text-secondary font-bold tracking-wider">
                Problem Statement PS-AGR-04
              </span>
              <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
                Mandi Exploitation vs. FASLYNK Precision
              </h2>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant max-w-md">
              How our AI-powered peer-to-contract network disrupts structural asymmetry in the Indian wholesale agricultural value chain.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg">
            {/* Traditional Mandi Dilemma */}
            <div className="p-space-lg rounded-2xl bg-surface-container-lowest shadow-xs border border-surface-container flex flex-col justify-between relative overflow-hidden">
              <div className="flex flex-col gap-space-md">
                <div className="flex items-center justify-between">
                  <span className="px-space-xs py-1 rounded-md bg-error-container text-on-error-container font-label-sm text-label-sm font-bold uppercase tracking-wider">
                    Traditional Mandi Dilemma
                  </span>
                  <span className="material-symbols-outlined text-error text-[28px]">trending_down</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface">
                  35% - 45% Net Value Lost in Transit
                </h3>
                <div className="flex flex-col gap-space-sm">
                  <div className="flex items-start gap-space-xs">
                    <span className="material-symbols-outlined text-error text-[20px] shrink-0 mt-0.5">cancel</span>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      <strong className="text-on-surface">Asymmetric Information:</strong> Smallholder farmers lack real-time price depth and distress-sell to local commission agents (Arhtiyas) below MSP.
                    </p>
                  </div>
                  <div className="flex items-start gap-space-xs">
                    <span className="material-symbols-outlined text-error text-[20px] shrink-0 mt-0.5">cancel</span>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      <strong className="text-on-surface">Subjective Quality Deduction:</strong> Manual grain inspection without lab equipment leads to arbitrary 10-20% weight and grade slashing at the unloading dock.
                    </p>
                  </div>
                  <div className="flex items-start gap-space-xs">
                    <span className="material-symbols-outlined text-error text-[20px] shrink-0 mt-0.5">cancel</span>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      <strong className="text-on-surface">Extended Credit Defaults:</strong> Delayed payouts stretching 45-90 days, locking vital liquidity needed for the next sowing cycle.
                    </p>
                  </div>
                </div>
              </div>

              {/* Problem Visual Chart */}
              <div className="mt-space-md p-space-sm rounded-xl bg-error-container/20 flex flex-col gap-2">
                <div className="flex justify-between font-label-sm text-label-sm text-on-surface font-semibold">
                  <span>Farmer Proceeds: 58%</span>
                  <span className="text-error font-bold">Middlemen Cuts: 42%</span>
                </div>
                <div className="w-full h-3 bg-surface-container-high rounded-full overflow-hidden flex">
                  <div className="bg-outline h-full" style={{ width: '58%' }}></div>
                  <div className="bg-error h-full" style={{ width: '42%' }}></div>
                </div>
              </div>
            </div>

            {/* The FASLYNK Solution */}
            <div className="p-space-lg rounded-2xl bg-surface-container-lowest shadow-md border border-primary/20 flex flex-col justify-between relative overflow-hidden">
              <div className="flex flex-col gap-space-md">
                <div className="flex items-center justify-between">
                  <span className="px-space-xs py-1 rounded-md bg-on-primary-container text-primary font-label-sm text-label-sm font-bold uppercase tracking-wider">
                    The FASLYNK Protocol
                  </span>
                  <span className="material-symbols-outlined text-tertiary text-[28px]">verified_user</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface">
                  100% Direct Settlement with ML Verification
                </h3>
                <div className="flex flex-col gap-space-sm">
                  <div className="flex items-start gap-space-xs">
                    <span className="material-symbols-outlined text-tertiary text-[20px] shrink-0 mt-0.5">check_circle</span>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      <strong className="text-on-surface">Algorithmic Fair-Price Discovery:</strong> Real-time XGBoost regression analyzing Agmarknet feeds, rainfall patterns, moisture indices, and wholesale terminal demand.
                    </p>
                  </div>
                  <div className="flex items-start gap-space-xs">
                    <span className="material-symbols-outlined text-tertiary text-[20px] shrink-0 mt-0.5">check_circle</span>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      <strong className="text-on-surface">AI Camera Optical Grading:</strong> Instant edge-based visual analysis evaluating foreign matter, broken kernels, and grain discoloration into certified Grade A/B/C ratings.
                    </p>
                  </div>
                  <div className="flex items-start gap-space-xs">
                    <span className="material-symbols-outlined text-tertiary text-[20px] shrink-0 mt-0.5">check_circle</span>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      <strong className="text-on-surface">Guaranteed Smart Escrow:</strong> 100% buyer funds locked before logistics dispatch; auto-released directly to farmer UPI / Jan Dhan account upon digital weighing receipt.
                    </p>
                  </div>
                </div>
              </div>

              {/* Solution Visual Metric */}
              <div className="mt-space-md p-space-sm rounded-xl bg-on-primary-container/30 flex flex-col gap-2">
                <div className="flex justify-between font-label-sm text-label-sm text-on-surface font-semibold">
                  <span className="text-primary font-bold">Farmer Net Revenue: 97.5%</span>
                  <span className="text-on-surface-variant">Logistics &amp; Protocol: 2.5%</span>
                </div>
                <div className="w-full h-3 bg-surface-container-high rounded-full overflow-hidden flex">
                  <div className="bg-primary h-full" style={{ width: '97.5%' }}></div>
                  <div className="bg-secondary h-full" style={{ width: '2.5%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9-Stage Trustless Transaction Flow */}
      <section className="w-full py-space-xl px-margin-sm md:px-margin bg-surface">
        <div className="max-w-[1440px] mx-auto flex flex-col gap-space-lg">
          <div className="flex flex-col gap-1">
            <span className="font-label-md text-label-md text-primary font-bold uppercase tracking-wider">
              End-to-End Workflow
            </span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
              The 9-Stage Trustless Transaction Flow
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Zero ambiguity, zero handshake defaults. Complete digital transparency from harvest yard to silo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-9 gap-space-xs overflow-x-auto pb-space-sm">
            {[
              { num: 1, icon: 'post_add', title: 'Farmer Lists Produce', desc: 'Quantity, harvest date, location and preliminary price threshold.', color: 'bg-primary' },
              { num: 2, icon: 'document_scanner', title: 'AI Grading & OCR', desc: 'Camera macro scan calculates kernel integrity & moisture ratio.', color: 'bg-primary' },
              { num: 3, icon: 'hub', title: 'Smart Match', desc: 'Radius-optimized discovery matches institutional freight lanes.', color: 'bg-primary' },
              { num: 4, icon: 'request_quote', title: 'Buyer Offer', desc: 'Wholesale buyer submits digital binding purchase intent.', color: 'bg-secondary' },
              { num: 5, icon: 'handshake', title: 'Review / Counter', desc: 'Farmer accepts in 1 click or sends 1-time counter quotation.', color: 'bg-secondary' },
              { num: 6, icon: 'lock', title: 'Deal Locked', desc: 'Digital legally-binding e-Contract minted on immutable ledger.', color: 'bg-tertiary' },
              { num: 7, icon: 'account_balance', title: 'Escrow Deposit', desc: 'Buyer deposits 100% value into FASLYNK Reserve Escrow.', color: 'bg-primary' },
              { num: 8, icon: 'local_shipping', title: 'Tracked Dispatch', desc: 'GPS-tracked freight partner dispatched to farmgate weighbridge.', color: 'bg-primary' },
              { num: 9, icon: 'paid', title: 'Verified Payout', desc: 'Direct instant settlement to Farmer Bank via UPI 2.0.', color: 'bg-tertiary' }
            ].map((st) => (
              <div
                key={st.num}
                onClick={() => onSelectTab('transactions')}
                className="p-space-sm rounded-xl bg-surface-container-low flex flex-col gap-space-xs shadow-xs hover:bg-surface-container hover:shadow-sm transition-all cursor-pointer border border-transparent hover:border-surface-container-highest"
              >
                <div className="flex items-center justify-between">
                  <span className={`w-6 h-6 rounded-full ${st.color} text-white font-label-sm text-label-sm flex items-center justify-center font-bold`}>
                    {st.num}
                  </span>
                  <span className="material-symbols-outlined text-[18px] text-on-surface-variant">
                    {st.icon}
                  </span>
                </div>
                <span className="font-headline-sm text-sm font-bold text-on-surface leading-tight">
                  {st.title}
                </span>
                <p className="font-body-sm text-[12px] text-on-surface-variant leading-tight">
                  {st.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Smart Crop Marketplace Grid */}
      <section className="w-full py-space-xl px-margin-sm md:px-margin bg-surface-container-low" id="marketplace-explorer">
        <div className="max-w-[1440px] mx-auto flex flex-col gap-space-lg">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-sm">
            <div>
              <div className="inline-flex items-center gap-1.5 px-space-xs py-0.5 rounded bg-tertiary-container/20 text-tertiary font-label-sm text-label-sm font-bold uppercase mb-1">
                <span className="w-2 h-2 rounded-full bg-tertiary"></span>
                <span>Direct Wholesale Telemetry</span>
              </div>
              <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
                Active Farmgate Crop Lots
              </h2>
            </div>

            {/* Filter Bar */}
            <div className="flex flex-wrap items-center gap-space-xs font-label-sm text-label-sm">
              <span className="text-on-surface-variant">Filter by:</span>
              <select
                value={cropFilter}
                onChange={(e) => setCropFilter(e.target.value)}
                className="h-10 px-space-sm rounded-lg bg-surface-container-lowest text-on-surface font-medium shadow-xs outline-none border border-surface-container cursor-pointer"
              >
                <option value="all">All Crops</option>
                <option value="wheat">Wheat</option>
                <option value="rice">Rice (Basmati)</option>
                <option value="onions">Red Onions</option>
                <option value="apples">Apples</option>
              </select>

              <select
                value={gradeFilter}
                onChange={(e) => setGradeFilter(e.target.value)}
                className="h-10 px-space-sm rounded-lg bg-surface-container-lowest text-on-surface font-medium shadow-xs outline-none border border-surface-container cursor-pointer"
              >
                <option value="all">All Grades</option>
                <option value="A">Grade A Premium</option>
                <option value="B">Grade B Standard</option>
              </select>

              <select
                value={stateFilter}
                onChange={(e) => setStateFilter(e.target.value)}
                className="h-10 px-space-sm rounded-lg bg-surface-container-lowest text-on-surface font-medium shadow-xs outline-none border border-surface-container cursor-pointer"
              >
                <option value="all">All States</option>
                <option value="MP">Madhya Pradesh</option>
                <option value="HR">Haryana</option>
                <option value="MH">Maharashtra</option>
                <option value="HP">Himachal Pradesh</option>
              </select>
            </div>
          </div>

          {/* Marketplace Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md">
            {filteredLots.map((lot) => (
              <div
                key={lot.id}
                className="crop-card flex flex-col rounded-2xl bg-surface-container-lowest shadow-xs hover:shadow-lg transition-all overflow-hidden border border-surface-container"
              >
                <div className="h-44 relative overflow-hidden">
                  <img
                    src={lot.imageUrl}
                    alt={lot.imageAlt}
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                  />
                  <div className="absolute top-space-xs right-space-xs">
                    <span className="px-space-xs py-0.5 rounded bg-surface-container-lowest/90 backdrop-blur-sm text-primary font-label-sm text-label-sm font-bold flex items-center gap-1 shadow-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
                      <span>{lot.matchScore}% Match</span>
                    </span>
                  </div>
                  <div className="absolute bottom-space-xs left-space-xs">
                    <span
                      className={`px-space-xs py-0.5 rounded font-label-sm text-label-sm font-bold ${
                        lot.grade === 'A'
                          ? 'bg-tertiary text-on-tertiary'
                          : 'bg-secondary-container text-on-secondary-container'
                      }`}
                    >
                      {lot.gradeLabel}
                    </span>
                  </div>
                </div>

                <div className="p-space-md flex flex-col flex-1 justify-between gap-space-md">
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-headline-sm text-headline-sm text-on-surface">
                        {lot.name}
                      </h3>
                      <span className="font-label-sm text-label-sm text-tertiary bg-on-primary-container px-1.5 py-0.5 rounded font-semibold">
                        +{lot.mandiComparisonPct}% vs Mandi
                      </span>
                    </div>
                    <div className="flex items-center gap-1 font-body-sm text-body-sm text-on-surface-variant">
                      <span className="material-symbols-outlined text-[16px] text-outline">location_on</span>
                      <span>{lot.location}</span>
                    </div>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">
                      Farmer: {lot.farmerName} ({lot.fpoId})
                    </span>
                  </div>

                  <div className="p-space-xs bg-surface-container-low rounded-lg grid grid-cols-2 gap-2 text-center font-label-sm text-label-sm">
                    <div>
                      <span className="text-on-surface-variant block">Volume Avail</span>
                      <span className="font-bold text-on-surface">{lot.volumeQuintals} Quintals</span>
                    </div>
                    <div>
                      <span className="text-on-surface-variant block">{lot.specLabel}</span>
                      <span className="font-bold text-primary">{lot.specValue}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-space-xs">
                    <div className="flex flex-col">
                      <span className="font-label-sm text-label-sm text-on-surface-variant">
                        Algorithmic Fair Price
                      </span>
                      <span className="font-headline-md text-headline-md text-primary font-bold">
                        ₹{lot.algorithmicPrice.toLocaleString('en-IN')}{' '}
                        <span className="text-xs font-normal text-on-surface-variant">/Qtl</span>
                      </span>
                    </div>
                    <button
                      onClick={() => handleLotAction(lot)}
                      className="px-space-md py-2.5 rounded-lg bg-primary text-on-primary font-body-sm text-body-sm font-semibold hover:bg-primary-container transition-all active:scale-95 shadow-xs cursor-pointer"
                    >
                      {currentRole === 'farmer' ? 'View Telemetry' : 'Make Offer'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How FASLYNK Works & FPO Aggregation Teaser + Interactive Simulator */}
      <section className="w-full py-space-xl px-margin-sm md:px-margin bg-surface">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
          {/* FPO Aggregation Feature (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-space-md">
            <div className="inline-flex items-center gap-space-xs px-space-sm py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-bold w-fit">
              <span className="material-symbols-outlined text-[16px]">groups</span>
              <span>Community Power: FPO Smart Pooling</span>
            </div>
            <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
              Aggregating Marginal Farmers into Institutional Powerhouses
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              Over 86% of Indian farmers are small and marginal with less than 2 hectares, lacking transport bargaining strength. FASLYNK&apos;s FPO Aggregator module algorithmically bundles micro-lots from multiple village producers into unified 10-20 Metric Ton container consignments, slashing freight costs by up to 38%.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-md pt-space-xs">
              <div className="p-space-sm rounded-xl bg-surface-container-low flex flex-col gap-1 border border-surface-container">
                <span className="material-symbols-outlined text-primary text-[24px]">join_inner</span>
                <span className="font-headline-sm text-sm font-bold text-on-surface">Micro-Lot Pooling</span>
                <p className="font-body-sm text-[12px] text-on-surface-variant">Combine 5-10 bags per smallholder into institutional volume.</p>
              </div>
              <div className="p-space-sm rounded-xl bg-surface-container-low flex flex-col gap-1 border border-surface-container">
                <span className="material-symbols-outlined text-primary text-[24px]">route</span>
                <span className="font-headline-sm text-sm font-bold text-on-surface">Shared Logistics</span>
                <p className="font-body-sm text-[12px] text-on-surface-variant">Optimized milk-run pickups straight from village aggregation nodes.</p>
              </div>
              <div className="p-space-sm rounded-xl bg-surface-container-low flex flex-col gap-1 border border-surface-container">
                <span className="material-symbols-outlined text-primary text-[24px]">receipt_long</span>
                <span className="font-headline-sm text-sm font-bold text-on-surface">Split Ledgers</span>
                <p className="font-body-sm text-[12px] text-on-surface-variant">Automated fractional escrow payouts direct to each individual bank passbook.</p>
              </div>
            </div>

            <div className="pt-space-xs">
              <button
                onClick={() => onSelectTab('produce-management-and-fpo')}
                className="h-11 px-space-md rounded-lg bg-surface-container text-on-surface font-body-sm text-body-sm font-semibold hover:bg-surface-container-high transition-all flex items-center gap-space-xs shadow-xs cursor-pointer"
              >
                <span>Explore FPO Co-Op Architecture</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Real-Time Interactive Price Discovery Simulator (5 Cols) */}
          <div className="lg:col-span-5">
            <div className="p-space-lg rounded-2xl bg-surface-container-lowest shadow-md border border-surface-container flex flex-col gap-space-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-secondary text-[22px]">calculate</span>
                  <span className="font-headline-sm text-base font-bold text-on-surface">
                    AI Price Benchmark Simulator
                  </span>
                </div>
                <span className="font-label-sm text-label-sm px-2 py-0.5 rounded bg-surface-container text-on-surface-variant">
                  XGBoost v2.4
                </span>
              </div>

              <div className="flex flex-col gap-space-sm font-label-sm text-label-sm">
                <div>
                  <label className="block text-on-surface-variant mb-1 font-semibold">
                    Select Commodity &amp; Variety
                  </label>
                  <select
                    value={simCrop}
                    onChange={(e) => setSimCrop(e.target.value)}
                    className="w-full h-11 px-space-sm rounded-lg bg-surface-container text-on-surface font-medium outline-none border border-transparent focus:border-primary cursor-pointer"
                  >
                    <option value="wheat">Sehore Wheat (Sharbati)</option>
                    <option value="rice">Karnal Basmati 1121</option>
                    <option value="onion">Nashik Red Onion</option>
                    <option value="mustard">Rajasthan Black Mustard</option>
                  </select>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-on-surface-variant font-semibold">Moisture Level (%)</span>
                    <span className="text-primary font-bold">{simMoisture.toFixed(1)}%</span>
                  </div>
                  <input
                    type="range"
                    min="8"
                    max="22"
                    step="0.5"
                    value={simMoisture}
                    onChange={(e) => setSimMoisture(parseFloat(e.target.value))}
                    className="w-full accent-primary h-2 bg-surface-container-high rounded-lg cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-on-surface-variant font-semibold">Consignment Volume (Quintals)</span>
                    <span className="text-primary font-bold">{simVolume} Qtl</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="500"
                    step="10"
                    value={simVolume}
                    onChange={(e) => setSimVolume(parseInt(e.target.value, 10))}
                    className="w-full accent-primary h-2 bg-surface-container-high rounded-lg cursor-pointer"
                  />
                </div>
              </div>

              {/* Dynamic Result Box */}
              <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col gap-2 border border-surface-container">
                <div className="flex justify-between items-center text-xs text-on-surface-variant">
                  <span>Local Mandi Benchmark (APMC):</span>
                  <span className="font-mono font-semibold">
                    ₹{simResults.baseMandi.toLocaleString('en-IN')} /Qtl
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs text-on-surface-variant">
                  <span>AI Quality &amp; Volume Premium:</span>
                  <span className="font-mono text-tertiary font-bold">
                    +₹{simResults.totalPremium.toLocaleString('en-IN')} /Qtl
                  </span>
                </div>
                <div className="w-full h-px bg-surface-container-highest my-1"></div>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-label-sm text-[11px] uppercase tracking-wider text-on-surface-variant block">
                      Algorithmic Fair Payout
                    </span>
                    <span className="font-headline-md text-headline-md font-bold text-primary">
                      ₹{simResults.fairRate.toLocaleString('en-IN')}{' '}
                      <span className="text-xs font-normal text-on-surface-variant">/Qtl</span>
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-label-sm text-[11px] uppercase tracking-wider text-on-surface-variant block">
                      Total Farmgate Value
                    </span>
                    <span className="font-headline-sm text-headline-sm font-bold text-on-surface">
                      ₹{simResults.grossTotal.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={onOpenAddModal}
                className="w-full h-11 rounded-lg bg-primary text-on-primary font-body-sm text-body-sm font-semibold hover:bg-primary-container shadow-xs flex items-center justify-center gap-1 transition-all cursor-pointer"
              >
                <span>List Lot at this AI Fair Price</span>
                <span className="material-symbols-outlined text-[16px]">trending_up</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
