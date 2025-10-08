// src/components/ProductCard.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/useCart';

function ProductCard({ product }) {
    const { addItem } = useCart();
    
    // Calcula el precio con el 30% de descuento (para pago en efectivo/transferencia)
    const discountPrice = product.price * 0.70;

    // Formateo de precios
    const formatPrice = (price) => {
        return new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS',
            minimumFractionDigits: 2,
        }).format(price);
    };

    return (
        <div className="bg-white rounded-xl overflow-hidden shadow-lg border-t-4 border-pmate-accent/70 hover:shadow-2xl hover:scale-[1.01] transition-all duration-300 transform">
            
            {/* Imagen y Link a Detalles */}
            <Link to={`/products/${product._id}`}>
                <div className="h-48 overflow-hidden">
                    <img 
                        src={product.images[0] || 'https://via.placeholder.com/400x300?text=Pmate'} 
                        alt={product.name} 
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                </div>
            </Link>

            {/* Contenido de la Tarjeta */}
            <div className="p-4 flex flex-col justify-between h-[calc(100%-12rem)]">
                
                {/* Título y Categoría */}
                <div className="flex-grow">
                    <p className="text-xs font-semibold text-pmate-accent uppercase mb-1">
                        {product.category}
                    </p>
                    <Link to={`/products/${product._id}`}>
                        <h3 className="text-lg font-bold text-gray-800 hover:text-pmate-primary transition leading-tight">
                            {product.name}
                        </h3>
                    </Link>
                </div>

                {/* Precios y Descuento */}
                <div className="mt-3">
                    <p className="text-sm text-gray-500 line-through">
                        Precio Regular: {formatPrice(product.price)}
                    </p>
                    <p className="text-xl font-extrabold text-pmate-primary">
                        {formatPrice(discountPrice)}
                    </p>
                    <p className="text-xs font-semibold text-pmate-accent bg-red-100 p-1 rounded inline-block mt-1">
                        ¡30% OFF EFEC/TRANSF!
                    </p>
                </div>

                {/* Botón de Carrito */}
                <button
                    onClick={() => addItem(product, 1)}
                    className="mt-4 w-full py-2 bg-pmate-primary text-white font-bold rounded-lg hover:bg-pmate-secondary transition-colors duration-300 shadow-md"
                >
                    Añadir al Carrito
                </button>
            </div>
        </div>
    );
}

export default ProductCard;