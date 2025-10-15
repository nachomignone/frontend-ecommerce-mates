// src/components/ui/CategoryCard.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const CategoryCard = ({ name, imageUrl }) => {
    // ⭐️ FIX: La URL redirige a /catalogo con el filtro de categoría (Query Param)
    const linkTo = `/tienda`;

    return (
        <Link 
            to={linkTo} // Usa /tienda?category=Mates
            className="block h-32 md:h-48 bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-2xl transition duration-300 transform hover:-translate-y-1 relative" 
        >
            {/* Imagen de Fondo Estética */}
            <img
                src={imageUrl}
                alt={`Categoría: ${name}`}
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition duration-500 group-hover:scale-105"
            />
            
            {/* Overlay para el Texto de Categoría */}
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <h3 className="text-lg md:text-xl font-bold text-white uppercase tracking-wider p-2 text-center">
                    {name}
                </h3>
            </div>
        </Link>
    );
};

export default CategoryCard;