/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import SystemExplorer from './components/SystemExplorer';
import InnovationAndRoi from './components/InnovationAndRoi';
import StorefrontCatalog from './components/StorefrontCatalog';
import RecoveryAndFooter from './components/RecoveryAndFooter';
import ProcurementDrawer, { BagLineItem } from './components/ProcurementDrawer';
import { PosterModal, ProductSpecModal } from './components/Modals';
import CustomerAssistant from './components/CustomerAssistant';
import { CATALOG_ITEMS, CatalogItem } from './data/binovaData';

export default function App() {
  const [bagItems, setBagItems] = useState<BagLineItem[]>([
    { item: CATALOG_ITEMS[0], quantity: 1 },
    { item: CATALOG_ITEMS[1], quantity: 1 },
  ]);
  const [isBagOpen, setIsBagOpen] = useState(false);
  const [posterModal, setPosterModal] = useState<{ src: string; title: string } | null>(null);
  const [inspectItem, setInspectItem] = useState<CatalogItem | null>(null);

  const totalBagCount = bagItems.reduce((sum, entry) => sum + entry.quantity, 0);

  const handleAddToBag = (item: CatalogItem) => {
    setBagItems((prev) => {
      const existing = prev.find((entry) => entry.item.id === item.id);
      if (existing) {
        return prev.map((entry) =>
          entry.item.id === item.id ? { ...entry, quantity: entry.quantity + 1 } : entry
        );
      }
      return [...prev, { item, quantity: 1 }];
    });
  };

  const handleUpdateQty = (id: string, delta: number) => {
    setBagItems((prev) =>
      prev
        .map((entry) =>
          entry.item.id === id ? { ...entry, quantity: entry.quantity + delta } : entry
        )
        .filter((entry) => entry.quantity > 0)
    );
  };

  const handleRemoveItem = (id: string) => {
    setBagItems((prev) => prev.filter((entry) => entry.item.id !== id));
  };

  const handleClearBag = () => {
    setBagItems([]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#090D0C] text-[#F2F5F3]">
      <Header bagCount={totalBagCount} onOpenBag={() => setIsBagOpen(true)} />

      <main className="flex-1">
        <HeroSection
          onOpenPosterModal={(src, title) => setPosterModal({ src, title })}
        />
        <SystemExplorer />
        <InnovationAndRoi />
        <StorefrontCatalog
          onAddToBag={handleAddToBag}
          onInspectItem={(item) => setInspectItem(item)}
        />
        <RecoveryAndFooter />
      </main>

      <ProcurementDrawer
        isOpen={isBagOpen}
        items={bagItems}
        onClose={() => setIsBagOpen(false)}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onClearBag={handleClearBag}
      />

      <PosterModal modalData={posterModal} onClose={() => setPosterModal(null)} />

      <ProductSpecModal
        item={inspectItem}
        onClose={() => setInspectItem(null)}
        onAddToBag={handleAddToBag}
      />

      <CustomerAssistant />
    </div>
  );
}
