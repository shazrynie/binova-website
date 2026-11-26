import { useState } from 'react';
import { ShieldCheck, Flame, Lock, EyeOff, ArrowRight } from 'lucide-react';
import { WASTE_STREAMS, EXECUTIVE_GAP_AUDIT } from '../data/binovaData';

const SAFETY_FEATURES = [
  {
    icon: Lock,
    title: 'Child & Finger Safety Lock',
    detail: 'Proximity sensor locks and closes motorized chute gates automatically during shredder engagement.',
  },
  {
    icon: EyeOff,
    title: 'UV-C Maintenance Interlock',
    detail: 'UV-C sterilization array powers down instantaneously whenever service panels are opened.',
  },
  {
    icon: Flame,
    title: 'Fire & Explosion Suppression',
    detail: 'Thermal and spark detectors inside underground pipes trigger automated dry-agent suppression.',
  },
  {
    icon: ShieldCheck,
    title: 'Isolated Hazardous Vault',
    detail: 'Batteries, electronics, chemicals, and aerosols bypass pneumatic pipes in a fire-rated 7th compartment.',
  },
];

export default function SystemExplorer() {
  const [selectedStreamId, setSelectedStreamId] = useState<string>(WASTE_STREAMS[0].id);

  const activeStream =
    WASTE_STREAMS.find((stream) => stream.id === selectedStreamId) ?? WASTE_STREAMS[0];

  return (
    <section id="system" className="py-16 lg:py-24 bg-[#0D1311] border-b border-[#24302C]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <p className="text-xs font-medium text-[#86EFAC] mb-2">
            01. Current Architecture &amp; Strategic Gap Audit
          </p>
          <h2
            className="font-display font-bold tracking-tight text-[#F2F5F3] mb-3"
            style={{ fontSize: 'clamp(1.65rem, 2.5vw, 2.25rem)', textWrap: 'balance' }}
          >
            How the 6+1 underground system operates—and where it evolves next
          </h2>
          <p className="text-base text-[#9FB0A8] leading-relaxed">
            Inspect each automated waste channel from resident QR scan to Recovery Centre dispatch,
            alongside our executive diagnosis of why both the hardware and digital presence must
            upgrade for five-year commercial sustainability.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Interactive 6+1 Stream Explorer */}
          <div className="lg:col-span-7 border border-[#24302C] rounded-xl bg-[#131A18] p-6">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-5">
              <h3 className="font-display text-lg font-semibold text-[#F2F5F3]">
                Interactive 6+1 Channel Specification
              </h3>
              <span className="text-xs text-[#9FB0A8]">Select a chute to inspect routing</span>
            </div>

            {/* Stream Selector Buttons */}
            <div
              role="tablist"
              aria-label="Waste stream channels"
              className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 mb-6"
            >
              {WASTE_STREAMS.map((stream) => {
                const isActive = stream.id === activeStream.id;
                return (
                  <button
                    key={stream.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setSelectedStreamId(stream.id)}
                    className={`px-3 py-2.5 rounded-lg text-xs font-semibold text-left transition-all duration-150 cursor-pointer border whitespace-nowrap truncate ${
                      isActive
                        ? 'bg-[#F2F5F3] text-[#090D0C] border-[#F2F5F3]'
                        : 'bg-[#18211E] text-[#F2F5F3] border-[#24302C] hover:border-[#4ADE80]'
                    }`}
                  >
                    <span
                      className="inline-block w-2.5 h-2.5 rounded-xs mr-2 align-middle"
                      style={{ backgroundColor: stream.colorHex }}
                      aria-hidden="true"
                    />
                    {stream.shortLabel}
                  </button>
                );
              })}
            </div>

            {/* Active Stream Detail Card */}
            <div className="bg-[#18211E] border border-[#24302C] rounded-lg p-6">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-5 border-b border-[#24302C]">
                <div>
                  <div className="flex items-center gap-2.5 mb-1">
                    <span
                      className="w-3.5 h-3.5 rounded-xs shrink-0"
                      style={{ backgroundColor: activeStream.colorHex }}
                      aria-hidden="true"
                    />
                    <h4 className="font-display text-xl font-bold text-[#F2F5F3]">
                      {activeStream.name}
                    </h4>
                  </div>
                  <p className="text-sm text-[#9FB0A8]">{activeStream.items}</p>
                </div>
                <div className="text-left sm:text-right">
                  <div className="text-xs text-[#9FB0A8]">Pneumatic Schedule</div>
                  <div className="font-mono text-xs font-semibold text-[#F2F5F3] tabular-nums mt-0.5">
                    {activeStream.dispatchWindow}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm">
                <div>
                  <div className="text-xs font-medium text-[#9FB0A8] mb-1">
                    Mechanical Shredding &amp; Volume Control
                  </div>
                  <p className="text-[#F2F5F3] font-medium leading-snug">
                    {activeStream.shredderSpec}
                  </p>
                </div>
                <div>
                  <div className="text-xs font-medium text-[#9FB0A8] mb-1">
                    Hygiene &amp; Odour Control
                  </div>
                  <p className="text-[#F2F5F3] font-medium leading-snug">
                    {activeStream.sanitization}
                  </p>
                </div>
                <div>
                  <div className="text-xs font-medium text-[#9FB0A8] mb-1">
                    Recovery Centre Destination
                  </div>
                  <p className="text-[#F2F5F3] font-medium leading-snug">
                    {activeStream.destination}
                  </p>
                </div>
                <div>
                  <div className="text-xs font-medium text-[#9FB0A8] mb-1">
                    Automated Safety Guardrail
                  </div>
                  <p className="text-[#86EFAC] font-medium leading-snug">
                    {activeStream.safetyNote}
                  </p>
                </div>
              </div>
            </div>

            {/* Safety & Protection Grid */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SAFETY_FEATURES.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="bg-[#18211E] border border-[#24302C] rounded-lg p-4 flex items-start gap-3"
                  >
                    <div className="w-8 h-8 rounded-md bg-[#131A18] border border-[#24302C] text-[#86EFAC] flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4" aria-hidden="true" />
                    </div>
                    <div>
                      <h5 className="text-sm font-semibold text-[#F2F5F3] mb-0.5">{item.title}</h5>
                      <p className="text-xs text-[#9FB0A8] leading-relaxed">{item.detail}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Executive Gap Audit (Why Product & Website Must Upgrade) */}
          <div className="lg:col-span-5 border border-[#2D3E37] rounded-xl bg-[#131A18] text-[#F2F5F3] p-6 lg:p-7">
            <div className="mb-6">
              <p className="text-xs font-medium text-[#86EFAC] mb-1.5">
                E-Commerce &amp; Product Strategy Memo
              </p>
              <h3 className="font-display text-xl font-bold text-[#F2F5F3] mb-2">
                Why Gen-1 &amp; our legacy site need a 5-year upgrade
              </h3>
              <p className="text-sm text-[#9FB0A8] leading-relaxed">
                BINOVA proves strong municipal ROI today, yet static PDFs and reactive contamination
                alerts risk buyer churn as smart-city procurement standards tighten.
              </p>
            </div>

            <div className="divide-y divide-[#24302C]">
              {EXECUTIVE_GAP_AUDIT.map((row) => (
                <div key={row.dimension} className="py-4 first:pt-0 last:pb-0">
                  <div className="text-xs font-semibold text-[#86EFAC] mb-1.5">
                    {row.dimension}
                  </div>
                  <div className="grid grid-cols-1 gap-1.5 text-xs">
                    <p className="text-[#9FB0A8]">
                      <span className="font-semibold text-[#F2F5F3]">Current: </span>
                      {row.current}
                    </p>
                    <p className="text-[#F2F5F3]">
                      <span className="font-semibold text-[#86EFAC]">2026–2031 Upgrade: </span>
                      {row.upgrade}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-5 border-t border-[#24302C]">
              <a
                href="#innovations"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#86EFAC] hover:text-[#F2F5F3] transition-colors"
              >
                <span>Inspect the 5-Year Innovation Plan</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
