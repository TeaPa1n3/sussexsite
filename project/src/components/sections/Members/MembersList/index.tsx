import React from 'react';
import { SocietyHead } from './SocietyHead';
import { RegionalSection } from './RegionalSection';
import { sections } from './data';

export function MembersList() {
  return (
    <section className="py-12">
      <h2 className="text-4xl font-medieval text-amber-500 mb-4 text-center">Society Officers</h2>
      <p className="text-gray-400 text-center mb-12 max-w-3xl mx-auto">
        Meet the dedicated officers who lead our society and regional divisions, bringing medieval history to life across England.
      </p>
      
      {/* Society Heads Section */}
      <div className="mb-12">
        <SocietyHead />
      </div>
      
      {/* Regional Sections */}
      <div className="space-y-8">
        {sections.map((section) => (
          <RegionalSection key={section.name} {...section} />
        ))}
      </div>
    </section>
  );
}