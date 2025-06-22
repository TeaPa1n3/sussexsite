import React from 'react';

export function MembersHero() {
  return (
    <div className="relative py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="max-w-3xl">
          <h1 className="text-5xl font-medieval text-amber-500 mb-6">
            Members Area
          </h1>
          <img 
            src="https://lh3.googleusercontent.com/pw/AP1GczMFeBAeHcXfeKSxwufKpUXRi1HCePIF69jzNaNaS2cWSlne-bX5NG-ZBDdd4px-_9-DSn3h9epzQKS0xJHy17WuR3ggBsPox_6B6PN1ZuKWcO2jEJeFV28XKEeurwbQ7YNs1gGxoxoXBlR7_3QgfcM5=w1771-h124-s-no-gm"
            alt="Decorative Divider"
            className="w-[40%] mb-6"
          />
          <p className="text-xl text-gray-200">
            Welcome to the exclusive members section. Here you'll find important documents, 
            upcoming events, and regional officer information for all our divisions.
          </p>
        </div>
      </div>
    </div>
  );
}