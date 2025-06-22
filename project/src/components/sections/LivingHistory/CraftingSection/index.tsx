import React from 'react';
import { ParchmentBox } from '../../../ui/ParchmentBox';
import { SectionContainer } from '../../../ui/SectionContainer';

export function CraftingSection() {
  const crafts = [
    {
      title: "Medieval Cooking",
      description: "Authentic medieval cuisine prepared using period-appropriate methods and ingredients. From hearty pottages, tarts & pies, to pickled goods, our cooks recreate the flavors of history using recipes from medieval manuscripts.",
      image: "https://lh3.googleusercontent.com/pw/AP1GczOzhuXqucJjNBdTbygGks0pBFOhMHUx_kjWDYK_M-YIfBNuSB9sVwZJwEUMm3_0LZ_lLdZlcAWTHaahjvdiA0tkHAHVnsYjiV38mwDjnUXbmoPju4B8NK4lPb3Rmde9aAy9QlSr3AATZyJnEBdTVjCo=w1540-h1031-s-no?authuser=0"
    },
    {
      title: "Maille Making",
      description: "Traditional medieval armor crafting using individually riveted rings. Each piece is created using historically accurate techniques, providing authentic protection just as it did centuries ago.",
      image: "https://lh3.googleusercontent.com/pw/AP1GczN3bBTZt5mTKme_scKHu3TEvn6HVrYy2gi3wFSRplgHvdKVuh9Upg3sJyp2ggiAe0ditH2fSVFNtgfhNqu1Dk02YhrEs87RShKw88XefGb8FN305DmUDSPCihSUToexOnDLmiA8eklpx_UYu-n2UZMz=w1540-h1031-s-no?authuser=0"
    },
    {
      title: "Leatherworking",
      description: "Medieval leatherwork encompassing everything from belts and pouches to armor components. Each piece combines historical accuracy with practical durability using period-appropriate techniques.",
      image: "https://lh3.googleusercontent.com/pw/AP1GczOdtUkv1mlskzB3LRGgURn74N0YRjiKDU9l_BpIFUDEF7UrwioQ8AfHR_ApIeFMXNmOilUoZ2EpNVGlkrlkvh3RQHn_8umFUxNjicL4FGWlvQk7muSVZeLqoCuKqSiZ-dkybFIrKxkpk3Oi3d1Vv9LQ=w1540-h1031-s-no?authuser=0"
    },
    {
      title: "Shield Making",
      description: "The art of medieval shield crafting, using traditional methods and materials. Each shield is constructed with historical accuracy, from the wood selection to the final painted designs.",
      image: "https://lh3.googleusercontent.com/pw/AP1GczOoJoHkw40xLJdMe47ySxIwbZM2ZlOcNcJii0TJoh08XEkduO6JHgvYEPsDBnQwQxwD3TlduRkIbsp9QVjk4S8R3qN-9Tt_2hagsBwxGJUMGuZEORYH7P3-iBsMhdNe0ruFrQ0xfVnT8YRvywOfz5bA"
    },
    {
      title: "Medieval Woodwork",
      description: "Traditional woodworking using period tools and techniques to create everything from furniture to weapon hafts. Our craftsmen employ historical joinery methods and authentic tool marks.",
      image: "https://lh3.googleusercontent.com/pw/AP1GczPOM4XG7L-vbp5eLh2Tel17ClvplTTusIOgt1eBVIHhzS1oFYVMgcE8_TjKp_GlZOdYtb7y6dH_zs12ZfwJPmYuXXbxkVKMAqhp-A-c7Vv-0b0itm_APXvxumVGRvgkfECWTQ_Ixor8UXoo-YxxtvPf=w1540-h1031-s-no?authuser=0"
    },
    {
      title: "Medieval Surgery",
      description: "Demonstration of medieval medical practices and surgical techniques. Learn about the tools, treatments, and theories that medieval physicians used to care for their patients.",
      image: "https://lh3.googleusercontent.com/pw/AP1GczO_4-kemDYrD8zAd_napGuZRwsqRwzmwEt3RClI8c_Pv7aHA6Ne9A-BXUQAF_sTFlNmFlaVTFv8Ssy-c0Y9gV1Bh7u-q1wz2tBHL-jG3eWQp42CWymZuu29fjejWzCuNBt_mkor-V7XY0TARW6Yav9p=w1540-h1031-s-no?authuser=0"
    }
  ];

  return (
    <SectionContainer>
      <h2 className="text-4xl font-medieval text-amber-500 mb-12 text-center">
        Medieval Crafts & Skills
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        {crafts.map((craft) => (
          <ParchmentBox key={craft.title}>
            <div className="p-6 space-y-4">
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg">
                <img
                  src={craft.image}
                  alt={craft.title}
                  className="w-full h-[300px] object-cover rounded-lg"
                />
              </div>
              <div>
                <h3 className="text-xl font-medieval text-amber-500">{craft.title}</h3>
                <p className="mt-2 text-gray-400">{craft.description}</p>
              </div>
            </div>
          </ParchmentBox>
        ))}
      </div>
    </SectionContainer>
  );
}