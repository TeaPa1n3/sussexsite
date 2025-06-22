import React from 'react';
import { ParchmentBox } from '../../../ui/ParchmentBox';
import { SectionContainer } from '../../../ui/SectionContainer';

export function TrainingSection() {
  const trainings = [
    {
      title: "Beginner Training",
      description: "Start your journey into medieval combat with our comprehensive beginner's program. Learn basic stances, footwork, and weapon handling in a safe, controlled environment with experienced instructors.",
      image: "https://lh3.googleusercontent.com/pw/AP1GczP8OiPDg3WSzAg0khKGL4XVfV_iP0vq9J3O6ysmTZppZeu6y7c-guP6TCYz6FPN2kF5H3kMs0Bx1ycjlx3eaaTzzIp4Nk1VNKfH3-rEb3ObqqY9_LJF-w7cM0OpFGiIvUhAc40WxZ-k9h-BNsNxIjWx=w1443-h1031-s-no?authuser=0"
    },
    {
      title: "Formation Combat",
      description: "Master the art of fighting in shield walls and other medieval battle formations. Learn to work as part of a unit, understanding battlefield tactics and group combat dynamics.",
      image: "https://lh3.googleusercontent.com/pw/AP1GczMA1yizu4EuWA-f8EdGaQ8Gscnf9siJaKY6RIuzpfQQ8atoPk2Zp6gLzRQeA7x0U3D0CeXBpKukSri3oU8YTL7DhikfJfiS4cW6xRkIxcZ9Y9OvSHFEJuFAiehv4cjbe7NhB0hXNbyHsmJtlOUkLfVf=w1546-h1031-s-no?authuser=0"
    },
    {
      title: "Advanced Techniques",
      description: "For experienced fighters, our advanced training covers complex weapon combinations, advanced footwork, and historical combat manuscripts. Perfect your technique and expand your combat repertoire.",
      image: "https://lh3.googleusercontent.com/pw/AP1GczMdCr6PFK1FePVFqBmuJWyMY8W4tGiECBirqIg5U6-6uLlMU4dSPoiGFzpVaHsyEXV3G3E7uHr-Xc13wWrlHb2H3kTwR1gk1sKjLLVkLL5Dx7Orz462R7cB6YBvUaAiERUqOn8x_pOaz5TI47RDcygX=w1547-h1031-s-no?authuser=0"
    },
    {
      title: "Weapon Specialization",
      description: "Focus on mastering specific medieval weapons, from arming swords to pole weapons. Each weapon type requires unique techniques and strategies that you'll learn from our experienced instructors.",
      image: "https://lh3.googleusercontent.com/pw/AP1GczOpiHBjjZsGb8ryp9b3CJYfbzPcduUYtGCtfBC1o9dMJNEC44cYN8F2WKXFvYMho8ZK2kNvHkU4e_E9oYv645D8YKoDW6rkZfyh7jCHhbOJfag9k7N2KP2h32hlqN9jmxC3j0CfaKvUY5EZthSvNRZB=w1547-h1031-s-no?authuser=0"
    },
    {
      title: "Armor Training",
      description: "Learn to fight effectively while wearing period-accurate armor. Understand how different armor types affect movement and combat techniques, and master the art of armored combat.",
      image: "https://lh3.googleusercontent.com/pw/AP1GczOTAQzNOp2vV5ufM76jFhpesqgGI5pICv_hSn1VjUO7HnwPI9Rp-PpItxwhKLyM2CL1eC96iP7d7E3kmwQhr61Xlf7I7f43CU0dQ3iTTECUxHb2nPrKCmLP1lE-fAzkHdAo3ygvjXv8jUfv1jPsaTGt=w773-h1031-s-no?authuser=0"
    },
    {
      title: "Combat Fitness",
      description: "Develop the strength, stamina, and agility needed for medieval combat. Regular training prepares you and your body to cope with the physical demands of wearing armor and wielding medieval weapons.",
      image: "https://lh3.googleusercontent.com/pw/AP1GczNaqeloG5r-NV4xLGTmd6xqP95XJt0e2pgQ9lO3BjgErLXWC7bl8lAHy60ZO1Lze30qoB9_-Gud6tXjKoBpokPLPOyqSPSPDb5nLF3QrTSqxBQh6NGEQxwRRVJ0MvtoO8j5dOG00-jXGVAEk8vT-xY0=w773-h1031-s-no?authuser=0"
    }
  ];

  return (
    <SectionContainer>
      <h2 className="text-4xl font-medieval text-amber-500 mb-12 text-center">
        Combat Training & Skills
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        {trainings.map((training) => (
          <ParchmentBox key={training.title}>
            <div className="p-6 space-y-4">
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg">
                <img
                  src={training.image}
                  alt={training.title}
                  className="w-full h-[300px] object-cover rounded-lg"
                />
              </div>
              <div>
                <h3 className="text-xl font-medieval text-amber-500">{training.title}</h3>
                <p className="mt-2 text-gray-400">{training.description}</p>
              </div>
            </div>
          </ParchmentBox>
        ))}
      </div>
    </SectionContainer>
  );
}