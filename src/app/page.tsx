import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import HeroSlider from '@/components/sections/HeroSlider';
import { BrandingBar } from '@/components/sections/BrandingBar';
import { AboutUs } from '@/components/sections/AboutUs';
import { ConsultingServices } from '@/components/sections/ConsultingServices';
import { TechnicalServices } from '@/components/sections/TechnicalServices';
import { ProductCatalog } from '@/components/sections/ProductCatalog';
import { VPSInfrastructure } from '@/components/sections/VPSInfrastructure';
import { ContactForm } from '@/components/sections/ContactForm';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="inicio">
        <BrandingBar />
        <HeroSlider />
        <AboutUs />
        <ConsultingServices />
        <TechnicalServices />
        <ProductCatalog />
        <VPSInfrastructure />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
