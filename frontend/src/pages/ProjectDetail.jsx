import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Calendar, CheckCircle2, Layers } from "lucide-react";
import { projects } from "../data/projects";
import logoPath from "@assets/Untitled_design_1780384072114.png";

// Import project images for bundling
import sinhasApartmentImg from "@assets/k_001_1780486725934.jpeg";
import saiKripaImg from "@assets/WhatsApp_Image_2026-04-17_at_3.58.38_PM_(2)_-_Copy_1780486911077.jpeg";
import nardadeshwarImg from "@assets/WhatsApp_Image_2026-06-03_at_17.14.27_1780487110137.jpeg";

const projectImages = {
  "sai-kripa": saiKripaImg,
  "sinhas-apartment": sinhasApartmentImg,
  "nardadeshwar-heights": nardadeshwarImg,
};

const API_BASE = import.meta.env.VITE_API_URL || "";

export default function ProjectDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const localProject = projects.find((p) => p.slug === slug);
    setProject(localProject || null);
    setIsLoading(false);
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground">
        <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
        <button onClick={() => navigate("/")} className="text-primary underline">
          Back to Home
        </button>
      </div>
    );
  }

  const displayImage = projectImages[project.slug] || project.image;

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-secondary/95 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <img src={logoPath} alt="Kaustubh Developers" className="w-8 h-8 object-contain bg-white rounded-sm" />
            <span className="font-sans text-base sm:text-xl uppercase tracking-wider font-bold text-white">
              Kaustubh <span className="text-primary">Developers</span>
            </span>
          </a>
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-gray-300 hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </button>
        </div>
      </nav>

      {/* Hero Image / Placeholder */}
      <div className="pt-16 w-full h-[40vh] sm:h-[55vh] relative overflow-hidden bg-zinc-900">
        {displayImage ? (
          <img
            src={displayImage}
            alt={project.title}
            className="w-full h-full object-cover opacity-60"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-zinc-800 to-zinc-900" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 p-8 md:p-16">
          <span className="text-primary font-bold tracking-widest uppercase text-sm block mb-2">
            {project.category}
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-sans font-bold text-white uppercase leading-tight">
            {project.title}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main description */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-1 bg-primary" />
              <span className="text-primary font-bold tracking-widest uppercase text-sm">Project Overview</span>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed mb-10">
              {project.description}
            </p>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-1 bg-primary" />
              <span className="text-primary font-bold tracking-widest uppercase text-sm">Key Highlights</span>
            </div>
            <ul className="space-y-4">
              {project.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <span className="text-foreground font-medium">{h}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Sidebar details */}
          <div className="space-y-6">
            <div className="bg-secondary text-secondary-foreground p-8">
              <h3 className="text-lg font-bold uppercase tracking-wider mb-6 border-b border-white/10 pb-4">
                Project Details
              </h3>
              <div className="space-y-5">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Location</p>
                    <p className="font-semibold text-white">{project.location}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Year</p>
                    <p className="font-semibold text-white">{project.year}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Layers className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Total Area</p>
                    <p className="font-semibold text-white">{project.area}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Status</p>
                    <p className="font-semibold text-primary">{project.status}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-primary p-8">
              <h3 className="text-primary-foreground font-bold uppercase tracking-wider text-lg mb-3">
                Interested in a Similar Project?
              </h3>
              <p className="text-primary-foreground/80 text-sm mb-5">
                Get in touch with our team to discuss your vision.
              </p>
              <button
                onClick={() => { navigate("/"); setTimeout(() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }), 100); }}
                className="w-full bg-secondary text-white font-bold uppercase tracking-wider py-3 hover:bg-white hover:text-black transition-colors duration-200"
              >
                Request a Quote
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
