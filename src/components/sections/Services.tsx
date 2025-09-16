import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, Palette, Zap, Globe, Shield, BrainCircuit } from "lucide-react";
import { AuroraText } from "../ui/auroratext";

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const services = [
    {
      icon: Code,
      title: "Web Development",
      description: "Custom websites and web applications built with the latest technologies and best practices."
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      description: "Beautiful, intuitive designs that provide exceptional user experiences across all devices."
    },
    {
      icon: BrainCircuit,
      title: "AI Integration",
      description: "Boost efficiency and customer experience with seamless AI-powered solutions."
    },
    {
      icon: Zap,
      title: "Performance Optimization",
      description: "Fast-loading websites that rank well in search engines and convert visitors into customers."
    },
    {
      icon: Globe,
      title: "Digital Strategy",
      description: "Comprehensive digital solutions that align with your business goals and target audience."
    },
    {
      icon: Shield,
      title: "Maintenance & Support",
      description: "Ongoing support and maintenance to keep your website secure, updated, and performing well."
    }
  ];

  useEffect(() => {
    if (sectionRef.current && titleRef.current && cardsRef.current) {
      // Title animation
      gsap.fromTo(titleRef.current, 
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
          }
        }
      );

      // Cards stagger animation
      gsap.fromTo(cardsRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
          }
        }
      );
    }
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 
            ref={titleRef}
            className="text-4xl md:text-5xl font-bold mb-4 text-foreground"
          >
            Our <span className="bg-gradient-primary bg-clip-text text-transparent"><AuroraText speed={2} colors={["#38BDF8", "#6D28D9", "#38BDF8"]}>
                        Services
                      </AuroraText>{" "}</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We offer comprehensive web development services to bring your digital vision to life
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card 
                key={index} 
                className="bg-card border-border hover:shadow-card transition-all duration-300 hover:scale-105"
              >
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-card-foreground">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;