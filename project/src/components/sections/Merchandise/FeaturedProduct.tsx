import React from 'react';
import { ParchmentBox } from '../../ui/ParchmentBox';

export function FeaturedProduct() {
  return (
    <div className="py-8">
      <div className="max-w-md mx-auto px-4">
        <ParchmentBox>
          <div className="relative group">
            <img
              src="https://lh3.googleusercontent.com/pw/AP1GczNPMSSrMAaxOmFmZsOgRUfJoBQS06ayRBLZnTekjT6dMOkpkV2MOXETqAF2-0LznuiyltbmUW02tdjeFqsZjszeriv5DrKyiYUmZ6AF_4LVCFL-YVMNa58WGziDY-2r3GqJuhBbY_siCu3SWaUjL7qV=w1368-h1379-s-no-gm?authuser=0"
              alt="Featured Merchandise Design"
              className="w-full rounded-lg transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
              <div className="absolute bottom-4 left-4 right-4">
                <a
                  href="https://www.redbubble.com/shop/ap/167933509"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-amber-500/20 text-amber-500 rounded-full hover:bg-amber-500/30 transition-colors"
                >
                  Order Now
                </a>
              </div>
            </div>
          </div>
        </ParchmentBox>
      </div>
    </div>
  );
}