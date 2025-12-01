import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import Testimonials from '../components/Testimonials';
import Team from '../components/Team';
import Offices from '../components/Offices';
import ContactForm from '../components/ContactForm';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Header />
      <About />
      <Services />
      <Testimonials />
      <Team />
      <Offices />
      <ContactForm />
      <Footer />
    </main>
  );
}