import { FormEvent, useState } from 'react';
import { X, Minus, Plus, Trash2, CheckCircle2 } from 'lucide-react';
import { CatalogItem } from '../data/binovaData';

export interface BagLineItem {
  item: CatalogItem;
  quantity: number;
}

interface ProcurementDrawerProps {
  isOpen: boolean;
  items: BagLineItem[];
  onClose: () => void;
  onUpdateQty: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearBag: () => void;
}

export default function ProcurementDrawer({
  isOpen,
  items,
  onClose,
  onUpdateQty,
  onRemoveItem,
  onClearBag,
}: ProcurementDrawerProps) {
  const [organization, setOrganization] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [timeline, setTimeline] = useState('Q2 2026 Pilot Deployment');
  const [formError, setFormError] = useState('');
  const [confirmedRef, setConfirmedRef] = useState<{
    refCode: string;
    organization: string;
    totalRM: number;
    fiveYearCo2Tonnes: number;
  } | null>(null);

  if (!isOpen) return null;

  const subtotalRM = items.reduce((acc, entry) => acc + entry.item.priceRM * entry.quantity, 0);
  const annualCo2Tonnes = items.reduce(
    (acc, entry) => acc + entry.item.annualCo2SavingsTonnes * entry.quantity,
    0
  );
  const fiveYearCo2Tonnes = annualCo2Tonnes * 5;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!organization.trim() || !contactName.trim()) {
      setFormError('Please enter your organization and primary contact name.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setFormError('Please provide a valid corporate or municipal email address.');
      return;
    }

    const refCode = `BIN-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setConfirmedRef({
      refCode,
      organization: organization.trim(),
      totalRM: subtotalRM,
      fiveYearCo2Tonnes,
    });
    onClearBag();
    setOrganization('');
    setContactName('');
    setEmail('');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-[3px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="procurement-drawer-title"
    >
      <div className="w-full max-w-lg bg-[#0D1311] h-full flex flex-col border-l border-[#24302C] shadow-2xl">
        {/* Drawer Header */}
        <div className="px-6 py-4 border-b border-[#24302C] flex items-center justify-between gap-4 bg-[#131A18]">
          <div>
            <h2 id="procurement-drawer-title" className="font-display text-lg font-bold text-[#F2F5F3]">
              Procurement Bag &amp; Proposal
            </h2>
            <p className="text-xs text-[#9FB0A8]">
              Direct commercial quote reservation &amp; pilot deployment
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setConfirmedRef(null);
              onClose();
            }}
            aria-label="Close procurement drawer"
            className="w-9 h-9 rounded-lg border border-[#24302C] bg-[#18211E] hover:bg-[#24302C] flex items-center justify-center text-[#F2F5F3] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {confirmedRef ? (
            <div className="p-6 bg-[#131A18] border border-[#24302C] rounded-xl">
              <div className="flex items-center gap-2.5 text-[#86EFAC] mb-3">
                <CheckCircle2 className="w-6 h-6 shrink-0" aria-hidden="true" />
                <h3 className="font-display text-lg font-bold text-[#F2F5F3]">
                  Procurement Proposal Confirmed
                </h3>
              </div>
              <p className="text-sm text-[#9FB0A8] leading-relaxed mb-5">
                Your configuration for <strong className="text-[#F2F5F3]">{confirmedRef.organization}</strong>{' '}
                has been logged with our engineering &amp; municipal deployment team.
              </p>

              <div className="bg-[#18211E] border border-[#24302C] rounded-lg p-4 space-y-2.5 text-xs mb-6">
                <div className="flex justify-between">
                  <span className="text-[#9FB0A8]">Reference Number</span>
                  <span className="font-mono font-bold text-[#F2F5F3]">{confirmedRef.refCode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#9FB0A8]">Estimated Capital Value</span>
                  <span className="font-mono font-bold text-[#F2F5F3] tabular-nums">
                    RM {confirmedRef.totalRM.toLocaleString('en-MY')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#9FB0A8]">5-Year Projected CO2 Offset</span>
                  <span className="font-mono font-bold text-[#86EFAC] tabular-nums">
                    {confirmedRef.fiveYearCo2Tonnes.toLocaleString('en-MY')} tonnes
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setConfirmedRef(null);
                  onClose();
                }}
                className="w-full py-2.5 text-sm font-semibold text-white bg-[#15803D] hover:bg-[#16A34A] rounded-lg transition-colors cursor-pointer"
              >
                Return to Storefront
              </button>
            </div>
          ) : items.length === 0 ? (
            <div className="py-16 text-center">
              <p className="font-display text-base font-semibold text-[#F2F5F3] mb-2">
                Your procurement bag is empty
              </p>
              <p className="text-sm text-[#9FB0A8] max-w-xs mx-auto mb-6">
                Select BINOVA 6+1 stations, 5-year retrofit kits, or fleet software plans from the
                storefront catalog.
              </p>
              <a
                href="#storefront"
                onClick={onClose}
                className="inline-flex items-center justify-center px-4 py-2.5 text-xs font-semibold text-white bg-[#15803D] hover:bg-[#16A34A] rounded-lg transition-colors"
              >
                Browse Modules
              </a>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Line Items */}
              <div className="divide-y divide-[#24302C] border border-[#24302C] rounded-xl overflow-hidden bg-[#131A18]">
                {items.map(({ item, quantity }) => (
                  <div key={item.id} className="p-4">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <div className="font-mono text-xs text-[#9FB0A8]">{item.sku}</div>
                        <h3 className="font-display text-sm font-bold text-[#F2F5F3]">
                          {item.name}
                        </h3>
                      </div>
                      <button
                        type="button"
                        onClick={() => onRemoveItem(item.id)}
                        aria-label={`Remove ${item.name}`}
                        className="text-[#9FB0A8] hover:text-red-400 p-1 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between gap-4 mt-3">
                      <div className="inline-flex items-center border border-[#24302C] rounded-lg bg-[#18211E]">
                        <button
                          type="button"
                          onClick={() => onUpdateQty(item.id, -1)}
                          aria-label={`Decrease quantity of ${item.name}`}
                          className="w-8 h-8 flex items-center justify-center text-[#F2F5F3] hover:bg-[#24302C] rounded-l-lg cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-9 text-center font-mono text-xs font-semibold tabular-nums text-[#F2F5F3]">
                          {quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQty(item.id, 1)}
                          aria-label={`Increase quantity of ${item.name}`}
                          className="w-8 h-8 flex items-center justify-center text-[#F2F5F3] hover:bg-[#24302C] rounded-r-lg cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-right font-mono text-sm font-bold text-[#F2F5F3] tabular-nums">
                        RM {(item.priceRM * quantity).toLocaleString('en-MY')}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Subtotal & CO2 Summary */}
              <div className="p-4 bg-[#131A18] border border-[#24302C] rounded-xl space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#9FB0A8]">Configured Subtotal</span>
                  <span className="font-mono font-bold text-[#F2F5F3] tabular-nums">
                    RM {subtotalRM.toLocaleString('en-MY')}
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-[#9FB0A8]">5-Year Projected Carbon Offset</span>
                  <span className="font-mono font-semibold text-[#86EFAC] tabular-nums">
                    {fiveYearCo2Tonnes.toLocaleString('en-MY')} tonnes CO2
                  </span>
                </div>
              </div>

              {/* Validated Commercial Quote & Order Submission Form */}
              <form onSubmit={handleSubmit} className="space-y-4 pt-2 border-t border-[#24302C]">
                <h3 className="font-display text-base font-bold text-[#F2F5F3]">
                  Reserve Allocation &amp; Site Assessment
                </h3>

                {formError && (
                  <p role="alert" className="text-xs font-medium text-red-200 bg-red-950/60 border border-red-800 rounded-lg p-3">
                    {formError}
                  </p>
                )}

                <div>
                  <label htmlFor="org-input" className="block text-xs font-medium text-[#F2F5F3] mb-1">
                    Developer / Municipality Name
                  </label>
                  <input
                    id="org-input"
                    type="text"
                    required
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    placeholder="e.g. Putrajaya Eco-Township Sdn Bhd"
                    className="w-full px-3 py-2 text-sm bg-[#131A18] border border-[#24302C] rounded-lg text-[#F2F5F3] placeholder:text-[#9FB0A8] focus:outline-none focus:border-[#4ADE80]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="contact-input" className="block text-xs font-medium text-[#F2F5F3] mb-1">
                      Contact Name
                    </label>
                    <input
                      id="contact-input"
                      type="text"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="Full name"
                      className="w-full px-3 py-2 text-sm bg-[#131A18] border border-[#24302C] rounded-lg text-[#F2F5F3] placeholder:text-[#9FB0A8] focus:outline-none focus:border-[#4ADE80]"
                    />
                  </div>
                  <div>
                    <label htmlFor="email-input" className="block text-xs font-medium text-[#F2F5F3] mb-1">
                      Work Email
                    </label>
                    <input
                      id="email-input"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@company.com"
                      className="w-full px-3 py-2 text-sm bg-[#131A18] border border-[#24302C] rounded-lg text-[#F2F5F3] placeholder:text-[#9FB0A8] focus:outline-none focus:border-[#4ADE80]"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="timeline-select" className="block text-xs font-medium text-[#F2F5F3] mb-1">
                    Target Deployment Window
                  </label>
                  <select
                    id="timeline-select"
                    value={timeline}
                    onChange={(e) => setTimeline(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-[#131A18] border border-[#24302C] rounded-lg text-[#F2F5F3] focus:outline-none focus:border-[#4ADE80]"
                  >
                    <option>Q2 2026 Pilot Deployment</option>
                    <option>Q4 2026 Phase 1 Rollout</option>
                    <option>2027 Township Masterplan</option>
                    <option>Existing Gen-1 Fleet Retrofit</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 text-sm font-semibold text-white bg-[#15803D] hover:bg-[#16A34A] rounded-lg transition-colors cursor-pointer"
                >
                  Submit Procurement Order
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
