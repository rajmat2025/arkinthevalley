import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ValueProps from "@/components/ValueProps";
import ExploreHuntsvilleSection from "@/components/ExploreHuntsville";
import FloorPlans from "@/components/FloorPlans";
import Gallery from "@/components/Gallery";
import Amenities from "@/components/Amenities";
import LocationMap from "@/components/LocationMap";
import FAQSection from "@/components/FAQSection";
import ContactForm from "@/components/ContactForm";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import apartmentData from "@/data/apartmentData.json";
import { isPromotionActive } from "@/lib/promotions";
import type { ApartmentData } from "@/types/apartment";

const data = apartmentData as ApartmentData;

export default function Home() {
  const showPromo = isPromotionActive(data.promotions);

  return (
    <>
      <Navbar promotions={showPromo ? data.promotions : null} />
      <main>
        <Hero
          hero={data.hero}
          promotions={data.promotions}
          unitCount={data.community.unitCount}
        />
        <ValueProps content={data.arkDifference} />
        <ExploreHuntsvilleSection content={data.exploreHuntsville} />
        <FloorPlans floorPlans={data.floorPlans} />
        <Gallery images={data.gallery} />
        <Amenities leasingInfo={data.leasingInfo} />
        <LocationMap content={data.locationContent} />
        <FAQSection faqs={data.faqs} />
        <ContactForm
          community={data.community}
          floorPlans={data.floorPlans}
        />
        <Testimonials content={data.testimonials} />
      </main>
      <Footer community={data.community} />
    </>
  );
}
