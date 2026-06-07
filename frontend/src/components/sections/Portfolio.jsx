import { motion, AnimatePresence } from "framer-motion";

export default function Portfolio({
  filter,
  setFilter,
  filteredProjects,
  projectImages,
  navigate,
}) {
  return (
    <section id="portfolio" className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-1 bg-primary" />
              <span className="text-primary font-bold tracking-widest uppercase text-sm">Our Work</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-serif font-bold uppercase">Featured Projects</h2>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {["All", "Commercial", "Residential"].map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 text-sm font-bold uppercase tracking-wider transition-all duration-200 border-2 ${
                  filter === cat 
                    ? "border-primary bg-primary text-primary-foreground" 
                    : "border-border bg-transparent text-muted-foreground hover:bg-white hover:text-black hover:border-white"
                }`}
                data-testid={`button-filter-${cat.toLowerCase()}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <motion.div 
          layout 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={project.id}
                className="group relative h-80 overflow-hidden cursor-pointer bg-zinc-900"
                data-testid={`card-portfolio-${project.id}`}
                onClick={() => navigate(`/project/${project.slug}`)}
              >
                {projectImages[project.slug] || project.image ? (
                  <img 
                    src={projectImages[project.slug] || project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-zinc-800 to-zinc-900" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                
                <div className="absolute bottom-0 left-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 text-[#ffffff] font-bold text-[30px]">
                  <span className="text-primary font-bold tracking-widest uppercase block text-[14px] mb-1">{project.category}</span>
                  <h3 className="font-serif font-bold text-white uppercase text-[30px]">{project.title}</h3>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
