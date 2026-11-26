import { useState } from 'react';
import { INNOVATION_PILLARS, InnovationPillar } from '../data/binovaData';

type HorizonFilter = 'all' | '2026-2027' | '2028-2029' | '2030-2031';
type ArchitectureTier = 'gen1' | 'gen2';

const HORIZON_TABS: { id: HorizonFilter; label: string }[] = [
  { id: 'all', label: 'Full 5-Year Horizon' },
  { id: '2026-2027', label: 'Year 1–2 · AI Pre-Sort' },
  { id: '2028-2029', label: 'Year 2–3 · Solar & Bio' },
  { id: '2030-2031', label: 'Year 4–5 · ESG Grid' },
];

export default function InnovationAndRoi() {
  const [horizon, setHorizon] = useState<HorizonFilter>('all');
  const [homesCount, setHomesCount] = useState<number>(10000);
  const [tier, setTier] = useState<ArchitectureTier>('gen2');

  const visiblePillars: InnovationPillar[] =
    horizon === 'all'
      ? INNOVATION_PILLARS
      : INNOVATION_PILLARS.filter((p) => p.horizon === horizon);

  const scaleFactor = homesCount / 10000;

  const tradOperating = Math.round(135000 * scaleFactor);
  const tradMaint = Math.round(25000 * scaleFactor);
  const tradTotal = tradOperating + tradMaint;

  const binovaOperating = Math.round((tier === 'gen1' ? 105000 : 82000) * scaleFactor);
  const binovaMaint = Math.round((tier === 'gen1' ? 15000 : 12000) * scaleFactor);
  const binovaTotal = binovaOperating + binovaMaint;

  const annualSavings = tradTotal - binovaTotal;
  const fiveYearSavings = annualSavings * 5;
  const costSavingsPct = Math.round((annualSavings / tradTotal) * 100);

  const co2AvoidedAnnual = Math.round((tier === 'gen1' ? 2400 : 3150) * scaleFactor);
  const fiveYearCo2Avoided = co2AvoidedAnnual * 5;
  const truckTripsReduction = tier === 'gen1' ? '85%' : '92%';
  const recyclingRate = tier === 'gen1' ? '68%' : '82%';
  const renewableShare = tier === 'gen1' ? '35%' : '85%';

  const formatRM = (val: number) => `RM ${val.toLocaleString('en-MY')}`;

  return (
    <section id="innovations" className="py-16 lg:py-24 bg-[#090D0C] border-b border-[#24302C]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        {/* Part A: 5-Year Product Innovation Roadmap */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <p className="text-xs font-medium text-[#86EFAC] mb-2">
              02. Five-Year Product &amp; Sustainability Innovation Plan
            </p>
            <h2
              className="font-display font-bold tracking-tight text-[#F2F5F3] mb-3"
              style={{ fontSize: 'clamp(1.65rem, 2.5vw, 2.25rem)', textWrap: 'balance' }}
            >
              Four engineered upgrades from 2026 to 2031
            </h2>
            <p className="text-base text-[#9FB0A8] leading-relaxed">
              Each milestone directly resolves a Gen-1 operational bottleneck—retrofitting cleanly
              onto installed stations so municipal and developer clients never face stranded hardware.
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Filter innovation roadmap by year"
            className="inline-flex flex-wrap items-center gap-1 p-1 bg-[#131A18] border border-[#24302C] rounded-lg shrink-0"
          >
            {HORIZON_TABS.map((tab) => {
              const active = horizon === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setHorizon(tab.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    active
                      ? 'bg-[#24302C] text-[#F2F5F3]'
                      : 'text-[#9FB0A8] hover:text-[#F2F5F3]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Innovation Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {visiblePillars.map((pillar) => (
            <article
              key={pillar.id}
              className="bg-[#131A18] border border-[#24302C] rounded-xl p-6 lg:p-7 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-4 text-xs text-[#9FB0A8] mb-3">
                  <span>{pillar.horizonLabel}</span>
                  <span className="font-mono font-semibold text-[#86EFAC] tabular-nums">
                    {pillar.impactMetric}
                  </span>
                </div>

                <h3 className="font-display text-xl font-bold text-[#F2F5F3] mb-2">
                  {pillar.index} {pillar.title}
                </h3>

                <p className="text-sm text-[#9FB0A8] leading-relaxed mb-5">
                  {pillar.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#24302C] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <span className="text-[#F2F5F3] font-medium">
                  Solves: <span className="text-[#9FB0A8] font-normal">{pillar.solvesGap}</span>
                </span>
                <span className="text-[#9FB0A8] sm:text-right">{pillar.impactDetail}</span>
              </div>
            </article>
          ))}
        </div>

        {/* Part B: Claim-to-Proof 5-Year ROI & Impact Calculator */}
        <div
          id="roi"
          className="bg-[#131A18] border border-[#24302C] rounded-xl p-6 lg:p-10 scroll-mt-24"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Calculator Controls */}
            <div className="lg:col-span-5">
              <p className="text-xs font-medium text-[#86EFAC] mb-2">
                03. Verified Cost &amp; Carbon Modeling
              </p>
              <h3 className="font-display text-2xl font-bold text-[#F2F5F3] mb-3">
                Five-Year Township ROI &amp; Sustainability Estimator
              </h3>
              <p className="text-sm text-[#9FB0A8] leading-relaxed mb-6">
                Calibrated to BINOVA&apos;s 10,000-home environmental and operating benchmark. Adjust
                township size and compare today&apos;s Gen-1 deployment against the 2031 autonomous
                upgrade package.
              </p>

              {/* Township Scale Slider */}
              <div className="mb-6 p-4 bg-[#18211E] border border-[#24302C] rounded-lg">
                <div className="flex items-center justify-between gap-4 mb-2">
                  <label htmlFor="homes-slider" className="text-sm font-semibold text-[#F2F5F3]">
                    Township Residential Scale
                  </label>
                  <span className="font-mono text-base font-bold text-[#86EFAC] tabular-nums">
                    {homesCount.toLocaleString('en-MY')} homes
                  </span>
                </div>
                <input
                  id="homes-slider"
                  type="range"
                  min={1000}
                  max={25000}
                  step={500}
                  value={homesCount}
                  onChange={(e) => setHomesCount(Number(e.target.value))}
                  className="w-full accent-[#22C55E] cursor-pointer"
                />
                <div className="flex justify-between text-xs text-[#9FB0A8] font-mono tabular-nums mt-1">
                  <span>1,000</span>
                  <span>10,000 (Poster Baseline)</span>
                  <span>25,000</span>
                </div>
              </div>

              {/* System Generation Toggle */}
              <div className="mb-6">
                <div className="text-sm font-semibold text-[#F2F5F3] mb-2">
                  BINOVA Deployment Package
                </div>
                <div className="grid grid-cols-2 gap-1 p-1 bg-[#18211E] border border-[#24302C] rounded-lg">
                  <button
                    type="button"
                    onClick={() => setTier('gen1')}
                    className={`px-3 py-2 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                      tier === 'gen1'
                        ? 'bg-[#24302C] text-[#F2F5F3]'
                        : 'text-[#9FB0A8] hover:text-[#F2F5F3]'
                    }`}
                  >
                    Gen-1 Baseline (Current)
                  </button>
                  <button
                    type="button"
                    onClick={() => setTier('gen2')}
                    className={`px-3 py-2 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                      tier === 'gen2'
                        ? 'bg-[#24302C] text-[#F2F5F3]'
                        : 'text-[#9FB0A8] hover:text-[#F2F5F3]'
                    }`}
                  >
                    2031 5-Yr Autonomous
                  </button>
                </div>
              </div>

              {/* Summary Outcome Strip */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#24302C]">
                <div>
                  <div className="text-xs text-[#9FB0A8] mb-1">5-Year Cumulative Cost Saved</div>
                  <div className="font-mono text-xl font-bold text-[#86EFAC] tabular-nums">
                    {formatRM(fiveYearSavings)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-[#9FB0A8] mb-1">5-Year CO2 Avoided</div>
                  <div className="font-mono text-xl font-bold text-[#F2F5F3] tabular-nums">
                    {fiveYearCo2Avoided.toLocaleString('en-MY')} t
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Tabular Cost & Environmental Comparison */}
            <div className="lg:col-span-7">
              <div className="border border-[#24302C] rounded-lg overflow-hidden mb-6 bg-[#18211E]">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#0D1311] border-b border-[#24302C] text-xs font-semibold text-[#9FB0A8]">
                      <th className="py-3.5 px-4">
                        Annual Cost Breakdown ({homesCount.toLocaleString('en-MY')} Homes)
                      </th>
                      <th className="py-3.5 px-4 text-right">Garbage Trucks</th>
                      <th className="py-3.5 px-4 text-right text-[#86EFAC]">
                        BINOVA ({tier === 'gen1' ? 'Gen-1' : '5-Yr Upgrade'})
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#24302C] text-sm">
                    <tr>
                      <td className="py-3.5 px-4 text-[#F2F5F3] font-medium">Operating Cost / Year</td>
                      <td className="py-3.5 px-4 text-right font-mono tabular-nums text-[#9FB0A8]">
                        {formatRM(tradOperating)}
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono tabular-nums font-semibold text-[#F2F5F3]">
                        {formatRM(binovaOperating)}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3.5 px-4 text-[#F2F5F3] font-medium">Maintenance / Year</td>
                      <td className="py-3.5 px-4 text-right font-mono tabular-nums text-[#9FB0A8]">
                        {formatRM(tradMaint)}
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono tabular-nums font-semibold text-[#F2F5F3]">
                        {formatRM(binovaMaint)}
                      </td>
                    </tr>
                    <tr className="bg-[#0D1311]">
                      <td className="py-4 px-4 font-bold text-[#F2F5F3]">Total Annual Expenditure</td>
                      <td className="py-4 px-4 text-right font-mono tabular-nums font-semibold text-[#9FB0A8]">
                        {formatRM(tradTotal)}
                      </td>
                      <td className="py-4 px-4 text-right font-mono tabular-nums font-bold text-[#86EFAC]">
                        {formatRM(binovaTotal)} ({costSavingsPct}% lower)
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Environmental KPI Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 bg-[#18211E] border border-[#24302C] rounded-lg">
                  <div className="text-xs text-[#9FB0A8] mb-1">Annual CO2 Saved</div>
                  <div className="font-mono text-lg font-bold text-[#F2F5F3] tabular-nums">
                    {co2AvoidedAnnual.toLocaleString('en-MY')} t/yr
                  </div>
                </div>
                <div className="p-4 bg-[#18211E] border border-[#24302C] rounded-lg">
                  <div className="text-xs text-[#9FB0A8] mb-1">Truck Trips Cut</div>
                  <div className="font-mono text-lg font-bold text-[#F2F5F3] tabular-nums">
                    {truckTripsReduction}
                  </div>
                </div>
                <div className="p-4 bg-[#18211E] border border-[#24302C] rounded-lg">
                  <div className="text-xs text-[#9FB0A8] mb-1">Recycling Rate</div>
                  <div className="font-mono text-lg font-bold text-[#86EFAC] tabular-nums">
                    {recyclingRate}
                  </div>
                </div>
                <div className="p-4 bg-[#18211E] border border-[#24302C] rounded-lg">
                  <div className="text-xs text-[#9FB0A8] mb-1">Renewable Energy</div>
                  <div className="font-mono text-lg font-bold text-[#86EFAC] tabular-nums">
                    {renewableShare}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
