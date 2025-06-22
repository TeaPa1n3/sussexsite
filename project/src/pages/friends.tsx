import React from 'react';
import { Header } from '../components/layout/Header';
import { FriendsHero } from '../components/sections/Friends/FriendsHero';
import { Events } from '../components/sections/Friends/Events';
import { ReenactmentGroups } from '../components/sections/Friends/ReenactmentGroups';
import { OtherFriends } from '../components/sections/Friends/OtherFriends';
import { QuickLinks } from '../components/sections/Friends/QuickLinks';
import { Footer } from '../components/layout/Footer';
import { PageLayout } from '../components/ui/PageLayout';

export default function FriendsPage() {
  return (
    <PageLayout>
      <Header />
      <main className="flex-grow">
        <FriendsHero />
        <QuickLinks />
        <div id="events">
          <Events />
        </div>
        <div id="groups">
          <ReenactmentGroups />
        </div>
        <div id="media">
          <OtherFriends />
        </div>
      </main>
      <Footer />
    </PageLayout>
  );
}