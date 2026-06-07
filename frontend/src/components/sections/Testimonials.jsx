import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-muted/50 border-y border-border/50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center justify-center mb-16">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-8 h-1 bg-primary" />
            <span className="text-primary font-bold tracking-widest uppercase text-sm">Client Words</span>
            <div className="w-8 h-1 bg-primary" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold uppercase text-center">The Verdict</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              text: "Kaustubh Developers delivered our 40-story commercial tower ahead of schedule. Their attention to safety and logistics is unmatched in the industry.",
              author: "Sarah Jenkins",
              role: "Director of Development, Skyline Properties"
            },
            {
              text: "When dealing with heavy industrial retrofits, there is no margin for error. Kaustubh Developers' engineering precision gave us complete confidence.",
              author: "Marcus Vance",
              role: "VP Operations, Apex Manufacturing"
            },
            {
              text: "From ground break to final inspection, the Kaustubh Developers team operated with military precision. They don't just build, they engineer solutions.",
              author: "David Chen",
              role: "Principal Architect, Chen Design Group"
            }
          ].map((testimonial, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-card p-8 border border-border/50 relative"
              data-testid={`card-testimonial-${i}`}
            >
              <Quote className="w-10 h-10 text-primary/20 absolute top-6 right-6" />
              <p className="text-muted-foreground mb-8 relative z-10 font-medium">"{testimonial.text}"</p>
              <div>
                <p className="font-bold uppercase text-foreground">{testimonial.author}</p>
                <p className="text-xs text-primary font-bold tracking-wider uppercase mt-1">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
