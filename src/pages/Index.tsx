import { useState } from "react";
import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Portfolio from "@/components/sections/Portfolio";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import Modal from "@/components/ui/modal";

const Index = () => {
  // Add modal state
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);

  const openAboutModal = () => setIsAboutModalOpen(true);
  const closeAboutModal = () => setIsAboutModalOpen(false);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section id="home">
          <Hero onAboutClick={openAboutModal} />
        </section>
        <section id="services">
          <Services />
        </section>
    
        <section id="portfolio">
          <Portfolio />
        </section>
        <section id="contact">
          <Contact />
        </section>
      </main>
      <Footer />

      {/* About Modal */}
      <Modal
  isOpen={isAboutModalOpen}
  onClose={closeAboutModal}
  title="About Us"
  animation="bounce"
  size="md"
>
  <div className="space-y-6 animate-slideIn p-6 rounded-lg bg-[hsl(var(--card))] shadow-[var(--shadow-card)]">
    <div className="text-center">
      <h3 className="text-2xl font-bold text-foreground mb-4">
        About Us
      </h3>
      <div className="w-24 h-1 mx-auto mb-6 bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(213,93%,68%)] shadow-[var(--shadow-glow)]"></div>
    </div>

    <div className="space-y-4">
      <p className="text-muted-foreground leading-relaxed">
        Moggstack is a dynamic team of skilled developers, designers, and strategists with over
         two years of expertise in software engineering,
         design, development, marketing, and strategy. Our vision is to deliver innovative, affordable solutions that empower businesses to thrive in the digital age. Driven by a passion for transformation, we craft technology that revolutionizes how people work and live.
      </p>

      <p className="text-muted-foreground leading-relaxed">
        In today's digital era, a strong online presence is crucial for business success.
         We ensure your brand stands out and thrives in the competitive digital landscape

        {/* With years of experience in the industry, we bring together expertise in design, development, 
        and strategy to deliver exceptional results for our clients and users. */}
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <div className="text-center p-4 rounded-lg border border-border bg-transparent">
        <h4 className="font-semibold text-primary mb-2">Our Mission</h4>
        <p className="text-sm text-muted-foreground">
          To create meaningful digital experiences that inspire and connect people around the world.
        </p>
      </div>

      <div className="text-center p-4 rounded-lg border border-border bg-transparent">
        <h4 className="font-semibold text-primary mb-2">Our Vision</h4>
        <p className="text-sm text-muted-foreground">
          To be the leading force in innovative technology solutions that shape the future.
        </p>
      </div>
    </div>

    <div className="pt-6 border-t border-border">
      <h4 className="font-semibold text-foreground mb-3">Why Choose Us?</h4>
      <ul className="space-y-2 text-sm text-muted-foreground">
        <li className="flex items-center">
          <span className="w-2 h-2 rounded-full bg-[hsl(var(--primary))] mr-3"></span>
          Expert team with proven track record
        </li>
        <li className="flex items-center">
          <span className="w-2 h-2 rounded-full bg-[hsl(var(--primary))] mr-3"></span>
          Premium, innovative solutions at budget-friendly prices, delivering unmatched value.
        </li>
        <li className="flex items-center">
          <span className="w-2 h-2 rounded-full bg-[hsl(var(--primary))] mr-3"></span>
          Dedicated customer support and service.
        </li>
        <li className="flex items-center">
          <span className="w-2 h-2 rounded-full bg-[hsl(var(--primary))] mr-3"></span>
          Commitment to quality and excellence.
        </li>
        <li className="flex items-center">
          <span className="w-2 h-2 rounded-full bg-[hsl(var(--primary))] mr-3"></span>
          Pay only when your product is complete and meets your expectations.
        </li>
      </ul>
    </div>
  </div>
</Modal>


    </div>
  );
};

export default Index;