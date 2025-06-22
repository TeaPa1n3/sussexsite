import React from 'react';

export function CombatHero() {
  return (
    <div className="relative py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="max-w-3xl">
          <h1 className="text-5xl font-medieval text-amber-500 mb-6">
            The Path of War
          </h1>
          <img 
            src="https://lh3.googleusercontent.com/pw/AP1GczMFeBAeHcXfeKSxwufKpUXRi1HCePIF69jzNaNaS2cWSlne-bX5NG-ZBDdd4px-_9-DSn3h9epzQKS0xJHy17WuR3ggBsPox_6B6PN1ZuKWcO2jEJeFV28XKEeurwbQ7YNs1gGxoxoXBlR7_3QgfcM5=w1771-h124-s-no-gm"
            alt="Decorative Divider"
            className="w-[40%] mb-6"
          />
          <p className="text-xl text-gray-200">
            You have chosen the path of war. We train regularly in medieval combat so we can best 
            portray an honest example of it at the events we attend. Learn to handle a variety of 
            authentic medieval weapons from arming swords to Dane axes.
          </p>
          <p className="text-xl text-amber-500 mt-6 font-medieval">
            Have you got the courage to step into a Norman Knight's shoes?
          </p>
        </div>
      </div>
    </div>
  );
}