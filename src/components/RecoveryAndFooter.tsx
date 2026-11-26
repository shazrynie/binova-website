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
      <section id="recovery" className="py-16 lg:py-24 bg-[#F7F9F8] border-b border-[#DCE4E0] scroll-mt-16">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          {/* Recovery Centre 6-Stage Pipeline */}
          <div className="max-w-2xl mb-10">
            <p className="text-xs font-medium text-[#15803D] mb-2">
              05. Centralized Processing &amp; Lifecycle Care
            </p>
            <h2
              className="font-display font-bold tracking-tight text-[#111E1A] mb-3"
              style={{ fontSize: 'clamp(1.65rem, 2.5vw, 2.25rem)', textWrap: 'balance' }}
            >
              Six-stage circular recovery &amp; preventative operations
            </h2>
            <p className="text-base text-[#4A5D57] leading-relaxed">
              Every pneumatic batch arrives at the solar-assisted BINOVA Recovery Centre by
              scheduled category—followed by scheduled weekly, monthly, and bi-annual service
              assurance.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 border border-[#DCE4E0] rounded-xl bg-white divide-y sm:divide-y-0 sm:divide-x divide-[#DCE4E0] overflow-hidden mb-12">
            {RECOVERY_STAGES.map((stage) => (
              <div key={stage.step} className="p-5 flex flex-col justify-between">
                <div>
                  <div className="font-mono text-xs font-semibold text-[#15803D] mb-2">
                    Stage {stage.step}
                  </div>
                  <h3 className="font-display text-sm font-bold text-[#111E1A] mb-2">
                    {stage.title}
                  </h3>
                  <p className="text-xs text-[#4A5D57] leading-relaxed mb-4">{stage.summary}</p>
                </div>
                <div className="pt-3 border-t border-[#DCE4E0] font-mono text-xs font-medium text-[#111E1A]">
                  {stage.output}
                </div>
              </div>
            ))}
          </div>

          {/* Maintenance Schedule + Partner Brief Form */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Maintenance Assurance Table */}
            <div className="lg:col-span-7 bg-white border border-[#DCE4E0] rounded-xl p-6 lg:p-7">
              <h3 className="font-display text-xl font-bold text-[#111E1A] mb-2">
                Managed Service &amp; Cleaning Schedule
              </h3>
              <p className="text-sm text-[#4A5D57] mb-6">
                Maintained end-to-end by the BINOVA Operations Team or certified city utility
                partners via dedicated home-chute and facility service access panels.
              </p>

              <div className="divide-y divide-[#DCE4E0]">
                {MAINTENANCE_SCHEDULE.map((row) => (
                  <div
                    key={row.cadence}
                    className="py-4 first:pt-0 last:pb-0 grid grid-cols-1 sm:grid-cols-12 gap-3 items-start"
                  >
                    <div className="sm:col-span-3">
                      <div className="font-mono text-xs font-semibold text-[#15803D]">
                        {row.cadence}
                      </div>
                      <div className="text-xs text-[#4A5D57] mt-0.5">{row.owner}</div>
                    </div>
                    <div className="sm:col-span-9">
                      <div className="text-sm font-semibold text-[#111E1A] mb-1">{row.scope}</div>
                      <p className="text-xs text-[#4A5D57] leading-relaxed">{row.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Executive 5-Year Commercial Plan Consultation Form */}
            <div className="lg:col-span-5 bg-white border border-[#DCE4E0] rounded-xl p-6 lg:p-7">
              <h3 className="font-display text-xl font-bold text-[#111E1A] mb-2">
                Request 5-Year Engineering Dossier
              </h3>
              <p className="text-sm text-[#4A5D57] mb-5">
                Receive CAD pipe-routing templates, financial payback schedules, and municipal
                tender specifications.
              </p>

              {submitted ? (
                <div className="p-5 bg-[#F7F9F8] border border-[#DCE4E0] rounded-lg">
                  <div className="flex items-center gap-2 text-[#15803D] font-semibold text-sm mb-2">
                    <CheckCircle2 className="w-5 h-5 shrink-0" aria-hidden="true" />
                    <span>Engineering Dossier Request Received</span>
                  </div>
                  <p className="text-xs text-[#4A5D57] leading-relaxed mb-4">
                    Our commercial sustainability team will dispatch the 2026–2031 technical package
                    and schedule a site feasibility call within one business day.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="text-xs font-semibold text-[#15803D] hover:underline cursor-pointer"
                  >
                    Submit another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleBriefRequest} className="space-y-4">
                  {error && (
                    <p
                      role="alert"
                      className="text-xs font-medium text-red-700 bg-red-50 border border-red-200 rounded-lg p-3"
                    >
                      {error}
                    </p>
                  )}

                  <div>
                    <label htmlFor="brief-name" className="block text-xs font-medium text-[#111E1A] mb-1">
                      Your Name
                    </label>
                    <input
                      id="brief-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Full name"
                      className="w-full px-3 py-2 text-sm bg-[#F7F9F8] border border-[#DCE4E0] rounded-lg focus:outline-none focus:border-[#15803D]"
                    />
                  </div>

                  <div>
                    <label htmlFor="brief-email" className="block text-xs font-medium text-[#111E1A] mb-1">
                      Corporate or Municipal Email
                    </label>
                    <input
                      id="brief-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="director@township.my"
                      className="w-full px-3 py-2 text-sm bg-[#F7F9F8] border border-[#DCE4E0] rounded-lg focus:outline-none focus:border-[#15803D]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="brief-stakeholder"
                      className="block text-xs font-medium text-[#111E1A] mb-1"
                    >
                      Stakeholder Profile
                    </label>
                    <select
                      id="brief-stakeholder"
                      value={stakeholderType}
                      onChange={(e) => setStakeholderType(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-[#F7F9F8] border border-[#DCE4E0] rounded-lg focus:outline-none focus:border-[#15803D]"
                    >
                      <option>Property Developer / Township</option>
                      <option>Municipal Council / City Utility</option>
                      <option>Residential Joint Management Body</option>
                      <option>ESG &amp; Sustainability Partner</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 text-sm font-semibold text-white bg-[#111E1A] hover:bg-[#15803D] rounded-lg transition-colors cursor-pointer"
                  >
                    Request Engineering Dossier
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Quiet Footer */}
      <footer className="bg-white py-10">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 text-xs text-[#4A5D57]">
          <div>
            <span className="font-display text-base font-bold text-[#111E1A] mr-3">BINOVA</span>
            <span>Beyond the Bin · Smart Underground Waste Management Systems</span>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <a href="#system" className="hover:text-[#111E1A] transition-colors">
              System Architecture
            </a>
            <a href="#innovations" className="hover:text-[#111E1A] transition-colors">
              5-Year Innovations
            </a>
            <a href="#roi" className="hover:text-[#111E1A] transition-colors">
              ROI Estimator
            </a>
            <a href="#storefront" className="hover:text-[#111E1A] transition-colors">
              Storefront
            </a>
            <span>&copy; 2026 BINOVA Environmental Systems</span>
          </div>
        </div>
      </footer>
    </>
  );
}
