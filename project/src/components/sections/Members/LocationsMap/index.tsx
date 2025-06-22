import React from 'react';
import { ParchmentBox } from '../../../ui/ParchmentBox';
import { MapPin, Castle } from 'lucide-react';

export function LocationsMap() {
  return (
    <section className="py-12" id="locations">
      <h2 className="text-3xl font-medieval text-amber-500 mb-8">Castle Conquests!</h2>
      <ParchmentBox>
        <div className="p-4 space-y-4">
          <div className="flex items-center gap-2 text-gray-400">
            <MapPin className="w-5 h-5 text-amber-500" />
            <p>See which groups have claimed which castles across the globe!</p>
          </div>
          
          <div className="relative w-full h-[800px] rounded-lg overflow-hidden">
            <iframe 
              src="https://www.google.com/maps/d/embed?mid=1Z1yEM8OfpErlcn2JHiF_V0CYRQA5SW8&ll=54.559322577352935,-4.2841796875&z=6"
              width="100%" 
              height="100%" 
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0"
            ></iframe>
          </div>

          <div className="flex justify-center pt-4">
            <a
              href="https://forms.gle/BfniemHTxy6NFHJo8"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 text-gray-900 rounded-full
                hover:bg-amber-400 transition-colors font-medieval text-lg"
            >
              <Castle className="w-5 h-5" />
              Claim a Castle!
            </a>
          </div>
        </div>
      </ParchmentBox>
    </section>
  );
}