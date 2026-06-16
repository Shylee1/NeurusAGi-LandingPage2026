import { useState, lazy, Suspense } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { toast } from "sonner";
import DecryptText from "./DecryptText";

const DataStreamScene = lazy(() => import("@/components/three/DataStreamScene"));

export default function ContactSection() {
  const { ref, visible } = useScrollReveal(0.1);
  const [form, setForm] = useState({ name: "", email: "", use_case: "", org: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.use_case) {
      toast.error("Please complete all required fields.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      toast.success("Access request received. We'll be in touch.");
    }, 1800);
  };

  return (
    <section
      id="contact"
      ref={ref as React.RefObject<HTMLDivElement>}
      className="relative min-h-screen py-24 overflow-hidden flex items-center"
    >
      <div className="absolute inset-0 opacity-30">
        <Suspense fallback={null}>
          <DataStreamScene className="w-full h-full" />
        </Suspense>
      </div>
      <div className="noise-overlay" />

      {/* Radial glow at center */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full bg-teal-neural/5 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 w-full">

        {/* Label */}
        <div className={`flex items-center gap-4 mb-8 transition-all duration-700 ${visible ? "opacity-100" : "opacity-0"}`}>
          <div className="w-8 h-[1px] bg-teal-neural" />
          <span className="font-mono text-xs text-teal-neural/60 tracking-widest uppercase">Early Access</span>
        </div>

        {!submitted ? (
          <>
            <h2
              className={`font-grotesk font-700 text-4xl md:text-6xl text-white leading-tight mb-4 transition-all duration-700 delay-100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              Request{" "}
              <span className="text-gradient-teal">Early Access</span>
            </h2>

            <p className={`text-white/40 font-grotesk mb-12 text-base leading-relaxed transition-all duration-700 delay-200 ${visible ? "opacity-100" : "opacity-0"}`}>
              NeurusAGi is currently in controlled release. Defense, enterprise, and research partners
              are given priority. Tell us about your use case.
            </p>

            <form
              onSubmit={handleSubmit}
              className={`flex flex-col gap-6 transition-all duration-700 delay-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="font-mono text-xs text-teal-neural/50 tracking-widest uppercase">
                    Full Name *
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    className="bg-void border border-white/10 focus:border-teal-neural/50 text-white font-grotesk text-sm px-4 py-3 outline-none transition-colors duration-200 placeholder:text-white/20"
                    placeholder="Your name"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="org" className="font-mono text-xs text-teal-neural/50 tracking-widest uppercase">
                    Organization
                  </label>
                  <input
                    id="org"
                    name="org"
                    type="text"
                    value={form.org}
                    onChange={handleChange}
                    className="bg-void border border-white/10 focus:border-teal-neural/50 text-white font-grotesk text-sm px-4 py-3 outline-none transition-colors duration-200 placeholder:text-white/20"
                    placeholder="Company / Agency"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="font-mono text-xs text-teal-neural/50 tracking-widest uppercase">
                  Email Address *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="bg-void border border-white/10 focus:border-teal-neural/50 text-white font-grotesk text-sm px-4 py-3 outline-none transition-colors duration-200 placeholder:text-white/20"
                  placeholder="your@email.com"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="use_case" className="font-mono text-xs text-teal-neural/50 tracking-widest uppercase">
                  Intended Use Case *
                </label>
                <textarea
                  id="use_case"
                  name="use_case"
                  required
                  rows={4}
                  value={form.use_case}
                  onChange={handleChange}
                  className="bg-void border border-white/10 focus:border-teal-neural/50 text-white font-grotesk text-sm px-4 py-3 outline-none transition-colors duration-200 placeholder:text-white/20 resize-none"
                  placeholder="Describe how you intend to deploy NeurusAGi..."
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                data-cursor="true"
                className="group relative overflow-hidden w-full py-4 font-mono text-sm tracking-widest uppercase font-700 mt-2 disabled:opacity-50 transition-all duration-300"
              >
                <div className={`absolute inset-0 transition-all duration-500 ${loading ? "bg-teal-neural/30" : "bg-teal-neural group-hover:bg-teal-glow"}`} />
                <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
                <span className="relative text-void font-700">
                  {loading ? (
                    <span className="flex items-center justify-center gap-3">
                      <span className="w-4 h-4 border-2 border-void/30 border-t-void/80 rounded-full animate-spin" />
                      Transmitting...
                    </span>
                  ) : (
                    "Submit Access Request →"
                  )}
                </span>
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-full border border-teal-neural/40 flex items-center justify-center mx-auto mb-8 animate-glow-pulse">
              <div className="w-3 h-3 rounded-full bg-teal-neural" />
            </div>
            <h3 className="font-grotesk font-700 text-3xl text-white mb-4">
              <DecryptText text="Request Received." trigger speed={40} />
            </h3>
            <p className="text-white/40 font-grotesk text-base">
              Our team will review your request and reach out shortly.
              <br />
              <span className="text-teal-neural/60 font-mono text-xs tracking-widest mt-2 block">A QUANTUM LEAP IN INTELLIGENCE</span>
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
