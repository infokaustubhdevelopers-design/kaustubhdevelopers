import { motion } from "framer-motion";
import { Building2, Factory, Home, ArrowRight } from "lucide-react";

export default function Services() {
  return (
    <section id="services" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-8 h-1 bg-primary" />
            <span className="text-primary font-bold tracking-widest uppercase text-sm">Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-serif font-bold uppercase">What We Build</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Commercial",
              icon: <Building2 className="w-10 h-10" />,
              desc: "High-rise office buildings, retail centers, and corporate campuses built for modern business.",
            },
            {
              title: "Industrial",
              icon: <Factory className="w-10 h-10" />,
              desc: "Manufacturing buildings entirely to the customer's specifications — every structural and operational requirement met precisely.",
            },
            {
              title: "Residential",
              icon: <Home className="w-10 h-10" />,
              desc: "Multi-family housing and luxury developments combining durability with refined aesthetics.",
            }
          ].map((service, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="group relative bg-card border border-border p-8 cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-xl"
              data-testid={`card-service-${service.title.toLowerCase()}`}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-transparent group-hover:bg-primary transition-colors" />
              <div className="mb-6 p-4 bg-secondary/5 text-secondary inline-block rounded-sm group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                {service.icon}
              </div>
              <h3 className="text-2xl font-serif font-bold uppercase mb-4">{service.title}</h3>
              <p className="text-muted-foreground mb-6 line-clamp-3">
                {service.desc}
              </p>
              <a href="#" className="inline-flex items-center text-sm font-bold uppercase tracking-wider text-secondary group-hover:text-primary transition-colors">
                Learn More <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
