import React from 'react';

interface SectionContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionContainer({ children, className = '' }: SectionContainerProps) {
  return (
    <section className={`relative py-20 ${className}`}>
      <div className="max-w-7xl mx-auto px-4">
        {children}
      </div>
    </section>
  );
}