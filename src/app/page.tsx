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
import { getApartmentData } from "@/lib/apartment-data";
import { isPromotionActive } from "@/lib/promotions";

export const dynamic = "force-dynamic";

export default function Home() {
  const data = getApartmentData();
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
        <LocationMap content={data.locationContent} address={data.community.address} />
        <FAQSection faqs={data.faqs} />
        <ContactForm
          community={data.community}
          floorPlans={data.floorPlans}
          web3formsAccessKey={
            process.env.WEB3FORMS_ACCESS_KEY?.trim() ||
            process.env.NEXT_PUBLIC_WEB3FORMS_KEY?.trim() ||
            data.integrations?.web3formsAccessKey
          }
        />
        <Testimonials content={data.testimonials} />
      </main>
      <Footer community={data.community} />
    </>
  );
}
