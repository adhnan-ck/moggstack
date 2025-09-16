import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";

import FaultyTerminal from "../ui/faulty-terminal";
import { AuroraText } from "../ui/auroratext";

// Add the prop type for onAboutClick
interface HeroProps {
  onAboutClick: () => void;
}

const Hero = ({ onAboutClick }: HeroProps) => {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (heroRef.current && titleRef.current && subtitleRef.current && ctaRef.current) {
      const tl = gsap.timeline();
      
      // Set initial states
      gsap.set([titleRef.current, subtitleRef.current, ctaRef.current], { 
        opacity: 0,
        y: 30
      });

      // Animate elements in sequence
      tl.to(titleRef.current, { 
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      })
      .to(subtitleRef.current, { 
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.4")
      .to(ctaRef.current, { 
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.3");
    }
  }, []);

  return (
    <section 
      ref={heroRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-hero"
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 opacity-40"
        style={{
          // backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <FaultyTerminal
          scale={1.5}
          gridMul={[2, 1]}
          digitSize={1.2}
          timeScale={1}
          pause={false}
          scanlineIntensity={1}
          glitchAmount={1}
          flickerAmount={1}
          noiseAmp={1}
          chromaticAberration={0}
          dither={0}
          curvature={0}
          tint="#0a1228"
          mouseReact={true}
          mouseStrength={0.5}
          pageLoadAnimation={false}
          brightness={1}
        />
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-6 text-center relative z-10">
        <h1 
          ref={titleRef}
          className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent"
        >
          <AuroraText speed={3} colors={["#38BDF8", "#6D28D9", "#38BDF8"]}>
            We Build Digital
          </AuroraText>{" "}
          <br />
          <span className="text-foreground">Experiences</span>
        </h1>
        
        <p 
          ref={subtitleRef}
          className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto"
        >
          Transform your ideas into stunning web applications. 
          We create modern, responsive, and user-friendly websites that drive results.
        </p>
        
        <div ref={ctaRef} className="flex gap-4 justify-center flex-wrap">
          <Button
            variant="hero"
            size="lg"
            className="shadow-glow"
            onClick={() => {
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Start Your Project 
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            onClick={onAboutClick} // Connect to the modal
          >
            About Us
          </Button>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;