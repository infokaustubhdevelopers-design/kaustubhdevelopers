export default function Footer({ logoPath }) {
  return (
    <footer className="bg-black text-white py-12 border-t border-white/10">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2 opacity-50">
          <img src={logoPath} alt="Kaustubh Developers" className="w-8 h-8 object-contain bg-white rounded-sm" />
          <span className="font-serif text-xl uppercase tracking-wider font-bold">
            Kaustubh Developers
          </span>
        </div>
        <p className="text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Kaustubh Developers. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
