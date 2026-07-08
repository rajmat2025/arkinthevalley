export interface Promotions {
  isActive: boolean;
  bannerText: string;
  offerAmount?: number;
  offerDescription?: string;
  leaseTermRequired?: string;
  endDate: string;
  expiresOn: string;
}

export interface Community {
  name: string;
  phone: string;
  email: string;
  address: string;
  officeHours: string;
  unitCount: number;
  facebook: string;
}

export interface HeroSlide {
  src: string;
  alt: string;
}

export interface HeroContent {
  slides: HeroSlide[];
}

export interface PetPolicy {
  allowed: boolean;
  notes: string;
}

export interface LeasingInfo {
  utilitiesIncluded: string[];
  petPolicy: PetPolicy;
  leaseTerms: string[];
}

export interface FloorPlan {
  id: string;
  name: string;
  sizeSqFt: number;
  baseRent: number;
  rentRange?: string;
  deposit?: number;
  isAvailable: boolean;
  availableUnitsCount: number;
  features: string[];
  image: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
}

export interface FAQ {
  q: string;
  a: string;
}

export interface ArkDifferenceCard {
  id: string;
  title: string;
  description: string;
  highlights: string[];
  image: string;
  imageAlt: string;
  accent: "teal" | "coral" | "gold" | "sage";
}

export interface ArkDifference {
  headline: string;
  subheadline: string;
  stats: { label: string; value: string }[];
  cards: ArkDifferenceCard[];
}

export interface ExploreCategory {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  link: string;
  linkLabel: string;
  accent: "teal" | "coral" | "gold" | "sage" | "plum" | "sky";
}

export interface ExploreHuntsville {
  headline: string;
  subheadline: string;
  intro: string;
  categories: ExploreCategory[];
}

export interface ProximityPoint {
  name: string;
  time: string;
  distance?: string;
  detail?: string;
}

export interface LocationContent {
  headline: string;
  subheadline: string;
  proximityPoints: ProximityPoint[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
}

export interface Testimonials {
  headline: string;
  subheadline: string;
  reviews: Testimonial[];
}

export interface ApartmentData {
  promotions: Promotions;
  community: Community;
  hero: HeroContent;
  arkDifference: ArkDifference;
  exploreHuntsville: ExploreHuntsville;
  locationContent: LocationContent;
  leasingInfo: LeasingInfo;
  floorPlans: FloorPlan[];
  gallery: GalleryImage[];
  faqs: FAQ[];
  testimonials: Testimonials;
}
