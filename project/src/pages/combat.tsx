import React from 'react';
import { Header } from '../components/layout/Header';
import { CombatHero } from '../components/sections/Combat/CombatHero';
import { TrainingSection } from '../components/sections/Combat/TrainingSection';
import { WeaponsSection } from '../components/sections/Combat/WeaponsSection';
import { Gallery } from '../components/sections/Combat/Gallery';
import { QuickLinks } from '../components/sections/Combat/QuickLinks';
import { Footer } from '../components/layout/Footer';
import { PageLayout } from '../components/ui/PageLayout';

export default function CombatPage() {
  return (
    <PageLayout>
      <Header />
      <main className="flex-grow">
        <div id="overview">
          <CombatHero />
        </div>
        <QuickLinks />
        <div id="training">
          <TrainingSection />
        </div>
        <div id="weapons">
          <WeaponsSection />
        </div>
        <div id="gallery">
          <Gallery />
        </div>
      </main>
      <Footer />
    </PageLayout>
  );
}