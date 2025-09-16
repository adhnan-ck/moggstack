import { Github, Twitter, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
              MoggStack Technologies
            </div>
            <p className="text-muted-foreground mb-4 max-w-md">
              We create modern, responsive, and user-friendly websites that drive results. 
              Transform your digital presence with our expert web development services.
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com/adhnan-ck" className="text-muted-foreground hover:text-primary transition-colors">
                <Github size={20} />
              </a>
              {/* <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter size={20} />
              </a> */}
              {/* <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin size={20} />
              </a> */}
              <a href="mailto:moggstack@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-card-foreground mb-4">Services</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Web Development</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">UI/UX Design</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">AI Integration</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">SEO Optimization</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-card-foreground mb-4">Contact</h3>
            <ul className="space-y-2">
              <li><a href="mailto:hello@webagency.com" className="text-muted-foreground hover:text-primary transition-colors">moggstack@gmail.com</a></li>
              <li><a href="tel:+1555123456" className="text-muted-foreground hover:text-primary transition-colors">+91 9995338177</a></li>
              <li className="text-muted-foreground">Kannur, <br />Kerala, India</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; 2025 MoggStack Technologies. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;