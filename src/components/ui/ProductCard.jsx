// src/components/ui/ProductCard.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/useCart';

function ProductCard({ product }) {
    const { addItem } = useCart();
    
    // ⭐️ LÓGICA DE PRECIOS CLARA ⭐️
    const isPromotionActive = product.isPromotion;
    const originalPrice = product.originalPrice || product.price; 
    const sellingPrice = isPromotionActive ? product.price : originalPrice;
    const cashDiscountPrice = sellingPrice * 0.70;
    const installmentPrice = sellingPrice / 3;
    
    const formatPrice = (price) => {
        return new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS',
            minimumFractionDigits: 0, // Quitamos los centavos para la estética del wireframe
        }).format(price);
    };
    const handleAddToCart = () => { addItem(product); };
    const imageUrl = product.images[0] || 'https://via.placeholder.com/400x300?text=Pmate';

    // ⭐️ Títulos y colores dinámicos del wireframe ⭐️
    const promoColor = isPromotionActive ? 'bg-indigo-100 text-pmate-primary' : 'hidden'; // Color del banner

    return (
        // CONTENEDOR PRINCIPAL: Añadimos relative para posicionar elementos internos
        <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden flex flex-col h-full relative border border-gray-100">
            
            {/* ⭐️ 1. BANNER DE PROMOCIÓN SUPERIOR ⭐️ */}
            {isPromotionActive && (
                <div className={`w-full ${promoColor} text-center text-sm py-2 font-bold`}>
                    {/* El banner anuncia la promoción del evento */}
                    {product.offerDescription || 'OFERTA ESPECIAL ACTIVA'}
                </div>
            )}
            
            <Link to={`/products/${product._id}`} className="block flex-grow">
                {/* IMAGEN */}
                <div className="h-56 w-full overflow-hidden flex items-center justify-center p-4 bg-gray-100">
                    <img
                        src={imageUrl}
                        alt={product.name}
                        className="w-full h-full object-contain transition duration-300"
                    />
                </div>
                
                {/* CONTENIDO SUPERIOR */}
                <div className="p-4 pt-2">
                    <h3 className="text-sm font-semibold text-gray-800 hover:text-pmate-accent leading-tight mb-2 truncate">
                        {product.name}
                    </h3>

                    {/* ⭐️ 2. PRECIOS - ESTRUCTURA DE WIREFRAME ⭐️ */}
                    <div className="flex flex-col space-y-1">
                        
                        {/* P1: PRECIO BASE / PRECIO DE VENTA (Pequeño, tachado o normal) */}
                        <p className={`text-2xl font-bold ${isPromotionActive ? 'text-gray-500 line-through' : 'text-pmate-primary'}`}>
                            {formatPrice(originalPrice)}
                        </p>
                        
                        {/* P2: PRECIO DE VENTA/PROMOCIÓN (Grande y Color, solo si hay promoción) */}
                        {isPromotionActive && (
                             <p className="text-2xl font-bold text-pmate-accent mb-1">
                                {formatPrice(sellingPrice)}
                            </p>
                        )}
                        
                        {/* CUOTAS */}
                        <p className="text-xs text-gray-600 mb-1">
                            3 cuotas s/interés de {formatPrice(installmentPrice)}
                        </p>
                        
                        {/* P3: PRECIO EFECTIVO (Grande) y ETIQUETA DE DESCUENTO */}
                        <div className="flex items-center space-x-2 pt-2">
                            <p className="text-xl font-semibold text-gray-700">
                                {formatPrice(cashDiscountPrice)}
                            </p>
                            
                            {/* ETIQUETA 30% OFF */}
                            <div className="bg-gray-200 text-gray-600 text-xs font-semibold px-3 py-1 rounded border border-gray-300">
                                30% OFF EFEC/TRANS
                            </div>
                        </div>
                    </div>
                </div>
            </Link>

            {/* ⭐️ 3. FOOTER ABSOLUTO Y BOTONES ⭐️ */}
            <div className="p-4 pt-4 border-t border-gray-100 flex justify-between items-end space-x-3">
                
                {/* 1. Texto de promoción de grabado (Solo aparece si es Mate) */}
                {product.category === 'Mates' ? (
                    <p className="text-xs text-pmate-secondary max-w-[55%] font-semibold leading-snug">
                        Agregando la compra de tu Mate una Bombilla TE REGALAMOS EL GRABADO!
                    </p>
                ) : (
                    // Si NO es mate, usamos un div vacío para mantener el espaciado
                    <div className="max-w-[55%]"></div> 
                )}
                
                {/* 2. CONTENEDOR DE BOTONES (Ocupa el 45%) */}
                <div className="flex flex-col items-end space-y-1.5 min-w-[45%] ml-auto">
                    
                    {/* Botón de Añadir Carrito (Principal) */}
                    <button
                        onClick={handleAddToCart}
                        className="w-full bg-pmate-primary text-white font-semibold py-2 px-3 rounded-lg hover:bg-pmate-accent transition duration-300 text-sm disabled:bg-gray-400 disabled:cursor-not-allowed"
                        disabled={product.stock === 0}
                    >
                        Agregar al Carrito
                    </button>
                    
                    {/* Etiqueta de Stock (Secundaria) */}
                    {/* <p 
                        className={`text-xs font-bold px-2 py-1 rounded w-full text-center 
                            ${product.stock > 0 ? 'bg-green-500/20 text-green-800' : 'bg-red-500/20 text-red-800'}`}
                    >
                        {product.stock > 0 ? 'DISPONIBLE' : 'AGOTADO'}
                    </p> */}
                </div>
            </div>
        </div>
    );
}

export default ProductCard;