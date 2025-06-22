import React from 'react';
import { Link } from 'react-router-dom';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  mobile?: boolean;
  highlight?: 'amber' | 'yellow' | 'blue';
}

export function NavLink({ href, children, mobile, highlight = 'amber' }: NavLinkProps) {
  const baseStyles = "font-medieval transition-colors duration-200";
  const desktopStyles = "relative text-gray-400 group";
  const mobileStyles = "block px-3 py-2 text-gray-400 hover:bg-gray-800 rounded-md";
  
  const highlightColors = {
    amber: 'hover:text-amber-500',
    yellow: 'hover:text-yellow-500',
    blue: 'hover:text-blue-500'
  };

  const underlineColors = {
    amber: 'bg-amber-500',
    yellow: 'bg-yellow-500',
    blue: 'bg-blue-500'
  };

  return (
    <Link
      to={href}
      className={`${baseStyles} ${mobile ? mobileStyles : desktopStyles} ${highlightColors[highlight]}`}
    >
      {children}
      {!mobile && (
        <span className={`absolute -bottom-1 left-0 w-0 h-0.5 ${underlineColors[highlight]} 
          group-hover:w-full transition-all duration-300 
          after:absolute after:bottom-0 after:right-0 after:w-2 after:h-2 after:bg-amber-500/0 after:rounded-full 
          after:transform after:translate-x-full after:-translate-y-1/2 
          after:group-hover:bg-amber-500 after:transition-all after:duration-300`} 
        />
      )}
    </Link>
  );
}