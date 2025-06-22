import React from 'react';

const sections = [
  { id: 'battle', label: 'Battle of Lewes' },
  { id: 'castle', label: 'Lewes Castle' },
  { id: 'priory', label: 'St. Pancras Priory' },
  { id: 'de-warenne', label: 'The de Warenne Family' }
];

export function QuickLinks() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Get the header height to offset the scroll position
      const headerHeight = 100; // Approximate header height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm sticky top-0 z-30 border-y border-amber-500/20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-start md:justify-center overflow-x-auto py-2 gap-3 md:gap-4 
          scrollbar-hide whitespace-nowrap">
          {sections.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className="text-amber-500 hover:text-amber-400 px-3 md:px-4 py-2 
                rounded-full hover:bg-amber-500/10 transition-colors text-sm md:text-base
                flex-shrink-0"
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}