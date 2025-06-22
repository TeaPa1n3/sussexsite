import React from 'react';

const sections = [
  { id: 'overview', label: 'Overview' },
  { id: 'training', label: 'Combat Training' },
  { id: 'weapons', label: 'Weapons & Skills' },
  { id: 'gallery', label: 'Gallery' }
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
        <div className="flex items-center justify-center py-2 gap-3 md:gap-4">
          {sections.map(({ id, label }) => (
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
      </div>
    </div>
  );
}