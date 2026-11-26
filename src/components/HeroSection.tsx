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
    <section
      id="top"
      className="pt-10 pb-14 lg:pt-14 lg:pb-20 border-b border-[#24302C] bg-[#090D0C] bg-[radial-gradient(ellipse_75%_45%_at_55%_-8%,rgba(22,163,74,0.14),transparent)]"
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left Executive Proposition Column */}
          <div className="lg:col-span-5 flex flex-col justify-between py-2">
            <div>
              <p className="text-xs font-medium tracking-wide text-[#86EFAC] mb-4">
                Beyond the Bin · 5-Year Commercial &amp; Product Transformation (2026–2031)
              </p>

              <h1
                className="font-display font-bold tracking-tight text-[#F2F5F3] leading-[1.08] mb-5"
                style={{ fontSize: 'clamp(2.25rem, 3.6vw, 3.35rem)', textWrap: 'balance' }}
              >
                Underground waste infrastructure built for the next decade.
              </h1>

              <p className="text-base leading-relaxed text-[#9FB0A8] max-w-[54ch] mb-8">
                BINOVA replaces street-level bins and diesel collection fleets with sealed pneumatic
                transport, auto-reverse shredders, and UV-C sanitization. Our five-year roadmap
                pairs edge AI pre-sorting and solar microgrids with a direct commercial procurement
                portal for townships and property developers.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="#storefront"
                  className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#15803D] hover:bg-[#16A34A] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4ADE80]"
                >
                  <span>Explore Commercial Catalog</span>
                  <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                </a>

                <a
                  href="#innovations"
                  className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-[#F2F5F3] bg-[#131A18] border border-[#24302C] hover:bg-[#1B2421] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4ADE80]"
                >
                  <span>Review 5-Year Roadmap</span>
                </a>
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-[#24302C] flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[#9FB0A8]">
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
          <div className="lg:col-span-7 flex flex-col bg-[#131A18] border border-[#24302C] rounded-xl overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-b border-[#24302C] bg-[#0D1311]">
              <div className="inline-flex items-center gap-1 p-1 bg-[#18211E] rounded-lg">
                <button
                  type="button"
                  onClick={() => setActiveVisual('cutaway')}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    activeVisual === 'cutaway'
                      ? 'bg-[#24302C] text-[#F2F5F3]'
                      : 'text-[#9FB0A8] hover:text-[#F2F5F3]'
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
                      ? 'bg-[#24302C] text-[#F2F5F3]'
                      : 'text-[#9FB0A8] hover:text-[#F2F5F3]'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  <span>Technical Blueprint</span>
                </button>
              </div>

              <button
                type="button"
                onClick={() => onOpenPosterModal(currentSrc, currentTitle)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#F2F5F3] hover:text-[#86EFAC] transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                <Maximize2 className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                <span>Inspect Full Resolution</span>
              </button>
            </div>

            <div className="relative flex-1 min-h-[300px] sm:min-h-[380px] bg-[#090D0C] flex items-center justify-center overflow-hidden">
              {!imageFailed[currentSrc] ? (
                <img
                  src={currentSrc}
                  alt={currentTitle}
                  referrerPolicy="no-referrer"
                  onError={() => setImageFailed((prev) => ({ ...prev, [currentSrc]: true }))}
                  className="w-full h-full object-contain bg-[#090D0C]"
                />
              ) : (
                <div className="p-8 text-center text-[#9FB0A8]">
                  <p className="font-display text-lg font-semibold text-[#F2F5F3] mb-2">
                    BINOVA Underground Waste Architecture
                  </p>
                  <p className="text-sm text-[#9FB0A8] max-w-md mx-auto">
                    6+1 smart chutes with auto-reverse shredders, UV-C sanitization, and underground
                    pneumatic suction to the BINOVA Recovery Centre.
                  </p>
                </div>
              )}
            </div>

            <div className="px-4 py-3 bg-[#131A18] border-t border-[#24302C] flex flex-wrap items-center justify-between gap-2 text-xs text-[#9FB0A8]">
              <span>
                {activeVisual === 'cutaway'
                  ? 'Internal hopper shredders, activated carbon filter, UV-C sanitization & pneumatic buffer lines'
                  : 'Complete engineering specs, 6-stage recovery flow, safety interlocks & cost benchmarks'}
              </span>
              <span className="font-mono text-[#F2F5F3] tabular-nums">6+1 Stream Spec</span>
            </div>
          </div>
        </div>

        {/* Full-Width 4-Column Baseline KPI Strip */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-[#24302C] rounded-xl bg-[#131A18] divide-y sm:divide-y-0 sm:divide-x divide-[#24302C] overflow-hidden">
          {BASELINE_KPIS.map((kpi) => (
            <div key={kpi.label} className="p-6">
              <div className="font-display text-3xl font-bold tracking-tight text-[#F2F5F3] tabular-nums mb-1">
                {kpi.value}
              </div>
              <div className="text-sm font-semibold text-[#86EFAC] mb-1.5">{kpi.label}</div>
              <p className="text-xs leading-relaxed text-[#9FB0A8]">{kpi.context}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
