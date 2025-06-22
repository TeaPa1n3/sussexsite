import React from 'react';
import { FriendCard } from './FriendCard';
import { otherFriends } from './data';
import { SectionContainer } from '../../../ui/SectionContainer';

export function OtherFriends() {
  return (
    <SectionContainer>
      <h2 className="text-4xl font-medieval text-amber-500 mb-12 text-center">
        Media & Photography
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {otherFriends.map((friend) => (
          <FriendCard key={friend.name} {...friend} />
        ))}
      </div>
    </SectionContainer>
  );
}