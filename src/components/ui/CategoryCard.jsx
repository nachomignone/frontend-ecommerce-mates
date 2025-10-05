// src/components/ui/CategoryCard.jsx

import React from 'react';

function CategoryCard({ name, icon, link }) {
  return (
    // Contenedor: Botón/Tarjeta con fondo blanco/crema y sombra sutil
    <a href={link} className="block p-6 text-center 
                             bg-pmate-background rounded-lg shadow-sm 
                             border border-gray-200 transition duration-300 
                             hover:shadow-md hover:border-pmate-accent">
      
      {/* Ícono de Categoría: Grande y centrado */}
      <div className="text-4xl text-pmate-primary mb-3 mx-auto">
        {icon}
      </div>
      
      {/* Nombre de la Categoría: Color primario de la marca */}
      <h4 className="text-md font-semibold text-pmate-primary">
        {name}
      </h4>
    </a>
  );
}

export default CategoryCard;