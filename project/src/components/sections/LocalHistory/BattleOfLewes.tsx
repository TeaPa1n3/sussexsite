import React, { useState } from 'react';
import { ParchmentBox } from '../../ui/ParchmentBox';
import { SectionContainer } from '../../ui/SectionContainer';
import { BattleCarousel } from './BattleCarousel';
import { ImageModal } from '../../ui/ImageModal';

export function BattleOfLewes() {
  const [selectedImage, setSelectedImage] = useState<{
    src: string;
    alt: string;
    caption: string;
  } | null>(null);

  const images = [
    {
      src: "https://lh3.googleusercontent.com/pw/AP1GczMuoJwgNmYS1_qXo-az_PfNN70K-yR9d1msb2il1gaXb2NalYbcYHZz2ZxCCnMeLvrOp1ejStv2GV6_DgekE4Sw1TUwzf1ag_ip5QLCKhKvf9wnIrcrGOhLmqXGtSxMOqayrMJszPSoxeI2xyaNrLH8=w680-h510-s-no?authuser=0",
      alt: "Battle of Lewes Reenactment",
      caption: "Memorial to the Battle of Lewes sited in the Priory Grounds"
    },
    {
      src: "https://lh3.googleusercontent.com/pw/AP1GczPisG36qZ9NlivQ2QAs7SWPJulLmjNbmrrSVG69IkkOR6u8CoXsdFY3WVBrZOS-Z5QqttzvZG467Fx591lRiTHtEMMnHMgmZkY2WsSMeyCde26CgQIr80PpmjZW0KFKlhqB5hZe5sx7ADQlFWvaDGXe=w688-h1031-s-no?authuser=0",
      alt: "Battle Formation",
      caption: "A seasoned sergeant protects the de Warenne banner at the annual Battle of Lewes reenactment"
    }
  ];

  return (
    <SectionContainer>
      <h2 className="text-4xl font-medieval text-amber-500 mb-12 text-center">
        The Battle of Lewes (1264)
      </h2>

      <div className="space-y-8">
        <ParchmentBox>
          <div className="p-8">
            <h3 className="text-2xl font-medieval text-amber-500 mb-4">The Historical Context</h3>
            <p className="text-gray-400 mb-6">
              The Battle of Lewes was the culmination of years of growing tension between King Henry III 
              and his barons. The conflict centered around the Provisions of Oxford (1258), a series of 
              reforms that significantly limited royal power and placed the kingdom under baronial control. 
              These reforms were initially accepted by Henry III under pressure but later annulled by 
              Pope Alexander IV in 1261, with the king's encouragement.
            </p>
            <p className="text-gray-400 mb-6">
              Simon de Montfort, Earl of Leicester, emerged as the leader of the baronial reform movement. 
              A skilled military commander and charismatic leader, de Montfort had once been a close friend 
              and advisor to King Henry III. However, their relationship soured as de Montfort became 
              increasingly critical of the king's arbitrary rule, excessive spending, and reliance on 
              foreign favorites.
            </p>
            <p className="text-gray-400 mb-6">
              The situation deteriorated further when King Henry III's son, Prince Edward (later Edward I), 
              began taking a more active role in government. While Edward showed promise as a military leader, 
              his aggressive policies and support for his father's absolutist stance only heightened tensions 
              with the reform-minded barons.
            </p>
            <p className="text-gray-400">
              By early 1264, negotiations had completely broken down. De Montfort, supported by Gilbert de 
              Clare, the powerful Earl of Gloucester, raised an army against the king. After a series of 
              minor engagements and failed peace talks, both sides prepared for a decisive confrontation. 
              The royalists, based in Lewes Castle and the town, faced de Montfort's approaching army 
              from the north.
            </p>
          </div>
        </ParchmentBox>

        <div className="grid md:grid-cols-2 gap-8">
          {images.map((image, index) => (
            <ParchmentBox key={index}>
              <div className="p-4">
                <button 
                  onClick={() => setSelectedImage(image)}
                  className="w-full group cursor-zoom-in"
                >
                  <div className="relative">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-[400px] object-cover rounded-lg mb-4 transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gray-900/0 group-hover:bg-gray-900/20 transition-colors rounded-lg" />
                  </div>
                  <p className="text-center text-gray-400 text-sm">{image.caption}</p>
                </button>
              </div>
            </ParchmentBox>
          ))}
        </div>

        <ParchmentBox>
          <div className="p-8">
            <h3 className="text-2xl font-medieval text-amber-500 mb-4">The Battle</h3>
            <p className="text-gray-400 mb-6">
              The sun rose like other days, peeking over what is now known as Mount Caburn, bathing the small town of Lewes in light. Within the town, the Royalist army of Henry III stirred, rousing from a night of excess. However, the serenity of the morning was abruptly disturbed by the ringing of bells and muster calls of the roughly ten thousand troops that formed the Royal host. The initial engagements were between Simon's approaching army and the royalist foragers and sentries, caught off guard by the sudden arrival of the rebel forces, they were captured or killed. 
            </p>
            <p className="text-gray-400 mb-6">
              Henry III and his Son, then Prince Edward I, having the advantage of outnumbering the Baronial forces 2 to 1, responded by mustering their forces and sallying out of the safety of Lewes Castle and St. Pancras Priory to meet this challenge. 
              The first major clash was between Edward I (leading the Royalist right) and Nicholas de Segrave, who was commanding the London Militia on the Baronial Left. Edward spurred his ward forwards, tearing into Segraves command and routing it. The chase however, continued for some four miles towards Offham, leaving Henry's depleted force to continue the battle alone. 
              Simon de Montfort saw his opportunity and ordered his forces to charge down the hill. Despite strong resistance from the Royalists, the downhill momentum of the charge, fresh Baronial reserves and their own depleted numbers, the Royalist line finally broke.
            </p>
            <p className="text-gray-400">
              Fighting spilled into the town itself as the rout continued, with parts of the town being set alight and Lewes Castle being temporarily placed under siege. 
              Soon, Henry was cornered in the grounds of the St. Pancras Priory, and after some negotiations, he agreed to surrender to the Baronial Forces and signed the Mise of Lewes, forcing him to accept the Provisions of Oxford.
            </p>
          </div>
        </ParchmentBox>

        {/* Battle Site Images Carousel */}
        <BattleCarousel />

        <ParchmentBox>
          <div className="p-8">
            <h3 className="text-2xl font-medieval text-amber-500 mb-4">Aftermath and Significance</h3>
            <p className="text-gray-400 mb-6">
              The Battle of Lewes resulted in a decisive victory for the baronial forces. King Henry III 
              was forced to accept the Mise of Lewes, which effectively placed the king under the control 
              of de Montfort and his supporters. This led to the establishment of a new form of 
              government and England's first representative parliament.
            </p>
            <p className="text-gray-400 mb-6">
              De Montfort's parliament of 1265 was revolutionary because it included representatives 
              from both counties and towns. This established a crucial precedent for the development 
              of parliamentary democracy in England.
            </p>
            <p className="text-gray-400">
              Today, the battle is commemorated annually in Lewes with historical reenactments and 
              educational events, helping to keep this crucial piece of English history alive for 
              future generations.
            </p>
          </div>
        </ParchmentBox>
      </div>

      <ImageModal
        image={selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </SectionContainer>
  );
}