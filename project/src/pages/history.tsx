import React from 'react';
import { Header } from '../components/layout/Header';
import { HistoryHero } from '../components/sections/History/HistoryHero';
import { HistoryTimeline } from '../components/sections/History/HistoryTimeline';
import { HistoricalContext } from '../components/sections/History/HistoricalContext';
import { QuickLinks } from '../components/sections/History/QuickLinks';
import { Footer } from '../components/layout/Footer';
import { PageLayout } from '../components/ui/PageLayout';

export default function HistoryPage() {
  return (
    <PageLayout>
      <Header />
      <main className="flex-grow">
        <HistoryHero />
        <QuickLinks />
        <div id="timeline">
          <HistoryTimeline />
        </div>
        <div id="context">
          <HistoricalContext />
        </div>
      </main>
      <Footer />
    </PageLayout>
  );
}