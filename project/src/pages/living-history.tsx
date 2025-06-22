import React from 'react';
import { Header } from '../components/layout/Header';
import { LivingHistoryHero } from '../components/sections/LivingHistory/LivingHistoryHero';
import { CraftingSection } from '../components/sections/LivingHistory/CraftingSection';
import { WimplesSection } from '../components/sections/LivingHistory/WimplesSection';
import { Gallery } from '../components/sections/LivingHistory/Gallery';
import { QuickLinks } from '../components/sections/LivingHistory/QuickLinks';
import { Footer } from '../components/layout/Footer';
import { PageLayout } from '../components/ui/PageLayout';

export default function LivingHistoryPage() {
  return (
    <PageLayout>
      <Header />
      <main className="flex-grow">
        <div id="overview">
          <LivingHistoryHero />
        </div>
        <QuickLinks />
        <div id="crafting">
          <CraftingSection />
        </div>
        <div id="wimples">
          <WimplesSection />
        </div>
        <div id="gallery">
          <Gallery />
        </div>
      </main>
      <Footer />
    </PageLayout>
  );
}