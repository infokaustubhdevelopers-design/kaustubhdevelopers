import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Hero({ heroBgVideo }) {
  return (
    <section id="top" className="relative h-screen flex items-center pt-20 overflow-hidden">
      <div className="absolute inset-0 bg-black/30 z-10" />
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        src={heroBgVideo}
        autoPlay
        loop
        muted
        playsInline
      />
      
      <div className="container mx-auto px-6 relative z-20">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-1 bg-primary" />
            <span className="text-primary font-bold tracking-widest uppercase text-sm">Industrial Strength</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-sans text-white font-bold leading-[1.1] mb-6">
            Quality Construction,<br />
            <span className="text-primary">Honest Service.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-xl font-medium">
            We build the infrastructure of tomorrow. From commercial high-rises to heavy industrial facilities, Kaustubh Developers delivers raw power refined by expert engineering.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" onClick={() => document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" })} className="rounded-none h-14 px-8 text-lg font-bold uppercase tracking-wider bg-primary text-primary-foreground hover:bg-white hover:text-black transition-colors duration-200">
              View Projects
            </Button>
            <Button size="lg" variant="outline" className="rounded-none h-14 px-8 text-lg font-bold uppercase tracking-wider bg-transparent border-white text-white hover:bg-white hover:text-black transition-colors duration-200">
              Our Capabilities
            </Button>
          </div>
        </motion.div>
      </div>
      
    </section>
  );
}
