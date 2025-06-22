import React from 'react';
import { FileDown, FileText } from 'lucide-react';
import { ParchmentBox } from '../../../ui/ParchmentBox';
import { platforms } from './data';

export function SocietyPlatforms() {
  return (
    <section className="py-12">
      <h2 className="text-3xl font-medieval text-amber-500 mb-8">Society Platforms</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {platforms.map((platform) => (
          <ParchmentBox key={platform.title}>
            <div className="p-6">
              <div className="flex items-start gap-4">
                <FileText className="w-8 h-8 text-amber-500 flex-shrink-0" />
                <div className="flex-grow">
                  <h3 className="text-xl font-medieval text-amber-500 mb-2">{platform.title}</h3>
                  <p className="text-gray-400 mb-4">{platform.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{platform.size}</span>
                    <a 
                      href={platform.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-amber-500/10 
                        text-amber-500 rounded-full hover:bg-amber-500/20 transition-colors"
                    >
                      <FileDown className="w-4 h-4" />
                      Visit Platform
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </ParchmentBox>
        ))}
      </div>
    </section>
  );
}