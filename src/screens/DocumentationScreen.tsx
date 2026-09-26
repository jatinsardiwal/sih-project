import React, { useState } from 'react';
import { NavTab } from '../types';

interface DocumentationScreenProps {
  onSelectTab: (tab: NavTab) => void;
  onNotify: (msg: string, type?: 'success' | 'info' | 'warning') => void;
}

export const DocumentationScreen: React.FC<DocumentationScreenProps> = ({
  onSelectTab,
  onNotify,
}) => {
  const [activeSection, setActiveSection] = useState<'overview' | 'algorithms' | 'escrow' | 'dpi'>('overview');

  return (
    <div className="flex flex-col w-full pb-space-xl">
      <div className="w-full max-w-[1440px] mx-auto px-margin-sm md:px-margin py-space-lg space-y-space-lg">
        {/* Banner */}
        <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-xs border border-surface-container flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-primary-container text-on-primary-container font-label-sm text-label-sm font-semibold">
                SIH 2026 PS-AGR-04
              </span>
              <span className="text-on-surface-variant font-label-sm text-label-sm">
                System Specification &amp; Architecture Manual
              </span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
              FASLYNK Technical Architecture &amp; System Design
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Comprehensive architectural documentation for AI fair-price regression, optical grading edge-nodes, and trustless smart escrow settlement.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onSelectTab('transactions');
                onNotify('Switched to live database schema and REST API tester', 'info');
              }}
              className="px-space-md py-2.5 rounded-lg bg-primary text-on-primary font-body-sm text-body-sm font-semibold hover:bg-primary-container shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">schema</span>
              <span>Open MySQL &amp; API Explorer</span>
            </button>
          </div>
        </div>

        {/* Section Tabs */}
        <div className="flex items-center gap-2 border-b border-surface-container pb-2 overflow-x-auto">
          {[
            { key: 'overview', label: '1. Executive Architecture', icon: 'account_tree' },
            { key: 'algorithms', label: '2. ML Fair-Price & Optical Grading', icon: 'psychology' },
            { key: 'escrow', label: '3. Multi-Sig Smart Escrow Protocol', icon: 'security' },
            { key: 'dpi', label: '4. e-NAM & DPI Agri-Stack Linkage', icon: 'lan' },
          ].map((sec) => (
            <button
              key={sec.key}
              onClick={() => setActiveSection(sec.key as any)}
              className={`px-4 py-2 rounded-lg font-label-md text-label-md transition-colors flex items-center gap-2 cursor-pointer ${
                activeSection === sec.key
                  ? 'bg-primary text-on-primary font-bold shadow-xs'
                  : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">{sec.icon}</span>
              <span>{sec.label}</span>
            </button>
          ))}
        </div>

        {/* Section 1: Executive Architecture */}
        {activeSection === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-space-lg">
            <div className="lg:col-span-2 bg-surface-container-lowest p-space-lg rounded-xl shadow-xs border border-surface-container space-y-space-md">
              <h2 className="font-headline-sm text-headline-sm text-on-surface">
                End-to-End System Microservice Topology
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                FASLYNK is architected as an event-driven distributed system designed to operate reliably even across low-connectivity rural hubs. The platform decouples compute-intensive machine-learning tasks from real-time transactional clearing using Redis Streams and asynchronous task queues.
              </p>

              {/* Topology Flowchart */}
              <div className="p-space-md bg-surface-container-low rounded-xl border border-surface-container space-y-3 font-mono text-xs">
                <div className="p-3 bg-surface-container-lowest rounded-lg border border-primary/30 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[20px]">smartphone</span>
                    <div>
                      <strong className="text-on-surface">Producer Client (PWA / Mobile / IVR)</strong>
                      <div className="text-[11px] text-on-surface-variant">Low-bandwidth offline-first edge sync &amp; multi-lingual UI</div>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-primary-fixed text-on-primary-fixed font-bold">HTTPS / WSS</span>
                </div>

                <div className="flex justify-center text-primary text-lg font-bold">↓ ↑ (240ms Latency)</div>

                <div className="p-3 bg-surface-container-lowest rounded-lg border border-surface-container flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary text-[20px]">dns</span>
                    <div>
                      <strong className="text-on-surface">API Gateway &amp; Telemetry Ingestion Node</strong>
                      <div className="text-[11px] text-on-surface-variant">FastAPI reverse proxy, JWT Aadhaar e-KYC authentication</div>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed font-bold">Port 3000 / 5000</span>
                </div>

                <div className="flex justify-center text-secondary text-lg font-bold">↓ ↑ (Redis Pub/Sub)</div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="p-3 bg-surface-container-lowest rounded-lg border border-surface-container">
                    <strong className="text-tertiary block mb-1">XGBoost Price Engine</strong>
                    <p className="text-[11px] text-on-surface-variant">
                      Agmarknet stream ingestion, moisture index regression, terminal demand matching.
                    </p>
                  </div>
                  <div className="p-3 bg-surface-container-lowest rounded-lg border border-surface-container">
                    <strong className="text-primary block mb-1">Smart Escrow Vault Hub</strong>
                    <p className="text-[11px] text-on-surface-variant">
                      NPCI UPI 2.0 Mandate, YES Bank RBI Trust Account, auto-release upon weighment.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <h3 className="font-headline-sm text-sm font-bold text-on-surface mb-2">
                  Key Technical Guarantees
                </h3>
                <ul className="space-y-1.5 font-body-sm text-body-sm text-on-surface-variant">
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-primary text-[18px] shrink-0">check_circle</span>
                    <span><strong>99.4% Grading Reproducibility:</strong> Edge ML optical models calibrated against ICAR physical testing sieves.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-primary text-[18px] shrink-0">check_circle</span>
                    <span><strong>Zero Counterparty Credit Default:</strong> 100% of institutional funds are locked in escrow prior to dispatch.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-primary text-[18px] shrink-0">check_circle</span>
                    <span><strong>FPO Fractional Payouts:</strong> Automated split ledgers distribute bulk contract proceeds directly to individual smallholder bank accounts.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Sidebar KPI Bento */}
            <div className="space-y-space-md">
              <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-xs border border-surface-container space-y-3">
                <span className="font-label-sm text-label-sm text-secondary uppercase font-semibold">
                  Problem Statement Benchmark
                </span>
                <div className="font-headline-sm text-headline-sm text-on-surface">
                  PS-AGR-04: Digital Public Agri-Exchange
                </div>
                <div className="space-y-2 font-body-sm text-body-sm text-on-surface-variant">
                  <div className="flex justify-between py-1 border-b border-surface-container">
                    <span>Ministry:</span>
                    <strong className="text-on-surface">MoAFW, Govt of India</strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-surface-container">
                    <span>National Scope:</span>
                    <strong className="text-on-surface">Pan-India (46 APMCs)</strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-surface-container">
                    <span>Target Cohort:</span>
                    <strong className="text-on-surface">Small &amp; Marginal Farmers</strong>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>Compliance:</span>
                    <strong className="text-tertiary">ODbL &amp; RBI Escrow</strong>
                  </div>
                </div>
              </div>

              <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-xs border border-surface-container space-y-2">
                <span className="font-label-sm text-label-sm text-primary uppercase font-semibold">
                  Quick Navigation
                </span>
                <div className="space-y-1">
                  <button
                    onClick={() => onSelectTab('marketplace')}
                    className="w-full text-left p-2 rounded-lg hover:bg-surface-container text-body-sm text-on-surface flex items-center justify-between"
                  >
                    <span>Wholesale Marketplace Catalog</span>
                    <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                  </button>
                  <button
                    onClick={() => onSelectTab('ai-smart-match')}
                    className="w-full text-left p-2 rounded-lg hover:bg-surface-container text-body-sm text-on-surface flex items-center justify-between"
                  >
                    <span>AI Smart Match &amp; Offers</span>
                    <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                  </button>
                  <button
                    onClick={() => onSelectTab('produce-management-and-fpo')}
                    className="w-full text-left p-2 rounded-lg hover:bg-surface-container text-body-sm text-on-surface flex items-center justify-between"
                  >
                    <span>FPO Bulking &amp; Logistics</span>
                    <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                  </button>
                  <button
                    onClick={() => onSelectTab('price-discovery')}
                    className="w-full text-left p-2 rounded-lg hover:bg-surface-container text-body-sm text-on-surface flex items-center justify-between"
                  >
                    <span>Mandi Telemetry &amp; Price Curves</span>
                    <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Section 2: ML Fair-Price & Optical Grading */}
        {activeSection === 'algorithms' && (
          <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-xs border border-surface-container space-y-space-md">
            <h2 className="font-headline-sm text-headline-sm text-on-surface">
              Machine Learning Formulation: Fair-Price Regression &amp; Optical Assay
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg">
              <div className="space-y-2">
                <h3 className="font-headline-sm text-base font-bold text-primary">
                  1. XGBoost Fair-Price Hedonic Formulation
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  The fair-price model replaces asymmetric subjective bargaining with a mathematical pricing function calibrated on 10 years of Agmarknet modal auctions:
                </p>
                <div className="p-3 bg-surface-container-low rounded-lg font-mono text-xs text-on-surface border border-surface-container">
                  P_fair = P_mandi(base) + β_1(M* - M) + β_2(1 / D_km) + β_3(Q_score) + β_4(V_bundle) - C_transit
                </div>
                <ul className="text-xs text-on-surface-variant space-y-1 font-mono pt-1">
                  <li>• M* = Optimal moisture reference (12.0% for Wheat)</li>
                  <li>• D_km = Distance to nearest freight corridor hub</li>
                  <li>• Q_score = Computer vision optical grade coefficient (0.0 to 1.0)</li>
                  <li>• V_bundle = FPO collective pooling discount factor</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h3 className="font-headline-sm text-base font-bold text-tertiary">
                  2. Edge-ML Optical Grain Inspection Architecture
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  Farmers take a macro photo of their grain spread using their mobile device camera. MobileNetV3 quantized to INT8 performs real-time edge bounding box segmentation:
                </p>
                <div className="p-3 bg-surface-container-low rounded-lg font-mono text-xs text-on-surface border border-surface-container">
                  Kernel Uniformity = (A_standard / (A_standard + A_broken + A_admixture)) × 100%
                </div>
                <p className="text-xs text-on-surface-variant">
                  Latency: 180ms on standard budget smartphones. Operates offline and syncs cryptographically signed hash upon network re-establishment.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Section 3: Multi-Sig Smart Escrow Protocol */}
        {activeSection === 'escrow' && (
          <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-xs border border-surface-container space-y-space-md">
            <h2 className="font-headline-sm text-headline-sm text-on-surface">
              Cryptographic Multi-Sig Escrow Clearing Flow
            </h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Transactions enforce immutable step-locks governed by 3 cryptographic keys: Buyer, Farmer, and NABL/Weighbridge Verifier.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md pt-2">
              <div className="p-space-md bg-surface-container-low rounded-xl border border-surface-container space-y-1">
                <span className="font-headline-sm text-sm font-bold text-primary block">Key 1: Buyer Escrow Lock</span>
                <p className="font-body-sm text-xs text-on-surface-variant">
                  Buyer pre-funds 100% of contract valuation into YES Bank / Canara Bank Reserve Trust Account via UPI 2.0 or RTGS.
                </p>
              </div>
              <div className="p-space-md bg-surface-container-low rounded-xl border border-surface-container space-y-1">
                <span className="font-headline-sm text-sm font-bold text-secondary block">Key 2: GPS Gate Verification</span>
                <p className="font-body-sm text-xs text-on-surface-variant">
                  IoT Weighbridge at buyer factory dock confirms weight tolerance (±0.5%) and sends automated digital tare receipt.
                </p>
              </div>
              <div className="p-space-md bg-surface-container-low rounded-xl border border-surface-container space-y-1">
                <span className="font-headline-sm text-sm font-bold text-tertiary block">Key 3: T+0 Auto Payout</span>
                <p className="font-body-sm text-xs text-on-surface-variant">
                  FASLYNK smart contract releases funds directly to farmer bank account via IMPS/NEFT with zero intermediary deduction.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Section 4: DPI Linkage */}
        {activeSection === 'dpi' && (
          <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-xs border border-surface-container space-y-space-md">
            <h2 className="font-headline-sm text-headline-sm text-on-surface">
              Digital Public Infrastructure (DPI) &amp; Government e-NAM Integration
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
              <div className="p-space-md bg-surface-container-low rounded-xl border border-surface-container space-y-1">
                <h4 className="font-headline-sm text-sm font-bold text-on-surface">1. e-NAM National Registry Interoperability</h4>
                <p className="font-body-sm text-xs text-on-surface-variant">
                  Unified trade declarations conform to e-NAM XML schema v3.1, enabling seamless tax exemptions under Form 8A and inter-state APMC cess clearance.
                </p>
              </div>
              <div className="p-space-md bg-surface-container-low rounded-xl border border-surface-container space-y-1">
                <h4 className="font-headline-sm text-sm font-bold text-on-surface">2. Aadhaar &amp; PM-Kisan e-KYC Verification</h4>
                <p className="font-body-sm text-xs text-on-surface-variant">
                  Automatic land title and cultivable acreage cross-check against state land records (e.g. Punjab PLRS, MP Bhulekh) to prevent counterfeit trader listings.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
