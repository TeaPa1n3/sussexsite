import React, { useState } from 'react';
import { Mail, MapPin, Phone, X } from 'lucide-react';
import { ParchmentBox } from '../ui/ParchmentBox';
import { useNavigate } from 'react-router-dom';

export function CTAStamp() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const locations = [
    {
      name: "Lewes Division",
      time: "Sunday, 14:00-17:00",
      location: "Lewes Priory on the Lower Fields",
      address: "Priory Park, Cockshut Road, Lewes, East Sussex, BN7 1HP",
      mapsUrl: "https://maps.app.goo.gl/2KHfktcq8LWcvRC48"
    },
    {
      name: "Portsmouth Division",
      time: "Sunday, 13:00-16:00",
      location: "Clarence Ground",
      address: "Pembroke Road, Portsmouth, PO1 2TA",
      mapsUrl: "https://maps.app.goo.gl/5BGnyFtpLkxzpH37A"
    },
    {
      name: "Chesterfield Division",
      time: "Saturday, 11:00-16:00",
      location: "Holmebrook Valley Park",
      address: "Newbold Rd, Chesterfield S41 8WE",
      mapsUrl: "https://maps.app.goo.gl/25mYcN2D9GSqYVCR6"
    }
  ];

  const handleClick = () => {
    if (window.innerWidth < 768) {
      navigate('/contact');
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="absolute top-[96px] md:top-[192px] left-[5%] md:left-[15%] z-20 animate-cta-pulse"
      >
        <div className="flex flex-col items-center">
          <span className="text-lg md:text-2xl font-medieval text-amber-500 font-bold mb-1
            drop-shadow-[0_4px_8px_rgba(0,0,0,0.95)] uppercase">
            CLICK HERE TO
          </span>
          <h2 className="text-2xl md:text-6xl font-medieval text-amber-500 font-bold 
            drop-shadow-[0_8px_16px_rgba(0,0,0,0.95)] hover:scale-105 transition-transform">
            JOIN TODAY!
          </h2>
        </div>
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/95 overflow-y-auto">
          <div className="max-w-4xl w-full my-8">
            <ParchmentBox>
              <div className="relative p-4 md:p-6">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-4 right-4 text-amber-500 hover:text-amber-400 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>

                <h3 className="text-xl md:text-2xl font-medieval text-amber-500 mb-6">Contact Us</h3>
                
                <div className="space-y-6">
                  <div className="space-y-4">
                    <p className="flex items-center text-gray-400 text-sm md:text-base">
                      <Mail className="w-5 h-5 text-amber-500 mr-3" />
                      <span className="break-all">sussexmedieval@outlook.com</span>
                    </p>
                    <p className="flex items-center text-gray-400 text-sm md:text-base">
                      <Phone className="w-5 h-5 text-amber-500 mr-3" />
                      07742 455424
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-400 mb-4 text-sm md:text-base">
                      If you want to come and have a chat, or get involved, we welcome people of all ages and interests. 
                      Ages 16+ for training and 18+ to take part in combat during events! If you want to try your hand at 
                      some medieval combat, remember to bring sensible footwear and something to keep yourself hydrated!
                    </p>
                  </div>

                  <div>
                    <h4 className="text-base md:text-lg font-medieval text-amber-500 mb-4 text-center">
                      We have members all over the UK and we train regularly in three places!
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {locations.map((loc) => (
                        <div key={loc.name} className="flex flex-col h-full">
                          <div className="flex-grow">
                            <h4 className="text-lg md:text-xl font-medieval text-amber-500 mb-2">{loc.name}</h4>
                            <p className="text-gray-400 mb-2 text-sm md:text-base">
                              Training {loc.time} (weather permitting) at {loc.location}.
                            </p>
                            <p className="text-gray-400 text-sm md:text-base">{loc.address}</p>
                          </div>
                          <a 
                            href={loc.mapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 rounded-lg hover:bg-amber-500/20 transition-colors mt-4"
                          >
                            <MapPin className="w-5 h-5 text-amber-500" />
                            <span className="text-amber-500 text-sm">View on Google Maps</span>
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </ParchmentBox>
          </div>
        </div>
      )}
    </>
  );
}