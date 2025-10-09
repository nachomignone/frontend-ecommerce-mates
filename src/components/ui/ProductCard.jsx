// src/components/ui/ProductCard.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/useCart'; // Hook para el carrito

function ProductCard({ product }) {
    // ⭐️ CORRECCIÓN 1: Renombramos a addItem, que es la función real del contexto
    const { addItem } = useCart(); 

    // ⭐️ CORRECCIÓN 2: Definición de la función de formato (usada internamente)
    const formatPrice = (price) => {
        return new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS',
            minimumFractionDigits: 2,
        }).format(price);
    };
    
    // ⭐️ CORRECCIÓN 3: La variable discountPrice debe usarse.
    const discountPrice = product.price * 0.70; 

    // ⭐️ CORRECCIÓN 4: Manjeador del clic, usa addItem (la función real)
    const handleAddToCart = () => {
        // Asumiendo que addItem maneja la cantidad por defecto como 1
        addItem(product);
    };

    return (
        <div className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-[1.02] cursor-pointer overflow-hidden border border-gray-100">
            
            <Link to={`/products/${product._id}`}> 
                {/* Imagen */}
                <div className="h-48 w-full overflow-hidden bg-gray-200">
                    <img
                        src={product.images[0] || 'https://via.placeholder.com/400x300?text=Pmate'}
                        alt={product.name}
                        className="w-full h-full object-cover transition duration-500 group-hover:opacity-80"
                    />
                </div>

                {/* Contenido */}
                <div className="p-4 flex flex-col justify-between h-[calc(100%-12rem)]">
                    <div className="flex-grow">
                        <p className="text-xs font-semibold text-pmate-accent uppercase mb-1">
                            {product.category}
                        </p>
                        <h3 className="text-lg font-bold text-gray-800 hover:text-pmate-primary transition leading-tight">
                            {product.name}
                        </h3>
                    </div>

                    {/* Precios y Descuento */}
                    <div className="mt-3">
                        <p className="text-sm text-gray-500 line-through">
                            Precio Regular: {formatPrice(product.price)}
                        </p>
                        <p className="text-xl font-extrabold text-pmate-primary-600">
                            {/* ⭐️ USAMOS LA VARIABLE discountPrice AQUI ⭐️ */}
                            {formatPrice(discountPrice)}
                        </p>
                        <p className="text-xs font-semibold text-pmate-accent-600 bg-green-100 p-1 rounded inline-block mt-1">
                            ¡30% OFF EFEC/TRANSF!
                        </p>
                    </div>
                </div>
            </Link>

            {/* Botón de Añadir Carrito (fuera del Link) */}
            <div className="p-4 border-t">
                <button
                    // ⭐️ USAMOS EL MANEJADOR handleAddToCart CONECTADO A addItem ⭐️
                    onClick={handleAddToCart}
                    className="w-full bg-pmate-primary text-white py-2 rounded-lg font-bold hover:bg-pmate-secondary transition duration-300 text-sm"
                >
                    Añadir al Carrito
                </button>
            </div>
        </div>
    );
}

export default ProductCard;