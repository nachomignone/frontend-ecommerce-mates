import React from 'react';
import ProductCard from './ui/ProductCard'; // ⬅️ Importamos el Card

// El componente recibe el array de 'products' como prop
function ProductList({ products }) {
    // Si no hay productos, mostramos un mensaje (aunque HomePage ya lo maneja)
    if (!products || products.length === 0) {
        return <p>No se encontraron productos.</p>;
    }

    return (
        // Usamos una clase CSS para crear una cuadrícula (Grid)
        <div className="product-list-grid"> 
            {/* ⬅️ Lógica clave: Mapear (recorrer) el array de productos */}
            {products.map((product) => (
                <ProductCard 
                    key={product._id} // Siempre usar la clave única (el ID de MongoDB)
                    product={product} 
                />
            ))}
        </div>
    );
}

export default ProductList;