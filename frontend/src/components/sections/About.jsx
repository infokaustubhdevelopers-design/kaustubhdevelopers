import { Shield } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-16 h-16 sm:w-24 sm:h-24 bg-primary z-0" />
            <div className="relative z-10 w-full h-64 sm:h-80 md:h-96 lg:h-[600px] bg-gradient-to-br from-zinc-800 to-zinc-900" />
            <div className="absolute -bottom-8 -right-8 bg-secondary text-secondary-foreground p-8 z-20 max-w-xs hidden md:block">
              <Shield className="w-12 h-12 text-primary mb-4" />
              <h4 className="text-xl font-serif font-bold uppercase mb-2">Uncompromising Quality</h4>
              <p className="text-sm text-gray-400">Every pour, every weld, every beam meets our exhaustive standards.</p>
            </div>
          </div>
          
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-1 bg-primary" />
              <span className="text-primary font-bold tracking-widest uppercase text-sm">Our Process</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold uppercase mb-8">Built on Discipline. Delivered with Precision.</h2>
            
            <div className="space-y-8">
              {[
                {
                  num: "01",
                  title: "Pre-Construction Planning",
                  desc: "Rigorous planning eliminates costly delays. We engineer the timeline before we break ground."
                },
                {
                  num: "02",
                  title: "Execution & Management",
                  desc: "On-site leadership with decades of experience managing complex logistics and material flow."
                },
                {
                  num: "03",
                  title: "Final Delivery",
                  desc: "Thorough inspection, clean handoff, and ongoing support for the structures we build."
                }
              ].map((step, i) => (
                <div key={i} className="flex gap-6">
                  <div className="text-4xl font-serif font-bold text-muted/50">{step.num}</div>
                  <div>
                    <h4 className="text-xl font-bold uppercase mb-2">{step.title}</h4>
                    <p className="text-muted-foreground">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
