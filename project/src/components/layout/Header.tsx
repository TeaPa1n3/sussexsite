import React, { useState } from 'react';
import { Menu, X, LogOut } from 'lucide-react';
import { NavLink } from './NavLink';
import { BattleWornBanner } from '../ui/BattleWornBanner';
import { useAuth } from '../auth/AuthProvider';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { session, signOut } = useAuth();

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

  const handleSignOut = async () => {
    await signOut();
    // Close mobile menu if open
    setIsOpen(false);
  };

  return (
    <BattleWornBanner variant="header">
      <div className="max-w-[90rem] mx-auto px-4">
        <div className="flex justify-between h-auto md:h-40 py-4 md:py-0">
          <div className="flex items-center space-x-3 md:space-x-6">
            <img 
              src="https://lh3.googleusercontent.com/pw/AP1GczMDjUl0-Z-fWqh7GFCGMaBhq_jaxFj8DwCpFJDqv4e6S2w8ONPm21uROHv4-qYBOdJDlA30IaHzSikipo4jvC-Vpr_P-7G0Wn3yOuhGW4d39-647PpNnjamtPxkZ8km_cAtSYSgDtYWCd6dtc3i4dk3"
              alt="Sussex Medieval Society Logo"
              className="h-16 md:h-32 w-16 md:w-32 object-contain"
            />
            <div>
              <h1 className="text-xl md:text-4xl font-medieval text-amber-500">Sussex Medieval Society</h1>
              <p className="text-xs md:text-lg text-gray-400">Reenactment and Living History Society</p>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <nav className="flex items-center space-x-6 lg:space-x-8">
              {links.map((link) => (
                <NavLink 
                  key={link.href} 
                  href={link.href}
                  highlight={link.highlight}
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>
            
            {/* Sign Out Button - Desktop */}
            {session && (
              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-500 
                  rounded-full hover:bg-red-500/20 transition-colors font-medieval"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden lg:inline">Sign Out</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            {/* Sign Out Button - Mobile */}
            {session && (
              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 px-3 py-2 bg-red-500/10 text-red-500 
                  rounded-full hover:bg-red-500/20 transition-colors"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center text-amber-500"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t border-amber-500/10 bg-gray-900/90 backdrop-blur-sm">
          <nav className="px-4 py-4 space-y-2">
            {links.map((link) => (
              <NavLink 
                key={link.href} 
                href={link.href} 
                mobile
                highlight={link.highlight}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
            
            {/* Sign Out Button - Mobile Menu */}
            {session && (
              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 w-full px-3 py-2 text-red-500 
                  hover:bg-red-500/10 rounded-md transition-colors font-medieval"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            )}
          </nav>
        </div>
      )}
    </BattleWornBanner>
  );
}