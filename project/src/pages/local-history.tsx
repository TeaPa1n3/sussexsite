import React from 'react';
import { Header } from '../components/layout/Header';
import { LocalHistoryHero } from '../components/sections/LocalHistory/LocalHistoryHero';
import { QuickLinks } from '../components/sections/LocalHistory/QuickLinks';
import { BattleOfLewes } from '../components/sections/LocalHistory/BattleOfLewes';
import { LewesCastle } from '../components/sections/LocalHistory/LewesCastle';
import { LewesPriory } from '../components/sections/LocalHistory/LewesPriory';
import { DeWarenne } from '../components/sections/LocalHistory/DeWarenne';
import { Footer } from '../components/layout/Footer';
import { PageLayout } from '../components/ui/PageLayout';

export default function LocalHistoryPage() {
  return (
    <PageLayout>
      <Header />
      <main className="flex-grow">
        <LocalHistoryHero />
        <QuickLinks />
        <div id="battle">
          <BattleOfLewes />
        </div>
        <div id="castle">
          <LewesCastle />
        </div>
        <div id="priory">
          <LewesPriory />
        </div>
        <div id="de-warenne">
          <DeWarenne />
        </div>
      </main>
      <Footer />
    </PageLayout>
  );
}