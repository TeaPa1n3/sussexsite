import React from 'react';
import { ParchmentBox } from '../../ui/ParchmentBox';
import { Crown, Sword, Book } from 'lucide-react';
import { SectionContainer } from '../../ui/SectionContainer';

export function HistoricalContext() {
  const aspects = [
    {
      icon: Crown,
      title: "Political Landscape",
      description: "The Norman period saw the introduction of feudalism and the restructuring of English society, creating a new hierarchy that would define medieval England."
    },
    {
      icon: Sword,
      title: "Military Evolution",
      description: "This era witnessed significant developments in military technology and tactics, from the Norman cavalry to the evolution of castle design and siege warfare."
    },
    {
      icon: Book,
      title: "Cultural Changes",
      description: "The period marked a fusion of Anglo-Saxon and Norman cultures, influencing everything from language and art to architecture and legal systems."
    }
  ];

  return (
    <SectionContainer>
      <h2 className="text-4xl font-medieval text-amber-500 mb-12 text-center">
        Historical Context
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        {aspects.map((aspect) => (
          <ParchmentBox key={aspect.title}>
            <div className="flex flex-col items-center text-center p-6">
              <aspect.icon className="w-12 h-12 text-amber-500 mb-4" />
              <h3 className="text-xl font-medieval text-amber-500 mb-4">{aspect.title}</h3>
              <p className="text-gray-400">{aspect.description}</p>
            </div>
          </ParchmentBox>
        ))}
      </div>
    </SectionContainer>
  );
}