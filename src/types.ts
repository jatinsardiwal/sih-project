export type NavTab = 
  | 'sell-crop'
  | 'buyer-offers'
  | 'mandi-rates'
  | 'my-deals'
  | 'marketplace'
  | 'ai-smart-match'
  | 'price-discovery'
  | 'produce-management-and-fpo'
  | 'transactions'
  | 'documentation-and-architecture';

export type Language = 
  | 'hi' // हिन्दी (Hindi)
  | 'en' // English
  | 'pa' // ਪੰਜਾਬੀ (Punjabi)
  | 'mr' // मराठी (Marathi)
  | 'gu' // ગુજરાતી (Gujarati)
  | 'te' // తెలుగు (Telugu)
  | 'ta' // தமிழ் (Tamil)
  | 'kn' // ಕನ್ನಡ (Kannada)
  | 'bn' // বাংলা (Bengali)
  | 'ml'; // മലയാളം (Malayalam)

export interface CropItem {
  id: string;
  nameEn: string;
  nameHi: string;
  variety: string;
  category: 'grain' | 'oilseed' | 'pulse' | 'vegetable' | 'fruit' | 'fiber';
  quantityQtl: number;
  expectedPrice: number;
  mandiPrice: number;
  bestOfferPrice: number;
  offersCount: number;
  location: string;
  harvestDate: string;
  quality: 'Grade A (उत्तम)' | 'Grade B (मध्यम)' | 'Grade C (सामान्य)';
  imageUrl: string;
  status: 'active' | 'negotiating' | 'sold';
  moisturePct?: number;
  labCertification?: string;
  fpoName?: string;
  farmerName?: string;
}

export interface BuyerOfferItem {
  id: string;
  buyerName: string;
  buyerType: string;
  buyerPhone: string;
  isVerified: boolean;
  cropNameEn: string;
  cropNameHi: string;
  offeredPrice: number;
  mandiRate: number;
  profitExtra: number;
  volumeQtl: number;
  pickupType: string; // 'खेत से मुफ्त उठान / Free Farmgate Pickup'
  paymentTerm: string; // 'तुलाई के तुरंत बाद बैंक खाते में / Immediate Bank Transfer'
  expiresIn: string;
  rating: number;
  dealsCompleted: number;
  status: 'pending' | 'countered' | 'accepted' | 'declined';
  logoUrl?: string;
  distanceKm?: number;
  escrowBank?: string;
  specNotes?: string;
}

export interface MandiRateRow {
  cropNameEn: string;
  cropNameHi: string;
  variety: string;
  mandiName: string;
  state: string;
  mandiRate: number;
  faslynkRate: number;
  extraBenefit: number;
  extraPct: number;
  trend: 'up' | 'stable' | 'down';
  imageUrl: string;
  category?: 'grain' | 'oilseed' | 'pulse' | 'vegetable' | 'fruit';
  dailyArrivalsQtl?: number;
  minPrice?: number;
  maxPrice?: number;
}

export interface ActiveDealTracker {
  dealId: string;
  cropNameEn: string;
  cropNameHi: string;
  buyerName: string;
  buyerPhone: string;
  quantityQtl: number;
  ratePerQtl: number;
  totalAmount: number;
  truckNumber: string;
  driverPhone: string;
  bankAccount: string;
  bankName: string;
  currentStep: number; // 1: Deal Confirmed, 2: Truck on way, 3: Weighing, 4: Paid
  date: string;
}

export type UserRole = 'farmer' | 'buyer' | 'fpo';

export interface CropLot {
  id: string;
  name: string;
  variety: string;
  cropType: 'wheat' | 'rice' | 'onions' | 'apples' | 'mustard' | 'pulses';
  grade: 'A' | 'B' | 'C';
  gradeLabel: string;
  state: 'MP' | 'HR' | 'MH' | 'HP' | 'PB' | 'RJ';
  location: string;
  farmerName: string;
  fpoId: string;
  volumeQuintals: number;
  specValue: string;
  specLabel: string;
  mandiComparisonPct: number;
  algorithmicPrice: number;
  matchScore: number;
  imageUrl: string;
  imageAlt: string;
}

export interface BuyerMatch {
  id: string;
  buyerName: string;
  badge: string;
  location: string;
  distanceKm: number;
  rating: number;
  dealsCount: number;
  matchScore: number;
  demandVolumeQtl: number;
  volumeType: string;
  offeredPrice: number;
  priceDelta: string;
  qualityRequired: string;
  qualityNote: string;
  logisticsPickup: string;
  logisticsNote: string;
  expiresIn: string;
  paymentNote: string;
  imageUrl?: string;
  requiresFPO?: boolean;
}

export interface NegotiationEntry {
  id: string;
  timestamp: string;
  party: string;
  proposedPrice: number;
  volumeQtl: number;
  logisticsTerms: string;
  status: 'Offer Received' | 'Counter Sent' | 'Superseded' | 'Countered' | 'Accepted - Escrow Pending' | 'Settled';
  isFarmerAction?: boolean;
}

export interface APMCMandiRow {
  id: string;
  mandiName: string;
  badge?: string;
  state: 'punjab' | 'haryana' | 'mp' | 'rajasthan' | 'maharashtra';
  stateDistrict: string;
  grade: 'A' | 'B' | 'C';
  gradeLabel: string;
  dailyArrivalsQtl: number;
  mandiModalRate: number;
  faslynkPrice: number;
  spreadInr: number;
  spreadPct: number;
}

