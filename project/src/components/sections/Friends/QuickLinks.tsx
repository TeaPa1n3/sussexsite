import React from 'react';

const sections = [
  // First row
  [
    { id: 'events', label: 'Events' },
    { id: 'groups', label: 'Reenactment Groups' },
    { id: 'media', label: 'Media & Photography' }
  ]
];

export function QuickLinks() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = window.innerWidth < 768 ? 120 : 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm sticky top-0 z-30 border-y border-amber-500/20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col py-2 gap-2">
          {sections.map((row, rowIndex) => (
            <div 
              key={rowIndex}
              className="flex items-center justify-center gap-3 md:gap-4"
            >
              {row.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className="text-amber-500 hover:text-amber-400 px-3 md:px-4 py-2 
                    rounded-full hover:bg-amber-500/10 transition-colors text-sm md:text-base
                    whitespace-nowrap"
                >
                  {label}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}