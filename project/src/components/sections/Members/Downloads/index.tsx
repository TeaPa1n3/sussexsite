import React from 'react';
import { FileDown, FileText } from 'lucide-react';
import { ParchmentBox } from '../../../ui/ParchmentBox';
import { downloads } from './data';

export function Downloads() {
  return (
    <section className="py-12">
      <h2 className="text-3xl font-medieval text-amber-500 mb-8">Documentation and Forms</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {downloads.map((file) => (
          <ParchmentBox key={file.title}>
            <div className="p-6">
              <div className="flex items-start gap-4">
                <FileText className="w-8 h-8 text-amber-500 flex-shrink-0" />
                <div className="flex-grow">
                  <h3 className="text-xl font-medieval text-amber-500 mb-2">{file.title}</h3>
                  <p className="text-gray-400 mb-4">{file.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{file.size}</span>
                    {file.url ? (
                      <a 
                        href={file.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-amber-500/10 
                          text-amber-500 rounded-full hover:bg-amber-500/20 transition-colors"
                      >
                        <FileDown className="w-4 h-4" />
                        View Document
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