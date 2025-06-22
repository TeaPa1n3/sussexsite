import React from 'react';
import { FileDown, FileText } from 'lucide-react';
import { ParchmentBox } from '../../../ui/ParchmentBox';
import { resources } from './data';

export function HistoricalResources() {
  return (
    <section className="py-12">
      <h2 className="text-3xl font-medieval text-amber-500 mb-8">Historical Resources</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {resources.map((resource) => (
          <ParchmentBox key={resource.title}>
            <div className="p-6">
              <div className="flex items-start gap-4">
                <FileText className="w-8 h-8 text-amber-500 flex-shrink-0" />
                <div className="flex-grow">
                  <h3 className="text-xl font-medieval text-amber-500 mb-2">{resource.title}</h3>
                  <p className="text-gray-400 mb-4">{resource.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{resource.size}</span>
                    {resource.url ? (
                      <a 
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-amber-500/10 
                          text-amber-500 rounded-full hover:bg-amber-500/20 transition-colors"
                      >
                        <FileDown className="w-4 h-4" />
                        Visit Resource
                      </a>
                    ) : (
                      <button className="flex items-center gap-2 px-4 py-2 bg-amber-500/10 
                        text-amber-500 rounded-full hover:bg-amber-500/20 transition-colors">
                        <FileDown className="w-4 h-4" />
                        Download
                      </button>
                    )}
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