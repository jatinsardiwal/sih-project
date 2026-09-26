import React, { useState } from 'react';

interface AddProduceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitLot: (lotData: {
    cropName: string;
    variety: string;
    quantity: number;
    price: number;
    location: string;
    grade: 'A' | 'B' | 'C';
  }) => void;
}

export const AddProduceModal: React.FC<AddProduceModalProps> = ({
  isOpen,
  onClose,
  onSubmitLot,
}) => {
  const [cropCategory, setCropCategory] = useState('Cereals');
  const [cropName, setCropName] = useState('Sharbati Wheat 306');
  const [variety, setVariety] = useState('Premium C-306');
  const [quantity, setQuantity] = useState(200);
  const [unit, setUnit] = useState<'Qtl' | 'Ton' | 'Kg'>('Qtl');
  const [expectedPrice, setExpectedPrice] = useState(2850);
  const [selectedGrade, setSelectedGrade] = useState<'A' | 'B' | 'C'>('A');
  const [location, setLocation] = useState('Khasra 412/18, Ludhiana, Punjab');
  const [logisticsPref, setLogisticsPref] = useState('Farmgate');
  const [isCalibratingGPS, setIsCalibratingGPS] = useState(false);
  const [scannedImage, setScannedImage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGPSDetect = () => {
    setIsCalibratingGPS(true);
    setTimeout(() => {
      setLocation('30.8994° N, 75.8611° E (Khasra 412/18 - Calibrated)');
      setIsCalibratingGPS(false);
    }, 700);
  };

  const handleImageMock = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        setScannedImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitLot({
      cropName,
      variety,
      quantity,
      price: expectedPrice,
      location,
      grade: selectedGrade,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-inverse-surface/60 backdrop-blur-sm p-space-sm md:p-space-md overflow-y-auto">
      <div className="bg-surface-container-lowest rounded-2xl shadow-2xl max-w-2xl w-full p-space-lg flex flex-col gap-space-md relative max-h-[92vh] overflow-y-auto border border-surface-container">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-2 border-b border-surface-container">
          <div className="flex items-center gap-space-xs">
            <span className="p-2 rounded-lg bg-primary/10 text-primary">
              <span className="material-symbols-outlined text-[24px]">post_add</span>
            </span>
            <div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface">
                Publish New Produce Consignment
              </h3>
              <p className="font-label-sm text-label-sm text-on-surface-variant">
                Instant AI grading &amp; buyer matching broadcast across Punjab &amp; Haryana
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-surface-container text-on-surface-variant transition-colors"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-space-md">
          {/* Crop Category & Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
            <div>
              <label className="block font-label-md text-label-md text-on-surface-variant uppercase mb-1">
                Crop Category
              </label>
              <select
                value={cropCategory}
                onChange={(e) => setCropCategory(e.target.value)}
                className="w-full h-11 px-3 rounded-lg bg-surface-container text-on-surface font-body-md text-body-md outline-none border border-transparent focus:border-primary transition-colors"
              >
                <option value="Cereals">Cereals (Wheat, Paddy, Maize)</option>
                <option value="Pulses">Pulses (Gram, Moong, Arhar)</option>
                <option value="Oilseeds">Oilseeds (Mustard, Groundnut)</option>
                <option value="Vegetables">Vegetables (Potato, Tomato, Onion)</option>
                <option value="Fruits">Fruits (Kinnow, Guava, Apples)</option>
              </select>
            </div>
            <div>
              <label className="block font-label-md text-label-md text-on-surface-variant uppercase mb-1">
                Crop &amp; Variety
              </label>
              <input
                type="text"
                required
                value={cropName}
                onChange={(e) => setCropName(e.target.value)}
                placeholder="e.g. Sharbati Wheat"
                className="w-full h-11 px-3 rounded-lg bg-surface-container text-on-surface font-body-md text-body-md outline-none border border-transparent focus:border-primary transition-colors"
              />
            </div>
          </div>

          {/* Quantity with Unit Toggle and Expected Price */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
            <div>
              <label className="block font-label-md text-label-md text-on-surface-variant uppercase mb-1">
                Harvest Quantity
              </label>
              <div className="flex items-center">
                <input
                  type="number"
                  required
                  min={1}
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  placeholder="e.g. 200"
                  className="flex-1 h-11 px-3 rounded-l-lg bg-surface-container text-on-surface font-body-md text-body-md outline-none border border-transparent focus:border-primary"
                />
                <div className="flex bg-surface-container-high rounded-r-lg p-1 h-11 items-center">
                  {(['Qtl', 'Ton', 'Kg'] as const).map((u) => (
                    <button
                      key={u}
                      type="button"
                      onClick={() => setUnit(u)}
                      className={`px-2.5 py-1 rounded font-label-md text-label-md transition-colors ${
                        unit === u
                          ? 'bg-surface-container-lowest text-primary font-bold shadow-xs'
                          : 'text-on-surface-variant'
                      }`}
                    >
                      {u}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="block font-label-md text-label-md text-on-surface-variant uppercase mb-1">
                Expected Price (₹/Quintal)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-on-surface-variant font-label-md text-label-md">
                  ₹
                </span>
                <input
                  type="number"
                  required
                  min={100}
                  value={expectedPrice}
                  onChange={(e) => setExpectedPrice(Number(e.target.value))}
                  placeholder="2850"
                  className="w-full h-11 pl-8 pr-3 rounded-lg bg-surface-container text-on-surface font-body-md text-body-md outline-none border border-transparent focus:border-primary"
                />
              </div>
              <span className="font-label-sm text-label-sm text-on-surface-variant mt-1 block">
                MSP Benchmark: ₹2,275/Qtl • Current Mandi: ₹2,740
              </span>
            </div>
          </div>

          {/* Quality Grade Radios */}
          <div>
            <label className="block font-label-md text-label-md text-on-surface-variant uppercase mb-2">
              Quality Grade &amp; Visual Lab Specs
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm">
              <label className="cursor-pointer">
                <input
                  type="radio"
                  name="grade"
                  value="A"
                  checked={selectedGrade === 'A'}
                  onChange={() => setSelectedGrade('A')}
                  className="sr-only peer"
                />
                <div className="p-space-sm rounded-lg bg-surface-container-low peer-checked:bg-primary-fixed peer-checked:text-on-primary-fixed border border-transparent peer-checked:border-primary transition-all flex flex-col justify-between h-full">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-headline-sm text-headline-sm font-bold">Grade A</span>
                    <span className="material-symbols-outlined text-[18px]">verified</span>
                  </div>
                  <div className="font-label-sm text-label-sm opacity-85">
                    Moisture: ≤12%<br />Kernel: &gt;6.8mm<br />Foreign: &lt;0.5%
                  </div>
                </div>
              </label>

              <label className="cursor-pointer">
                <input
                  type="radio"
                  name="grade"
                  value="B"
                  checked={selectedGrade === 'B'}
                  onChange={() => setSelectedGrade('B')}
                  className="sr-only peer"
                />
                <div className="p-space-sm rounded-lg bg-surface-container-low peer-checked:bg-secondary-fixed peer-checked:text-on-secondary-fixed border border-transparent peer-checked:border-secondary transition-all flex flex-col justify-between h-full">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-headline-sm text-headline-sm font-bold">Grade B</span>
                    <span className="material-symbols-outlined text-[18px]">task</span>
                  </div>
                  <div className="font-label-sm text-label-sm opacity-85">
                    Moisture: 12-14%<br />Kernel: 6.0-6.8mm<br />Foreign: &lt;1.2%
                  </div>
                </div>
              </label>

              <label className="cursor-pointer">
                <input
                  type="radio"
                  name="grade"
                  value="C"
                  checked={selectedGrade === 'C'}
                  onChange={() => setSelectedGrade('C')}
                  className="sr-only peer"
                />
                <div className="p-space-sm rounded-lg bg-surface-container-low peer-checked:bg-surface-container-highest peer-checked:text-on-surface border border-transparent peer-checked:border-outline transition-all flex flex-col justify-between h-full">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-headline-sm text-headline-sm font-bold">Grade C</span>
                    <span className="material-symbols-outlined text-[18px]">inventory_2</span>
                  </div>
                  <div className="font-label-sm text-label-sm opacity-85">
                    Moisture: &gt;14%<br />Broken: &gt;3%<br />Commercial Feed
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* Farm Location with GPS calibration */}
          <div>
            <label className="block font-label-md text-label-md text-on-surface-variant uppercase mb-1">
              Farmgate Location &amp; Geo-Tag
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="flex-1 h-11 px-3 rounded-lg bg-surface-container text-on-surface font-body-sm text-body-sm outline-none border border-transparent focus:border-primary"
              />
              <button
                type="button"
                onClick={handleGPSDetect}
                className="h-11 px-3 rounded-lg bg-surface-container-highest hover:bg-surface-container-high text-primary flex items-center justify-center transition-colors"
                title="Calibrate GPS"
              >
                <span className={`material-symbols-outlined text-[20px] ${isCalibratingGPS ? 'animate-spin' : ''}`}>
                  my_location
                </span>
              </button>
            </div>
          </div>

          {/* Logistics Preference */}
          <div>
            <label className="block font-label-md text-label-md text-on-surface-variant uppercase mb-1">
              Logistics Dispatch Mode
            </label>
            <div className="grid grid-cols-2 gap-space-sm">
              <label className="cursor-pointer">
                <input
                  type="radio"
                  name="logistics"
                  checked={logisticsPref === 'Farmgate'}
                  onChange={() => setLogisticsPref('Farmgate')}
                  className="sr-only peer"
                />
                <div className="p-3 rounded-lg bg-surface-container-low peer-checked:bg-primary-container/20 border border-transparent peer-checked:border-primary font-body-sm text-body-sm text-on-surface flex items-center gap-2 transition-all">
                  <span className="material-symbols-outlined text-[20px] text-primary">agriculture</span>
                  <span className="font-medium">Farmgate Pickup (Buyer arranges)</span>
                </div>
              </label>

              <label className="cursor-pointer">
                <input
                  type="radio"
                  name="logistics"
                  checked={logisticsPref === 'MandiHub'}
                  onChange={() => setLogisticsPref('MandiHub')}
                  className="sr-only peer"
                />
                <div className="p-3 rounded-lg bg-surface-container-low peer-checked:bg-tertiary-container/20 border border-transparent peer-checked:border-tertiary font-body-sm text-body-sm text-on-surface flex items-center gap-2 transition-all">
                  <span className="material-symbols-outlined text-[20px] text-tertiary">local_shipping</span>
                  <span className="font-medium">Self-Delivery to Mandi Depot</span>
                </div>
              </label>
            </div>
          </div>

          {/* AI Camera Optical Scan Simulation */}
          <div className="p-space-sm rounded-xl bg-surface-container-low flex flex-col gap-2">
            <span className="font-bold text-on-surface font-body-sm">
              AI Camera Optical Scan &amp; Lab Grading
            </span>
            <p className="font-body-sm text-[12px] text-on-surface-variant">
              Upload raw photo of crop sample or grain spread for automated instant grading.
            </p>

            <label className="border border-dashed border-outline-variant p-space-md rounded-lg flex flex-col items-center justify-center text-center cursor-pointer hover:bg-surface-container transition-all">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageMock}
                className="hidden"
              />
              {scannedImage ? (
                <div className="flex flex-col items-center gap-2">
                  <img
                    src={scannedImage}
                    alt="Uploaded grain specimen"
                    className="h-24 w-auto rounded-lg object-cover shadow-sm"
                  />
                  <span className="font-label-sm text-primary font-semibold">
                    ✓ Optical Scan Completed: Grade {selectedGrade} Calibrated
                  </span>
                </div>
              ) : (
                <>
                  <span className="material-symbols-outlined text-primary text-[32px]">photo_camera</span>
                  <span className="font-label-sm text-on-surface font-semibold mt-1">
                    Tap to capture or upload grain photo
                  </span>
                  <span className="text-[10px] text-on-surface-variant">
                    Supports JPG, PNG up to 15MB
                  </span>
                </>
              )}
            </label>
          </div>

          {/* Modal Actions */}
          <div className="flex items-center justify-end gap-space-sm pt-space-xs border-t border-surface-container">
            <button
              type="button"
              onClick={onClose}
              className="px-space-md py-2.5 rounded-lg bg-surface-container text-on-surface font-body-sm font-semibold hover:bg-surface-container-high transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-space-lg py-2.5 rounded-lg bg-primary text-on-primary font-body-sm font-semibold hover:bg-primary-container shadow-md transition-all active:scale-95 flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">verified</span>
              <span>Verify &amp; Mint Listing</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
