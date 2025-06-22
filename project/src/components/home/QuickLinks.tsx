import React from 'react';
import { Link } from 'react-router-dom';
import { CombatIcon, TentIcon } from '../ui/icons/medieval';

export function QuickLinks() {
  return (
    <div className="relative z-20">
      <div className="max-w-7xl mx-auto px-4 pb-32">
        <h2 className="text-4xl font-medieval text-amber-500 mb-12 text-center">
          Which Path Will You Choose?
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <Link 
            to="/combat" 
            className="group relative overflow-hidden rounded-lg border border-amber-500/20 hover:border-amber-500/40 transition-colors"
          >
            <div className="absolute inset-0">
              <img
                src="https://lh3.googleusercontent.com/pw/AP1GczNKKqvbG3qIIBFpXTCBoER3geiyoaE4r6d4fl0_E6fsFUlzR_ONkJBWV_lwb8p_kQLQaI2zIMTnJQ9JxeMd1kMd5q2VasVO4ueX6PSHL_oy5s2uiJmlPbQ4-YQ4hgCAhGg4dZv0h3hqaM8oLDtV6w8j"
                alt="Medieval Combat"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gray-900/60" />
            </div>
            <div className="relative p-8">
              <div className="flex items-center gap-3 mb-4">
                <CombatIcon className="w-12 h-12 text-amber-500" />
                <h3 className="text-2xl font-medieval text-amber-500">Medieval Combat</h3>
              </div>
              <p className="text-gray-200">Master authentic Norman combat techniques and participate in historical battles.</p>
            </div>
          </Link>

          <Link 
            to="/living-history" 
            className="group relative overflow-hidden rounded-lg border border-amber-500/20 hover:border-amber-500/40 transition-colors"
          >
            <div className="absolute inset-0">
              <img
                src="https://lh3.googleusercontent.com/pw/AP1GczNqk3epken7hgsUQZEh5M61fh_3vj8S7q-ylE4kiby0dQgiWpLabjKwud92O6Ot6WK4d78esJPdo7d74ifwQlwP30CGCx_4BbrwLNLXWs5DgNeVOMotaDOs9oa3ueTDyYKHiWr51HUD80tiJMpoNNwC"
                alt="Living History"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gray-900/60" />
            </div>
            <div className="relative p-8">
              <div className="flex items-center gap-3 mb-4">
                <TentIcon className="w-12 h-12 text-amber-500" />
                <h3 className="text-2xl font-medieval text-amber-500">Living History</h3>
              </div>
              <p className="text-gray-200">Experience medieval life through authentic crafts, cooking, and historical demonstrations.</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}