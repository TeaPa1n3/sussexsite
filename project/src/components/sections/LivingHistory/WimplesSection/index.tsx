import React from 'react';
import { ParchmentBox } from '../../../ui/ParchmentBox';
import { SectionContainer } from '../../../ui/SectionContainer';

export function WimplesSection() {
  return (
    <SectionContainer>
      <h2 className="text-4xl font-medieval text-amber-500 mb-12 text-center">
        The Wimples of SMS
      </h2>
      <div className="grid md:grid-cols-2 gap-8">
        <ParchmentBox>
          <div className="p-6">
            <img
              src="https://lh3.googleusercontent.com/pw/AP1GczOJA9J4gS5imHdC5uGa-mQwtu9-L_z9XDwc1_AzOgJa5wdgWX_HHXA0VdlphlH8faK3U7m9jpQ2mbeAJi_sNM_ojwU_CfykbJ28Pq7RsAhkkrRrDxiP3eH3VQENFUD-kyfNoK0i3NrEETCBW1nDCx2q"
              alt="Wimples of SMS Division"
              className="w-full h-[400px] object-cover rounded-lg mb-6"
            />
            <h3 className="text-2xl font-medieval text-amber-500 mb-4">The Heart of the Camp</h3>
            <p className="text-gray-400 mb-4">
              Led by Mother Massie, the Wimples of SMS form the backbone of our living history displays. 
              This dedicated division focuses on maintaining the authenticity and functionality of our 
              medieval encampments, bringing history to life through traditional crafts and skills.
            </p>
            <p className="text-gray-400">
              While you won't find them on the battlefield, their expertise in period-accurate cooking, 
              textile work, camp management, and member welfare is essential to creating an immersive 
              and supportive medieval experience.
            </p>
          </div>
        </ParchmentBox>

        <ParchmentBox>
          <div className="p-6">
            <h3 className="text-2xl font-medieval text-amber-500 mb-4">Areas of Expertise</h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-xl font-medieval text-amber-500/80 mb-2">Medieval Cooking</h4>
                <p className="text-gray-400">
                  Experience authentic medieval cuisine prepared using period-appropriate methods and recipes. 
                  From hearty pottages to pickled goods, our camp kitchen brings medieval flavors to life.
                </p>
              </div>
              
              <div>
                <h4 className="text-xl font-medieval text-amber-500/80 mb-2">Textile Crafts</h4>
                <p className="text-gray-400">
                  Witness the creation of period-accurate clothing and accessories through traditional 
                  techniques.
                </p>
              </div>
              
              <div>
                <h4 className="text-xl font-medieval text-amber-500/80 mb-2">Camp Management</h4>
                <p className="text-gray-400">
                  The Wimples ensure our living history camps run smoothly and authentically, maintaining 
                  the immersive medieval atmosphere that brings history to life for our visitors.
                </p>
              </div>

              <div>
                <h4 className="text-xl font-medieval text-amber-500/80 mb-2">Member Welfare & First Aid</h4>
                <p className="text-gray-400">
                  Beyond historical activities, the Wimples provide essential support services including 
                  basic first aid and ensuring the wellbeing of all society members during events and 
                  training sessions.
                </p>
              </div>
            </div>
          </div>
        </ParchmentBox>
      </div>
    </SectionContainer>
  );
}