import React from 'react';
import { GroupCard } from './GroupCard';
import { groups } from './data';
import { SectionContainer } from '../../../ui/SectionContainer';

export function ReenactmentGroups() {
  return (
    <SectionContainer>
      <h2 className="text-4xl font-medieval text-amber-500 mb-12 text-center">
        Fellow Reenactment Groups
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {groups.map((group) => (
          <GroupCard key={group.name} {...group} />
        ))}
      </div>
    </SectionContainer>
  );
}