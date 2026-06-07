import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header({
  scrolled,
  mobileMenuOpen,
  setMobileMenuOpen,
  scrollTo,
  navLinks,
  logoPath,
}) {
  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-background/95 backdrop-blur-md shadow-md py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between">
        <a 
          href="#" 
          onClick={(e) => scrollTo(e, "#top")}
          className="flex items-center gap-2 group"
          data-testid="link-home"
        >
          <img src={logoPath} alt="Kaustubh Developers" className="w-8 h-8 sm:w-10 sm:h-10 object-contain bg-white rounded-sm transform transition-transform group-hover:-rotate-12" />
          <span className={`font-sans text-base sm:text-xl md:text-2xl uppercase tracking-wider font-bold ${scrolled ? 'text-foreground' : 'text-white'}`}>
            Kaustubh <span className="text-primary">Developers</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={(e) => scrollTo(e, link.href)}
              className={`text-sm font-semibold tracking-wide hover:text-primary transition-colors ${
                scrolled ? "text-foreground" : "text-white"
              }`}
              data-testid={`link-${link.name.toLowerCase()}`}
            >
              {link.name}
            </a>
          ))}
          <Button 
            onClick={(e) => {
              const el = document.getElementById('contact');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="rounded-none font-bold uppercase tracking-wider px-6 bg-primary text-primary-foreground hover:bg-white hover:text-black transition-colors duration-200"
            data-testid="button-nav-cta"
          >
            Get a Quote
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          data-testid="button-mobile-menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className={`w-6 h-6 ${scrolled ? 'text-foreground' : 'text-white'}`} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-background border-b border-border overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={(e) => scrollTo(e, link.href)}
                  className="text-lg font-medium py-2 border-b border-border/50"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
