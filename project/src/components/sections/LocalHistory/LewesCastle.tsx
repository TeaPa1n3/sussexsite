import React, { useState } from 'react';
import { ParchmentBox } from '../../ui/ParchmentBox';
import { SectionContainer } from '../../ui/SectionContainer';
import { ImageModal } from '../../ui/ImageModal';

export function LewesCastle() {
  const [selectedImage, setSelectedImage] = useState<{
    src: string;
    alt: string;
    caption: string;
  } | null>(null);

  const architectureImages = [
    {
      src: "https://lh3.googleusercontent.com/pw/AP1GczOLz8NiAe_tgKhkxx6sV6dk9WLBMRMb4sRtms7YtXFyTrjjSUaK1gFTNpd9S_9BQ_o0dlNlqSAh1GwzwgJIcGgMdQEdb_veqr8JFPHH64Wpz2Q22JjwoDrMcObLdJm96iw84_99ZcA4YTO08WkfYvNU",
      alt: "Lewes Castle Keep",
      caption: "The impressive keep of Lewes Castle"
    },
    {
      src: "https://lh3.googleusercontent.com/pw/AP1GczM8mcF3E2lb_b-P1S8TW80vlY6GLX8GUaBqdP28IsDlloMlKgyJ-bYsir-d724O-wTFNfZUqS4S95JKSfRaSRcVEn20AZA0A8fQmRKLEo3Du9ZkFpv0GscX0THzNx8eDO4v4noN84M_5gzqasxCquNL",
      alt: "Castle Architecture Detail 1",
      caption: "Bird's Eye plan of the Keep"
    },
    {
      src: "https://lh3.googleusercontent.com/pw/AP1GczPDwGwkrwcmVOLiKQjaFMsnTDJH3QanabPBZBGYbJC__9H8B6ndAvP5f076E3D0mKc2KQmMWYJjv9JHmWuxhRG1TFaBJCYVsLvMa6YCdydDhlUDtZwy4KM0lh_hAU0IqKQH3HRU6ygKP2JqCyOGEm_f",
      alt: "Castle Architecture Detail 2",
      caption: "The Keep Looking West"
    },
    {
      src: "https://lh3.googleusercontent.com/pw/AP1GczOm9VdI9ofCSgM_eIBVEEtcB2eGZpdLh9tA8gy8COUjZAslC-HBFr1m1CAowns85pJNJySN7tPmlj6OLLxGTH1Bf9ovfcBuHz6s-faKvn4crWI7K_RdMFPZyd7J66GrP5xE-ifBXbfa0CBRAsYfjm0N",
      alt: "Castle Architecture Detail 3",
      caption: "The Keep Southern Elevation"
    },
    {
      src: "https://lh3.googleusercontent.com/pw/AP1GczNyiz1H1CE-XDRfk2XGDJ49g6hSLIxmtFzEP_5T715uKxR2xj8P126ipKjmu_qF6EsyE1yuJaObPxdwzehmB5Cu8t5pdpwNpzqyK-WzHygQyQVolebJAz3cOv5oaeGCWxjmVbhE9KiM9zhEmaEUa0aM",
      alt: "Castle Architecture Detail 4",
      caption: "The Keep Looking South"
    },
    {
      src: "https://lh3.googleusercontent.com/pw/AP1GczNGcsgnLRVqMKCBNGhQU-hWI3m6VXMKqwFPBJC9-LCKodkA2_3RZMmibMKwzAjkcAXAzcbAhu863cEDcKUB9YbrdGAsSA5VfRqo-dkTPR8CJ-rSKbOqrEFgePq59Rr9-6jAxwJyDAFKIf6NCF401s7l",
      alt: "Castle Architecture Detail 5",
      caption: "The Keep Western Elevation"
    }
  ];

  const barbicanImages = [
    {
      src: "https://lh3.googleusercontent.com/pw/AP1GczOc3qJ3hhVsiLG2131K3SBK3YophnGATum_DT6fEYCYY8vlmiQNNPximIN1cTwpppasPNURRyupbODjUwc_g8_ZLOqHQCh2xfTtEvDsW8qOwVsYAA70i1Yfit6t-tlPjIsiMiOWW77lFMOGyXo6pEwZ",
      alt: "Barbican Entrance",
      caption: "Bird's Eye plan of the Barbican enclosed gatehouse"
    },
    {
      src: "https://lh3.googleusercontent.com/pw/AP1GczMFEpxZ5dWtcMohMc4M15apyNQL2WEE7cALuwdYisH98N6MXv6MHS7XYzp8Z8f4wP3upQUuHFfIDOnd4CZOHIInaIpgqX_yyN6L04NtFUuQUHLC6pfZQxsVb4ukz6zOWyg8Y3pmt-ldyest65L8SbUO",
      alt: "Barbican Detail",
      caption: "Southern Front of the Barbican"
    }
  ];

  return (
    <SectionContainer>
      <h2 className="text-4xl font-medieval text-amber-500 mb-12 text-center">
        Lewes Castle
      </h2>

      <div className="space-y-8">
        <ParchmentBox>
          <div className="p-8">
            <h3 className="text-2xl font-medieval text-amber-500 mb-4">A Norman Stronghold</h3>
            <p className="text-gray-400 mb-6">
              Lewes Castle, constructed in 1069 by William de Warenne, 1st Earl of Surrey, stands as a 
              testament to Norman military architecture and power. The castle was built immediately following 
              the Norman Conquest as part of William the Conqueror's strategy to establish control over his 
              newly acquired kingdom. De Warenne, who had fought alongside William at the Battle of Hastings, 
              was rewarded with vast lands across England, including the Rape of Lewes.
            </p>
            <p className="text-gray-400 mb-6">
              The castle's most distinctive feature is its dual motte design, making it one of only two 
              such castles in England. The first motte, known as Brack Mount, was constructed around 1069 
              and originally supported a wooden tower. The second motte, built in the late 11th or early 
              12th century, would later support the stone shell keep that still dominates Lewes's skyline today.
            </p>
            <p className="text-gray-400">
              This unique design reflects both the castle's military importance and the wealth of the de 
              Warenne family. The two mottes allowed for enhanced surveillance of the surrounding landscape 
              and provided multiple defensive positions. The castle's location was carefully chosen to control 
              the gap in the South Downs where the River Ouse cuts through, a strategic point for both 
              military and commercial purposes.
            </p>
          </div>
        </ParchmentBox>

        <div className="grid md:grid-cols-2 gap-8">
          <ParchmentBox>
            <div className="p-4">
              <button 
                onClick={() => setSelectedImage({
                  src: "https://lh3.googleusercontent.com/pw/AP1GczMe3fTrfbGl5L5NXhlr1lVa11VKh4Y-7jga_OVHeR7mh8dwfkPme_7W9VqQ6mINx_BhOd70eWiXQIeHcCZD_2VbjN6LX-zozKav3_ZGstad6WnBnKNGwI4v5DsZDMSYL_pOHRQ3SGEb_NKGc9LjnFBQ",
                  alt: "Lewes Castle Motte",
                  caption: "The impressive motte of Lewes Castle, showing its commanding position"
                })}
                className="w-full group cursor-zoom-in"
              >
                <div className="relative">
                  <img
                    src="https://lh3.googleusercontent.com/pw/AP1GczMe3fTrfbGl5L5NXhlr1lVa11VKh4Y-7jga_OVHeR7mh8dwfkPme_7W9VqQ6mINx_BhOd70eWiXQIeHcCZD_2VbjN6LX-zozKav3_ZGstad6WnBnKNGwI4v5DsZDMSYL_pOHRQ3SGEb_NKGc9LjnFBQ"
                    alt="Lewes Castle Motte"
                    className="w-full h-[300px] object-contain rounded-lg mb-4 transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gray-900/0 group-hover:bg-gray-900/20 transition-colors rounded-lg" />
                </div>
                <p className="text-center text-gray-400 text-sm">Birds Eye plan of the two mottes and central bailey of Lewes castle</p>
              </button>
            </div>
          </ParchmentBox>

          <ParchmentBox>
            <div className="p-4">
              <button 
                onClick={() => setSelectedImage({
                  src: "https://lh3.googleusercontent.com/pw/AP1GczM66iiLMdo2Ok28xQ2AkxCYret42HCba-9l4DGKmU686qVBDybQ6vjx8HkLFCENRA2P6fee3nWJdIJGYlGl4GgRW7xvb20GezGCwete-wl-PreaH1wIpwOrIwh4UOOzLy5FV3LcAx6NrQb_wrLt3T3b",
                  alt: "Lewes Castle Aerial View",
                  caption: "Aerial view showing the castle's strategic position overlooking Lewes"
                })}
                className="w-full group cursor-zoom-in"
              >
                <div className="relative">
                  <img
                    src="https://lh3.googleusercontent.com/pw/AP1GczM66iiLMdo2Ok28xQ2AkxCYret42HCba-9l4DGKmU686qVBDybQ6vjx8HkLFCENRA2P6fee3nWJdIJGYlGl4GgRW7xvb20GezGCwete-wl-PreaH1wIpwOrIwh4UOOzLy5FV3LcAx6NrQb_wrLt3T3b"
                    alt="Lewes Castle Aerial View"
                    className="w-full h-[300px] object-contain rounded-lg mb-4 transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gray-900/0 group-hover:bg-gray-900/20 transition-colors rounded-lg" />
                </div>
                <p className="text-center text-gray-400 text-sm">Aerial view showing the castle's strategic position overlooking Lewes</p>
              </button>
            </div>
          </ParchmentBox>
        </div>

        <ParchmentBox>
          <div className="p-8">
            <h3 className="text-2xl font-medieval text-amber-500 mb-4">The Keep and Bailey</h3>
            <p className="text-gray-400 mb-6">
              The shell keep, constructed in the 13th century, represents a significant evolution in castle 
              architecture. It replaced an earlier wooden structure and was built with local flint and 
              Caen stone, materials that exemplify Norman building techniques. The keep's walls, reaching 
              up to 3 meters thick in places, provided formidable defense while housing essential living 
              quarters for the castle's garrison.
            </p>
            <p className="text-gray-400 mb-6">
              The bailey, or courtyard, was enclosed by substantial curtain walls that connected the two 
              mottes. This area contained numerous buildings essential to castle life, including a great 
              hall, kitchens, stables, and workshops. Archaeological evidence suggests the bailey also 
              housed a chapel, emphasizing the castle's role as both a military and administrative center.
            </p>
            <p className="text-gray-400">
              The castle's strategic position atop a natural promontory provided commanding views over 
              the town of Lewes and the crucial River Ouse crossing. This vantage point was essential 
              for monitoring both military threats and commercial traffic along the river, which was a 
              vital trade route in medieval Sussex.
            </p>
          </div>
        </ParchmentBox>

        <div className="grid md:grid-cols-3 gap-8">
          {architectureImages.map((image, index) => (
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
            <h3 className="text-2xl font-medieval text-amber-500 mb-4">The Barbican</h3>
            <p className="text-gray-400 mb-6">
              The barbican of Lewes Castle represents one of the finest examples of medieval defensive 
              architecture in southern England. This fortified gateway complex was designed as a sophisticated 
              series of obstacles to impede and control access to the castle. The structure incorporated 
              multiple defensive features that worked in concert to create an almost impregnable entrance.
            </p>
            <p className="text-gray-400 mb-6">
              The defensive elements included a drawbridge spanning a deep ditch, multiple portcullises 
              (heavy iron gates that could be dropped quickly), and murder holes in the ceiling through 
              which defenders could drop projectiles or pour boiling liquids on attackers. The barbican's 
              walls were equipped with arrow loops, allowing defenders to fire at attackers while remaining 
              protected.
            </p>
            <p className="text-gray-400">
              The surviving masonry demonstrates the high quality of Norman construction techniques. The 
              walls were built using a mixture of local flint and imported stone, with careful attention 
              paid to both structural integrity and defensive capabilities. The barbican could be defended 
              independently of the main castle, creating an additional layer of security that made Lewes 
              Castle one of the most formidable fortifications in medieval Sussex.
            </p>
          </div>
        </ParchmentBox>

        <ParchmentBox>
          <div className="p-4">
            <button 
              onClick={() => setSelectedImage({
                src: "https://lh3.googleusercontent.com/pw/AP1GczO6EZukAzWBH9Feg-2yo-fKCpFa2KvHWRsQ-JpV7aKEtUQAMk3af6T9VD4mqIsk0u0QNaThzcnhitQgfw5bSFDQVGHZ65QDHZ5zMVCXTWKHs-1SgdwSz1L47dEnHIGHHpcRgU-7-yQxVDa03nDYkz4E",
                alt: "Barbican Defensive Features",
                caption: "The Barbican in its currrent state. Note the right side turret is missing part of its structure."
              })}
              className="w-full group cursor-zoom-in"
            >
              <div className="relative">
                <img
                  src="https://lh3.googleusercontent.com/pw/AP1GczO6EZukAzWBH9Feg-2yo-fKCpFa2KvHWRsQ-JpV7aKEtUQAMk3af6T9VD4mqIsk0u0QNaThzcnhitQgfw5bSFDQVGHZ65QDHZ5zMVCXTWKHs-1SgdwSz1L47dEnHIGHHpcRgU-7-yQxVDa03nDYkz4E"
                  alt="Barbican Defensive Features"
                  className="w-full h-[400px] object-contain rounded-lg mb-4 transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gray-900/0 group-hover:bg-gray-900/20 transition-colors rounded-lg" />
              </div>
              <p className="text-center text-gray-400 text-sm">The Barbican in its currrent state. Note the right side turret is missing part of its structure.</p>
            </button>
          </div>
        </ParchmentBox>

        <div className="grid md:grid-cols-2 gap-8">
          {barbicanImages.map((image, index) => (
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
                      className="w-full h-[300px] object-contain rounded-lg mb-4 transition-transform duration-300 group-hover:scale-105"
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
            <h3 className="text-2xl font-medieval text-amber-500 mb-4">Historical Significance</h3>
            <p className="text-gray-400 mb-6">
              Lewes Castle played pivotal roles throughout English history, most notably during the Second 
              Barons' War. In 1264, the castle served as a royalist stronghold during the Battle of Lewes, 
              where King Henry III's forces faced Simon de Montfort's baronial army. Though the royalists 
              were ultimately defeated, the castle's strength allowed it to withstand a brief siege during 
              the battle.
            </p>
            <p className="text-gray-400 mb-6">
              The de Warenne family's continuous ownership of the castle until the 14th century makes it 
              unique in English history. This stability allowed for consistent development and maintenance 
              of the fortification, contributing to its excellent state of preservation. The castle's role 
              evolved from a military stronghold to the administrative center of the Rape of Lewes, one of 
              Sussex's six administrative districts established by the Normans.
            </p>
            <p className="text-gray-400 mb-6">
              In the later medieval period, the castle became increasingly focused on civil administration 
              rather than military defense. The great hall hosted manor courts, while the buildings in the 
              bailey served as offices for managing the extensive de Warenne estates. This transition 
              reflects broader changes in medieval English society as it moved from the turbulent post-conquest 
              period to more stable civil governance.
            </p>
            <p className="text-gray-400">
              Today, Lewes Castle stands as one of the best-preserved Norman castles in southern England. 
              Managed by the Sussex Archaeological Society, it houses the Museum of Sussex Archaeology and 
              continues to educate visitors about medieval life, architecture, and warfare. The castle's 
              commanding position still offers spectacular views across Sussex, allowing visitors to appreciate 
              its strategic importance and the medieval landscape it once controlled.
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