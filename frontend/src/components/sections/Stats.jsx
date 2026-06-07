import { useState, useEffect, useRef } from "react";
import { useInView } from "framer-motion";

// Animated Counter Component
function AnimatedCounter({ target, suffix = "", duration = 2 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    let timer;
    if (isInView) {
      let start = 0;
      const increment = target / (duration * 60);
      timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 1000 / 60);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isInView, target, duration]);

  return (
    <span ref={ref} className="font-serif text-5xl md:text-7xl font-bold text-primary">
      {count}{suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="py-20 bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 divide-y md:divide-y-0 md:divide-x divide-white/10">
          <div className="flex flex-col items-center text-center p-4">
            <AnimatedCounter target={500} suffix="+" />
            <p className="uppercase tracking-widest text-sm font-bold text-gray-400 mt-2">Projects Completed</p>
          </div>
          <div className="flex flex-col items-center text-center p-4">
            <AnimatedCounter target={25} />
            <p className="uppercase tracking-widest text-sm font-bold text-gray-400 mt-2">Years Experience</p>
          </div>
          <div className="flex flex-col items-center text-center p-4">
            <AnimatedCounter target={98} suffix="%" />
            <p className="uppercase tracking-widest text-sm font-bold text-gray-400 mt-2">Client Satisfaction</p>
          </div>
        </div>
      </div>
    </section>
  );
}
