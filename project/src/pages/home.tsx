import React from 'react';
import { Header } from '../components/layout/Header';
import { Hero } from '../components/home/Hero';
import { QuickLinks } from '../components/home/QuickLinks';
import { PublicEventsCalendar } from '../components/sections/Events/PublicEventsCalendar';
import { Footer } from '../components/layout/Footer';
import { PageLayout } from '../components/ui/PageLayout';

export default function HomePage() {
  return (
    <PageLayout>
      <Header />
      <main className="flex-grow">
        <Hero />
        <div className="max-w-7xl mx-auto px-4">
          <PublicEventsCalendar />
        </div>
        <QuickLinks />
      </main>
      <Footer />
    </PageLayout>
  );
}