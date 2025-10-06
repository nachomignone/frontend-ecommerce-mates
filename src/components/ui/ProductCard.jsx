// src/components/ui/ProductCard.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/useCart'; // Importamos useCart

function ProductCard({ product }) {
    const { addItem } = useCart(); 

    const imageUrl = product.images[0] || 'https://via.placeholder.com/250x250?text=Mate';
    const listPrice = product.price;
    const discountedPrice = listPrice * 0.70; 

    const handleAddToCart = () => {
        addItem(product);
    };

    const formattedListPrice = new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
    }).format(listPrice);
    
    const formattedDiscountedPrice = new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
    }).format(discountedPrice);

    return (
        // ⭐️ ESTE ES EL ÚNICO ELEMENTO PADRE RETORNADO ⭐️
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden 
                        transition duration-300 hover:shadow-lg hover:border-pmate-accent 
                        flex flex-col">
            
            {/* SECCIÓN IMAGEN */}
            <div className="relative">
                <img 
                    src={imageUrl} 
                    alt={product.name} 
                    className="w-full h-48 object-cover" 
                />
                <span className="absolute top-2 right-2 bg-pmate-primary text-white 
                               text-xs font-bold px-2 py-1 rounded-full">
                    30% OFF
                </span>
            </div>
            
            {/* CUERPO DE LA TARJETA */}
            <div className="p-4 flex flex-col flex-grow">
                
                <p className="text-xs text-gray-500 mb-1">CÓDIGO: {product.sku || 'MAT001'}</p>

                <h3 className="text-lg font-semibold text-pmate-primary mb-3 truncate">
                    {product.name}
                </h3>
                
                {/* BLOQUE DE PRECIOS */}
                <div className="bg-pmate-background p-3 rounded-lg border border-pmate-secondary/30 mt-auto">
                    <p className="text-gray-500 text-sm line-through">
                        {formattedListPrice}
                    </p>
                    <p className="text-sm font-medium text-gray-700 mb-1">
                        3 cuotas s/interés de {new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(listPrice / 3)}
                    </p>
                    <p className="text-xl font-extrabold text-pmate-primary">
                        30% OFF EFEC/TRANSF
                    </p>
                    <p className="text-2xl font-extrabold text-pmate-primary">
                        {formattedDiscountedPrice}
                    </p>
                </div>

                <p className="text-xs text-gray-600 mt-2 text-center">
                    Agregando a la compra de tu mate una bombilla, TE REGALAMOS EL GRABADO!
                </p>
                
            </div>

            {/* ⭐️ CONSOLIDA LA SECCIÓN DE BOTONES EN UN SOLO DIV ⭐️ */}
            <div className="p-4 pt-0">
                <button 
                    className="w-full py-2 mb-2 text-white font-semibold rounded-lg 
                            transition duration-200 
                            bg-pmate-secondary hover:bg-pmate-primary 
                            disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={product.stock === 0}
                    onClick={handleAddToCart} // Aquí está la función
                >
                    {product.stock > 0 ? 'Agregar al Carrito' : 'Agotado'}
                </button>

                <Link 
                    to={`/products/${product._id}`} 
                    className="block text-center text-sm text-pmate-accent hover:underline"
                >
                    Ver detalles
                </Link>
            </div>
        </div>
    );
}

export default ProductCard;