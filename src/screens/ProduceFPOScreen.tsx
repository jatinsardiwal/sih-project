import React, { useState } from 'react';
import { NavTab } from '../types';

interface ProduceFPOScreenProps {
  onOpenAddModal: () => void;
  onSelectTab: (tab: NavTab) => void;
  onNotify: (msg: string, type?: 'success' | 'info' | 'warning') => void;
}

export const ProduceFPOScreen: React.FC<ProduceFPOScreenProps> = ({
  onOpenAddModal,
  onSelectTab,
  onNotify,
}) => {
  const [activeTabFilter, setActiveTabFilter] = useState<'active' | 'transit' | 'audited'>('active');
  const [isContractReleased, setIsContractReleased] = useState(false);
  const [isWaybillConfirmed, setIsWaybillConfirmed] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);

  const handleSmartContractRelease = () => {
    setIsContractReleased(true);
    onNotify('Smart contract executed! ₹29,20,000 multi-sig escrow signaled for distribution.', 'success');
  };

  const handleWaybillConfirm = () => {
    setIsWaybillConfirmed(true);
    onNotify('Freight Waybill #TR-9902 confirmed! Driver Jaspal Singh dispatched to farmgate weighbridge.', 'success');
  };

  return (
    <div className="flex flex-col w-full pb-space-xl">
      <div className="w-full max-w-[1440px] mx-auto px-margin-sm md:px-margin space-y-space-xl pb-space-xl pt-space-md">
        {/* Top Action Breadcrumb & Operational Telemetry Pill */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-space-xs font-label-md text-label-md text-on-surface-variant">
              <span className="text-tertiary font-semibold">DISTRICT NODE 04</span>
              <span>•</span>
              <span>PUNJAB REGIONAL POOL</span>
              <span>•</span>
              <span className="px-2 py-0.5 rounded-full bg-primary-container text-on-primary-container font-label-sm text-label-sm font-semibold">
                AGR-04 AUDITED
              </span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
              Produce Management &amp; FPO Aggregation
            </h1>
          </div>

          {/* Action Toggles / Secondary Telemetry */}
          <div className="flex flex-wrap items-center gap-space-sm w-full md:w-auto">
            <button
              onClick={() => onNotify('Agmarknet Stream v3.1 successfully synced across 42 Mandis', 'info')}
              className="px-space-md py-space-sm rounded-lg bg-surface-container-high hover:bg-surface-variant text-on-surface font-label-md text-label-md flex items-center gap-2 shadow-xs transition-all cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px] text-tertiary">sync</span>
              <span>Mandi Stream v3.1 Sync</span>
            </button>
            <button
              onClick={onOpenAddModal}
              className="px-space-md py-space-sm rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md flex items-center gap-2 shadow-xs transition-all cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">add_circle</span>
              <span>Register New Lot</span>
            </button>
          </div>
        </div>

        {/* Institutional Bulk Aggregation Milestone Banner (Bento High Priority) */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary via-primary-container to-tertiary text-on-primary p-space-lg md:p-space-xl shadow-lg border border-primary-fixed/20">
          <div className="absolute -right-8 -bottom-8 opacity-10 pointer-events-none">
            <span className="material-symbols-outlined text-[240px]">groups_3</span>
          </div>
          <div className="relative z-10 flex flex-col xl:flex-row xl:items-center justify-between gap-space-lg">
            <div className="space-y-space-sm max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-on-secondary-container animate-ping"></span>
                  <span>Threshold Unlocked</span>
                </span>
                <span className="px-3 py-1 rounded-full bg-surface-container-lowest/20 backdrop-blur-md font-label-sm text-label-sm tracking-wide">
                  FPO Code: KISAN-VIKAS-LDH-09
                </span>
              </div>
              <h2 className="font-headline-md text-headline-md text-on-primary">
                Kisan Vikas FPO Bulk Pool Sealed: 1,000 Qtl (100 Metric Tonnes) Grade A Wheat
              </h2>
              <p className="font-body-md text-body-md text-on-primary-container leading-relaxed">
                Threshold unlocked for institutional direct bidding by{' '}
                <strong className="text-on-primary underline decoration-secondary-container underline-offset-4 font-semibold">
                  Nestle Agro &amp; Cargill India
                </strong>
                . Contract rate fixed at{' '}
                <span className="font-label-lg font-bold text-on-primary">₹2,920/Qtl</span> (incl. +₹70/Qtl FPO Member Collective Incentive).
              </p>
            </div>

            {/* Volume Gauge & Pool Trigger CTA */}
            <div className="flex flex-col sm:flex-row items-stretch xl:items-end gap-space-md shrink-0 bg-surface-container-lowest/15 backdrop-blur-md p-space-md rounded-xl border border-white/10">
              <div className="space-y-1">
                <div className="flex justify-between items-baseline gap-space-md font-label-sm text-label-sm text-on-primary-container">
                  <span>POOL CAPACITY TARGET</span>
                  <span className="font-bold text-on-primary">100% FILLED</span>
                </div>
                <div className="w-64 sm:w-72 h-3.5 bg-black/20 rounded-full overflow-hidden p-0.5">
                  <div
                    className="h-full bg-secondary-container rounded-full transition-all duration-1000 shadow-xs"
                    style={{ width: '100%' }}
                  ></div>
                </div>
                <div className="flex justify-between items-center font-label-sm text-[11px] text-on-primary-container/90">
                  <span>1,000 / 1,000 Qtl</span>
                  <span className="font-semibold text-secondary-fixed">Status: Sealed &amp; Live for Bids</span>
                </div>
              </div>
              <button
                onClick={() => {
                  onSelectTab('transactions');
                  onNotify('Navigated to Bid & Escrow Ledger for FPO Pool #KISAN-VIKAS-LDH-09', 'info');
                }}
                className="px-space-md py-space-sm bg-surface-container-lowest text-primary hover:bg-surface-container-low font-body-sm text-body-sm font-bold rounded-lg shadow-md transition-all self-center sm:self-end cursor-pointer"
                type="button"
              >
                View Bid Ledger
              </button>
            </div>
          </div>
        </div>

        {/* Main Grid: Inventory Management & FPO Roster Aggregator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
          {/* Left Column (7 Cols): Active Farmer Inventory & Sensor Telemetry */}
          <div className="lg:col-span-7 space-y-space-lg">
            {/* Active Produce Header & Quick Filter Pills */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
              <div>
                <span className="font-label-sm text-label-sm text-tertiary font-bold uppercase tracking-wider">
                  Lot Ledger
                </span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">
                  Registered Farmer Batches
                </h3>
              </div>
              <div className="flex items-center gap-1.5 p-1 rounded-lg bg-surface-container-low border border-surface-container">
                <button
                  onClick={() => setActiveTabFilter('active')}
                  className={`px-3 py-1 text-label-sm font-label-sm rounded transition-colors cursor-pointer ${
                    activeTabFilter === 'active'
                      ? 'bg-surface-container-lowest shadow-xs text-on-surface font-semibold'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                  type="button"
                >
                  Active (4)
                </button>
                <button
                  onClick={() => setActiveTabFilter('transit')}
                  className={`px-3 py-1 text-label-sm font-label-sm rounded transition-colors cursor-pointer ${
                    activeTabFilter === 'transit'
                      ? 'bg-surface-container-lowest shadow-xs text-on-surface font-semibold'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                  type="button"
                >
                  In-Transit (2)
                </button>
                <button
                  onClick={() => setActiveTabFilter('audited')}
                  className={`px-3 py-1 text-label-sm font-label-sm rounded transition-colors cursor-pointer ${
                    activeTabFilter === 'audited'
                      ? 'bg-surface-container-lowest shadow-xs text-on-surface font-semibold'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                  type="button"
                >
                  Audited (18)
                </button>
              </div>
            </div>

            {/* Featured Lot Card: Ramesh Patel Lot #FL-892 */}
            <div className="rounded-xl bg-surface-container-lowest p-space-md shadow-xs border border-surface-container space-y-space-md">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm pb-space-sm bg-surface-container-low/40 p-space-sm rounded-lg">
                <div className="flex items-center gap-space-sm">
                  <div className="w-12 h-12 rounded-lg bg-primary-container text-on-primary flex items-center justify-center font-label-lg font-bold">
                    W-89
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-headline-sm text-headline-sm text-on-surface">
                        Lot #FL-892 (Sharbati Wheat)
                      </span>
                      <span className="px-2 py-0.5 rounded bg-primary-fixed-dim text-on-primary-fixed font-label-sm text-label-sm font-bold">
                        Grade A
                      </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Owner: Ramesh Patel (Kisan ID: PB-LDH-4491)
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-headline-md text-headline-md text-primary font-bold">120 Qtl</div>
                  <span className="font-label-sm text-label-sm text-tertiary font-medium">
                    12.0 MT Bulk Equivalent
                  </span>
                </div>
              </div>

              {/* Micro Visual Inspection & Spec Breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm">
                <div className="relative h-32 rounded-lg overflow-hidden group border border-surface-container">
                  <img
                    className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
                    alt="Close up photograph of golden grain Sharbati wheat kernels"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtbdJTO7gpdL7byjlUAWdBouRx9XoDAMWSpwLMe-b9F_co5e_wPe3hzXIyJiYjO4hjN4IM9sXOKg4M69d_zIipJX1FTok2bMKQt5Xwsd4aVc9XpK5U-LeKKLE4yqFTz18T-iu64K4NL1RUuV7pOoHnoXeeOs4LLl4Zdu2vTl9YXpFwmmegn1Zb35Gm6AyBWw1_IJ5f66NAkkY7flD_y3MvtcQH2VhHWEERy-vyq6MzJqQZSRIJW0oSJA"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-2">
                    <span className="font-label-sm text-label-sm text-on-primary flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px] text-tertiary-fixed">verified</span>
                      <span>Optical Specimen OK</span>
                    </span>
                  </div>
                </div>

                {/* Warehouse & Sensor Node Telemetry */}
                <div className="sm:col-span-2 grid grid-cols-2 gap-space-xs bg-surface-container-low p-space-sm rounded-lg font-label-sm text-label-sm border border-surface-container">
                  <div className="space-y-1">
                    <span className="text-on-surface-variant block">STORAGE FACILITY</span>
                    <span className="font-semibold text-on-surface text-body-sm block truncate">
                      Ludhiana Silo 4B, Bay 12
                    </span>
                    <span className="text-tertiary flex items-center gap-1 font-label-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse"></span>
                      IoT Node 4B-TEMP-LIVE
                    </span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-on-surface-variant block">MOISTURE VALUE</span>
                    <span className="font-headline-sm text-headline-sm text-primary block">11.2%</span>
                    <span className="text-tertiary font-label-sm font-semibold">&lt; 12.0% Safe Threshold</span>
                  </div>
                  <div className="space-y-1 pt-2">
                    <span className="text-on-surface-variant block">SILO AMBIENT TEMP</span>
                    <span className="font-headline-sm text-headline-sm text-on-surface block">22.4°C</span>
                    <span className="text-on-surface-variant font-label-sm">RH: 44% (Optimal)</span>
                  </div>
                  <div className="space-y-1 pt-2">
                    <span className="text-on-surface-variant block">AI GRADING SCORE</span>
                    <span className="font-headline-sm text-headline-sm text-tertiary block">99.1%</span>
                    <span className="text-tertiary font-label-sm">Zero Foreign Infestation</span>
                  </div>
                </div>
              </div>

              {/* Sensor Visual SVG Sparkline Strip */}
              <div className="bg-surface-container-low/70 rounded-lg p-space-sm flex flex-col sm:flex-row items-center justify-between gap-space-sm border border-surface-container">
                <div className="flex items-center gap-space-sm">
                  <span className="material-symbols-outlined text-primary text-[24px]">thermostat</span>
                  <div>
                    <span className="font-label-sm text-label-sm text-on-surface font-semibold block">
                      72-Hour Silo Climate Telemetry
                    </span>
                    <span className="font-label-sm text-[11px] text-on-surface-variant">
                      Continuous automated moisture tracking via LoRaWAN node
                    </span>
                  </div>
                </div>
                <div className="w-full sm:w-48 h-8 shrink-0">
                  <svg className="w-full h-full text-tertiary overflow-visible" fill="none" viewBox="0 0 160 30">
                    <path
                      d="M 0,22 Q 20,24 40,18 T 80,19 T 120,15 T 160,12"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeWidth="2.5"
                    ></path>
                    <path
                      d="M 0,22 Q 20,24 40,18 T 80,19 T 120,15 T 160,12 L 160,30 L 0,30 Z"
                      fill="currentColor"
                      fillOpacity="0.12"
                    ></path>
                    <circle className="fill-tertiary" cx="160" cy="12" r="3.5"></circle>
                  </svg>
                </div>
              </div>

              {/* Bottom Operational Action Dock */}
              <div className="flex flex-wrap items-center justify-between gap-space-sm pt-space-xs border-t border-surface-container">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onNotify('Assay Certificate PDF for Lot #FL892 downloaded.', 'success')}
                    className="px-space-sm py-2 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-sm text-label-sm flex items-center gap-1.5 transition-colors cursor-pointer"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[16px] text-primary">download</span>
                    <span>Download Cert (PDF #FL892)</span>
                  </button>
                  <button
                    onClick={() => setShowQRModal(true)}
                    className="px-space-sm py-2 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-sm text-label-sm flex items-center gap-1.5 transition-colors cursor-pointer"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[16px] text-on-surface-variant">qr_code_2</span>
                    <span>Traceability QR</span>
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-space-md py-2 rounded-lg bg-primary-container text-on-primary-container font-body-sm text-body-sm font-semibold">
                    ✓ Pledged to FPO Pool
                  </span>
                </div>
              </div>
            </div>

            {/* Additional Lot Ledger Cards */}
            <div className="space-y-space-sm">
              {[
                {
                  id: 'W-90',
                  lot: 'Lot #FL-904',
                  farmer: 'Gurpreet Singh',
                  grade: 'Grade A',
                  facility: 'Ludhiana Silo 4B',
                  moisture: '11.6%',
                  temp: '23.0°C',
                  qty: '180 Qtl'
                },
                {
                  id: 'W-91',
                  lot: 'Lot #FL-918',
                  farmer: 'Harbhajan Kaur',
                  grade: 'Grade A',
                  facility: 'Samrala Silo 2A',
                  moisture: '11.4%',
                  temp: '21.8°C',
                  qty: '300 Qtl'
                },
                {
                  id: 'W-92',
                  lot: 'Lot #FL-925',
                  farmer: 'Sukhwinder Ram',
                  grade: 'Grade A',
                  facility: 'Khanna Hub Central',
                  moisture: '11.8%',
                  temp: '22.1°C',
                  qty: '400 Qtl'
                }
              ].map((batch) => (
                <div
                  key={batch.id}
                  className="rounded-xl bg-surface-container-lowest p-space-md shadow-xs hover:shadow-md transition-shadow flex flex-col sm:flex-row sm:items-center justify-between gap-space-md border border-surface-container"
                >
                  <div className="flex items-center gap-space-sm">
                    <div className="w-10 h-10 rounded-lg bg-surface-container-highest text-on-surface flex items-center justify-center font-label-md font-bold">
                      {batch.id}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-headline-sm text-[17px] text-on-surface">
                          {batch.lot} • {batch.farmer}
                        </h4>
                        <span className="px-2 py-0.5 rounded bg-primary-fixed-dim text-on-primary-fixed font-label-sm text-label-sm font-bold">
                          {batch.grade}
                        </span>
                      </div>
                      <p className="font-label-sm text-label-sm text-on-surface-variant">
                        {batch.facility} • Moisture: {batch.moisture} • Temp: {batch.temp}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end gap-space-md">
                    <div className="text-right">
                      <div className="font-headline-sm text-headline-sm text-on-surface">{batch.qty}</div>
                      <span className="font-label-sm text-label-sm text-tertiary">Pledged to FPO</span>
                    </div>
                    <button
                      onClick={() => onNotify(`Inspecting Lot ${batch.lot} telemetry specs`, 'info')}
                      className="p-2 rounded-lg hover:bg-surface-container text-on-surface-variant hover:text-on-surface cursor-pointer"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column (5 Cols): FPO Aggregation Pool Engine & Participant Ledger */}
          <div className="lg:col-span-5 space-y-space-lg">
            {/* FPO Member Aggregation Breakdown Card */}
            <div className="rounded-xl bg-surface-container-lowest p-space-md shadow-xs border border-surface-container space-y-space-md">
              <div className="flex items-center justify-between pb-space-sm border-b border-surface-container">
                <div>
                  <span className="font-label-sm text-label-sm text-secondary font-bold uppercase tracking-wider">
                    Aggregation Ledger
                  </span>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface">
                    Kisan Vikas FPO Pool
                  </h3>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-primary-fixed-dim text-on-primary-fixed font-label-sm text-label-sm font-bold">
                  100 MT Consolidated
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                By aggregating smaller farm holdings into an institutional volume benchmark, member farmers qualify for direct procurement contracts without intermediary brokerage.
              </p>

              {/* Aggregation Composition Breakdown Stack */}
              <div className="space-y-space-xs pt-space-xs font-label-sm text-label-sm">
                {[
                  { initials: 'RP', name: 'Ramesh Patel', share: 'Ludhiana • 12% share', qty: '120 Qtl', payout: '₹3,50,400 payout' },
                  { initials: 'GS', name: 'Gurpreet Singh', share: 'Payal Tehsil • 18% share', qty: '180 Qtl', payout: '₹5,25,600 payout' },
                  { initials: 'HK', name: 'Harbhajan Kaur', share: 'Samrala • 30% share', qty: '300 Qtl', payout: '₹8,76,000 payout' },
                  { initials: 'SR', name: 'Sukhwinder Ram', share: 'Khanna Sub-Division • 40% share', qty: '400 Qtl', payout: '₹11,68,000 payout' }
                ].map((m) => (
                  <div
                    key={m.name}
                    className="p-space-sm rounded-lg bg-surface-container-low flex items-center justify-between hover:bg-surface-container transition-colors border border-surface-container/60"
                  >
                    <div className="flex items-center gap-space-sm">
                      <div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center font-bold text-on-surface text-xs">
                        {m.initials}
                      </div>
                      <div>
                        <span className="font-semibold text-on-surface block">{m.name}</span>
                        <span className="text-on-surface-variant font-label-sm text-[11px]">{m.share}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-headline-sm text-[16px] text-primary font-bold">{m.qty}</span>
                      <span className="block text-[11px] text-secondary font-semibold">{m.payout}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cumulative Financial Matrix Pill */}
              <div className="p-space-md rounded-xl bg-surface-container-high space-y-2 border border-surface-container">
                <div className="flex justify-between items-center font-label-sm text-label-sm">
                  <span className="text-on-surface-variant">Consolidated Bulk Value</span>
                  <span className="font-headline-sm text-headline-sm text-on-surface font-bold">₹29,20,000</span>
                </div>
                <div className="flex justify-between items-center font-label-sm text-label-sm text-tertiary">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">price_check</span>
                    <span>Direct FPO Bonus Rate</span>
                  </span>
                  <span className="font-bold">+ ₹70,000 Net Bonus</span>
                </div>
                <div className="pt-2 flex items-center justify-between font-label-sm text-[11px] text-on-surface-variant border-t border-surface-container-highest">
                  <span>Hyperledger Multi-Sig Escrow</span>
                  <span className="text-tertiary font-semibold">Verified Safe</span>
                </div>
              </div>

              <button
                onClick={handleSmartContractRelease}
                disabled={isContractReleased}
                className={`w-full py-3 rounded-lg font-body-sm text-body-sm font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  isContractReleased
                    ? 'bg-tertiary-container text-on-tertiary-container cursor-default'
                    : 'bg-primary hover:bg-primary-container text-on-primary active:scale-98'
                }`}
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">verified_user</span>
                <span>{isContractReleased ? 'Smart Contract Released (Verified)' : 'Execute Smart Contract Release'}</span>
              </button>
            </div>

            {/* AI Optical Inspection Scanner Widget */}
            <div className="rounded-xl bg-surface-container-lowest p-space-md shadow-xs border border-surface-container space-y-space-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-tertiary text-[20px]">document_scanner</span>
                  <h4 className="font-headline-sm text-[16px] text-on-surface">AI Camera Grain Scanner</h4>
                </div>
                <span className="px-2 py-0.5 rounded bg-surface-container-high font-label-sm text-[10px] text-on-surface-variant">
                  SIH AGR-04 TESTBED
                </span>
              </div>

              <div className="relative rounded-lg overflow-hidden h-40 border border-surface-container">
                <img
                  className="w-full h-full object-cover"
                  alt="Overhead macro view of grain sampling under digital scanner"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCbR364BDPLcsJVdX8xkZEFy7fVAjWtlLqfmW339cL7O2fosGzGkjpy6_iedBaG06HTfVckRhHtkC7zMxqSSBel_Q41TyLcx8yYZxbUajYl31QkRWgvCkUpDVjQPZZ8mwp-24OI1CbdDxWSgPQ2rHN8P-sSUmsXh4AhT1cjX7xClU8vSFecKIbyf6LlGu_eYXIYXQf2kLxlEhqIacYjDllom5z-xGzIvl7l6x5dI2iFi6XdiHs7jXAYw"
                />
                {/* Computer Vision Scanning Reticle Overlay */}
                <div className="absolute inset-0 bg-primary/10 flex flex-col justify-between p-3 pointer-events-none">
                  <div className="flex justify-between items-start">
                    <span className="font-label-sm text-[10px] bg-black/70 text-white px-2 py-0.5 rounded backdrop-blur-sm font-mono">
                      BBOX_CONFIDENCE: 98.8%
                    </span>
                    <span className="material-symbols-outlined text-secondary text-[24px] animate-pulse">
                      center_focus_strong
                    </span>
                  </div>
                  <div className="bg-black/70 backdrop-blur-md rounded p-2 text-white font-label-sm text-[11px] space-y-0.5">
                    <div className="flex justify-between">
                      <span className="text-white/80">Kernel Uniformity:</span>
                      <span className="text-tertiary-fixed font-bold">99.4%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/80">Foreign Matter:</span>
                      <span className="text-tertiary-fixed font-bold">0.12% (&lt;0.5% Grade A)</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  Batch Verified via Mobile Edge ML
                </span>
                <button
                  onClick={() => onNotify('Edge ML Telemetry: Kernel shape 6.94mm, Color ratio 98.2%, Spoilage 0.0%', 'info')}
                  className="text-primary hover:text-primary-container font-label-sm text-label-sm font-bold flex items-center gap-0.5 cursor-pointer"
                  type="button"
                >
                  <span>View Raw Telemetry</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Quality Grading Matrix (SIH Standard AGR-04) */}
        <div className="space-y-space-md">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-space-xs">
            <div>
              <span className="font-label-sm text-label-sm text-tertiary font-bold uppercase tracking-wider">
                Algorithmic Assessment
              </span>
              <h2 className="font-headline-md text-headline-md text-on-surface">
                Standardized Quality Grading Matrix
              </h2>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant max-w-md">
              Mandated benchmark according to SIH 2026 PS-AGR-04 for automated grading, ensuring fair price realization based on empirical metrics.
            </p>
          </div>

          {/* Grading Grid Bento (3 Columns) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
            {/* Grade A Card */}
            <div className="rounded-xl bg-surface-container-lowest p-space-md shadow-xs border border-primary/30 space-y-space-md relative overflow-hidden">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-space-sm">
                  <span className="w-10 h-10 rounded-lg bg-primary-fixed-dim text-on-primary-fixed flex items-center justify-center font-headline-sm text-headline-sm font-bold">
                    A
                  </span>
                  <div>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface">Grade A Premium</h3>
                    <span className="font-label-sm text-label-sm text-tertiary font-semibold">Institutional Grade</span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded bg-surface-container font-label-sm text-label-sm font-bold text-primary">
                  ₹2,920/Qtl
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Eligible for tier-1 food processing multinationals, high-protein flour millers, and strategic central reserve procurement.
              </p>
              <div className="space-y-space-xs font-label-sm text-label-sm bg-surface-container-low p-space-sm rounded-lg border border-surface-container">
                <div className="flex justify-between py-1">
                  <span className="text-on-surface-variant">Moisture Content</span>
                  <span className="font-bold text-on-surface">&lt; 12.0%</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-on-surface-variant">Foreign Matter</span>
                  <span className="font-bold text-on-surface">&lt; 0.5%</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-on-surface-variant">Immature / Shriveled Grains</span>
                  <span className="font-bold text-on-surface">&lt; 1.0%</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-on-surface-variant">Infestation Index</span>
                  <span className="font-bold text-tertiary">0.0% (Zero Tolerance)</span>
                </div>
              </div>
              <div className="flex items-center justify-between pt-space-xs font-label-sm text-label-sm">
                <span className="text-on-surface-variant">Pool Status:</span>
                <span className="px-2 py-0.5 rounded bg-primary-container text-on-primary-container font-bold">
                  100% Meets Grade A
                </span>
              </div>
            </div>

            {/* Grade B Card */}
            <div className="rounded-xl bg-surface-container-lowest p-space-md shadow-xs border border-surface-container space-y-space-md">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-space-sm">
                  <span className="w-10 h-10 rounded-lg bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center font-headline-sm text-headline-sm font-bold">
                    B
                  </span>
                  <div>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface">Grade B Standard</h3>
                    <span className="font-label-sm text-label-sm text-secondary font-semibold">Local Mandi Grade</span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded bg-surface-container font-label-sm text-label-sm font-bold text-on-surface">
                  ₹2,680/Qtl
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Standard market grade for regional retail, domestic consumption, and traditional mandi auctions with moderate cleaning.
              </p>
              <div className="space-y-space-xs font-label-sm text-label-sm bg-surface-container-low p-space-sm rounded-lg border border-surface-container">
                <div className="flex justify-between py-1">
                  <span className="text-on-surface-variant">Moisture Content</span>
                  <span className="font-bold text-on-surface">12.0% – 14.0%</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-on-surface-variant">Foreign Matter</span>
                  <span className="font-bold text-on-surface">0.5% – 1.5%</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-on-surface-variant">Immature / Shriveled Grains</span>
                  <span className="font-bold text-on-surface">1.0% – 3.0%</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-on-surface-variant">Infestation Index</span>
                  <span className="font-bold text-on-surface">&lt; 0.5% max</span>
                </div>
              </div>
              <div className="flex items-center justify-between pt-space-xs font-label-sm text-label-sm">
                <span className="text-on-surface-variant">Drying Advisory:</span>
                <span className="text-secondary font-semibold">Requires 4hr Aeration</span>
              </div>
            </div>

            {/* Grade C Card */}
            <div className="rounded-xl bg-surface-container-lowest p-space-md shadow-xs border border-surface-container space-y-space-md">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-space-sm">
                  <span className="w-10 h-10 rounded-lg bg-surface-container-highest text-on-surface flex items-center justify-center font-headline-sm text-headline-sm font-bold">
                    C
                  </span>
                  <div>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface">Grade C Distress</h3>
                    <span className="font-label-sm text-label-sm text-error font-semibold">Feed / Industrial</span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded bg-surface-container font-label-sm text-label-sm font-bold text-error">
                  ₹2,240/Qtl
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Diverted to cattle feed production, ethanol distilleries, or requires substantial industrial drying and dedusting.
              </p>
              <div className="space-y-space-xs font-label-sm text-label-sm bg-surface-container-low p-space-sm rounded-lg border border-surface-container">
                <div className="flex justify-between py-1">
                  <span className="text-on-surface-variant">Moisture Content</span>
                  <span className="font-bold text-error">&gt; 14.0%</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-on-surface-variant">Foreign Matter</span>
                  <span className="font-bold text-error">&gt; 1.5%</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-on-surface-variant">Immature / Shriveled Grains</span>
                  <span className="font-bold text-error">&gt; 3.0%</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-on-surface-variant">Discoloration</span>
                  <span className="font-bold text-error">Visible Mold / Rust</span>
                </div>
              </div>
              <div className="flex items-center justify-between pt-space-xs font-label-sm text-label-sm">
                <span className="text-on-surface-variant">Remediation:</span>
                <span className="text-on-surface-variant">Solar Dryer Subsidy Eligible</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Logistics & Route Optimization Map Preview */}
        <div className="rounded-xl bg-surface-container-lowest p-space-md md:p-space-lg shadow-xs border border-surface-container space-y-space-md">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-sm">
            <div>
              <span className="font-label-sm text-label-sm text-tertiary font-bold uppercase tracking-wider">
                Transit Optimization
              </span>
              <h2 className="font-headline-md text-headline-md text-on-surface">
                Farm-to-Warehouse Logistics Engine
              </h2>
            </div>
            <div className="flex flex-wrap items-center gap-space-sm">
              <span className="px-3 py-1 rounded bg-surface-container font-label-sm text-label-sm text-on-surface-variant">
                Route: NH-44 / GT Road Corridor
              </span>
              <span className="px-3 py-1 rounded bg-primary-container text-on-primary-container font-label-sm text-label-sm font-semibold">
                {isWaybillConfirmed ? 'Carrier Dispatched' : 'Fleet Standby'}
              </span>
            </div>
          </div>

          {/* Route Planner Map + Dispatch Specs Split View */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-md items-stretch">
            {/* Left 7 Cols: Map Container */}
            <div className="lg:col-span-7 rounded-xl overflow-hidden shadow-xs relative min-h-[340px] flex flex-col justify-between border border-surface-container">
              <div
                className="absolute inset-0 w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCZYCuPlasDgkZQjn7KdFFh6Ft5kqg0xgkHrdbvR7kzKKuVYW33KHUTLTn1TwwEe6lML9Iq-kHM2z-0CsS3ngX7l4YJ9mAijf_OPnLP6WXM4mR2_VgJEimWwvo6yZH17YzR_hlFNGpWwIXoUcc1gzwyq9olXoiwbbNZTLUuXHRykhhFwh2L9MGTatCtqb54PLpHO8q__wOsXNqgkNthFjJFsQrCkpnYCQWzvI5FA1XYnwuJVi0m_XU0Og')`
                }}
              ></div>

              {/* Tactical HUD Map Overlays */}
              <div className="relative z-10 p-space-sm flex justify-between items-start">
                <div className="bg-surface-container-lowest/90 backdrop-blur-md px-3 py-1.5 rounded-lg shadow-sm font-label-sm text-label-sm space-y-0.5 border border-surface-container">
                  <span className="text-on-surface-variant block text-[10px]">ORIGIN: RAMESH PATEL FARM</span>
                  <span className="font-bold text-on-surface">Doraha Cluster (PB-LDH)</span>
                </div>
                <div className="bg-surface-container-lowest/90 backdrop-blur-md px-3 py-1.5 rounded-lg shadow-sm font-label-sm text-label-sm space-y-0.5 text-right border border-surface-container">
                  <span className="text-on-surface-variant block text-[10px]">DESTINATION SILO</span>
                  <span className="font-bold text-primary">Ludhiana Warehouse 4B</span>
                </div>
              </div>

              <div className="relative z-10 p-space-sm flex flex-wrap items-center justify-between gap-2 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white rounded-b-xl">
                <div className="flex items-center gap-space-sm font-label-sm text-label-sm">
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px] text-tertiary-fixed">navigation</span>
                    <span>Distance: <strong className="text-white">42 km</strong></span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px] text-secondary-fixed">schedule</span>
                    <span>Est. Transit: <strong className="text-white">1 hr 15 mins</strong></span>
                  </div>
                </div>
                <div className="font-label-sm text-label-sm bg-black/60 px-2 py-1 rounded backdrop-blur-sm">
                  GPS Telemetry Ping: 2m ago
                </div>
              </div>
            </div>

            {/* Right 5 Cols: Carrier Allocation & Cost Benchmark */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-space-sm bg-surface-container-low p-space-md rounded-xl border border-surface-container">
              <div className="space-y-space-sm">
                <span className="font-label-sm text-label-sm text-on-surface-variant font-bold uppercase tracking-wider">
                  Fleet Assignment
                </span>

                {/* Carrier Option 1 */}
                <div className="p-space-sm rounded-lg bg-surface-container-lowest shadow-xs space-y-2 border border-primary/30">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-[22px]">local_shipping</span>
                      <div>
                        <h4 className="font-headline-sm text-[16px] text-on-surface">Ashok Leyland 16-Ton</h4>
                        <span className="font-label-sm text-label-sm text-on-surface-variant">Reg: PB-10-CZ-8821</span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-primary-fixed-dim text-on-primary-fixed font-label-sm text-label-sm font-bold">
                      Selected
                    </span>
                  </div>
                  <div className="flex justify-between items-center font-label-sm text-label-sm pt-1">
                    <span className="text-on-surface-variant">Capacity: 160 Qtl Payload</span>
                    <span className="font-bold text-on-surface">Driver: Jaspal Singh (Verified)</span>
                  </div>
                </div>

                {/* Carrier Option 2 */}
                <div className="p-space-sm rounded-lg bg-surface-container-lowest/60 hover:bg-surface-container-lowest transition-colors space-y-1 border border-surface-container">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-on-surface-variant text-[20px]">airport_shuttle</span>
                      <div>
                        <h5 className="font-headline-sm text-[15px] text-on-surface">Tata 407 Feeder Unit</h5>
                        <span className="font-label-sm text-label-sm text-on-surface-variant">Reg: PB-10-BT-3310 (Standby)</span>
                      </div>
                    </div>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">Feeder Link</span>
                  </div>
                  <div className="flex justify-between items-center font-label-sm text-label-sm">
                    <span className="text-on-surface-variant">Capacity: 35 Qtl Local Transfer</span>
                    <span className="text-on-surface font-medium">₹38/Qtl Rate</span>
                  </div>
                </div>

                {/* Freight Economics Breakdown */}
                <div className="pt-space-xs space-y-1.5 font-label-sm text-label-sm border-t border-surface-container">
                  <div className="flex justify-between items-center">
                    <span className="text-on-surface-variant">Aggregated Freight Cost:</span>
                    <span className="font-headline-sm text-[17px] text-primary font-bold">₹32 / Quintal</span>
                  </div>
                  <div className="flex justify-between items-center text-on-surface-variant">
                    <span>Subsidized Agri-Corridor Rate:</span>
                    <span>- ₹6 / Qtl Central Rebate</span>
                  </div>
                  <div className="flex justify-between items-center text-on-surface-variant">
                    <span>Net Farmer Payable:</span>
                    <span className="font-semibold text-on-surface">₹26 / Quintal</span>
                  </div>
                </div>
              </div>

              {/* Dispatch Execution Button */}
              <div className="pt-space-sm">
                <button
                  onClick={handleWaybillConfirm}
                  disabled={isWaybillConfirmed}
                  className={`w-full py-3 rounded-lg font-body-sm text-body-sm font-semibold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    isWaybillConfirmed
                      ? 'bg-tertiary-container text-on-tertiary-container cursor-default'
                      : 'bg-primary hover:bg-primary-container text-on-primary active:scale-98'
                  }`}
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">share_location</span>
                  <span>{isWaybillConfirmed ? 'Waybill Dispatched (#TR-9902)' : 'Confirm Freight Waybill #TR-9902'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* QR Code Modal */}
      {showQRModal && (
        <div className="fixed inset-0 z-50 bg-inverse-surface/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-2xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl border border-surface-container">
            <div className="flex justify-between items-center">
              <span className="font-headline-sm text-headline-sm text-on-surface">
                Lot Traceability QR
              </span>
              <button
                onClick={() => setShowQRModal(false)}
                className="p-1 rounded-full text-on-surface-variant hover:bg-surface-container"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="p-4 bg-surface-container-low rounded-xl inline-block border border-surface-container">
              {/* SVG QR Code representation */}
              <svg className="w-48 h-48 mx-auto" viewBox="0 0 100 100" fill="none">
                <rect width="100" height="100" fill="#ffffff" />
                <rect x="10" y="10" width="24" height="24" fill="#00652c" />
                <rect x="14" y="14" width="16" height="16" fill="#ffffff" />
                <rect x="18" y="18" width="8" height="8" fill="#00652c" />

                <rect x="66" y="10" width="24" height="24" fill="#00652c" />
                <rect x="70" y="14" width="16" height="16" fill="#ffffff" />
                <rect x="74" y="18" width="8" height="8" fill="#00652c" />

                <rect x="10" y="66" width="24" height="24" fill="#00652c" />
                <rect x="14" y="70" width="16" height="16" fill="#ffffff" />
                <rect x="18" y="74" width="8" height="8" fill="#00652c" />

                <rect x="42" y="12" width="6" height="12" fill="#00652c" />
                <rect x="52" y="20" width="8" height="6" fill="#00652c" />
                <rect x="40" y="40" width="20" height="20" fill="#15803d" />
                <rect x="46" y="46" width="8" height="8" fill="#ffffff" />

                <rect x="12" y="42" width="8" height="8" fill="#00652c" />
                <rect x="24" y="48" width="8" height="6" fill="#00652c" />
                <rect x="68" y="42" width="12" height="6" fill="#00652c" />
                <rect x="82" y="52" width="6" height="14" fill="#00652c" />

                <rect x="42" y="68" width="14" height="8" fill="#00652c" />
                <rect x="62" y="74" width="8" height="14" fill="#00652c" />
                <rect x="76" y="68" width="12" height="6" fill="#00652c" />
                <rect x="44" y="82" width="10" height="8" fill="#00652c" />
              </svg>
            </div>
            <div className="text-left font-label-sm text-label-sm space-y-1 bg-surface-container-low p-3 rounded-lg">
              <div><strong className="text-on-surface">Batch ID:</strong> #FL-892-SHARBATI-306</div>
              <div><strong className="text-on-surface">Farmer ID:</strong> PB-LDH-4491 (Aadhaar KYC)</div>
              <div><strong className="text-on-surface">NABL Lab Cert:</strong> #NABL-PB-2026-091</div>
              <div><strong className="text-on-surface">Hyperledger Hash:</strong> a74f901c2...09bc</div>
            </div>
            <button
              onClick={() => {
                setShowQRModal(false);
                onNotify('Traceability link copied to clipboard.', 'info');
              }}
              className="w-full py-2.5 rounded-lg bg-primary text-on-primary font-body-sm text-body-sm font-semibold hover:bg-primary-container"
            >
              Copy Verification URL
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
