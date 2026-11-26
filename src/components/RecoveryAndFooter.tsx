import { FormEvent, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { RECOVERY_STAGES, MAINTENANCE_SCHEDULE } from '../data/binovaData';

export default function RecoveryAndFooter() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [stakeholderType, setStakeholderType] = useState('Property Developer / Township');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleBriefRequest = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Please enter your name.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }

    setSubmitted(true);
    setName('');
    setEmail('');
  };

  return (
    <>
      <section id="recovery" className="py-16 lg:py-24 bg-[#090D0C] border-b border-[#24302C] scroll-mt-16">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          {/* Recovery Centre 6-Stage Pipeline */}
          <div className="max-w-2xl mb-10">
            <p className="text-xs font-medium text-[#86EFAC] mb-2">
              05. Centralized Processing &amp; Lifecycle Care
            </p>
            <h2
              className="font-display font-bold tracking-tight text-[#F2F5F3] mb-3"
              style={{ fontSize: 'clamp(1.65rem, 2.5vw, 2.25rem)', textWrap: 'balance' }}
            >
              Six-stage circular recovery &amp; preventative operations
            </h2>
            <p className="text-base text-[#9FB0A8] leading-relaxed">
              Every pneumatic batch arrives at the solar-assisted BINOVA Recovery Centre by
              scheduled category—followed by scheduled weekly, monthly, and bi-annual service
              assurance.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 border border-[#24302C] rounded-xl bg-[#131A18] divide-y sm:divide-y-0 sm:divide-x divide-[#24302C] overflow-hidden mb-12">
            {RECOVERY_STAGES.map((stage) => (
              <div key={stage.step} className="p-5 flex flex-col justify-between">
                <div>
                  <div className="font-mono text-xs font-semibold text-[#86EFAC] mb-2">
                    Stage {stage.step}
                  </div>
                  <h3 className="font-display text-sm font-bold text-[#F2F5F3] mb-2">
                    {stage.title}
                  </h3>
                  <p className="text-xs text-[#9FB0A8] leading-relaxed mb-4">{stage.summary}</p>
                </div>
                <div className="pt-3 border-t border-[#24302C] font-mono text-xs font-medium text-[#F2F5F3]">
                  {stage.output}
                </div>
              </div>
            ))}
          </div>

          {/* Maintenance Schedule + Partner Brief Form */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Maintenance Assurance Table */}
            <div className="lg:col-span-7 bg-[#131A18] border border-[#24302C] rounded-xl p-6 lg:p-7">
              <h3 className="font-display text-xl font-bold text-[#F2F5F3] mb-2">
                Managed Service &amp; Cleaning Schedule
              </h3>
              <p className="text-sm text-[#9FB0A8] mb-6">
                Maintained end-to-end by the BINOVA Operations Team or certified city utility
                partners via dedicated home-chute and facility service access panels.
              </p>

              <div className="divide-y divide-[#24302C]">
                {MAINTENANCE_SCHEDULE.map((row) => (
                  <div
                    key={row.cadence}
                    className="py-4 first:pt-0 last:pb-0 grid grid-cols-1 sm:grid-cols-12 gap-3 items-start"
                  >
                    <div className="sm:col-span-3">
                      <div className="font-mono text-xs font-semibold text-[#86EFAC]">
                        {row.cadence}
                      </div>
                      <div className="text-xs text-[#9FB0A8] mt-0.5">{row.owner}</div>
                    </div>
                    <div className="sm:col-span-9">
                      <div className="text-sm font-semibold text-[#F2F5F3] mb-1">{row.scope}</div>
                      <p className="text-xs text-[#9FB0A8] leading-relaxed">{row.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Executive 5-Year Commercial Plan Consultation Form */}
            <div className="lg:col-span-5 bg-[#131A18] border border-[#24302C] rounded-xl p-6 lg:p-7">
              <h3 className="font-display text-xl font-bold text-[#F2F5F3] mb-2">
                Request 5-Year Engineering Dossier
              </h3>
              <p className="text-sm text-[#9FB0A8] mb-5">
                Receive CAD pipe-routing templates, financial payback schedules, and municipal
                tender specifications.
              </p>

              {submitted ? (
                <div className="p-5 bg-[#18211E] border border-[#24302C] rounded-lg">
                  <div className="flex items-center gap-2 text-[#86EFAC] font-semibold text-sm mb-2">
                    <CheckCircle2 className="w-5 h-5 shrink-0" aria-hidden="true" />
                    <span>Engineering Dossier Request Received</span>
                  </div>
                  <p className="text-xs text-[#9FB0A8] leading-relaxed mb-4">
                    Our commercial sustainability team will dispatch the 2026–2031 technical package
                    and schedule a site feasibility call within one business day.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="text-xs font-semibold text-[#86EFAC] hover:underline cursor-pointer"
                  >
                    Submit another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleBriefRequest} className="space-y-4">
                  {error && (
                    <p
                      role="alert"
                      className="text-xs font-medium text-red-200 bg-red-950/60 border border-red-800 rounded-lg p-3"
                    >
                      {error}
                    </p>
                  )}

                  <div>
                    <label htmlFor="brief-name" className="block text-xs font-medium text-[#F2F5F3] mb-1">
                      Your Name
                    </label>
                    <input
                      id="brief-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Full name"
                      className="w-full px-3 py-2 text-sm bg-[#18211E] border border-[#24302C] rounded-lg text-[#F2F5F3] placeholder:text-[#9FB0A8] focus:outline-none focus:border-[#4ADE80]"
                    />
                  </div>

                  <div>
                    <label htmlFor="brief-email" className="block text-xs font-medium text-[#F2F5F3] mb-1">
                      Corporate or Municipal Email
                    </label>
                    <input
                      id="brief-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="director@township.my"
                      className="w-full px-3 py-2 text-sm bg-[#18211E] border border-[#24302C] rounded-lg text-[#F2F5F3] placeholder:text-[#9FB0A8] focus:outline-none focus:border-[#4ADE80]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="brief-stakeholder"
                      className="block text-xs font-medium text-[#F2F5F3] mb-1"
                    >
                      Stakeholder Profile
                    </label>
                    <select
                      id="brief-stakeholder"
                      value={stakeholderType}
                      onChange={(e) => setStakeholderType(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-[#18211E] border border-[#24302C] rounded-lg text-[#F2F5F3] focus:outline-none focus:border-[#4ADE80]"
                    >
                      <option>Property Developer / Township</option>
                      <option>Municipal Council / City Utility</option>
                      <option>Residential Joint Management Body</option>
                      <option>ESG &amp; Sustainability Partner</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 text-sm font-semibold text-white bg-[#15803D] hover:bg-[#16A34A] rounded-lg transition-colors cursor-pointer"
                  >
                    Request Engineering Dossier
                  </button>
                </form>
              )}

              <div className="mt-5 pt-4 border-t border-[#24302C] flex items-center justify-between gap-4 text-xs text-[#9FB0A8]">
                <span>Follow field deployments &amp; eco-township updates</span>
                <a
                  href="https://www.instagram.com/binova.systems/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-semibold text-[#86EFAC] hover:text-[#F2F5F3] transition-colors whitespace-nowrap shrink-0"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-3.5 h-3.5 shrink-0"
                    aria-hidden="true"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                  <span>@binova.systems</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quiet Footer */}
      <footer className="bg-[#090D0C] py-10">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 text-xs text-[#9FB0A8]">
          <div>
            <span className="font-display text-base font-bold text-[#F2F5F3] mr-3">BINOVA</span>
            <span>Beyond the Bin · Smart Underground Waste Management Systems</span>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <a href="#system" className="hover:text-[#F2F5F3] transition-colors">
              System Architecture
            </a>
            <a href="#innovations" className="hover:text-[#F2F5F3] transition-colors">
              5-Year Innovations
            </a>
            <a href="#roi" className="hover:text-[#F2F5F3] transition-colors">
              ROI Estimator
            </a>
            <a href="#storefront" className="hover:text-[#F2F5F3] transition-colors">
              Storefront
            </a>
            <a
              href="https://www.instagram.com/binova.systems/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="BINOVA on Instagram"
              className="inline-flex items-center gap-1.5 text-[#86EFAC] hover:text-[#F2F5F3] transition-colors whitespace-nowrap"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-3.5 h-3.5 shrink-0"
                aria-hidden="true"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
              <span>Instagram</span>
            </a>
            <span>&copy; 2026 BINOVA Environmental Systems</span>
          </div>
        </div>
      </footer>
    </>
  );
}
