import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  bg?: 'white' | 'light' | 'dark';
  id?: string;
}

const Section: React.FC<SectionProps> = ({ children, className = '', bg = 'white', id }) => {
  const bgColors = {
    white: 'bg-white',
    light: 'bg-brand-50/50',
    dark: 'bg-stone-100',
  };

  return (
    <section id={id} className={`py-8 md:py-12 ${bgColors[bg]} ${className}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {children}
      </div>
    </section>
  );
};

export default Section;