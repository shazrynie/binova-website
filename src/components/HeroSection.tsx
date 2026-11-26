import { useState } from 'react';
import { ArrowRight, Maximize2, Layers, FileText } from 'lucide-react';

interface HeroSectionProps {
  onOpenPosterModal: (initialSrc: string, title: string) => void;
}

const PRODUCT_IMAGE = './assets/aistudio/product.png_2bc50c8c.png';
const POSTER_IMAGE = './assets/aistudio/BINOVA__Smart_Underground_Waste_Management_Poster_6ad11f68.png';

const BASELINE_KPIS = [
  {
    value: '~35%',
    label: 'CO2 Emissions Reduction',
    context: '~2,400 tonnes avoided annually per 10,000 homes',
  },
  {
    value: '80–90%',
    label: 'Fewer Garbage Truck Trips',
    context: 'Replaced by scheduled underground pneumatic suction',
  },
  {
    value: '60–75%',
    label: 'Target Recycling Rate',
    context: 'Compared to 25–35% under conventional bin collection',
  },
  {
    value: '25–35%',
    label: 'Lower Annual Operating Cost',
    context: 'RM 100k–140k vs. RM 140k–180k traditional fleet spend',
  },
];

export default function HeroSection({ onOpenPosterModal }: HeroSectionProps) {
  const [activeVisual, setActiveVisual] = useState<'cutaway' | 'poster'>('cutaway');
  const [imageFailed, setImageFailed] = useState<Record<string, boolean>>({});

  const currentSrc = activeVisual === 'cutaway' ? PRODUCT_IMAGE : POSTER_IMAGE;
  const currentTitle =
    activeVisual === 'cutaway'
      ? 'BINOVA 6+1 Underground Kiosk & Pneumatic Pipe Cutaway'
      : 'BINOVA Smart Underground Waste Management Technical Poster';

  return (
    <section id="top" className="pt-10 pb-14 lg:pt-14 lg:pb-20 border-b border-[#DCE4E0]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left Executive Proposition Column */}
          <div className="lg:col-span-5 flex flex-col justify-between py-2">
            <div>
              <p className="text-xs font-medium tracking-wide text-[#4A5D57] mb-4">
                Beyond the Bin · 5-Year Commercial &amp; Product Transformation (2026–2031)
              </p>

              <h1
                className="font-display font-bold tracking-tight text-[#111E1A] leading-[1.08] mb-5"
                style={{ fontSize: 'clamp(2.25rem, 3.6vw, 3.35rem)', textWrap: 'balance' }}
              >
                Underground waste infrastructure built for the next decade.
              </h1>

              <p className="text-base leading-relaxed text-[#4A5D57] max-w-[54ch] mb-8">
                BINOVA replaces street-level bins and diesel collection fleets with sealed pneumatic
                transport, auto-reverse shredders, and UV-C sanitization. Our five-year roadmap
                pairs edge AI pre-sorting and solar microgrids with a direct commercial procurement
                portal for townships and property developers.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="#storefront"
                  className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#15803D] hover:bg-[#166534] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#15803D]"
                >
                  <span>Explore Commercial Catalog</span>
                  <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                </a>

                <a
                  href="#innovations"
                  className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-[#111E1A] bg-white border border-[#DCE4E0] hover:bg-[#EAEFED] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#15803D]"
                >
                  <span>Review 5-Year Roadmap</span>
                </a>
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-[#DCE4E0] flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[#4A5D57]">
              <span>6+1 Automated Chutes</span>
              <span aria-hidden="true">·</span>
              <span>UV-C &amp; Activated Carbon</span>
              <span aria-hidden="true">·</span>
              <span>Pneumatic Buffer Network</span>
              <span aria-hidden="true">·</span>
              <span>RM 25–35% Lower OpEx</span>
            </div>
          </div>

          {/* Right Product & Blueprint Visual Column */}
          <div className="lg:col-span-7 flex flex-col bg-white border border-[#DCE4E0] rounded-xl overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-b border-[#DCE4E0] bg-[#F7F9F8]">
              <div className="inline-flex items-center gap-1 p-1 bg-[#EAEFED] rounded-lg">
                <button
                  type="button"
                  onClick={() => setActiveVisual('cutaway')}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    activeVisual === 'cutaway'
                      ? 'bg-white text-[#111E1A] shadow-xs'
                      : 'text-[#4A5D57] hover:text-[#111E1A]'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  <span>System Cutaway</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveVisual('poster')}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    activeVisual === 'poster'
                      ? 'bg-white text-[#111E1A] shadow-xs'
                      : 'text-[#4A5D57] hover:text-[#111E1A]'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  <span>Technical Blueprint</span>
                </button>
              </div>

              <button
                type="button"
                onClick={() => onOpenPosterModal(currentSrc, currentTitle)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#111E1A] hover:text-[#15803D] transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                <Maximize2 className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                <span>Inspect Full Resolution</span>
              </button>
            </div>

            <div className="relative flex-1 min-h-[300px] sm:min-h-[380px] bg-[#0F1B18] flex items-center justify-center overflow-hidden">
              {!imageFailed[currentSrc] ? (
                <img
                  src={currentSrc}
                  alt={currentTitle}
                  referrerPolicy="no-referrer"
                  onError={() => setImageFailed((prev) => ({ ...prev, [currentSrc]: true }))}
                  className="w-full h-full object-contain bg-[#0F1B18]"
                />
              ) : (
                <div className="p-8 text-center text-white/80">
                  <p className="font-display text-lg font-semibold text-white mb-2">
                    BINOVA Underground Waste Architecture
                  </p>
                  <p className="text-sm text-white/70 max-w-md mx-auto">
                    6+1 smart chutes with auto-reverse shredders, UV-C sanitization, and underground
                    pneumatic suction to the BINOVA Recovery Centre.
                  </p>
                </div>
              )}
            </div>

            <div className="px-4 py-3 bg-white border-t border-[#DCE4E0] flex flex-wrap items-center justify-between gap-2 text-xs text-[#4A5D57]">
              <span>
                {activeVisual === 'cutaway'
                  ? 'Internal hopper shredders, activated carbon filter, UV-C sanitization & pneumatic buffer lines'
                  : 'Complete engineering specs, 6-stage recovery flow, safety interlocks & cost benchmarks'}
              </span>
              <span className="font-mono text-[#111E1A] tabular-nums">6+1 Stream Spec</span>
            </div>
          </div>
        </div>

        {/* Full-Width 4-Column Baseline KPI Strip */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-[#DCE4E0] rounded-xl bg-white divide-y sm:divide-y-0 sm:divide-x divide-[#DCE4E0] overflow-hidden">
          {BASELINE_KPIS.map((kpi) => (
            <div key={kpi.label} className="p-6">
              <div className="font-display text-3xl font-bold tracking-tight text-[#111E1A] tabular-nums mb-1">
                {kpi.value}
              </div>
              <div className="text-sm font-semibold text-[#15803D] mb-1.5">{kpi.label}</div>
              <p className="text-xs leading-relaxed text-[#4A5D57]">{kpi.context}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
