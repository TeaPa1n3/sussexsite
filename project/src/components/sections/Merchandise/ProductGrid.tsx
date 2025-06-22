import React from 'react';
import { ParchmentBox } from '../../ui/ParchmentBox';
import { products } from './data';
import { SectionContainer } from '../../ui/SectionContainer';

export function ProductGrid() {
  return (
    <SectionContainer>
      <h2 className="text-4xl font-medieval text-amber-500 mb-8 text-center">
        Arms Through the Ages Series
      </h2>
      <img 
        src="https://lh3.googleusercontent.com/pw/AP1GczMFeBAeHcXfeKSxwufKpUXRi1HCePIF69jzNaNaS2cWSlne-bX5NG-ZBDdd4px-_9-DSn3h9epzQKS0xJHy17WuR3ggBsPox_6B6PN1ZuKWcO2jEJeFV28XKEeurwbQ7YNs1gGxoxoXBlR7_3QgfcM5=w1771-h124-s-no-gm"
        alt="Decorative Divider"
        className="w-[40%] mx-auto mb-12"
      />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <ParchmentBox key={product.id}>
            <div className="space-y-4">
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-medieval text-amber-500">{product.name}</h3>
                <p className="mt-2 text-gray-400">{product.description}</p>
                <div className="mt-4 flex justify-end">
                  <a
                    href={product.orderUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-amber-500/10 text-amber-500 
                      rounded-full hover:bg-amber-500/20 transition-colors"
                  >
                    Order Now
                  </a>
                </div>
              </div>
            </div>
          </ParchmentBox>
        ))}
      </div>
    </SectionContainer>
  );
}