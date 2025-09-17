import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { AuroraText } from "../ui/auroratext";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const animationsRef = useRef([]);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Enhanced mobile detection and keyboard handling
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    if (isMobile) {
      const initialViewportHeight = window.visualViewport?.height || window.innerHeight;
      
      const handleViewportChange = () => {
        if (window.visualViewport) {
          const currentHeight = window.visualViewport.height;
          const heightDifference = initialViewportHeight - currentHeight;
          
          // Keyboard is considered open if viewport height decreased by more than 150px
          const keyboardOpen = heightDifference > 150;
          
          if (keyboardOpen !== isKeyboardOpen) {
            setIsKeyboardOpen(keyboardOpen);
            
            if (keyboardOpen) {
              // Disable all animations and heavy processes when keyboard opens
              ScrollTrigger.getAll().forEach(trigger => {
                trigger.disable();
              });
              
              // Stop any running animations
              gsap.killTweensOf("*");
              
              // Reduce GPU usage
              document.body.style.transform = 'translateZ(0)';
              document.body.style.backfaceVisibility = 'hidden';
            } else {
              // Re-enable animations when keyboard closes
              ScrollTrigger.getAll().forEach(trigger => {
                trigger.enable();
              });
              
              // Reset GPU optimizations
              document.body.style.transform = '';
              document.body.style.backfaceVisibility = '';
            }
          }
        }
      };

      if (window.visualViewport) {
        window.visualViewport.addEventListener('resize', handleViewportChange);
      } else {
        window.addEventListener('resize', handleViewportChange);
      }

      return () => {
        if (window.visualViewport) {
          window.visualViewport.removeEventListener('resize', handleViewportChange);
        } else {
          window.removeEventListener('resize', handleViewportChange);
        }
        window.removeEventListener('resize', checkMobile);
      };
    }

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, [isMobile, isKeyboardOpen]);

  // Simplified animations with mobile optimization
  useEffect(() => {
    if (isMobile || !sectionRef.current || !titleRef.current || !contentRef.current) {
      // On mobile, just show elements without animation
      if (titleRef.current) titleRef.current.style.opacity = '1';
      if (contentRef.current) {
        Array.from(contentRef.current.children).forEach(child => {
          (child as HTMLElement).style.opacity = '1';
        });
      }
      return;
    }

    const ctx = gsap.context(() => {
      // Very lightweight animations for desktop only
      const titleTween = gsap.fromTo(titleRef.current, 
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power1.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
            once: true, // Only animate once
          }
        }
      );

      const contentTween = gsap.fromTo(contentRef.current.children,
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.05,
          ease: "power1.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 85%",
            once: true, // Only animate once
          }
        }
      );

      animationsRef.current = [titleTween, contentTween];
    }, sectionRef);

    return () => {
      ctx.revert();
      animationsRef.current = [];
    };
  }, [isMobile]);

  // Optimized form handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Use requestAnimationFrame for smoother updates on mobile
    if (isMobile) {
      requestAnimationFrame(() => {
        setFormData(prev => ({ ...prev, [name]: value }));
      });
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFocus = () => {
    if (isMobile) {
      // Optimize for mobile input focus
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    }
  };

  const handleBlur = () => {
    if (isMobile) {
      // Reset overflow when input loses focus
      setTimeout(() => {
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
      }, 100);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.subject || !formData.message) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const phoneNumber = "919995338177";
      const text = `📩 New Inquiry
-----------------
👤 Name: ${formData.firstName} ${formData.lastName}
📧 Email: ${formData.email}
📝 Subject: ${formData.subject}
💬 Message: ${formData.message}`;

      const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
      window.open(url, "_blank");
      
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error('Error opening WhatsApp:', error);
      alert('Failed to open WhatsApp. Please try again.');
    }
  };

  return (
    <section 
      ref={sectionRef} 
      className={`py-20 bg-background ${isKeyboardOpen ? 'overflow-hidden' : ''}`}
      style={{
        // Optimize rendering on mobile
        ...(isMobile && {
          willChange: 'auto',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
        })
      }}
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 
            ref={titleRef}
            className="text-4xl md:text-5xl font-bold mb-4 text-foreground"
            style={{ opacity: isMobile ? 1 : 0 }}
          >
            Let's Build Something 
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              {isMobile ? (
                // Simple text on mobile to reduce load
                <span>Amazing</span>
              ) : (
                <AuroraText speed={2} colors={["#38BDF8", "#6D28D9", "#38BDF8"]}>
                  Amazing
                </AuroraText>
              )}
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to start your next project? Get in touch and let's discuss how we can help bring your vision to life.
          </p>
        </div>

        <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-card-foreground">
                Send us a message
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-card-foreground mb-2 block">
                      First Name
                    </label>
                    <Input
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      placeholder="Adhnan"
                      required
                      autoComplete="given-name"
                      // Mobile optimization
                      inputMode="text"
                      autoCapitalize="words"
                      autoCorrect="off"
                      spellCheck="false"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-card-foreground mb-2 block">
                      Last Name
                    </label>
                    <Input
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      placeholder="Ashkar"
                      required
                      autoComplete="family-name"
                      inputMode="text"
                      autoCapitalize="words"
                      autoCorrect="off"
                      spellCheck="false"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-card-foreground mb-2 block">
                    Email
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholder="adnan@example.com"
                    required
                    autoComplete="email"
                    inputMode="email"
                    autoCapitalize="none"
                    autoCorrect="off"
                    spellCheck="false"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-card-foreground mb-2 block">
                    Subject
                  </label>
                  <Input
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholder="Project inquiry"
                    required
                    inputMode="text"
                    autoCapitalize="sentences"
                    autoCorrect="on"
                    spellCheck="true"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-card-foreground mb-2 block">
                    Message
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholder="Tell us about your project..."
                    className="min-h-[120px]"
                    required
                    autoCapitalize="sentences"
                    autoCorrect="on"
                    spellCheck="true"
                  />
                </div>
                <Button type="submit" className="w-full" size="lg">
                  <Send className="w-4 h-4 mr-2" />
                  Send via WhatsApp
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="space-y-8" style={{ opacity: isMobile ? 1 : 0 }}>
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-card-foreground">Email</h3>
                    <p className="text-muted-foreground">moggstack@gmail.com</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                    <Phone className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-card-foreground">Phone</h3>
                    <p className="text-muted-foreground">+91 9995 33 8177</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-card-foreground">Location</h3>
                    <p className="text-muted-foreground">
                      Kannur,
                      Kerala.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="bg-gradient-primary p-6 rounded-lg text-center">
              <h3 className="text-xl font-semibold text-primary-foreground mb-2">
                Ready to get started?
              </h3>
              <p className="text-primary-foreground/80 mb-4">
                Book a free consultation call with our team
              </p>
              <a href="tel:+919995338177">
                <Button variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  Call
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;