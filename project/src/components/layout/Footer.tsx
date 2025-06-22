import React from 'react';
import { NavLink } from './NavLink';

export function Footer() {
  const links = [
    { href: "/", label: "Home" },
    { href: "/history", label: "Our Period" },
    { href: "/local-history", label: "Local History" },
    { href: "/combat", label: "Combat" },
    { href: "/living-history", label: "Living History" },
    { href: "/merch", label: "Merch" },
    { href: "/members", label: "Members", highlight: 'blue' as const },
    { href: "/friends", label: "Friends" },
    { href: "/contact", label: "Contact" }
  ];

  return (
    <footer className="bg-gray-900 border-t border-amber-500/10">
      <div className="max-w-7xl mx-auto px-4 py-6 md:py-8">
        {/* Navigation Links */}
        <nav className="flex flex-wrap justify-center gap-4 md:gap-6 mb-6 md:mb-8">
          {links.map((link) => (
            <NavLink 
              key={link.href} 
              href={link.href}
              highlight={link.highlight}
              className="text-sm md:text-base"
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        
        {/* Copyright */}
        <p className="text-center text-gray-500 text-xs md:text-sm">
          © {new Date().getFullYear()} Sussex Medieval Society. All rights reserved.
        </p>
      </div>
    </footer>
  );
}