import React from 'react';
import { Facebook, Instagram } from 'lucide-react';
import { ThreadsIcon } from '../../ui/icons/ThreadsIcon';
import { TikTokIcon } from '../../ui/icons/TikTokIcon';
import { XIcon } from '../../ui/icons/XIcon';
import { BlueskyIcon } from '../../ui/icons/BlueskyIcon';
import { ParchmentBox } from '../../ui/ParchmentBox';
import { AnimatedIcon } from '../../ui/AnimatedIcon';
import { SectionContainer } from '../../ui/SectionContainer';

export function SocialMediaSection() {
  const socialLinks = [
    {
      title: "Facebook",
      description: "Follow us on Facebook for event updates and announcements.",
      url: "https://www.facebook.com/SussexMedieval",
      icon: Facebook
    },
    {
      title: "Instagram",
      description: "Check out our latest photos and video content.",
      url: "https://www.instagram.com/sussex_medieval_society/",
      icon: Instagram
    },
    {
      title: "X",
      description: "Follow us on X (formerly Twitter) for the latest updates.",
      url: "https://x.com/sussexmedieval",
      icon: XIcon
    },
    {
      title: "Bluesky",
      description: "Join our discussions and updates on Bluesky.",
      url: "https://sussexmedieval.bsky.social",
      icon: BlueskyIcon
    },
    {
      title: "Threads",
      description: "Join our discussions and stay updated on Threads.",
      url: "https://www.threads.net/@sussex_medieval_society",
      icon: ThreadsIcon
    },
    {
      title: "TikTok",
      description: "Watch our latest medieval content and behind-the-scenes videos.",
      url: "https://www.tiktok.com/@sussexmedieval",
      icon: TikTokIcon
    }
  ];

  return (
    <SectionContainer>
      <h2 className="text-4xl font-medieval text-amber-500 mb-8 text-center">Follow us on Social Media!</h2>
      <img 
        src="https://lh3.googleusercontent.com/pw/AP1GczMFeBAeHcXfeKSxwufKpUXRi1HCePIF69jzNaNaS2cWSlne-bX5NG-ZBDdd4px-_9-DSn3h9epzQKS0xJHy17WuR3ggBsPox_6B6PN1ZuKWcO2jEJeFV28XKEeurwbQ7YNs1gGxoxoXBlR7_3QgfcM5=w1771-h124-s-no-gm"
        alt="Decorative Divider"
        className="w-[40%] mx-auto mb-12"
      />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {socialLinks.map((link) => (
          <ParchmentBox key={link.title}>
            <a 
              href={link.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="block group p-8"
            >
              <div className="flex items-center gap-4 mb-4">
                <AnimatedIcon icon={link.icon} className="w-8 h-8 text-amber-500" />
                <h3 className="text-2xl font-medieval text-amber-500 
                  transition-colors duration-300 group-hover:text-amber-400">
                  {link.title}
                </h3>
              </div>
              <p className="text-lg text-gray-400 transition-colors duration-300 
                group-hover:text-gray-300">
                {link.description}
              </p>
            </a>
          </ParchmentBox>
        ))}
      </div>
    </SectionContainer>
  );
}