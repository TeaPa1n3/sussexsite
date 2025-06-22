import React from 'react';
import { Header } from '../components/layout/Header';
import { MerchandiseHero } from '../components/sections/Merchandise/MerchandiseHero';
import { FeaturedProduct } from '../components/sections/Merchandise/FeaturedProduct';
import { ProductGrid } from '../components/sections/Merchandise/ProductGrid';
import { Footer } from '../components/layout/Footer';
import { PageLayout } from '../components/ui/PageLayout';

export default function MerchPage() {
  return (
    <PageLayout>
      <Header />
      <main className="flex-grow">
        <MerchandiseHero />
        <FeaturedProduct />
        <ProductGrid />
      </main>
      <Footer />
    </PageLayout>
  );
}