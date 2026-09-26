import React, { useState } from 'react';

interface CounterOfferModalProps {
  isOpen: boolean;
  buyerName: string;
  currentOfferPrice: number;
  volumeQtl: number;
  onClose: () => void;
  onSubmitCounter: (buyerName: string, counterPrice: number, notes: string) => void;
}

export const CounterOfferModal: React.FC<CounterOfferModalProps> = ({
  isOpen,
  buyerName,
  currentOfferPrice,
  volumeQtl,
  onClose,
  onSubmitCounter,
}) => {
  const [proposedPrice, setProposedPrice] = useState(currentOfferPrice + 20);
  const [notes, setNotes] = useState('Can dispatch immediately with Grade A moisture under 11.2%');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitCounter(buyerName, proposedPrice, notes);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-inverse-surface/60 backdrop-blur-sm flex items-center justify-center p-space-sm">
      <div className="bg-surface-container-lowest rounded-2xl w-full max-w-md shadow-2xl p-space-lg relative border border-surface-container">
        <div className="flex items-center justify-between pb-space-sm border-b border-surface-container">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-secondary-fixed/40 text-secondary">
              <span className="material-symbols-outlined text-[20px]">handshake</span>
            </span>
            <h3 className="font-headline-sm text-headline-sm text-on-surface">
              Submit Counter-Offer
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-on-surface-variant hover:bg-surface-container transition-colors"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <p className="font-body-sm text-body-sm text-on-surface-variant my-space-md">
          Propose an adjusted quintal rate to <strong className="text-on-surface">{buyerName}</strong> for {volumeQtl} Quintals.
        </p>

        <form onSubmit={handleSubmit} className="space-y-space-md">
          <div>
            <label className="block font-label-md text-label-md text-on-surface-variant uppercase mb-1">
              Buyer Current Offer
            </label>
            <input
              type="text"
              readOnly
              value={`₹${currentOfferPrice.toLocaleString('en-IN')} / Quintal (${volumeQtl} Qtl)`}
              className="w-full h-11 px-3 rounded-lg bg-surface-container-low text-on-surface-variant font-label-md text-label-md outline-none"
            />
          </div>

          <div>
            <label className="block font-label-md text-label-md text-on-surface-variant uppercase mb-1">
              Your Proposed Rate (₹/Quintal)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 font-headline-sm text-headline-sm text-primary">₹</span>
              <input
                type="number"
                required
                min={100}
                value={proposedPrice}
                onChange={(e) => setProposedPrice(Number(e.target.value))}
                className="w-full h-11 pl-8 pr-3 rounded-lg bg-surface-container-high text-primary font-headline-sm text-headline-sm outline-none border border-transparent focus:border-primary font-bold"
              />
            </div>
            <span className="font-label-sm text-label-sm text-tertiary mt-1 block">
              +₹{(proposedPrice - currentOfferPrice).toLocaleString('en-IN')} above buyer&apos;s current proposal
            </span>
          </div>

          <div>
            <label className="block font-label-md text-label-md text-on-surface-variant uppercase mb-1">
              Negotiation Notes &amp; Dispatch Terms
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full p-2.5 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-body-sm outline-none border border-transparent focus:border-primary"
              placeholder="e.g. Can dispatch immediately with Grade A moisture under 11.2%"
            />
          </div>

          <div className="flex items-center justify-end gap-space-sm pt-space-xs border-t border-surface-container">
            <button
              type="button"
              onClick={onClose}
              className="px-space-md py-2.5 rounded-lg bg-surface-container text-on-surface font-body-sm text-body-sm font-semibold hover:bg-surface-container-high transition-colors"
            >
              Dismiss
            </button>
            <button
              type="submit"
              className="px-space-lg py-2.5 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-body-sm text-body-sm font-semibold shadow-md transition-all active:scale-95 flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[18px]">send</span>
              <span>Dispatch Counter-Offer</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
