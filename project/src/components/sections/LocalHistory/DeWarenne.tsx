import React, { useState } from 'react';
import { ParchmentBox } from '../../ui/ParchmentBox';
import { SectionContainer } from '../../ui/SectionContainer';
import { ImageModal } from '../../ui/ImageModal';

interface FamilyMember {
  id: string;
  name: string;
  title: string;
  years?: string;
  spouse?: string;
  children?: string[];
  description: string;
  level: number;
  branch?: 'main' | 'side';
}

const familyMembers: FamilyMember[] = [
  {
    id: 'william-1',
    name: "William de Warenne",
    title: "1st Earl of Surrey",
    years: "c.1030-1088",
    spouse: "Gundrada (d.1085)",
    children: ["William II de Warenne", "Edith de Warenne", "Reynold de Warenne"],
    description: "A Norman nobleman who fought at the Battle of Hastings and was rewarded with extensive lands in England. He built Lewes Castle and founded Lewes Priory with his wife Gundrada.",
    level: 1,
    branch: 'main'
  },
  {
    id: 'william-2',
    name: "William de Warenne",
    title: "2nd Earl of Surrey",
    years: "1071-1138",
    spouse: "Isabel de Vermandois",
    children: ["William III de Warenne", "Gundrada de Warenne", "Ada de Warenne"],
    description: "Expanded his father's territories and strengthened the family's position. He participated in the First Crusade and was known for his military prowess.",
    level: 2,
    branch: 'main'
  },
  {
    id: 'william-3',
    name: "William de Warenne",
    title: "3rd Earl of Surrey",
    years: "1119-1148",
    spouse: "Ela of Ponthieu",
    children: ["Isabel de Warenne"],
    description: "Died on crusade during the Second Crusade. His death without male heir led to his daughter Isabel inheriting the earldom.",
    level: 3,
    branch: 'main'
  },
  {
    id: 'isabel-1',
    name: "Isabel de Warenne",
    title: "4th Countess of Surrey",
    years: "1137-1203",
    spouse: "Hamelin Plantagenet",
    children: ["William de Warenne"],
    description: "Sole heiress who married Hamelin Plantagenet, illegitimate half-brother of Henry II. This marriage brought the de Warenne estates into the extended royal family.",
    level: 4,
    branch: 'main'
  },
  {
    id: 'william-4',
    name: "William de Warenne",
    title: "5th Earl of Surrey",
    years: "1166-1240",
    spouse: "Maud Marshal",
    children: ["John de Warenne", "Isabel de Warenne"],
    description: "Supported King John during the First Barons' War. He was present at the signing of Magna Carta in 1215.",
    level: 5,
    branch: 'main'
  },
  {
    id: 'john-1',
    name: "John de Warenne",
    title: "6th Earl of Surrey",
    years: "1231-1304",
    spouse: "Alice de Lusignan",
    children: ["William de Warenne", "Eleanor de Warenne"],
    description: "A significant figure in the Second Barons' War, initially supporting the king but later switching sides. He was known for his military expertise.",
    level: 6,
    branch: 'main'
  },
  {
    id: 'william-5',
    name: "William de Warenne",
    title: "Son of 6th Earl",
    years: "1256-1286",
    description: "Died before his father in a tournament, leaving his son John as heir to the earldom.",
    level: 7,
    branch: 'side'
  },
  {
    id: 'john-2',
    name: "John de Warenne",
    title: "7th Earl of Surrey",
    years: "1286-1347",
    spouse: "Joan of Bar",
    description: "The last of the male de Warenne line. His marriage was unsuccessful, and he died without legitimate heir, ending the direct male line of the family.",
    level: 8,
    branch: 'main'
  }
];

export function DeWarenne() {
  const [selectedImage, setSelectedImage] = useState<{
    src: string;
    alt: string;
    caption: string;
  } | null>(null);

  const dynastyImages = [
    {
      src: "https://lh3.googleusercontent.com/pw/AP1GczPydEUF1gpe16IO6JoUGlhMtbX8HubvsqJdeA-Y7omv1858nwMX5qEdNfD4uHNKXAAnEypxzS8joRgE5aUVJ84UHK3uGf7yiSvLL1rV8ja_f_r0olbhcq_GNWox7fKSgfkw8W2KL2Zu9p1ta3b2u-G6=w1337-h1031-s-no?authuser=0",
      alt: "William de Warenne Seal",
      caption: "John de Warenne marching through Lewes at the annual Battle of Lewes Reenactment"
    },
    {
      src: "https://lh3.googleusercontent.com/pw/AP1GczPAUBy9bCH461A9omvWR5EWXgC3lY5t1av2HHS_v3hb-Fv_KYucZOD6tIUdobWNX8ltsOo0woqhcYKn3lZHZmx1oE-lUX8aj864NSbx9EvJGAb3NvXLAJnsxXhEJxrDZEwIE5BeatIFwJETixmlYk7J",
      alt: "de Warenne Coat of Arms",
      caption: "The seal of de Warenne, Earl of Surrey, approx mid 13th Century"
    },
    {
      src: "https://lh3.googleusercontent.com/pw/AP1GczNwO7uQQwWQatuf3faItUNEmpw_pubWSxUJD1RE3yqrx7cMliOlgUcotfN0PZ4uF--DMK4mGHH6fqhOTZ0R7ccpNTSKOqlXAsaq_2wC1P25_elv2DhikHjPUju4rOmCfnpmBsvMVBQjEylqHiZ5yvom=w300-h232-s-no?authuser=0",
      alt: "de Warenne Castle",
      caption: "The de Warenne family coat of arms - Chequy or and azure"
    }
  ];

  return (
    <SectionContainer>
      <h2 className="text-4xl font-medieval text-amber-500 mb-12 text-center">
        The de Warenne Family
      </h2>

      <div className="space-y-8">
        <ParchmentBox>
          <div className="p-8">
            <h3 className="text-2xl font-medieval text-amber-500 mb-4">Rise of a Dynasty</h3>
            <p className="text-gray-400 mb-6">
              The de Warenne family emerged as one of the most powerful Anglo-Norman dynasties following 
              the Norman Conquest of 1066. William de Warenne, the family's patriarch, fought alongside 
              William the Conqueror at the Battle of Hastings and was rewarded with extensive lands 
              across thirteen counties, including the strategically important Rape of Lewes in Sussex.
            </p>
            <p className="text-gray-400 mb-6">
              The family's commitment to military service was exemplified by their participation in the Crusades. 
              William de Warenne, 2nd Earl of Surrey, joined the First Crusade in 1096, fighting alongside 
              Robert Curthose, Duke of Normandy. His son, William de Warenne, 3rd Earl of Surrey, followed 
              in his father's footsteps and joined the Second Crusade in 1147, where he ultimately met his 
              fate fighting in the Holy Land. This crusading tradition brought both prestige and military 
              experience to the family.
            </p>
            <p className="text-gray-400 mb-6">
              The de Warennes also played a crucial role in Anglo-Scottish relations. John de Warenne, 
              6th Earl of Surrey, served as Guardian of Scotland for Edward I and commanded English forces 
              at the Battle of Dunbar in 1296, where he secured a significant victory for the English crown. 
              His grandson, John de Warenne, 7th Earl of Surrey, continued this tradition, fighting in 
              Edward III's Scottish campaigns and serving as a commander at the Battle of Halidon Hill in 1333.
            </p>
            <p className="text-gray-400">
              Through careful political maneuvering and advantageous marriages, the de Warennes maintained 
              their position among the highest ranks of the Anglo-Norman aristocracy. Their connections 
              to the royal family, particularly through Isabel de Warenne's marriage to Hamelin 
              Plantagenet, further cemented their status and influence. The family's military prowess, 
              demonstrated in the Crusades and Scottish campaigns, combined with their political acumen, 
              made them one of medieval England's most formidable noble houses.
            </p>
          </div>
        </ParchmentBox>

        <div className="grid md:grid-cols-3 gap-8">
          {dynastyImages.map((image, index) => (
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
            <h3 className="text-2xl font-medieval text-amber-500 mb-8">The de Warenne Family Tree</h3>
            <div className="space-y-8">
              {familyMembers.map((member) => (
                <div 
                  key={member.id}
                  className={`relative pl-8 border-l-2 border-amber-500/20
                    ${member.branch === 'side' ? 'ml-8 border-l-2 border-dashed' : ''}`}
                  style={{ marginLeft: `${(member.level - 1) * 2}rem` }}
                >
                  <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-amber-500/20 border-2 border-amber-500" />
                  <div className="space-y-2">
                    <h4 className="text-xl font-medieval text-amber-500">{member.name}</h4>
                    <p className="text-amber-500/80">{member.title}</p>
                    {member.years && (
                      <p className="text-gray-500 text-sm">{member.years}</p>
                    )}
                    {member.spouse && (
                      <p className="text-gray-400">
                        <span className="text-amber-500/60">Spouse:</span> {member.spouse}
                      </p>
                    )}
                    {member.children && member.children.length > 0 && (
                      <p className="text-gray-400">
                        <span className="text-amber-500/60">Children:</span> {member.children.join(", ")}
                      </p>
                    )}
                    <p className="text-gray-400">{member.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ParchmentBox>

        <ParchmentBox>
          <div className="p-8">
            <h3 className="text-2xl font-medieval text-amber-500 mb-4">Legacy and Decline</h3>
            <p className="text-gray-400 mb-6">
              The de Warenne family's influence on English history extended far beyond their military 
              and political achievements. They were significant patrons of religious houses, founding 
              not only Lewes Priory but also several other monastic establishments across England. 
              Their architectural legacy can still be seen in the remains of Lewes Castle and other 
              fortifications they constructed.
            </p>
            <p className="text-gray-400 mb-6">
              The family played crucial roles in major historical events, from the Norman Conquest to 
              the Barons' Wars. Their participation in the Crusades, presence at the signing of Magna 
              Carta, and involvement in royal administration demonstrate their central position in 
              medieval English society.
            </p>
            <p className="text-gray-400">
              The male line of the de Warenne family came to an end with the death of John de Warenne, 
              7th Earl of Surrey, in 1347. His marriage to Joan of Bar was childless, and despite 
              attempts to secure the succession, the vast de Warenne estates passed to his sister's son, 
              Richard FitzAlan, Earl of Arundel. This marked the end of one of England's most powerful 
              Norman families, though their influence on English history and architecture endures to 
              this day.
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