import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import ecomnerceimg from "@/assets/ecommerceaitempl.jpg";
import landingpage from "@/assets/landingpageidea.webp"
import aibotimage from "@/assets/aibotimage.jpeg"
import { AuroraText } from "../ui/auroratext";

gsap.registerPlugin(ScrollTrigger);

const Portfolio = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  const projects = [
    {
      title: "E-Commerce Platform",
      description: "A modern All-in-One e-commerce solution with Cool UI, Powerful Security, Admin Panel and Payment Integration",
      tech: ["React.js", "Spring Boot", "PostgreSql", "RazorPay"],
       image:  ecomnerceimg  //"https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
    },
    {
      title: "Landing Pages",
      description: "Custom Landing Websites for Powerful Online Presence.",
      tech: ["React.js", "Tailwind CSS", "SEO Optimization", "Free Hosting"],
      image: landingpage  //"https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    },
    {
      title: "AI ChatBot Assistant",
      description: "Our customer help chatbot provides instant, 24/7 support on your website. It answers common questions, shares product or service details, assists with troubleshooting, and guides visitors with ease. For complex queries, it can connect users to a human agent, ensuring quick and reliable assistance.",
      tech: ["OpenAi", "React.js", "Spring AI", "TailWind CSS"],
      image: aibotimage //"https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop",
    },
    // {
    //   title: "Educational Platform",
    //   description: "Online learning platform with video streaming and progress tracking.",
    //   tech: ["Next.js", "Prisma", "Tailwind", "Vercel"],
    //   image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop",
    // }
  ];

  useEffect(() => {
    if (sectionRef.current && titleRef.current && projectsRef.current) {
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

      // Projects stagger animation
      gsap.fromTo(projectsRef.current.children,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: projectsRef.current,
            start: "top 80%",
          }
        }
      );
    }
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-secondary/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 
            ref={titleRef}
            className="text-4xl md:text-5xl font-bold mb-4 text-foreground"
          >
            Example <span className="bg-gradient-primary bg-clip-text text-transparent"><AuroraText speed={2} colors={["#38BDF8", "#6D28D9", "#38BDF8"]}>
                                    Projects
                                  </AuroraText></span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Check out some of our example projects and see what we can build for you
          </p>
        </div>

        <div ref={projectsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card 
              key={index} 
              className="bg-card border-border overflow-hidden hover:shadow-card transition-all duration-300 group"
            >
              <div className="aspect-video overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-card-foreground mb-2">
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, techIndex) => (
                    <span 
                      key={techIndex}
                      className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                {/* <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Live Demo
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Github className="w-4 h-4 mr-2" />
                    Code
                  </Button>
                </div> */}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;