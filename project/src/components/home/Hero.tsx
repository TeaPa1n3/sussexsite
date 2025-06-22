import React from 'react';
import { CTAStamp } from './CTAStamp';
import { Play } from 'lucide-react';

export function Hero() {
  return (
    <div className="relative mt-4 md:mt-6">
      {/* CTA Section */}
      <div className="relative z-20 ml-8 md:ml-12">
        <CTAStamp />
      </div>

      {/* Large Centered Image */}
      <div className="relative flex justify-center items-center py-3">
        <div className="[filter:drop-shadow(0_0_2px_rgba(0,0,0,0.8))]">
          <img 
            src="https://lh3.googleusercontent.com/pw/AP1GczMDjUl0-Z-fWqh7GFCGMaBhq_jaxFj8DwCpFJDqv4e6S2w8ONPm21uROHv4-qYBOdJDlA30IaHzSikipo4jvC-Vpr_P-7G0Wn3yOuhGW4d39-647PpNnjamtPxkZ8km_cAtSYSgDtYWCd6dtc3i4dk3"
            alt="Sussex Medieval Society Logo"
            className="w-[256px] md:w-[512px] h-auto"
          />
        </div>
      </div>

      <div className="relative z-20 py-2 md:py-4">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-5xl font-medieval text-amber-500 mb-6 md:mb-8 text-center">About Us</h2>
          <img 
            src="https://lh3.googleusercontent.com/pw/AP1GczMFeBAeHcXfeKSxwufKpUXRi1HCePIF69jzNaNaS2cWSlne-bX5NG-ZBDdd4px-_9-DSn3h9epzQKS0xJHy17WuR3ggBsPox_6B6PN1ZuKWcO2jEJeFV28XKEeurwbQ7YNs1gGxoxoXBlR7_3QgfcM5=w1771-h124-s-no-gm"
            alt="Decorative Divider"
            className="w-[60%] md:w-[40%] mx-auto mb-6 md:mb-8"
          />
          <p className="text-base md:text-2xl text-gray-400 max-w-6xl mx-auto leading-relaxed mb-6 md:mb-12">
            Welcome to the home of the Sussex Medieval Society! We are a reenactment and living history group that represents both military and civilian life during the early medieval period from the Norman Conquest in 1066 up to the conclusion of the 2nd Baronial War in 1266. The group was officially founded in May of 2021 as a group of like minded friends with a passion for medieval history. Since its establishment the group has had a meteoric rise in membership and it continues to grow. For us, this group is a family, and we encourage people to come and give it a try! You can see what we do in the video below!
          </p>
          
          <div className="max-w-[90%] md:max-w-[40rem] mx-auto">
            <a 
              href="https://www.youtube.com/watch?v=VvZV4zaL0sI" 
              target="_blank" 
              rel="noopener noreferrer"
              className="relative block group"
            >
              <img
                src="https://lh3.googleusercontent.com/pw/AP1GczMdCr6PFK1FePVFqBmuJWyMY8W4tGiECBirqIg5U6-6uLlMU4dSPoiGFzpVaHsyEXV3G3E7uHr-Xc13wWrlHb2H3kTwR1gk1sKjLLVkLL5Dx7Orz462R7cB6YBvUaAiERUqOn8x_pOaz5TI47RDcygX"
                alt="Sussex Medieval Society Introduction"
                className="w-full rounded-lg transition-transform duration-300 group-hover:scale-[1.01]"
              />
              {/* Dark overlay on hover */}
              <div className="absolute inset-0 bg-gray-900/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
              
              {/* Play button and text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="p-4 md:p-6 rounded-full bg-amber-500/20 backdrop-blur-sm 
                  transition-all duration-300 group-hover:bg-amber-500/30 group-hover:scale-110">
                  <Play className="w-6 md:w-12 h-6 md:h-12 text-amber-500" />
                </div>
                <span className="mt-4 text-base md:text-xl font-medieval text-amber-500 opacity-0 
                  group-hover:opacity-100 transition-opacity duration-300 text-center px-4">
                  Click to Watch Video
                </span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}