import React from 'react';

export function HistoryHero() {
  return (
    <div className="relative py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="max-w-3xl">
          <h1 className="text-5xl font-medieval text-amber-500 mb-6">
            Our Period
          </h1>
          <img 
            src="https://lh3.googleusercontent.com/pw/AP1GczMFeBAeHcXfeKSxwufKpUXRi1HCePIF69jzNaNaS2cWSlne-bX5NG-ZBDdd4px-_9-DSn3h9epzQKS0xJHy17WuR3ggBsPox_6B6PN1ZuKWcO2jEJeFV28XKEeurwbQ7YNs1gGxoxoXBlR7_3QgfcM5=w1771-h124-s-no-gm"
            alt="Decorative Divider"
            className="w-[40%] mb-6"
          />
          <p className="text-xl text-gray-200">
            Journey with us through the fascinating period of English history from the Norman Conquest 
            in 1066 to the Second Barons' War in 1266. This transformative era saw the blending of 
            Anglo-Saxon and Norman cultures, shaping medieval England's social, military, and cultural landscape.
          </p>
        </div>
      </div>
    </div>
  );
}