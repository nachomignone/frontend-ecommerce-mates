import React from 'react';
import { Link } from 'react-router-dom'; 

function ProductCard({ product }) {
  const imageUrl = product.images[0] || 'https://via.placeholder.com/250x250?text=Mate';
  
  // Asumimos un precio de lista (price) y un precio con descuento (simulado)
  const listPrice = product.price;
  const discountedPrice = listPrice * 0.70; // Simula 30% OFF EFEC/TRANSF

  const formattedListPrice = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
  }).format(listPrice);
  
  const formattedDiscountedPrice = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
  }).format(discountedPrice);

  return (
    // CONTENEDOR PRINCIPAL: Borde sutil, fondo crema (pmate-background)
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
        {/* Etiqueta de Descuento (Simulada, como en el catálogo) */}
        <span className="absolute top-2 right-2 bg-pmate-primary text-white 
                       text-xs font-bold px-2 py-1 rounded-full">
          30% OFF
        </span>
      </div>
      
      {/* CUERPO DE LA TARJETA */}
      <div className="p-4 flex flex-col flex-grow">
        
        {/* Código de Producto (Opcional, si lo tienes en el modelo) */}
        <p className="text-xs text-gray-500 mb-1">CÓDIGO: {product.sku || 'MAT001'}</p>

        {/* NOMBRE - Color Primario de la marca */}
        <h3 className="text-lg font-semibold text-pmate-primary mb-3 truncate">
          {product.name}
        </h3>
        
        {/* BLOQUE DE PRECIOS - El elemento clave del diseño */}
        <div className="bg-pmate-background p-3 rounded-lg border border-pmate-secondary/30 mt-auto">
            {/* Precio de Lista Tachado */}
            <p className="text-gray-500 text-sm line-through">
                {formattedListPrice}
            </p>
            
            {/* 3 Cuotas sin interés (Simulado) */}
            <p className="text-sm font-medium text-gray-700 mb-1">
                3 cuotas s/interés de {new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(listPrice / 3)}
            </p>

            {/* Precio Final - EL MÁS GRANDE */}
            <p className="text-xl font-extrabold text-pmate-primary">
                30% OFF EFEC/TRANSF
            </p>
            <p className="text-2xl font-extrabold text-pmate-primary">
                {formattedDiscountedPrice}
            </p>
        </div>

        {/* Mensaje Promocional */}
        <p className="text-xs text-gray-600 mt-2 text-center">
             Agregando a la compra de tu mate una bombilla, TE REGALAMOS EL GRABADO!
        </p>
        
      </div>

      {/* FOOTER DE LA CARD (Botón visible) */}
      <div className="p-4 pt-0">
        <button 
          className="w-full py-2 text-white font-semibold rounded-lg 
            transition duration-200 
            bg-pmate-secondary hover:bg-pmate-primary 
            disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={product.stock === 0}
        >
          {product.stock > 0 ? 'Agregar al Carrito' : 'Agotado'}
        </button>
      </div>

      {/* BOTONES Y ACCIONES */}
        <div className="p-4 pt-0">
            {/* ... (Botón de carrito) */}

            {/* Enlace de Detalles (usando Link de React Router) */}
            <Link 
              to={`/products/${product._id}`} // Usamos 'to' en lugar de 'href'
              className="block text-center text-sm text-pmate-accent hover:underline"
            >
              Ver detalles
            </Link>
        </div>
    </div>
  );
}

export default ProductCard;