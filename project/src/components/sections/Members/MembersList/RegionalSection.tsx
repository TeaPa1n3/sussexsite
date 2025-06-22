import React from 'react';
import { Shield, Sword, Tag } from 'lucide-react';
import { ParchmentBox } from '../../../ui/ParchmentBox';
import type { Section } from './types';

export function RegionalSection({ name, members }: Section) {
  return (
    <ParchmentBox>
      <div className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-8 h-8 text-amber-500" />
          <h3 className="text-2xl font-medieval text-amber-500">{name} Division</h3>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {members.map((member) => (
            <div key={member.name}>
              <div className="flex gap-6 mb-4">
                {member.image && (
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 object-cover rounded-lg flex-shrink-0"
                  />
                )}
                <div>
                  <h4 className="text-lg font-medieval text-amber-500">{member.name}</h4>
                  <p className="text-sm text-amber-500/80 italic mb-1">{member.nickname}</p>
                  <p className="text-gray-400 mb-2">{member.role}</p>
                  <div className="flex items-center gap-2">
                    <Sword className="w-4 h-4 text-amber-500" />
                    <span className="text-amber-500">{member.weapon}</span>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Tag className="w-4 h-4 text-amber-500" />
                  <span className="text-amber-500">Specialties</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {member.specialties.map((specialty) => (
                    <span
                      key={specialty}
                      className="px-3 py-1 bg-amber-500/10 text-amber-500 rounded-full text-sm"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ParchmentBox>
  );
}