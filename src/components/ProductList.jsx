import React from 'react';
import ProductCard from './ui/ProductCard'; // ⬅️ Importamos el Card

// El componente recibe el array de 'products' como prop
function ProductList({ products }) {
    // Si no hay productos, mostramos un mensaje (aunque HomePage ya lo maneja)
    if (!products || products.length === 0) {
        return <p className="text-center text-gray-500 py-10">No se encontraron productos.</p>;
    }

    return (
        // Fondo gris claro para contrastar con las tarjetas blancas/crema
        <div className="bg-gray-50 p-8"> 
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 max-w-7xl mx-auto"> 
                {products.map((product) => (
                    <ProductCard 
                        key={product._id} 
                        product={product} 
                    />
                ))}
            </div>
        </div>
    );
}

export default ProductList;