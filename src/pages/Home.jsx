import Hero from '../components/Hero';
import CertificationPartners from '../components/CertificationPartners';
import About from '../components/About';
import Stats from '../components/Stats';
import Benefits from '../components/Benefits';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import VerifyCertificatePage from '../pages/VerifyCertificate';

const Home = () => {
  return (
    <main>
      <Hero />
      <CertificationPartners />
      <VerifyCertificatePage />
      <About />
      <Stats />
      <Benefits />
      <Testimonials />
      <Contact />
    </main>
  );
};

export default Home;
