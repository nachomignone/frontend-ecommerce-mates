// src/components/ui/ProductCard.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/useCart'; // Hook para el carrito

function ProductCard({ product }) {
    //  addItem es la función para añadir al carrito
    const { addItem } = useCart();

    const isPromotionActive = product.isPromotion;
    // Definición de la función de formato (usada internamente)
    const formatPrice = (price) => {
        return new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS',
            minimumFractionDigits: 2,
        }).format(price);
    };

    // P1: Precio Base (el más alto)
    const originalPrice = product.originalPrice || product.price; 
    
    // P2: Precio de Venta (el precio que se pagaría con tarjeta o normal)
    const sellingPrice = isPromotionActive ? product.price : originalPrice;
    
    // P3: Precio Final en Efectivo/Transferencia (Calculado sobre el precio de venta P2)
    const cashDiscountPrice = sellingPrice * 0.70;

    // Cálculo de Cuotas (3 cuotas sobre el precio de venta P2)
    const installmentPrice = sellingPrice / 3;

    const handleAddToCart = () => { addItem(product); };

    return (
        <div className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-[1.02] cursor-pointer overflow-hidden border border-gray-100">

            {/* ⭐️ FIX: BANNER SUPERIOR DE PROMOCIÓN ⭐️ */}
            {isPromotionActive && (
                <div className="w-full bg-indigo-100 text-pmate-primary text-center text-sm p-2 font-semibold">
                    {/* Este texto es el ÚNICO que debe mostrar la descripción de la promoción del Admin */}
                    {product.offerDescription || 'OFERTA ESPECIAL ACTIVA'}
                </div>
            )}

            <Link to={`/products/${product._id}`}>
                {/* Imagen */}
                <div className="h-48 w-full overflow-hidden bg-gray-100 flex items-center justify-center">
                    <img
                        src={product.images[0] || 'https://via.placeholder.com/400x300?text=Pmate'}
                        alt={product.name}
                        className="w-full h-full object-cover transition duration-500 group-hover:opacity-80"
                    />
                </div>

                {/* Contenido */}
              <div className="p-4">
                    <h3 className="text-lg font-bold text-pmate-primary mb-3 leading-tight truncate">
                        {product.name}
                    </h3>

                    {/* PRECIO BASE (Solo tachado si hay Promoción Dinámica) */}
                    {isPromotionActive && (
                        <p className="text-sm text-gray-500 line-through mb-1">
                            {formatPrice(originalPrice)}
                        </p>
                    )}

                    {/* ⭐️ PRECIO PRINCIPAL (Precio de Venta/Promoción) ⭐️ */}
                    <p className={`text-2xl font-black mb-1 ${isPromotionActive ? 'text-pmate-primary' : 'text-pmate-accent'}`}>
                        {formatPrice(sellingPrice)}
                    </p>
                    
                    {/* CUOTAS (Calculado sobre el precio de venta P2) */}
                    <p className="text-sm text-gray-600 mb-4">
                        3 cuotas s/interés de {formatPrice(installmentPrice)}
                    </p>
                    
                    {/* PRECIO EN EFECTIVO/TRANSFERENCIA (Bloque de Acento) */}
                    <div className="flex items-center space-x-2">
                        <p className="text-xl font-bold text-pmate-primary">
                            {formatPrice(cashDiscountPrice)}
                        </p>
                        
                        {/* ⭐️ Bloque de Acento (Siempre el texto fijo de 30% OFF) ⭐️ */}
                        <div className="bg-gray-200 text-pmate-primary text-xs font-bold px-3 py-1 rounded border border-gray-300">
                            30% OFF EFEC/TRANSF
                        </div>
                    </div>
                </div>
            </Link>

            {/* FOOTER Y BOTÓN DE ACCIÓN */}
            <div className="p-4 border-t border-gray-100 flex justify-between items-center">
                
                {/* Mensaje Promocional de Grabado */}
                <p className="text-xs text-pmate-secondary max-w-[60%]">
                    Agregando una bombilla a la compra, <b>TE REGALAMOS EL GRABADO!</b>
                </p>
                
                {/* ⭐️ ETIQUETA DE DISPONIBILIDAD (Botón) ⭐️ */}
                <button
                    onClick={handleAddToCart}
                    className={`text-sm font-bold py-2 px-4 rounded-full transition duration-300
                        ${product.stock > 0 
                            ? 'bg-green-100 text-green-700 hover:bg-green-200 border border-green-300' 
                            : 'bg-red-100 text-red-600 border border-red-300 cursor-not-allowed'
                        }`}
                    disabled={product.stock === 0}
                >
                    {product.stock > 0 ? 'Disponible' : 'Agotado'}
                </button>
            </div>
        </div>
    );
}

export default ProductCard;