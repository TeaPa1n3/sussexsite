import React, { useState } from 'react';
import { ParchmentBox } from '../../ui/ParchmentBox';
import { SectionContainer } from '../../ui/SectionContainer';
import { ImageModal } from '../../ui/ImageModal';

export function LewesPriory() {
  const [selectedImage, setSelectedImage] = useState<{
    src: string;
    alt: string;
    caption: string;
  } | null>(null);

  const images = [
    {
      src: "https://lh3.googleusercontent.com/pw/AP1GczMyvZPd1ef1W72AJJYIvdLZ0Dn6080oLdJlvOTacIsPEWelPtva9aVCUn_pW1mBoKy5yjxaE2IeeEeiBSHP1HgcAtWCgAb9bZZ2Uzma9ccTdqUY5uPMWG7y3P3e98pkSoHGss8bExB2CeLbpJ6daehg",
      alt: "Lewes Priory Ruins",
      caption: "Site plan showing the eventual immense size of the Priory before its dissolution"
    },
    {
      src: "https://lh3.googleusercontent.com/pw/AP1GczP7I0klNfRPBLTkWZEoGwFuLsg3kWlmAnE4Nu7BgBFlXqLuUkE9jKC_VdUuGp_LpBt6NhW_GQhAYCq6sqvHMuLvs4EmnHhmJymqGo4iOE4LDkhu9qh0skxBmXWHDN4hrQhhm25arylqoXPpXiFFjGYo=w1198-h628-s-no?authuser=0",
      alt: "Priory Grounds",
      caption: "The St. Pancras Priory Grounds and surviving structures are open to the public"
    }
  ];

  return (
    <SectionContainer>
      <h2 className="text-4xl font-medieval text-amber-500 mb-12 text-center">
        St. Pancras Priory, Lewes
      </h2>

      <div className="space-y-8">
        <ParchmentBox>
          <div className="p-8">
            <h3 className="text-2xl font-medieval text-amber-500 mb-4">Foundation and Early History</h3>
            <p className="text-gray-400 mb-6">
              St. Pancras Priory was founded in 1082 by William de Warenne, 1st Earl of Surrey, 
              and his wife Gundrada. As the first Cluniac priory in England, it played a crucial 
              role in introducing Continental monasticism to England following the Norman Conquest.
            </p>
            <p className="text-gray-400">
              The priory was dedicated to St. Pancras, a Roman martyr, and became the mother house 
              for all Cluniac monasteries in England. At its height, it was one of the wealthiest 
              and most influential monasteries in medieval England, second only to Cluny itself in 
              importance within the Cluniac order.
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
                      className="w-full h-[250px] object-contain rounded-lg mb-4 transition-transform duration-300 group-hover:scale-105"
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
            <h3 className="text-2xl font-medieval text-amber-500 mb-4">Architecture and Layout</h3>
            <p className="text-gray-400 mb-6">
              The priory was an architectural marvel of its time, with its church being one of the 
              largest in England. The complex included multiple chapels, a chapter house, dormitories, 
              a refectory, and extensive gardens. The priory church was particularly impressive, 
              measuring over 420 feet in length.
            </p>
            <p className="text-gray-400 mb-6">
              The buildings were constructed primarily from local flint and Caen stone, demonstrating 
              both Norman and English architectural styles. The priory's design followed the typical 
              Cluniac layout, with the cloister south of the church and other buildings arranged 
              around it.
            </p>
            <p className="text-gray-400">
              Archaeological evidence suggests that the priory had sophisticated water management 
              systems, including conduits and drains, which were advanced for their time. The 
              complex also included a large infirmary, guest houses, and workshops.
            </p>
          </div>
        </ParchmentBox>

        <ParchmentBox>
          <div className="p-8">
            <h3 className="text-2xl font-medieval text-amber-500 mb-4">Life at the Priory</h3>
            <p className="text-gray-400 mb-6">
              Life at Lewes Priory followed the strict Cluniac interpretation of the Rule of St. 
              Benedict. The monks' day was divided between prayer, study, and manual labor. The 
              priory was known for its impressive library and scriptorum, where monks copied and 
              illuminated manuscripts.
            </p>
            <p className="text-gray-400 mb-6">
              As a Cluniac house, the priory placed great emphasis on the liturgy and musical 
              celebration of the divine office. The monks performed eight services daily, with 
              additional ceremonies on feast days. The priory also played an important role in 
              the local community, providing charity and education.
            </p>
            <p className="text-gray-400">
              At its peak, the priory housed around 100 monks and numerous lay brothers. It owned 
              extensive lands across Sussex and beyond, making it one of the wealthiest religious 
              houses in England.
            </p>
          </div>
        </ParchmentBox>

        <ParchmentBox>
          <div className="p-8">
            <h3 className="text-2xl font-medieval text-amber-500 mb-4">Dissolution and Legacy</h3>
            <p className="text-gray-400 mb-6">
              The priory was dissolved in 1537 during Henry VIII's Dissolution of the Monasteries. 
              Much of the building material was subsequently removed and reused in local construction 
              projects. Today, the impressive ruins are a scheduled ancient monument and give visitors 
              a sense of the priory's former grandeur.
            </p>
            <p className="text-gray-400 mb-6">
              Recent archaeological investigations have revealed new information about the priory's 
              layout and daily life. The site now features interpretative displays and a heritage 
              trail, allowing visitors to understand its historical significance.
            </p>
            <p className="text-gray-400">
              The Priory Park, where the ruins stand, is now a peaceful green space in Lewes, 
              offering both historical interest and recreational opportunities. The site continues 
              to be an important part of Lewes's cultural heritage and attracts visitors interested 
              in medieval history.
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