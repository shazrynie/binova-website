import { ShoppingBag, Menu, X } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  bagCount: number;
  onOpenBag: () => void;
}

const NAV_LINKS = [
  { href: '#system', label: 'System' },
  { href: '#innovations', label: 'Innovations' },
  { href: '#roi', label: 'ROI & Impact' },
  { href: '#storefront', label: 'Storefront' },
  { href: '#recovery', label: 'Recovery' },
];

export default function Header({ bagCount, onOpenBag }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#090D0C]/90 backdrop-blur-md border-b border-[#24302C]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-element Brand Wordmark */}
        <a
          href="#top"
          className="font-display text-xl font-bold tracking-tight text-[#F2F5F3] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4ADE80]"
        >
          BINOVA
        </a>

        {/* Zone 2: Concise single-line navigation links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#9FB0A8]"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="whitespace-nowrap shrink-0 py-1 hover:text-[#F2F5F3] hover:underline hover:underline-offset-4 decoration-[#4ADE80] decoration-2 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4ADE80]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Single primary action button */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenBag}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#15803D] hover:bg-[#16A34A] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4ADE80]"
          >
            <ShoppingBag className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>Procurement Bag</span>
            <span className="font-mono text-xs tabular-nums bg-black/25 px-1.5 py-0.5 rounded">
              {bagCount}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-[#24302C] text-[#F2F5F3] bg-[#131A18] hover:bg-[#1B2421] transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer menu */}
      {mobileMenuOpen && (
        <nav
          aria-label="Mobile Navigation"
          className="md:hidden border-t border-[#24302C] bg-[#0D1311] px-6 py-4 flex flex-col gap-3"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-sm font-medium text-[#F2F5F3] hover:text-[#4ADE80] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
