import { X, Plus, CheckCircle2 } from 'lucide-react';
import { CatalogItem } from '../data/binovaData';

interface PosterModalProps {
  modalData: { src: string; title: string } | null;
  onClose: () => void;
}

export function PosterModal({ modalData, onClose }: PosterModalProps) {
  if (!modalData) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="poster-modal-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-6xl bg-[#0F1B18] border border-white/15 rounded-xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-5 py-3.5 border-b border-white/15 flex items-center justify-between gap-4">
          <h3 id="poster-modal-title" className="font-display text-sm sm:text-base font-semibold text-white truncate">
            {modalData.title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close full resolution view"
            className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="max-h-[82vh] overflow-auto p-3 flex items-center justify-center bg-[#0F1B18]">
          <img
            src={modalData.src}
            alt={modalData.title}
            referrerPolicy="no-referrer"
            className="max-w-full h-auto rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}

interface SpecModalProps {
  item: CatalogItem | null;
  onClose: () => void;
  onAddToBag: (item: CatalogItem) => void;
}

export function ProductSpecModal({ item, onClose, onAddToBag }: SpecModalProps) {
  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/55 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="spec-modal-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl bg-white border border-[#DCE4E0] rounded-xl overflow-hidden shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 border-b border-[#DCE4E0] bg-[#F7F9F8] flex items-start justify-between gap-4">
          <div>
            <div className="font-mono text-xs text-[#4A5D57] mb-1">
              {item.sku} · {item.category}
            </div>
            <h3 id="spec-modal-title" className="font-display text-xl font-bold text-[#111E1A]">
              {item.name}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close specifications"
            className="w-8 h-8 rounded-lg border border-[#DCE4E0] bg-white hover:bg-[#EAEFED] flex items-center justify-center text-[#111E1A] cursor-pointer shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          <div className="w-full aspect-[16/9] rounded-lg overflow-hidden border border-[#DCE4E0] bg-[#EAEFED]">
            <img
              src={item.imageSrc}
              alt={item.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          <p className="text-sm text-[#4A5D57] leading-relaxed">{item.tagline}</p>

          <div>
            <h4 className="text-xs font-semibold text-[#111E1A] mb-3">
              Technical &amp; Operational Specifications
            </h4>
            <ul className="space-y-2.5">
              {item.specs.map((spec) => (
                <li key={spec} className="flex items-start gap-2.5 text-sm text-[#111E1A]">
                  <CheckCircle2 className="w-4 h-4 text-[#15803D] shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{spec}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-3 gap-4 p-4 bg-[#F7F9F8] border border-[#DCE4E0] rounded-lg text-xs">
            <div>
              <div className="text-[#4A5D57] mb-0.5">Unit Price</div>
              <div className="font-mono font-bold text-[#111E1A] tabular-nums">
                RM {item.priceRM.toLocaleString('en-MY')}
              </div>
            </div>
            <div>
              <div className="text-[#4A5D57] mb-0.5">Lead Time</div>
              <div className="font-semibold text-[#111E1A]">{item.leadTime}</div>
            </div>
            <div>
              <div className="text-[#4A5D57] mb-0.5">Annual CO2 Impact</div>
              <div className="font-mono font-bold text-[#15803D] tabular-nums">
                -{item.annualCo2SavingsTonnes} tonnes/yr
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-semibold text-[#111E1A] bg-white border border-[#DCE4E0] hover:bg-[#EAEFED] rounded-lg cursor-pointer"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => {
                onAddToBag(item);
                onClose();
              }}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-semibold text-white bg-[#15803D] hover:bg-[#166534] rounded-lg cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Add to Procurement Bag</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
