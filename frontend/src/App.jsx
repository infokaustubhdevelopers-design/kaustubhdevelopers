import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import logoPath from "@assets/Untitled_design_1780384072114.png";
import heroBgVideo from "@assets/7025003-uhd_4096_2160_25fps_1780410026765.mp4";
import { projects } from "./data/projects";

// Import UI modules
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

// Import layout section components
import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import Services from "@/components/sections/Services";
import Portfolio from "@/components/sections/Portfolio";
import Testimonials from "@/components/sections/Testimonials";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

// Import project images for bundling
import sinhasApartmentImg from "@assets/k_001_1780486725934.jpeg";
import saiKripaImg from "@assets/WhatsApp_Image_2026-04-17_at_3.58.38_PM_(2)_-_Copy_1780486911077.jpeg";
import nardadeshwarImg from "@assets/WhatsApp_Image_2026-06-03_at_17.14.27_1780487110137.jpeg";

const projectImages = {
  "sai-kripa": saiKripaImg,
  "sinhas-apartment": sinhasApartmentImg,
  "nardadeshwar-heights": nardadeshwarImg,
};

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required"),
  projectType: z.string().min(1, "Please select a project type"),
  message: z.string().min(10, "Please provide more details about your project"),
});

export default function App() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [filter, setFilter] = useState("All");
  const { toast } = useToast();
  
  const [projectsList, setProjectsList] = useState(projects);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const form = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      projectType: "",
      message: "",
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    const sheetUrl = import.meta.env.VITE_GOOGLE_SHEET_WEBAPP_URL || "";
    
    if (!sheetUrl) {
      toast({
        title: "Configuration Error",
        description: "Google Sheets Web App URL is not set in environment variables.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      // Post directly to Google Sheets Apps Script Web App
      // We use 'no-cors' mode to bypass CORS restrictions for Google Apps Script Web App URLs
      await fetch(sheetUrl, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify(data),
      });

      // Since mode is 'no-cors', the response is opaque, but if no error is thrown, the request succeeded.
      toast({
        title: "Request Submitted",
        description: "We've received your inquiry and will contact you within 24 hours.",
      });
      form.reset();
    } catch (error) {
      console.error("Submission failed:", error);
      toast({
        title: "Submission Error",
        description: "Unable to connect to the server. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredProjects = filter === "All" 
    ? projectsList 
    : projectsList.filter(p => p.category === filter);

  const navLinks = [
    { name: "Services", href: "#services" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  const scrollTo = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Header
        scrolled={scrolled}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        scrollTo={scrollTo}
        navLinks={navLinks}
        logoPath={logoPath}
      />
      <Hero 
        heroBgVideo={heroBgVideo} 
        scrollTo={scrollTo} 
      />
      <Stats />
      <Services />
      <Portfolio
        filter={filter}
        setFilter={setFilter}
        filteredProjects={filteredProjects}
        projectImages={projectImages}
        navigate={navigate}
      />
      <Testimonials />
      <About />
      <Contact
        form={form}
        isSubmitting={isSubmitting}
        onSubmit={onSubmit}
      />
      <Footer 
        logoPath={logoPath} 
      />
      
      <Toaster />
    </div>
  );
}
