import { useState } from 'react';
import { Search, Plus, Check, Eye } from 'lucide-react';
import { CATALOG_ITEMS, CatalogItem } from '../data/binovaData';

interface StorefrontCatalogProps {
  onAddToBag: (item: CatalogItem) => void;
  onInspectItem: (item: CatalogItem) => void;
}

type CategoryFilter = 'All' | CatalogItem['category'];

const CATEGORY_TABS: CategoryFilter[] = [
  'All',
  'Core Hardware',
  '5-Year Innovation Kits',
  'Software & Maintenance',
];

function SchematicPreview({ variant }: { variant: CatalogItem['schematicVariant'] }) {
  return (
    <div className="w-full aspect-[4/3] bg-[#0F1B18] border-b border-[#DCE4E0] flex items-center justify-center p-6">
      {variant === 'station' && (
        <svg viewBox="0 0 240 160" className="w-full h-full" aria-hidden="true">
          <rect x="24" y="28" width="150" height="78" rx="4" fill="#1C2E28" stroke="#4ADE80" strokeWidth="1.5" />
          {[0, 1, 2, 3, 4, 5].map((i) => {
            const colors = ['#1D4ED8', '#15803D', '#CA8A04', '#475569', '#92400E', '#6D28D9'];
            return (
              <g key={i}>
                <rect x={34 + i * 22} y="40" width="16" height="44" rx="2" fill={colors[i]} />
                <rect x={37 + i * 22} y="46" width="10" height="14" rx="1" fill="#0F1B18" />
                <path
                  d={`M ${42 + i * 22} 106 L ${42 + i * 22} 138 L 220 138`}
                  fill="none"
                  stroke={colors[i]}
                  strokeWidth="2"
                  opacity="0.85"
                />
              </g>
            );
          })}
          <rect x="182" y="28" width="32" height="78" rx="4" fill="#7F1D1D" stroke="#EF4444" strokeWidth="1.5" />
          <path d="M198 52 L206 68 L190 68 Z" fill="none" stroke="#FCA5A5" strokeWidth="1.5" />
        </svg>
      )}

      {variant === 'optical' && (
        <svg viewBox="0 0 240 160" className="w-full h-full" aria-hidden="true">
          <rect x="52" y="26" width="136" height="108" rx="6" fill="#1C2E28" stroke="#4ADE80" strokeWidth="1.5" />
          <circle cx="120" cy="68" r="24" fill="#0F1B18" stroke="#86EFAC" strokeWidth="1.5" />
          <circle cx="120" cy="68" r="10" fill="#15803D" />
          <path d="M68 108 L172 108" stroke="#4ADE80" strokeWidth="1.5" strokeDasharray="4 4" />
          <path d="M96 68 L62 108 M144 68 L178 108" stroke="#86EFAC" strokeWidth="1" opacity="0.7" />
        </svg>
      )}

      {variant === 'solar' && (
        <svg viewBox="0 0 240 160" className="w-full h-full" aria-hidden="true">
          <polygon points="40,56 184,32 204,64 60,88" fill="#1E3A5F" stroke="#86EFAC" strokeWidth="1.5" />
          <line x1="76" y1="50" x2="96" y2="82" stroke="#60A5FA" strokeWidth="1" opacity="0.5" />
          <line x1="112" y1="44" x2="132" y2="76" stroke="#60A5FA" strokeWidth="1" opacity="0.5" />
          <line x1="148" y1="38" x2="168" y2="70" stroke="#60A5FA" strokeWidth="1" opacity="0.5" />
          <rect x="84" y="102" width="72" height="32" rx="4" fill="#1C2E28" stroke="#4ADE80" strokeWidth="1.5" />
          <path d="M118 82 L118 102" stroke="#4ADE80" strokeWidth="2" />
          <path d="M115 112 L123 112 L117 124 L125 124" fill="none" stroke="#86EFAC" strokeWidth="1.5" />
        </svg>
      )}

      {variant === 'biopod' && (
        <svg viewBox="0 0 240 160" className="w-full h-full" aria-hidden="true">
          <rect x="44" y="46" width="152" height="68" rx="22" fill="#1C2E28" stroke="#4ADE80" strokeWidth="1.5" />
          <line x1="94" y1="46" x2="94" y2="114" stroke="#4ADE80" strokeWidth="1" opacity="0.5" />
          <line x1="146" y1="46" x2="146" y2="114" stroke="#4ADE80" strokeWidth="1" opacity="0.5" />
          <circle cx="69" cy="84" r="10" fill="#92400E" />
          <circle cx="120" cy="84" r="10" fill="#15803D" />
          <circle cx="171" cy="84" r="10" fill="#86EFAC" />
          <path d="M18 80 L44 80 M196 80 L222 80" stroke="#4ADE80" strokeWidth="2.5" />
        </svg>
      )}

      {variant === 'portal' && (
        <svg viewBox="0 0 240 160" className="w-full h-full" aria-hidden="true">
          <rect x="34" y="28" width="172" height="104" rx="6" fill="#1C2E28" stroke="#4ADE80" strokeWidth="1.5" />
          <rect x="48" y="44" width="60" height="32" rx="3" fill="#0F1B18" stroke="#86EFAC" strokeWidth="1" />
          <rect x="118" y="44" width="74" height="32" rx="3" fill="#0F1B18" stroke="#86EFAC" strokeWidth="1" />
          <path d="M56 112 L88 94 L120 102 L156 84 L184 90" fill="none" stroke="#4ADE80" strokeWidth="2" />
          <circle cx="156" cy="84" r="3.5" fill="#86EFAC" />
        </svg>
      )}

      {variant === 'care' && (
        <svg viewBox="0 0 240 160" className="w-full h-full" aria-hidden="true">
          <rect x="52" y="34" width="58" height="92" rx="4" fill="#1C2E28" stroke="#4ADE80" strokeWidth="1.5" />
          <line x1="62" y1="52" x2="100" y2="52" stroke="#86EFAC" strokeWidth="2" />
          <line x1="62" y1="68" x2="100" y2="68" stroke="#86EFAC" strokeWidth="2" />
          <line x1="62" y1="84" x2="100" y2="84" stroke="#86EFAC" strokeWidth="2" />
          <line x1="62" y1="100" x2="100" y2="100" stroke="#86EFAC" strokeWidth="2" />
          <rect x="130" y="34" width="58" height="92" rx="4" fill="#1C2E28" stroke="#A78BFA" strokeWidth="1.5" />
          <line x1="144" y1="50" x2="144" y2="110" stroke="#C4B5FD" strokeWidth="3" />
          <line x1="159" y1="50" x2="159" y2="110" stroke="#C4B5FD" strokeWidth="3" />
          <line x1="174" y1="50" x2="174" y2="110" stroke="#C4B5FD" strokeWidth="3" />
        </svg>
      )}
    </div>
  );
}

export default function StorefrontCatalog({ onAddToBag, onInspectItem }: StorefrontCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);

  const filteredItems = CATALOG_ITEMS.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !q ||
      item.name.toLowerCase().includes(q) ||
      item.tagline.toLowerCase().includes(q) ||
      item.sku.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  const handleAdd = (item: CatalogItem) => {
    onAddToBag(item);
    setRecentlyAddedId(item.id);
    window.setTimeout(() => {
      setRecentlyAddedId((prev) => (prev === item.id ? null : prev));
    }, 1200);
  };

  return (
    <section id="storefront" className="py-16 lg:py-24 bg-white border-b border-[#DCE4E0] scroll-mt-16">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        {/* Header & Storefront Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <p className="text-xs font-medium text-[#15803D] mb-2">
              04. Direct Commercial Storefront &amp; Retrofit Catalog
            </p>
            <h2
              className="font-display font-bold tracking-tight text-[#111E1A] mb-3"
              style={{ fontSize: 'clamp(1.65rem, 2.5vw, 2.25rem)', textWrap: 'balance' }}
            >
              Configure hardware stations, retrofit kits, and fleet plans
            </h2>
            <p className="text-base text-[#4A5D57] leading-relaxed">
              Built for property developers, municipal councils, and township operators. Add core
              stations or modular five-year upgrade kits directly to your procurement bag.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            {/* Search Input */}
            <div className="relative">
              <Search
                className="w-4 h-4 text-[#4A5D57] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                aria-hidden="true"
              />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search SKU or module..."
                aria-label="Search BINOVA catalog"
                className="w-full sm:w-56 pl-9 pr-3 py-2 text-sm bg-[#F7F9F8] border border-[#DCE4E0] rounded-lg text-[#111E1A] placeholder:text-[#4A5D57] focus:outline-none focus:border-[#15803D]"
              />
            </div>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div
          role="tablist"
          aria-label="Catalog categories"
          className="inline-flex flex-wrap items-center gap-1 p-1 bg-[#EAEFED] rounded-lg mb-8"
        >
          {CATEGORY_TABS.map((category) => {
            const active = selectedCategory === category;
            return (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setSelectedCategory(category)}
                className={`px-3.5 py-2 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  active
                    ? 'bg-white text-[#111E1A] shadow-xs'
                    : 'text-[#4A5D57] hover:text-[#111E1A]'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Product Grid */}
        {filteredItems.length === 0 ? (
          <div className="border border-[#DCE4E0] rounded-xl p-12 text-center bg-[#F7F9F8]">
            <p className="font-display text-lg font-semibold text-[#111E1A] mb-2">
              No matching modules found
            </p>
            <p className="text-sm text-[#4A5D57] mb-4">
              Try clearing your search filter or switching back to All Solutions.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#15803D] rounded-lg hover:bg-[#166534] transition-colors cursor-pointer"
            >
              Reset Catalog Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {filteredItems.map((item) => {
              const isJustAdded = recentlyAddedId === item.id;
              return (
                <article
                  key={item.id}
                  className="bg-[#F7F9F8] border border-[#DCE4E0] rounded-xl overflow-hidden flex flex-col justify-between transition-transform duration-150 hover:-translate-y-0.5"
                >
                  <div>
                    <SchematicPreview variant={item.schematicVariant} />

                    <div className="p-6">
                      {/* Unboxed 1-line metadata */}
                      <div className="flex items-center gap-2 text-xs text-[#4A5D57] mb-2">
                        <span className="font-mono">{item.sku}</span>
                        <span aria-hidden="true">·</span>
                        <span>{item.availability}</span>
                      </div>

                      <h3 className="font-display text-lg font-bold text-[#111E1A] leading-snug mb-2">
                        {item.name}
                      </h3>

                      <p className="text-sm text-[#4A5D57] leading-relaxed mb-4">{item.tagline}</p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-4 border-t border-[#DCE4E0] bg-white">
                    <div className="flex items-baseline justify-between gap-3 mb-4">
                      <div>
                        <div className="font-mono text-lg font-bold text-[#111E1A] tabular-nums">
                          RM {item.priceRM.toLocaleString('en-MY')}
                        </div>
                        <div className="text-xs text-[#4A5D57]">{item.unitLabel}</div>
                      </div>
                      <div className="text-right text-xs text-[#15803D] font-mono tabular-nums">
                        -{item.annualCo2SavingsTonnes} t CO2/yr
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5">
                      <button
                        type="button"
                        onClick={() => onInspectItem(item)}
                        className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-semibold text-[#111E1A] bg-[#F7F9F8] border border-[#DCE4E0] hover:bg-[#EAEFED] rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                      >
                        <Eye className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                        <span>View Specs</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleAdd(item)}
                        className={`inline-flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                          isJustAdded
                            ? 'bg-[#111E1A] text-white'
                            : 'bg-[#15803D] hover:bg-[#166534] text-white'
                        }`}
                      >
                        {isJustAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                            <span>Added</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                            <span>Add to Bag</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
