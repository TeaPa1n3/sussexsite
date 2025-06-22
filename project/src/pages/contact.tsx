import React from 'react';
import { Header } from '../components/layout/Header';
import { ContactHero } from '../components/sections/Contact/ContactHero';
import { ContactInfo } from '../components/sections/ContactInfo';
import { BookingSection } from '../components/sections/Contact/BookingSection';
import { SocialMediaSection } from '../components/sections/Contact/SocialMediaSection';
import { Footer } from '../components/layout/Footer';
import { PageLayout } from '../components/ui/PageLayout';

export default function ContactPage() {
  return (
    <PageLayout>
      <Header />
      <main className="flex-grow">
        <ContactHero />
        <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
          <ContactInfo />
          <BookingSection />
          <SocialMediaSection />
        </div>
      </main>
      <Footer />
    </PageLayout>
  );
}