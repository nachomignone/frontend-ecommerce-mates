import React from 'react';

// El componente recibe el objeto 'product' completo como prop
function ProductCard({ product }) {
  // Manejamos un caso simple si la imagen no existe
  const imageUrl = product.imageUrl || 'https://via.placeholder.com/250x250?text=Mate';
  
  // Formateamos el precio a USD o ARS (asumiendo formato local)
  const formattedPrice = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
  }).format(product.price);

  return (
    <div className="product-card">
      {/* Imagen del producto (placeholder si no hay URL) */}
      <img src={imageUrl} alt={product.name} className="product-image" />
      
      <div className="card-body">
        {/* Nombre del producto */}
        <h3 className="product-name">{product.name}</h3>
        
        {/* Precio */}
        <p className="product-price">{formattedPrice}</p>
        
        {/* Disponibilidad */}
        <span className={`product-stock ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
          {product.stock > 0 ? 'En Stock' : 'Sin Stock'}
        </span>
      </div>
      
      <button 
        className="btn-add-to-cart" 
        disabled={product.stock === 0}
        // Este botón después tendrá la lógica de carrito
      >
        {product.stock > 0 ? 'Agregar al Carrito' : 'Agotado'}
      </button>

      {/* 💡 En el futuro, lo convertiremos en un enlace para ir al detalle */}
      <a href={`/products/${product._id}`} className="view-details-link">
        Ver detalles
      </a>
    </div>
  );
}

export default ProductCard;