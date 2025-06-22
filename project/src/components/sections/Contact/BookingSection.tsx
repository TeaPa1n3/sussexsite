import React from 'react';
import { Coins } from 'lucide-react';
import { ParchmentBox } from '../../ui/ParchmentBox';

export function BookingSection() {
  return (
    <ParchmentBox>
      <div className="p-8">
        <div className="flex items-center gap-4 mb-6">
          <Coins className="w-8 h-8 text-amber-500" />
          <h3 className="text-2xl font-medieval text-amber-500">Book Us For Your Event</h3>
        </div>
        <div className="space-y-4 text-lg text-gray-400">
          <p>
            Looking to add an authentic medieval atmosphere to your event? Sussex Medieval Society 
            offers a range of historical displays and activities that can be tailored to your needs:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Combat displays and tournaments</li>
            <li>Living history demonstrations</li>
            <li>Educational talks and presentations</li>
            <li>Full medieval encampments</li>
          </ul>
          <p>
            Contact us at <span className="text-amber-500">sussexmedieval@outlook.com</span> to 
            discuss how we can bring history to life at your event.
          </p>
        </div>
      </div>
    </ParchmentBox>
  );
}