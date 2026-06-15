export default function FooterSection() {
  const YEAR = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/8 py-12 overflow-hidden">
      <div className="noise-overlay" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo + tagline */}
          <div className="flex items-center gap-4">
            <img
              src="https://cdn-ai.onspace.ai/onspace/project/uploads/VTYhdTdtxks37QntytFFSG/logo1.jpeg"
              alt="NeurusAGi"
              className="w-8 h-8 rounded-full object-cover ring-1 ring-teal-neural/30"
            />
            <div>
              <span className="font-grotesk font-700 text-sm">
                <span className="text-white">Neurus</span>
                <span className="text-gradient-gold">AGi</span>
              </span>
              <p className="font-mono text-[10px] text-white/25 tracking-widest mt-0.5">
                A Quantum Leap in Intelligence
              </p>
            </div>
          </div>

          {/* Links */}
          <div className="flex items-center gap-8">
            {["Architecture", "Intelligence", "Safety", "Access"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="font-mono text-xs text-white/25 hover:text-teal-neural transition-colors duration-300 tracking-widest uppercase"
              >
                {item}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div className="font-mono text-xs text-white/20 tracking-widest">
            © {YEAR} NeurusAGi · Jeremy Taylor
          </div>
        </div>

        {/* Bottom line */}
        <div className="mt-8 h-[1px] bg-gradient-to-r from-transparent via-teal-neural/20 to-transparent" />
        <p className="text-center font-mono text-[10px] text-white/15 tracking-widest uppercase mt-6">
          Post-Tokenization Intelligence · Living Neural Network · Quantum-Powered AGi
        </p>
      </div>
    </footer>
  );
}
