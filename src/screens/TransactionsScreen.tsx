import React, { useState } from 'react';
import { NavTab } from '../types';

interface TransactionsScreenProps {
  onSelectTab: (tab: NavTab) => void;
  onNotify: (msg: string, type?: 'success' | 'info' | 'warning') => void;
  initialSubView?: 'deal' | 'buyer' | 'arch';
}

export const TransactionsScreen: React.FC<TransactionsScreenProps> = ({
  onSelectTab,
  onNotify,
  initialSubView = 'deal',
}) => {
  const [subView, setSubView] = useState<'deal' | 'buyer' | 'arch'>(initialSubView);
  const [archTab, setArchTab] = useState<'schema' | 'apis' | 'setup'>('schema');
  const [currentStep, setCurrentStep] = useState(3);
  const [payMethod, setPayMethod] = useState<'upi' | 'neft' | 'agri'>('upi');
  const [txnRef, setTxnRef] = useState('TXN_FAS_9928174620');
  const [isProcessingPayout, setIsProcessingPayout] = useState(false);

  const stepMeta = [
    { title: 'Offer Accepted by Ramesh Patel & ITC', desc: 'Digital agreement countersigned' },
    { title: 'Escrow Locked in YES Bank Agro Vault', desc: '100% of ₹5,76,000 quarantined' },
    { title: 'QC Check Verified by NABL Field Lab', desc: 'Grade A Assured (Moisture: 11.2%)' },
    { title: 'Produce In-Transit (GPS Tracked)', desc: 'E-Way Bill PB-10-CZ-4029 Generated' },
    { title: 'Weighbridge Delivery Confirmed at ITC Hub', desc: '200.00 Qtl received with zero moisture loss' },
    { title: 'Payout Released! ₹5,76,000 into SBI Farmer Acc', desc: 'Direct Bank Credit (UTR: SBI002914819)' },
  ];

  const handleAdvanceStep = () => {
    if (currentStep < 6) {
      const next = currentStep + 1;
      setCurrentStep(next);
      onNotify(`Escrow Contract advanced to Stage 0${next}: ${stepMeta[next - 1].title}`, 'success');
    } else {
      onNotify('Settlement lifecycle already at final state: Payout Completed.', 'info');
    }
  };

  const handleResetStep = () => {
    setCurrentStep(1);
    onNotify('Simulation contract reset to Stage 01: Offer Accepted.', 'info');
  };

  const handleSimulatePayout = () => {
    setIsProcessingPayout(true);
    setTimeout(() => {
      setIsProcessingPayout(false);
      setCurrentStep(6);
      onNotify('Success! ₹5,76,000 credited to Ramesh Patel SBI Acc **4812 via IMPS 2.0 (UTR: SBI09218).', 'success');
    }, 1200);
  };

  const handlePayMethodChange = (m: 'upi' | 'neft' | 'agri') => {
    setPayMethod(m);
    if (m === 'upi') {
      setTxnRef('TXN_UPI_' + Math.floor(1000000000 + Math.random() * 9000000000));
      onNotify('Switched Escrow Route: UPI 2.0 Recurring Mandate', 'info');
    } else if (m === 'neft') {
      setTxnRef('TXN_RTGS_' + Math.floor(1000000000 + Math.random() * 9000000000));
      onNotify('Switched Escrow Route: RTGS Corporate Vault', 'info');
    } else {
      setTxnRef('TXN_KCC_LIEN_' + Math.floor(1000000000 + Math.random() * 9000000000));
      onNotify('Switched Escrow Route: Kisan Credit Card Lien Pledge', 'info');
    }
  };

  const handleDownloadInvoice = () => {
    onNotify('Generating Signed Form 8A PDF... Download will start automatically.', 'success');
    window.print();
  };

  return (
    <div className="flex flex-col w-full pb-space-xl">
      {/* Primary Architecture & Sub-view Controller Header */}
      <section className="w-full max-w-[1440px] mx-auto px-margin-sm md:px-margin pt-6 pb-4">
        <div className="flex flex-wrap items-center justify-between gap-space-md mb-3">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded-full bg-primary-container text-on-primary-container font-label-sm text-label-sm uppercase tracking-wider flex items-center gap-1.5 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-tertiary-fixed animate-ping"></span>
              <span>ESCROW SETTLEMENT ENGINE v4.2</span>
            </span>
            <span className="px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm">
              SIH-2026 BENCH-TEST ID: <strong className="text-on-surface font-semibold">PS-AGR-04</strong>
            </span>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setSubView('deal')}
              className={`px-3.5 py-1.5 rounded-lg font-label-md text-label-md transition-all flex items-center gap-1.5 cursor-pointer ${
                subView === 'deal'
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'bg-surface-container hover:bg-surface-container-high text-on-surface'
              }`}
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">account_balance_wallet</span>
              <span>Escrow &amp; Deal Simulator</span>
            </button>

            <button
              onClick={() => setSubView('buyer')}
              className={`px-3.5 py-1.5 rounded-lg font-label-md text-label-md transition-all flex items-center gap-1.5 cursor-pointer ${
                subView === 'buyer'
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'bg-surface-container hover:bg-surface-container-high text-on-surface'
              }`}
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">domain</span>
              <span>Buyer Telemetry</span>
            </button>

            <button
              onClick={() => setSubView('arch')}
              className={`px-3.5 py-1.5 rounded-lg font-label-md text-label-md transition-all flex items-center gap-1.5 cursor-pointer ${
                subView === 'arch'
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'bg-surface-container hover:bg-surface-container-high text-on-surface'
              }`}
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">terminal</span>
              <span>SIH Tech Docs &amp; Schema</span>
            </button>
          </div>
        </div>
      </section>

      {/* VIEW 1: DEAL & ESCROW PAYMENT SIMULATION (DEFAULT) */}
      {subView === 'deal' && (
        <section className="w-full max-w-[1440px] mx-auto px-margin-sm md:px-margin space-y-space-lg mb-space-xl">
          {/* Hero Contract Overview Card */}
          <div className="w-full bg-surface-container-lowest rounded-xl p-space-lg shadow-xs border border-surface-container flex flex-col lg:flex-row gap-space-lg justify-between items-start lg:items-center">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="font-label-md text-label-md text-primary font-semibold uppercase tracking-wider">
                  e-NAM &amp; Bharat-e-Vault Compliant
                </span>
                <span className="text-outline-variant">•</span>
                <span className="font-label-md text-label-md text-on-surface-variant">
                  Created: 24-Feb-2026 09:42 IST
                </span>
              </div>
              <h1 className="font-headline-lg text-headline-lg text-on-surface">
                Contract <span className="text-primary tracking-tight">#AGR-2026-8819</span>
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-on-surface-variant font-body-sm text-body-sm">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-surface-container-high flex items-center justify-center text-primary font-label-sm font-semibold">
                    S
                  </span>
                  <div>
                    <strong className="text-on-surface">Ramesh Patel</strong> (Farmer ID: PB-LDH-4412) • Barnala, Punjab
                  </div>
                </div>
                <span className="text-outline-variant">⇄</span>
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-surface-container-high flex items-center justify-center text-secondary font-label-sm font-semibold">
                    B
                  </span>
                  <div>
                    <strong className="text-on-surface">ITC Agro Processing Hub</strong> (GSTIN: 03AAACI1681G1Z7) • Jalandhar
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-surface-container-low rounded-xl p-space-md flex flex-wrap gap-space-lg items-center w-full lg:w-auto border border-surface-container">
              <div className="pr-space-md">
                <span className="block font-label-sm text-label-sm text-on-surface-variant uppercase">Lot Volume &amp; Rate</span>
                <span className="font-headline-md text-headline-md text-on-surface">
                  200 <span className="font-body-sm text-body-sm font-normal text-on-surface-variant">Qtl Sharbati Wheat</span>
                </span>
                <span className="block font-label-sm text-label-sm text-primary">₹2,880.00 / Qtl (Grade-A Assured)</span>
              </div>
              <div className="pl-space-md border-l border-surface-container-highest">
                <span className="block font-label-sm text-label-sm text-on-surface-variant uppercase">Total Gross Escrow</span>
                <span className="font-headline-lg text-headline-lg text-tertiary">₹5,76,000</span>
                <span className="block font-label-sm text-label-sm text-on-surface-variant">Zero-Commission Kisan Yield Pool</span>
              </div>
            </div>
          </div>

          {/* 6-Step Interactive Settlement Tracker */}
          <div className="w-full bg-surface-container-lowest rounded-xl p-space-lg shadow-xs border border-surface-container">
            <div className="flex flex-col md:flex-row md:items-center justify-between pb-space-md gap-2 border-b border-surface-container">
              <div>
                <h2 className="font-headline-sm text-headline-sm text-on-surface">
                  Cryptographic Escrow State Flow
                </h2>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Step transitions enforce automatic multi-sig smart escrow checks via UPI 2.0 Mandates.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleResetStep}
                  className="px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high font-label-md text-label-md text-on-surface transition-colors flex items-center gap-1 cursor-pointer"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[16px]">restart_alt</span>
                  <span>Reset Demo</span>
                </button>
                <button
                  onClick={handleAdvanceStep}
                  className="px-4 py-1.5 rounded-lg bg-primary text-on-primary font-label-md text-label-md hover:bg-primary-container transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
                  type="button"
                >
                  <span>Advance to Next Step</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </div>
            </div>

            {/* Stepper Grid (6 Steps) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 pt-space-sm">
              {[
                { step: 1, title: 'Offer Accepted', sub: 'Matched via AI Engine', note: 'Completed: 09:42 IST', icon: 'check_circle' },
                { step: 2, title: 'Escrow Funded', sub: 'Buyer Locked ₹5.76L', note: 'Vault: YESB0000001', icon: 'lock' },
                { step: 3, title: 'QC Check Verified', sub: 'Moisture 11.2% • Grade A', note: 'Verifier: FPO Labs LDH', icon: 'biotech' },
                { step: 4, title: 'Dispatched', sub: 'E-Way Bill #990141', note: 'Fleet: PB-10-CZ-4029', icon: 'local_shipping' },
                { step: 5, title: 'Delivery Confirmed', sub: 'ITC Hub Weighbridge', note: 'Pending Consignee OTP', icon: 'inventory' },
                { step: 6, title: 'Payout Released', sub: 'Direct Bank Credit', note: 'SBI Acc **4812', icon: 'currency_rupee' },
              ].map((s) => {
                const isPassed = s.step < currentStep;
                const isCurrent = s.step === currentStep;

                let cardClass = 'bg-surface-container-low text-on-surface-variant opacity-70';
                if (isPassed) {
                  cardClass = 'bg-primary-container text-on-primary-container shadow-xs';
                } else if (isCurrent) {
                  cardClass = 'bg-surface-container-high text-on-surface shadow-xs ring-2 ring-primary';
                }

                return (
                  <div
                    key={s.step}
                    className={`p-3 rounded-lg flex flex-col justify-between min-h-[130px] transition-all border border-surface-container/60 ${cardClass}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`font-label-sm text-label-sm uppercase font-semibold ${isCurrent ? 'text-primary' : ''}`}>
                        Stage 0{s.step} {isCurrent ? '(Active)' : ''}
                      </span>
                      <span className={`material-symbols-outlined text-[20px] ${isCurrent ? 'text-primary animate-pulse' : ''}`}>
                        {s.icon}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-label-lg text-label-lg font-bold">{s.title}</h3>
                      <p className="font-label-sm text-label-sm opacity-90">{s.sub}</p>
                    </div>
                    <span className="font-label-sm text-label-sm opacity-80">{s.note}</span>
                  </div>
                );
              })}
            </div>

            {/* Live Pipeline State Banner */}
            <div className="mt-4 p-3 rounded-lg bg-surface-container flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border border-surface-container-highest">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-tertiary text-[20px]">verified_user</span>
                <span className="font-body-sm text-body-sm text-on-surface">
                  Status: <strong className="text-tertiary">{stepMeta[currentStep - 1].title}</strong>
                </span>
              </div>
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                Telemetry Ping: 12ms | Multi-sig 2/3 signed ({stepMeta[currentStep - 1].desc})
              </span>
            </div>
          </div>

          {/* Dual Split Simulation Deck: Mock Gateway Terminal vs Digital Bill of Supply */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
            {/* Mock Payment Gateway Terminal (Col 5) */}
            <div className="lg:col-span-5 bg-surface-container-lowest rounded-xl p-space-lg shadow-xs border border-surface-container flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-space-sm mb-space-sm border-b border-surface-container">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[24px]">terminal</span>
                    <h2 className="font-headline-sm text-headline-sm text-on-surface">Agri-Escrow Terminal</h2>
                  </div>
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-label-sm text-label-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
                    <span>Sandbox Gateway</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Payment Channel Switcher */}
                  <div>
                    <label className="block font-label-sm text-label-sm text-on-surface-variant uppercase mb-1.5 font-semibold">
                      Escrow Authorization Route
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        onClick={() => handlePayMethodChange('upi')}
                        className={`py-2.5 px-2 rounded-lg font-label-md text-label-md text-center transition-all flex flex-col items-center gap-1 cursor-pointer ${
                          payMethod === 'upi'
                            ? 'bg-surface-container-high text-on-surface ring-1 ring-primary font-bold shadow-xs'
                            : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                        }`}
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[18px] text-primary">smartphone</span>
                        <span>UPI 2.0 Mandate</span>
                      </button>

                      <button
                        onClick={() => handlePayMethodChange('neft')}
                        className={`py-2.5 px-2 rounded-lg font-label-md text-label-md text-center transition-all flex flex-col items-center gap-1 cursor-pointer ${
                          payMethod === 'neft'
                            ? 'bg-surface-container-high text-on-surface ring-1 ring-primary font-bold shadow-xs'
                            : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                        }`}
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[18px]">account_balance</span>
                        <span>RTGS / NEFT</span>
                      </button>

                      <button
                        onClick={() => handlePayMethodChange('agri')}
                        className={`py-2.5 px-2 rounded-lg font-label-md text-label-md text-center transition-all flex flex-col items-center gap-1 cursor-pointer ${
                          payMethod === 'agri'
                            ? 'bg-surface-container-high text-on-surface ring-1 ring-primary font-bold shadow-xs'
                            : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                        }`}
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[18px]">token</span>
                        <span>Agri-Credit Lien</span>
                      </button>
                    </div>
                  </div>

                  {/* Pre-filled Transaction Meta */}
                  <div className="space-y-2 bg-surface-container-low p-3 rounded-lg font-label-sm text-label-sm border border-surface-container">
                    <div className="flex justify-between">
                      <span className="text-on-surface-variant">Target Escrow Vault:</span>
                      <span className="text-on-surface font-semibold">YESB-FASLYNK-TRUST-ESCROW</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-on-surface-variant">Simulated Txn Ref:</span>
                      <span className="text-primary font-semibold">{txnRef}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-on-surface-variant">Settlement Cycle:</span>
                      <span className="text-on-surface font-semibold">T+0 Real-Time Payout</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-on-surface-variant">Mandi User Levy (0.5%):</span>
                      <span className="text-on-surface font-semibold">₹2,880 (Paid by Buyer)</span>
                    </div>
                  </div>

                  {/* Interoperable Provider Badges */}
                  <div className="flex items-center justify-around py-2 px-3 bg-surface-container rounded-lg border border-surface-container-highest">
                    <div className="flex items-center gap-1 text-on-surface-variant font-label-sm text-label-sm">
                      <span className="material-symbols-outlined text-primary text-[18px]">security</span>
                      <span>NPCI Agri-UPI Node</span>
                    </div>
                    <span className="text-outline-variant">|</span>
                    <div className="flex items-center gap-1 text-on-surface-variant font-label-sm text-label-sm">
                      <span className="material-symbols-outlined text-secondary text-[18px]">bolt</span>
                      <span>RazorpayX Smart Route</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 space-y-2 border-t border-surface-container mt-4">
                <button
                  onClick={handleSimulatePayout}
                  disabled={isProcessingPayout}
                  className="w-full h-12 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-headline-sm text-headline-sm transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer active:scale-98 disabled:opacity-70"
                  type="button"
                >
                  <span className={`material-symbols-outlined text-[20px] ${isProcessingPayout ? 'animate-spin' : ''}`}>
                    {isProcessingPayout ? 'refresh' : 'payments'}
                  </span>
                  <span>{isProcessingPayout ? 'Processing IMPS Release...' : 'Simulate Escrow Payout (₹5,76,000)'}</span>
                </button>
                <p className="font-label-sm text-label-sm text-center text-on-surface-variant">
                  Initiates simulated IMPS/NEFT transfer directly to Farmer Account (SBI LDH #0988)
                </p>
              </div>
            </div>

            {/* Digital Bill of Supply (Col 7) */}
            <div className="lg:col-span-7 bg-surface-container-lowest rounded-xl p-space-lg shadow-xs border border-surface-container">
              <div className="flex flex-wrap items-center justify-between pb-space-sm mb-space-sm border-b border-surface-container">
                <div>
                  <span className="font-label-sm text-label-sm text-primary font-semibold uppercase">
                    Form 8A - Agro Commodity Invoice
                  </span>
                  <h2 className="font-headline-sm text-headline-sm text-on-surface">
                    Digital Bill of Supply
                  </h2>
                </div>
                <button
                  onClick={handleDownloadInvoice}
                  className="px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm flex items-center gap-1 transition-colors cursor-pointer"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[16px]">download</span>
                  <span>PDF Export</span>
                </button>
              </div>

              <div className="space-y-4">
                {/* Parties Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-surface-container-low p-3.5 rounded-lg border border-surface-container">
                  <div className="space-y-1">
                    <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">
                      Consignor (Farmer / Seller)
                    </span>
                    <p className="font-body-sm text-body-sm font-semibold text-on-surface">
                      Ramesh Patel (FPO Shareholder)
                    </p>
                    <p className="font-label-sm text-label-sm text-on-surface-variant">
                      Khasra 402/1, Barnala Sub-District, Punjab
                    </p>
                    <p className="font-label-sm text-label-sm text-primary font-semibold">
                      e-NAM Reg: PB-NAM-2024-8891
                    </p>
                  </div>
                  <div className="space-y-1">
                    <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">
                      Consignee (Bulk Buyer)
                    </span>
                    <p className="font-body-sm text-body-sm font-semibold text-on-surface">
                      ITC Agro Processing Hub Ltd.
                    </p>
                    <p className="font-label-sm text-label-sm text-on-surface-variant">
                      Plot 12-B, Focal Point Industrial Area, Jalandhar
                    </p>
                    <p className="font-label-sm text-label-sm text-secondary font-semibold">
                      GSTIN: 03AAACI1681G1Z7
                    </p>
                  </div>
                </div>

                {/* Line Items Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left font-body-sm text-body-sm">
                    <thead className="bg-surface-container font-label-sm text-label-sm text-on-surface-variant uppercase">
                      <tr>
                        <th className="p-2.5">HSN / Description</th>
                        <th className="p-2.5 text-right">Qty (Qtl)</th>
                        <th className="p-2.5 text-right">Base Rate</th>
                        <th className="p-2.5 text-right">Quality Index</th>
                        <th className="p-2.5 text-right">Total (INR)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-surface-container font-label-md text-label-md">
                      <tr className="hover:bg-surface-container-low">
                        <td className="p-2.5 font-semibold text-on-surface">
                          10019910 - Sharbati Wheat (A-Grade)
                        </td>
                        <td className="p-2.5 text-right font-mono">200.00</td>
                        <td className="p-2.5 text-right font-mono">₹2,880.00</td>
                        <td className="p-2.5 text-right text-tertiary font-bold">+0.8% Bonus</td>
                        <td className="p-2.5 text-right font-mono font-bold text-on-surface">₹5,76,000.00</td>
                      </tr>
                      <tr className="text-on-surface-variant">
                        <td className="p-2.5">CGST / SGST (Exempt under Sec 11)</td>
                        <td className="p-2.5 text-right font-mono">-</td>
                        <td className="p-2.5 text-right font-mono">0.00%</td>
                        <td className="p-2.5 text-right">-</td>
                        <td className="p-2.5 text-right font-mono">₹0.00</td>
                      </tr>
                      <tr className="text-on-surface-variant">
                        <td className="p-2.5">State Agricultural Marketing Board Cess (1%)</td>
                        <td className="p-2.5 text-right font-mono">-</td>
                        <td className="p-2.5 text-right font-mono">Remitted by ITC</td>
                        <td className="p-2.5 text-right font-mono">Form 6A</td>
                        <td className="p-2.5 text-right font-mono text-on-surface">₹5,760.00</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Total Calculation Ledger */}
                <div className="p-3.5 bg-surface-container rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border border-surface-container-highest">
                  <div>
                    <span className="font-label-sm text-label-sm text-on-surface-variant uppercase block">
                      Net Payout to Farmer Account
                    </span>
                    <span className="font-headline-sm text-headline-sm text-primary font-bold">
                      ₹5,76,000.00
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-3 py-1 rounded-full bg-primary-container text-on-primary-container font-label-sm text-label-sm font-semibold">
                      ✓ Tax Exempt under Agricultural Code
                    </span>
                    <p className="font-label-sm text-label-sm text-on-surface-variant mt-1">
                      Hash: e8f142b9c7921a8...verified
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Traceability Micro-Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
            <div className="relative rounded-xl overflow-hidden shadow-xs bg-surface-container-high h-44 flex flex-col justify-end p-4 border border-surface-container">
              <img
                className="absolute inset-0 w-full h-full object-cover"
                alt="Physical Inspection Wheat Lot #LDH-402"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAMNE_u-CqKUdkaCnAXRxuyciP2KeVnyTL7WRvKLUUnmwFJraMWTWC2fDkHYCC98djWvg4hS45z5ps1A3asvG-MRqb5vA3d4TrYL3DRcydD0_IoFZ5-Aw_kiPQwajbeaMuo6uETfc6OqT09F6J8wD6yWTyRb2yQVq5JBLnBM_pDC40GuCV3bIsdXK9mEMZGQVfTyij8T-iwkNeVAVIvIrxhN9veqyt4Ecp5jojTBtDRT6DB-VBR21QBoA"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
              <div className="relative z-10 text-white">
                <span className="px-2 py-0.5 rounded bg-primary text-on-primary font-label-sm text-label-sm uppercase">
                  Physical Inspection
                </span>
                <p className="font-headline-sm text-headline-sm leading-tight mt-1">Wheat Lot #LDH-402</p>
                <p className="font-label-sm text-label-sm opacity-90">Barnala Aggregation Center Yard 3</p>
              </div>
            </div>

            <div className="relative rounded-xl overflow-hidden shadow-xs bg-surface-container-high h-44 flex flex-col justify-end p-4 border border-surface-container">
              <img
                className="absolute inset-0 w-full h-full object-cover"
                alt="Moisture Assay Test"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDCRn64TCqECbaHWMuHzHUR7QjGBaAM4viEKpXkGjXztX2wFEoms89jCLnCuXw6llN2w5xOAJq01jfk1_kkCJVsaTitAUlEVUqDFBFD-yErruQCiEzjE41rtGdDZ-kx4RClmG0FX_vvIrikWPHCKFRKtKVp32qioyG5QSLEbf5nB165X3m9Piwb-yOXzRz9BipQEm6TKqQQEy2OeTfEzfEEVckVM0vJKAMvoYBaNNCoxqmenvRpRQDP0A"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
              <div className="relative z-10 text-white">
                <span className="px-2 py-0.5 rounded bg-secondary-container text-on-secondary-container font-label-sm text-label-sm uppercase">
                  Assay Test
                </span>
                <p className="font-headline-sm text-headline-sm leading-tight mt-1">Moisture 11.2% (Grade A)</p>
                <p className="font-label-sm text-label-sm opacity-90">Certified via Spectrometer Assay</p>
              </div>
            </div>

            <div className="relative rounded-xl overflow-hidden shadow-xs bg-surface-container-high h-44 flex flex-col justify-end p-4 border border-surface-container">
              <img
                className="absolute inset-0 w-full h-full object-cover"
                alt="Logistics Telemetry Freight Route JLD-22"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQgnqbwuYJKP2t2Puy1HV76VW5WztwMpuyE8CJokV95dQkHJdvsEa3vOwcQGgY2jC7J3NTtXcdvEGNDt2y3w_KdKkFBpOOuaBJE6eaJKvFZ49WGrCuD1LJ7tYLQ5STOILbkxHCtG2Iq82XxXofvqzphd0epuqMDka4XugthTTEazKIHC8JU_m5Vpr-es4tchgoqfrgvYM0FmYqJUOMdRF2YqReuOjZZgTfohzaK5JD3sodDiEdpiomgw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
              <div className="relative z-10 text-white">
                <span className="px-2 py-0.5 rounded bg-surface-container-highest text-on-surface font-label-sm text-label-sm uppercase">
                  Logistics Telemetry
                </span>
                <p className="font-headline-sm text-headline-sm leading-tight mt-1">Freight Route JLD-22</p>
                <p className="font-label-sm text-label-sm opacity-90">GPS ETA: 2h 15m to ITC Silos</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* VIEW 2: BUYER DASHBOARD VIEW */}
      {subView === 'buyer' && (
        <section className="w-full max-w-[1440px] mx-auto px-margin-sm md:px-margin space-y-space-lg mb-space-xl">
          {/* Top KPI Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
            <div className="p-space-md bg-surface-container-lowest rounded-xl shadow-xs border border-surface-container space-y-1">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">
                Monthly Procurement Spend
              </span>
              <div className="flex items-baseline justify-between">
                <span className="font-headline-md text-headline-md text-on-surface font-bold">₹48.24 Lakh</span>
                <span className="font-label-sm text-label-sm text-tertiary font-semibold">↑ 14% vs Mandi</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">1,680 Qtl direct farm contracts fulfilled</p>
            </div>

            <div className="p-space-md bg-surface-container-lowest rounded-xl shadow-xs border border-surface-container space-y-1">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">
                Escrow Locked Balances
              </span>
              <div className="flex items-baseline justify-between">
                <span className="font-headline-md text-headline-md text-primary font-bold">₹14.80 Lakh</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">3 Active Contracts</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Multi-sig protected in YES Bank vault</p>
            </div>

            <div className="p-space-md bg-surface-container-lowest rounded-xl shadow-xs border border-surface-container space-y-1">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">
                Average AI Match Score
              </span>
              <div className="flex items-baseline justify-between">
                <span className="font-headline-md text-headline-md text-tertiary font-bold">94.8%</span>
                <span className="font-label-sm text-label-sm text-primary font-semibold">Grade A Target</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Moisture &amp; impurity tolerances surpassed</p>
            </div>

            <div className="p-space-md bg-surface-container-lowest rounded-xl shadow-xs border border-surface-container space-y-1">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">
                Intermediary Margin Saved
              </span>
              <div className="flex items-baseline justify-between">
                <span className="font-headline-md text-headline-md text-secondary font-bold">₹3,41,200</span>
                <span className="font-label-sm text-label-sm text-secondary font-semibold">Zero Commission</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Direct-from-FPO aggregation benefit</p>
            </div>
          </div>

          {/* Active Bids & Sourcing Table */}
          <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-xs border border-surface-container space-y-space-md">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="font-headline-sm text-headline-sm text-on-surface">
                  Institutional Sourcing Radar &amp; Active Bids
                </h2>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  ITC Agro Processing Hub procurement terminal live tenders.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded bg-surface-container font-label-sm text-label-sm text-on-surface-variant">
                  Filter: Punjab &amp; Haryana Clusters
                </span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left font-body-sm text-body-sm">
                <thead className="bg-surface-container font-label-sm text-label-sm text-on-surface-variant uppercase">
                  <tr>
                    <th className="p-3">Order Req ID</th>
                    <th className="p-3">Commodity &amp; Target Grade</th>
                    <th className="p-3">Volume Req</th>
                    <th className="p-3">Max Cap Price</th>
                    <th className="p-3">FPO Matches Found</th>
                    <th className="p-3">Audit Stage</th>
                    <th className="p-3 text-right">Quick Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-container font-label-md text-label-md">
                  <tr className="hover:bg-surface-container-low transition-colors">
                    <td className="p-3 font-mono font-semibold text-primary">#ORD-ITC-7721</td>
                    <td className="p-3">
                      <span className="font-bold text-on-surface block">Basmati 1121 Paddy</span>
                      <span className="text-on-surface-variant font-label-sm">Moisture &lt; 12.5%, Broken &lt; 1%</span>
                    </td>
                    <td className="p-3 font-mono">500 Qtl</td>
                    <td className="p-3 font-mono">₹4,150 / Qtl</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded bg-primary-container text-on-primary-container font-semibold">
                        4 FPOs (320 Qtl Ready)
                      </span>
                    </td>
                    <td className="p-3"><span className="text-tertiary">Pre-assay passed</span></td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => {
                          onSelectTab('ai-smart-match');
                          onNotify('Matching Basmati lots for #ORD-ITC-7721', 'info');
                        }}
                        className="px-3 py-1 rounded bg-primary text-on-primary font-label-sm hover:bg-primary-container transition-colors cursor-pointer"
                      >
                        Match Lots
                      </button>
                    </td>
                  </tr>

                  <tr className="hover:bg-surface-container-low transition-colors">
                    <td className="p-3 font-mono font-semibold text-primary">#ORD-ITC-8819</td>
                    <td className="p-3">
                      <span className="font-bold text-on-surface block">Sharbati Wheat (Active Escrow)</span>
                      <span className="text-on-surface-variant font-label-sm">Grade A Single Origin Barnala</span>
                    </td>
                    <td className="p-3 font-mono">200 Qtl</td>
                    <td className="p-3 font-mono">₹2,880 / Qtl</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-semibold">
                        Locked with Ramesh Patel
                      </span>
                    </td>
                    <td className="p-3"><span className="text-secondary font-semibold">QC Dispatch In-Transit</span></td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => setSubView('deal')}
                        className="px-3 py-1 rounded bg-surface-container-highest text-on-surface font-label-sm hover:bg-surface-container-high transition-colors cursor-pointer"
                      >
                        View Vault
                      </button>
                    </td>
                  </tr>

                  <tr className="hover:bg-surface-container-low transition-colors">
                    <td className="p-3 font-mono font-semibold text-primary">#ORD-ITC-9014</td>
                    <td className="p-3">
                      <span className="font-bold text-on-surface block">Yellow Maize (Starch Grade)</span>
                      <span className="text-on-surface-variant font-label-sm">Moisture &lt; 14%, High Starch</span>
                    </td>
                    <td className="p-3 font-mono">350 Qtl</td>
                    <td className="p-3 font-mono">₹2,100 / Qtl</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-semibold">
                        2 FPOs Pending Assay
                      </span>
                    </td>
                    <td className="p-3"><span className="text-on-surface-variant">Lab scheduled</span></td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => onNotify('Scheduling lab inspector dispatch for #ORD-ITC-9014', 'info')}
                        className="px-3 py-1 rounded bg-primary text-on-primary font-label-sm hover:bg-primary-container transition-colors cursor-pointer"
                      >
                        Audit Assay
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* VIEW 3: SIH TECH DOCS & SCHEMA (AND DOCUMENTATION SCREEN) */}
      {subView === 'arch' && (
        <section className="w-full max-w-[1440px] mx-auto px-margin-sm md:px-margin space-y-space-lg mb-space-xl">
          {/* SIH Blueprint Banner */}
          <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-xs border border-surface-container flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded bg-primary text-on-primary font-label-sm text-label-sm uppercase">
                  Smart India Hackathon 2026
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  Ministry of Agriculture &amp; Farmers Welfare
                </span>
              </div>
              <h2 className="font-headline-md text-headline-md text-on-surface">
                Backend Architecture &amp; Relational Entity Model
              </h2>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Production-ready MySQL Schema, Flask REST Microservices, and Automated Escrow Engine.
              </p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1.5 rounded-lg bg-surface-container font-label-sm text-label-sm text-on-surface">
                FastAPI / Flask 3.0
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-surface-container font-label-sm text-label-sm text-on-surface">
                MySQL 8.0
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-surface-container font-label-sm text-label-sm text-tertiary font-semibold">
                Redis Streams 7
              </span>
            </div>
          </div>

          {/* Sub-tab Navigation */}
          <div className="flex items-center gap-2 pb-2 overflow-x-auto">
            <button
              onClick={() => setArchTab('schema')}
              className={`px-4 py-2 rounded-lg font-label-md text-label-md transition-colors cursor-pointer ${
                archTab === 'schema'
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
              }`}
              type="button"
            >
              1. MySQL Database Schema (14 Tables)
            </button>

            <button
              onClick={() => setArchTab('apis')}
              className={`px-4 py-2 rounded-lg font-label-md text-label-md transition-colors cursor-pointer ${
                archTab === 'apis'
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
              }`}
              type="button"
            >
              2. REST API Documentation
            </button>

            <button
              onClick={() => setArchTab('setup')}
              className={`px-4 py-2 rounded-lg font-label-md text-label-md transition-colors cursor-pointer ${
                archTab === 'setup'
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
              }`}
              type="button"
            >
              3. Setup Guide &amp; Judge README
            </button>
          </div>

          {/* Arch Tab 1: MySQL Schema Explorer */}
          {archTab === 'schema' && (
            <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-xs border border-surface-container space-y-space-md">
              <div className="flex items-center justify-between pb-space-sm border-b border-surface-container">
                <div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface">
                    Relational Architecture Blueprint
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Normalized to 3NF with foreign-key cascades and high-throughput indexes.
                  </p>
                </div>
                <span className="font-label-sm text-label-sm text-primary font-semibold">
                  14 Normalized Tables
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-md font-label-sm text-label-sm">
                {[
                  {
                    name: 'users',
                    tag: 'Core Auth',
                    desc: 'Master user accounts for farmers, buyers, FPO agents, and administrators.',
                    cols: [
                      'PK id: BIGINT UNSIGNED AUTO_INCREMENT',
                      'phone: VARCHAR(15) UNIQUE NOT NULL',
                      'aadhaar_hash: CHAR(64) NULL',
                      "role: ENUM('farmer','buyer','fpo','admin')",
                      'created_at: TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
                    ]
                  },
                  {
                    name: 'farmers',
                    tag: 'Kisan Profile',
                    desc: 'Land record links, bank verified IFSC, PM-Kisan linkage.',
                    cols: [
                      'PK id: BIGINT UNSIGNED',
                      'FK user_id: REFERENCES users(id)',
                      'khasra_no: VARCHAR(50)',
                      'bank_account_enc: VARCHAR(255)',
                      'ifsc_code: VARCHAR(11)',
                      'fpo_id: BIGINT REFERENCES fpo_aggregations'
                    ]
                  },
                  {
                    name: 'buyers',
                    tag: 'Institutional',
                    desc: 'Corporate details, GSTIN, e-NAM broker licenses.',
                    cols: [
                      'PK id: BIGINT UNSIGNED',
                      'FK user_id: REFERENCES users(id)',
                      'gstin: VARCHAR(15) UNIQUE',
                      'company_name: VARCHAR(150)',
                      'credit_line_limit: DECIMAL(14,2)',
                      'verified_escrow_kyc: BOOLEAN DEFAULT FALSE'
                    ]
                  },
                  {
                    name: 'crops',
                    tag: 'Taxonomy',
                    desc: 'Government commodity master dictionary with HSN code mapping.',
                    cols: [
                      'PK id: INT UNSIGNED',
                      'commodity_name: VARCHAR(100)',
                      'hsn_code: VARCHAR(10)',
                      "season: ENUM('kharif','rabi','zaid')",
                      'msp_benchmark_inr: DECIMAL(10,2)'
                    ]
                  },
                  {
                    name: 'crop_grades',
                    tag: 'NABL Specs',
                    desc: 'Moisture, foreign matter, admixture limits per grade level.',
                    cols: [
                      'PK id: INT UNSIGNED',
                      'FK crop_id: REFERENCES crops(id)',
                      "grade_label: VARCHAR(10) -- 'Grade A'",
                      'max_moisture_pct: DECIMAL(4,2)',
                      'max_foreign_matter_pct: DECIMAL(4,2)'
                    ]
                  },
                  {
                    name: 'offers',
                    tag: 'Farmer Listings',
                    desc: 'Quantities, ask price per quintal, harvest geo-coordinates.',
                    cols: [
                      'PK id: BIGINT UNSIGNED',
                      'FK farmer_id: REFERENCES farmers(id)',
                      'FK crop_id: REFERENCES crops(id)',
                      'quantity_quintals: DECIMAL(10,2)',
                      'ask_price_per_qtl: DECIMAL(10,2)',
                      "status: ENUM('active','matched','closed')"
                    ]
                  },
                  {
                    name: 'matches',
                    tag: 'AI Engine',
                    desc: 'Algorithmic pairings based on distance, grade, and fair pricing.',
                    cols: [
                      'PK id: BIGINT UNSIGNED',
                      'FK offer_id: REFERENCES offers(id)',
                      'FK buyer_id: REFERENCES buyers(id)',
                      'ai_compatibility_score: DECIMAL(5,2)',
                      'freight_distance_km: DECIMAL(8,2)',
                      'predicted_fair_price: DECIMAL(10,2)'
                    ]
                  },
                  {
                    name: 'deals',
                    tag: 'Contract State',
                    desc: 'Enforces 6-step lifecycle state tracker.',
                    cols: [
                      'PK id: BIGINT UNSIGNED',
                      'contract_uuid: CHAR(36) UNIQUE',
                      'total_deal_value_inr: DECIMAL(12,2)',
                      "state_step: ENUM('offer_accepted', 'escrow_funded', 'qc_verified', 'dispatched', 'delivered', 'payout_released')"
                    ]
                  },
                  {
                    name: 'payments / transactions',
                    tag: 'Escrow Audit',
                    desc: 'Gateway signatures, webhook payloads, UPI UTR numbers.',
                    cols: [
                      'PK id: BIGINT UNSIGNED',
                      'FK deal_id: REFERENCES deals(id)',
                      'gateway_txn_ref: VARCHAR(100) UNIQUE',
                      'escrow_vault_id: VARCHAR(50)',
                      'payout_utr: VARCHAR(50) NULL',
                      "status: ENUM('held_in_escrow','settled','refunded')"
                    ]
                  },
                  {
                    name: 'fpo_aggregations',
                    tag: 'Collective Bulking',
                    desc: 'Consolidates smallholder marginal lots to meet institutional volume quotas.',
                    cols: [
                      'PK id: BIGINT UNSIGNED',
                      'fpo_reg_number: VARCHAR(50)',
                      'cluster_district: VARCHAR(100)',
                      'pooled_quintals: DECIMAL(12,2)',
                      'active_member_count: INT'
                    ]
                  },
                  {
                    name: 'market_prices',
                    tag: 'Agmarknet Sync',
                    desc: 'Live telemetry cache fed by e-NAM and district mandi APIs.',
                    cols: [
                      'PK id: BIGINT UNSIGNED',
                      'mandi_code: VARCHAR(20)',
                      'modal_price_qtl: DECIMAL(10,2)',
                      'min_price_qtl: DECIMAL(10,2)',
                      'recorded_date: DATE'
                    ]
                  },
                  {
                    name: 'notifications / locations',
                    tag: 'Alerts & GIS',
                    desc: 'Multi-lingual SMS/IVR dispatch queues and geocoded points.',
                    cols: [
                      "channel: ENUM('sms_gsm','ivr_call','push')",
                      "lang_code: ENUM('hi','pa','mr','te','en')",
                      'geo_point: POINT SRID 4325',
                      'pincode: CHAR(6)'
                    ]
                  }
                ].map((tbl) => (
                  <div key={tbl.name} className="bg-surface-container-low p-4 rounded-xl space-y-2 border border-surface-container">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-on-surface font-mono">{tbl.name}</span>
                      <span className="text-on-surface-variant font-medium">{tbl.tag}</span>
                    </div>
                    <p className="text-on-surface-variant leading-snug">{tbl.desc}</p>
                    <div className="bg-surface-container p-2.5 rounded font-mono text-[11px] space-y-1">
                      {tbl.cols.map((col, idx) => (
                        <div key={idx} className="truncate">
                          {col}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Arch Tab 2: REST API Documentation */}
          {archTab === 'apis' && (
            <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-xs border border-surface-container space-y-space-lg">
              <div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">
                  Flask Microservices Endpoint Reference
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  All endpoints return strictly RFC 7807 compliant JSON envelopes with cryptographic payload signatures.
                </p>
              </div>

              <div className="space-y-4 font-mono text-label-md">
                <div className="p-4 rounded-lg bg-surface-container-low space-y-2 border border-surface-container">
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-0.5 rounded bg-primary text-on-primary font-bold">GET</span>
                    <span className="text-on-surface font-bold">/api/v1/crops</span>
                    <span className="text-on-surface-variant font-sans font-body-sm text-body-sm">Fetch categorized commodity master &amp; live MSP</span>
                  </div>
                  <div className="bg-surface-container p-3 rounded text-[12px] text-on-surface">
                    <span className="text-on-surface-variant"># Response Sample:</span><br />
                    &#123; &quot;status&quot;: 200, &quot;count&quot;: 28, &quot;data&quot;: [&#123;&quot;id&quot;: 1, &quot;commodity&quot;: &quot;Wheat&quot;, &quot;hsn&quot;: &quot;10019910&quot;, &quot;msp_floor&quot;: 2275.00, &quot;active_clusters&quot;: [&quot;PB&quot;, &quot;HR&quot;, &quot;MP&quot;]&#125;] &#125;
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-surface-container-low space-y-2 border border-surface-container">
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-0.5 rounded bg-secondary-container text-on-secondary-container font-bold">POST</span>
                    <span className="text-on-surface font-bold">/api/v1/match/ai-score</span>
                    <span className="text-on-surface-variant font-sans font-body-sm text-body-sm">Computes distance, grade compatibility, and fair price</span>
                  </div>
                  <div className="bg-surface-container p-3 rounded text-[12px] text-on-surface">
                    <span className="text-on-surface-variant"># Request Payload:</span><br />
                    &#123; &quot;offer_id&quot;: 44102, &quot;buyer_facility_id&quot;: 812, &quot;crop_specs&quot;: &#123; &quot;moisture&quot;: 11.2, &quot;foreign_matter&quot;: 0.4 &#125; &#125;<br />
                    <span className="text-on-surface-variant mt-1 block"># Response:</span>
                    &#123; &quot;ai_compatibility&quot;: 0.964, &quot;fair_price_qtl&quot;: 2880.00, &quot;suggested_freight_inr&quot;: 18400.00, &quot;confidence&quot;: 0.991 &#125;
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-surface-container-low space-y-2 border border-surface-container">
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-0.5 rounded bg-secondary-container text-on-secondary-container font-bold">POST</span>
                    <span className="text-on-surface font-bold">/api/v1/deals/escrow</span>
                    <span className="text-on-surface-variant font-sans font-body-sm text-body-sm">Locks buyer capital in escrow vault &amp; returns webhook secret</span>
                  </div>
                  <div className="bg-surface-container p-3 rounded text-[12px] text-on-surface">
                    <span className="text-on-surface-variant"># Request:</span><br />
                    &#123; &quot;deal_id&quot;: &quot;AGR-2026-8819&quot;, &quot;auth_token&quot;: &quot;ESC_TOKEN_29401&quot;, &quot;vault_action&quot;: &quot;LOCK_FUNDS&quot; &#125;<br />
                    <span className="text-on-surface-variant mt-1 block"># Response:</span>
                    &#123; &quot;status&quot;: &quot;ESCROW_LOCKED&quot;, &quot;escrow_tx_id&quot;: &quot;TXN_FAS_9928174620&quot;, &quot;amount_locked&quot;: 576000.00, &quot;bank_ref&quot;: &quot;YESB_ESC_4491&quot; &#125;
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-surface-container-low space-y-2 border border-surface-container">
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-0.5 rounded bg-tertiary-container text-on-tertiary-container font-bold">PUT</span>
                    <span className="text-on-surface font-bold">/api/v1/fpo/aggregate</span>
                    <span className="text-on-surface-variant font-sans font-body-sm text-body-sm">Aggregates micro-lots into institutional grade batches</span>
                  </div>
                  <div className="bg-surface-container p-3 rounded text-[12px] text-on-surface">
                    <span className="text-on-surface-variant"># Response:</span><br />
                    &#123; &quot;batch_id&quot;: &quot;FPO_PB_BATCH_89&quot;, &quot;aggregated_quintals&quot;: 1200.0, &quot;farmers_participating&quot;: 24, &quot;dispatch_status&quot;: &quot;READY&quot; &#125;
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Arch Tab 3: Setup Guide & Judge README */}
          {archTab === 'setup' && (
            <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-xs border border-surface-container space-y-space-md">
              <div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">
                  SIH 2026 Evaluation Checklist &amp; Deployment
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Instructions to verify the FASLYNK engine on local hardware or Cloud instances.
                </p>
              </div>

              <div className="space-y-4 font-mono text-label-md">
                <div className="p-4 rounded-lg bg-surface-container-low space-y-2 border border-surface-container">
                  <span className="font-bold text-primary"># 1. Clone Repository &amp; Environment Setup</span>
                  <pre className="bg-surface-container p-3 rounded overflow-x-auto text-[12px] text-on-surface font-mono">
                    <code>{`git clone https://github.com/faslynk-sih2026/faslynk-core.git
cd faslynk-core
python3 -m venv venv && source venv/bin/activate
pip install -r requirements.txt`}</code>
                  </pre>
                </div>

                <div className="p-4 rounded-lg bg-surface-container-low space-y-2 border border-surface-container">
                  <span className="font-bold text-primary"># 2. Database Connection String &amp; Migrations</span>
                  <pre className="bg-surface-container p-3 rounded overflow-x-auto text-[12px] text-on-surface font-mono">
                    <code>{`export DATABASE_URL="mysql+pymysql://faslynk_usr:KisanShakti#2026@127.0.0.1:3306/faslynk_main?charset=utf8mb4"
export ESCROW_SANDBOX_KEY="sec_test_kisan_escrow_88192a"
flask db upgrade`}</code>
                  </pre>
                </div>

                <div className="p-4 rounded-lg bg-surface-container-low space-y-2 border border-surface-container">
                  <span className="font-bold text-primary"># 3. Launch Development &amp; Telemetry Server</span>
                  <pre className="bg-surface-container p-3 rounded overflow-x-auto text-[12px] text-on-surface font-mono">
                    <code>{`python app.py --port=5000 --debug
# Microservice running on http://127.0.0.1:5000/
# Telemetry WebSockets live on ws://127.0.0.1:5000/ws/telemetry`}</code>
                  </pre>
                </div>

                {/* Judge Credentials Bento */}
                <div className="p-4 rounded-lg bg-surface-container-high space-y-2 border border-surface-container">
                  <span className="font-bold text-on-surface font-headline-sm text-headline-sm block">
                    SIH Judge Demo Credentials
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                    <div className="p-3 rounded bg-surface-container-lowest border border-surface-container">
                      <span className="font-bold block text-primary font-sans">Role: Farmer Admin</span>
                      <span>User: <strong>+91 98140-99211</strong></span><br />
                      <span>OTP: <strong>772188</strong> (Bypass mode)</span>
                    </div>
                    <div className="p-3 rounded bg-surface-container-lowest border border-surface-container">
                      <span className="font-bold block text-secondary font-sans">Role: ITC Procurement</span>
                      <span>User: <strong>buyer@itc-agro.com</strong></span><br />
                      <span>Password: <strong>AgroDirect#2026</strong></span>
                    </div>
                    <div className="p-3 rounded bg-surface-container-lowest border border-surface-container">
                      <span className="font-bold block text-tertiary font-sans">Role: Escrow Auditor</span>
                      <span>User: <strong>auditor@nabard.gov.in</strong></span><br />
                      <span>Token: <strong>AUD_NAB_2026_OK</strong></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      )}
    </div>
  );
};
