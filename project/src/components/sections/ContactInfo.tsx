import React from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import { ParchmentBox } from '../ui/ParchmentBox';
import { GoogleIcon } from '../ui/icons/GoogleIcon';

const locations = [
  {
    name: "Lewes Division",
    time: "Sunday, 14:00-17:00",
    location: "Lewes Priory",
    address: "Priory Park, Cockshut Road, Lewes, East Sussex",
    postcode: "BN7 1HP",
    mapUrl: "https://www.google.com/maps/d/embed?mid=1efkSrdZrdg6MXPL7UQI7J3tkuHLQtds&ehbc=2E312F&ll=50.86808336217726%2C0.007448564926105183&z=18"
  },
  {
    name: "Portsmouth Division",
    time: "Sunday, 13:00-16:00",
    location: "Clarence Ground",
    address: "Pembroke Road, Portsmouth",
    postcode: "PO1 2TA",
    mapUrl: "https://www.google.com/maps/d/embed?mid=1efkSrdZrdg6MXPL7UQI7J3tkuHLQtds&ehbc=2E312F&ll=50.78827655227988%2C-1.0996814910971828&z=18"
  },
  {
    name: "Chesterfield Division",
    time: "Saturday, 11:00-16:00",
    location: "Holmebrook Valley Park",
    address: "Newbold Rd, Chesterfield",
    postcode: "S41 8WE",
    mapUrl: "https://www.google.com/maps/d/embed?mid=1efkSrdZrdg6MXPL7UQI7J3tkuHLQtds&ehbc=2E312F&ll=53.25287359664187%2C-1.4696703952387167&z=18"
  }
];

export function ContactInfo() {
  return (
    <div className="space-y-8">
      {/* Get in Touch Section */}
      <ParchmentBox>
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div className="flex-grow">
            <h3 className="text-2xl font-medieval text-amber-500 mb-6">Get in Touch</h3>
            <div className="space-y-4">
              <p className="flex items-center text-gray-400">
                <Mail className="w-5 h-5 text-amber-500 mr-3" />
                sussexmedieval@outlook.com
              </p>
              <p className="flex items-center text-gray-400">
                <Phone className="w-5 h-5 text-amber-500 mr-3" />
                07742 455424
              </p>
              <p className="flex items-center text-gray-400">
                <MapPin className="w-5 h-5 text-amber-500 mr-3" />
                Sussex, England
              </p>
              <a 
                href="https://maps.app.goo.gl/pVhBeeXBAKUuGuWi9" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-amber-500 hover:text-amber-400 transition-colors"
              >
                <GoogleIcon className="w-5 h-5" />
                <span>Google Business Profile</span>
              </a>
            </div>

            <div className="mt-8 pt-8 border-t border-amber-500/20">
              <p className="text-gray-400 mb-4">You can also reach us on social media:</p>
              <div className="flex flex-col gap-4">
                <a 
                  href="https://www.facebook.com/SussexMedieval" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-amber-500 hover:text-amber-400 transition-colors"
                >
                  <span>Facebook</span>
                </a>
                <a 
                  href="https://www.instagram.com/sussex_medieval_society/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-amber-500 hover:text-amber-400 transition-colors"
                >
                  <span>Instagram</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </ParchmentBox>

      {/* Practice Locations Section */}
      <ParchmentBox>
        <div className="space-y-6">
          <h3 className="text-2xl font-medieval text-amber-500">Practice Locations</h3>
          <p className="text-gray-400">
            If you want to come and have a chat, or get involved, we welcome people of all ages and interests. 
            Ages 16+ for training and 18+ to take part in combat during events! If you want to try your hand at 
            some medieval combat, remember to bring sensible footwear and something to keep yourself hydrated!
          </p>

          <h4 className="text-lg font-medieval text-amber-500 text-center">
            We have members all over the UK and we train regularly in three places!
          </h4>

          {/* Location Cards with Individual Maps */}
          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
            {locations.map((loc) => (
              <div key={loc.name} className="flex flex-col h-full">
                <div className="flex-grow space-y-4">
                  <h4 className="text-xl font-medieval text-amber-500">{loc.name}</h4>
                  <p className="text-gray-400">
                    Training {loc.time} (weather permitting) at {loc.location}.
                  </p>
                  <div className="space-y-1">
                    <p className="text-gray-400">{loc.address}</p>
                    <p className="text-gray-400">{loc.postcode}</p>
                  </div>
                  
                  {/* Individual Map */}
                  <div className="relative w-full h-[300px] rounded-lg overflow-hidden">
                    <iframe 
                      src={loc.mapUrl}
                      width="100%" 
                      height="100%" 
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="absolute inset-0 w-full h-full"
                      title={`${loc.name} Map`}
                    ></iframe>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ParchmentBox>
    </div>
  );
}