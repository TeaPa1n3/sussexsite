import React from 'react';
import { ParchmentBox } from '../../../ui/ParchmentBox';
import { SectionContainer } from '../../../ui/SectionContainer';

export function WeaponsSection() {
  const weapons = [
    {
      title: "Arming Sword & Shield",
      description: "The classic combination of a single-handed sword and shield, offering both offensive capability and defensive protection. Learn the fundamental techniques that form the backbone of medieval combat.",
      image: "https://lh3.googleusercontent.com/pw/AP1GczMipH-DuYm-IEfsSR9n6PErvjm6Ay9QZWO43DyxkRueWfIr3xB6onALCPMDw-QuxhiLp7lRDvgQW5vuiReF1aIdft11aYCl60flsxKz6scUlJ346AnVP6MbnauxrRhqjheUGOWiEtVMctzxlPz0SArw=w687-h1031-s-no?authuser=0"
    },
    {
      title: "Dane &  Pole Axe",
      description: "A formidable two-handed weapon that combines reach with devastating striking power. Master the techniques of this versatile weapon used by elite warriors throughout the medieval period.",
      image: "https://lh3.googleusercontent.com/pw/AP1GczOw7qnL2Q6ucaFx0uNpFK3f1oe6YN8lCHWl-ZWswob1_IszzR3uUKV4M4bEp6FlhZN8JYabQvCT0C1e9SsJifQ7QhyaI3Mi-3SBAaGCNdj5G7PoYcQMFJUVnAStVNJzLsHOkjqusOHNzHfMK8A_w6LL=w1540-h1031-s-no?authuser=0"
    },
    {
      title: "Spear & Lance Combat",
      description: "The most common weapon on the medieval battlefield, the spear requires skill in both individual combat and formation fighting. Learn thrusting techniques and spear wall tactics.",
      image: "https://lh3.googleusercontent.com/pw/AP1GczP7oJ_rZby-CFXrERm0FtNzfH1YEKnY1sNjfWylMMkn4YFEsvY58QWr_z8we9I8sv-iy0hdsdx9AVD3-NmMYmUg5rRZ8eLI25bKyZWZtcAvydCu6GWLphWyzBOgLJQZJ1uYNISwzGe2HuIuw8Z-NRq5=w1540-h1031-s-no?authuser=0"
    },
    {
      title: "Mace & Club",
      description: "Devastating weapons designed to defeat armored opponents. Learn the proper techniques for these impact weapons that can transmit force through maille armor.",
      image: "https://lh3.googleusercontent.com/pw/AP1GczORxVzrFcNv55EQ1MSNk1Q6XIWrecHm5JTUyq9DfzWE-1QGwMdoe6Wrf_PLEh_1RmD3FSWiK5RvL8DB9czFNTU-fbsl1vgyRhgJP0U_OktQZPsIMAo6uS2nIZbAnvTiT3MMJbm0sK7NcSBvYLUNMOQL=w1540-h1031-s-no?authuser=0"
    },
    {
      title: "Dagger & Knife Fighting",
      description: "Essential close-quarter combat techniques using medieval daggers. Learn historical grappling and dagger combat methods from medieval fighting manuals.",
      image: "https://lh3.googleusercontent.com/pw/AP1GczM5NjZV0tSTLggnWwV86Up1V3R8ec1EHCfxDpHgfIqwCEf1OKVAxhw5bb4FISXkzNohx5wuePWQkkvc1xi1IXAekqslg6Pj1CRNHxSlAFleSJDh8sHSnzST-e1yNNgOmnZ6qbJe_41NY-hlcxxWE--a=w1540-h1031-s-no?authuser=0"
    },
    {
      title: "Pole Weapons",
      description: "Master the use of various pole weapons including Faussarts, Glaives, and Bardiche. These versatile weapons combine the benefits of spears with additional cutting and hooking capabilities.",
      image: "https://lh3.googleusercontent.com/pw/AP1GczOvV77wECaONmIsZpvk6nROcdEDXVE6eh_McWfdFx-1wMFz5K-IRlg9Ch6k9oIE72ibU3S1QsGMofyW7-B1jhwqMmbEZpgQqIPpUJ16ns9OirBD3rmVZCRyNzXJvhEH27psBfxA78qH5sHK-m_js9zT=w687-h1031-s-no?authuser=0"
    }
  ];

  return (
    <SectionContainer>
      <h2 className="text-4xl font-medieval text-amber-500 mb-12 text-center">
        Weapons & Combat Styles
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        {weapons.map((weapon) => (
          <ParchmentBox key={weapon.title}>
            <div className="p-6 space-y-4">
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg">
                <img
                  src={weapon.image}
                  alt={weapon.title}
                  className="w-full h-[300px] object-cover rounded-lg"
                />
              </div>
              <div>
                <h3 className="text-xl font-medieval text-amber-500">{weapon.title}</h3>
                <p className="mt-2 text-gray-400">{weapon.description}</p>
              </div>
            </div>
          </ParchmentBox>
        ))}
      </div>
    </SectionContainer>
  );
}