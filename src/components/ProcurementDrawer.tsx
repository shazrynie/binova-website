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
      className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="procurement-drawer-title"
    >
      <div className="w-full max-w-lg bg-white h-full flex flex-col border-l border-[#DCE4E0] shadow-xl">
        {/* Drawer Header */}
        <div className="px-6 py-4 border-b border-[#DCE4E0] flex items-center justify-between gap-4 bg-[#F7F9F8]">
          <div>
            <h2 id="procurement-drawer-title" className="font-display text-lg font-bold text-[#111E1A]">
              Procurement Bag &amp; Proposal
            </h2>
            <p className="text-xs text-[#4A5D57]">
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
            className="w-9 h-9 rounded-lg border border-[#DCE4E0] bg-white hover:bg-[#EAEFED] flex items-center justify-center text-[#111E1A] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {confirmedRef ? (
            <div className="p-6 bg-[#F7F9F8] border border-[#DCE4E0] rounded-xl">
              <div className="flex items-center gap-2.5 text-[#15803D] mb-3">
                <CheckCircle2 className="w-6 h-6 shrink-0" aria-hidden="true" />
                <h3 className="font-display text-lg font-bold text-[#111E1A]">
                  Procurement Proposal Confirmed
                </h3>
              </div>
              <p className="text-sm text-[#4A5D57] leading-relaxed mb-5">
                Your configuration for <strong className="text-[#111E1A]">{confirmedRef.organization}</strong>{' '}
                has been logged with our engineering &amp; municipal deployment team.
              </p>

              <div className="bg-white border border-[#DCE4E0] rounded-lg p-4 space-y-2.5 text-xs mb-6">
                <div className="flex justify-between">
                  <span className="text-[#4A5D57]">Reference Number</span>
                  <span className="font-mono font-bold text-[#111E1A]">{confirmedRef.refCode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#4A5D57]">Estimated Capital Value</span>
                  <span className="font-mono font-bold text-[#111E1A] tabular-nums">
                    RM {confirmedRef.totalRM.toLocaleString('en-MY')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#4A5D57]">5-Year Projected CO2 Offset</span>
                  <span className="font-mono font-bold text-[#15803D] tabular-nums">
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
                className="w-full py-2.5 text-sm font-semibold text-white bg-[#15803D] hover:bg-[#166534] rounded-lg transition-colors cursor-pointer"
              >
                Return to Storefront
              </button>
            </div>
          ) : items.length === 0 ? (
            <div className="py-16 text-center">
              <p className="font-display text-base font-semibold text-[#111E1A] mb-2">
                Your procurement bag is empty
              </p>
              <p className="text-sm text-[#4A5D57] max-w-xs mx-auto mb-6">
                Select BINOVA 6+1 stations, 5-year retrofit kits, or fleet software plans from the
                storefront catalog.
              </p>
              <a
                href="#storefront"
                onClick={onClose}
                className="inline-flex items-center justify-center px-4 py-2.5 text-xs font-semibold text-white bg-[#15803D] hover:bg-[#166534] rounded-lg transition-colors"
              >
                Browse Modules
              </a>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Line Items */}
              <div className="divide-y divide-[#DCE4E0] border border-[#DCE4E0] rounded-xl overflow-hidden bg-[#F7F9F8]">
                {items.map(({ item, quantity }) => (
                  <div key={item.id} className="p-4 bg-white">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <div className="font-mono text-xs text-[#4A5D57]">{item.sku}</div>
                        <h3 className="font-display text-sm font-bold text-[#111E1A]">
                          {item.name}
                        </h3>
                      </div>
                      <button
                        type="button"
                        onClick={() => onRemoveItem(item.id)}
                        aria-label={`Remove ${item.name}`}
                        className="text-[#4A5D57] hover:text-red-700 p-1 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between gap-4 mt-3">
                      <div className="inline-flex items-center border border-[#DCE4E0] rounded-lg bg-[#F7F9F8]">
                        <button
                          type="button"
                          onClick={() => onUpdateQty(item.id, -1)}
                          aria-label={`Decrease quantity of ${item.name}`}
                          className="w-8 h-8 flex items-center justify-center text-[#111E1A] hover:bg-[#EAEFED] rounded-l-lg cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-9 text-center font-mono text-xs font-semibold tabular-nums">
                          {quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQty(item.id, 1)}
                          aria-label={`Increase quantity of ${item.name}`}
                          className="w-8 h-8 flex items-center justify-center text-[#111E1A] hover:bg-[#EAEFED] rounded-r-lg cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-right font-mono text-sm font-bold text-[#111E1A] tabular-nums">
                        RM {(item.priceRM * quantity).toLocaleString('en-MY')}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Subtotal & CO2 Summary */}
              <div className="p-4 bg-[#F7F9F8] border border-[#DCE4E0] rounded-xl space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#4A5D57]">Configured Subtotal</span>
                  <span className="font-mono font-bold text-[#111E1A] tabular-nums">
                    RM {subtotalRM.toLocaleString('en-MY')}
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-[#4A5D57]">5-Year Projected Carbon Offset</span>
                  <span className="font-mono font-semibold text-[#15803D] tabular-nums">
                    {fiveYearCo2Tonnes.toLocaleString('en-MY')} tonnes CO2
                  </span>
                </div>
              </div>

              {/* Validated Commercial Quote & Order Submission Form */}
              <form onSubmit={handleSubmit} className="space-y-4 pt-2 border-t border-[#DCE4E0]">
                <h3 className="font-display text-base font-bold text-[#111E1A]">
                  Reserve Allocation &amp; Site Assessment
                </h3>

                {formError && (
                  <p role="alert" className="text-xs font-medium text-red-700 bg-red-50 border border-red-200 rounded-lg p-3">
                    {formError}
                  </p>
                )}

                <div>
                  <label htmlFor="org-input" className="block text-xs font-medium text-[#111E1A] mb-1">
                    Developer / Municipality Name
                  </label>
                  <input
                    id="org-input"
                    type="text"
                    required
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    placeholder="e.g. Putrajaya Eco-Township Sdn Bhd"
                    className="w-full px-3 py-2 text-sm bg-white border border-[#DCE4E0] rounded-lg focus:outline-none focus:border-[#15803D]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="contact-input" className="block text-xs font-medium text-[#111E1A] mb-1">
                      Contact Name
                    </label>
                    <input
                      id="contact-input"
                      type="text"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="Full name"
                      className="w-full px-3 py-2 text-sm bg-white border border-[#DCE4E0] rounded-lg focus:outline-none focus:border-[#15803D]"
                    />
                  </div>
                  <div>
                    <label htmlFor="email-input" className="block text-xs font-medium text-[#111E1A] mb-1">
                      Work Email
                    </label>
                    <input
                      id="email-input"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@company.com"
                      className="w-full px-3 py-2 text-sm bg-white border border-[#DCE4E0] rounded-lg focus:outline-none focus:border-[#15803D]"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="timeline-select" className="block text-xs font-medium text-[#111E1A] mb-1">
                    Target Deployment Window
                  </label>
                  <select
                    id="timeline-select"
                    value={timeline}
                    onChange={(e) => setTimeline(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white border border-[#DCE4E0] rounded-lg focus:outline-none focus:border-[#15803D]"
                  >
                    <option>Q2 2026 Pilot Deployment</option>
                    <option>Q4 2026 Phase 1 Rollout</option>
                    <option>2027 Township Masterplan</option>
                    <option>Existing Gen-1 Fleet Retrofit</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 text-sm font-semibold text-white bg-[#15803D] hover:bg-[#166534] rounded-lg transition-colors cursor-pointer"
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
