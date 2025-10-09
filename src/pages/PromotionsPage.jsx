// src/pages/PromotionsPage.jsx
import React from 'react';
import ProductList from '../components/ProductList'; 
import { useProductsByFilter } from '../hooks/useProductsByFilter'; // ⬅️ Crearemos este Hook

const PromotionsPage = () => {
    // 💡 Usarías un hook similar a HomePage para cargar los productos promocionales.
    // Para simplificar, asumiremos que los productos destacados (isFeatured: true) son promociones.
    const { products, loading, error } = useProductsByFilter('isFeatured', true);

    // Renderizado condicional...
    if (loading) return <div className="p-10 text-center">Cargando promociones...</div>;
    if (error) return <div className="p-10 text-center text-red-600">Error al cargar promociones.</div>;

    return (
        <div className="max-w-7xl mx-auto p-8">
            <h1 className="text-4xl font-extrabold text-red-600 mb-8">🔥 Promociones y Ofertas</h1>
            <p className="text-lg text-gray-600 mb-6">Aprovecha nuestros descuentos exclusivos en sets y mates seleccionados.</p>
            
            {products.length === 0 ? (
                 <p className="text-xl text-gray-700 text-center py-10 bg-pmate-background rounded-lg">No hay ofertas activas en este momento.</p>
            ) : (
                <ProductList products={products} />
            )}
        </div>
    );
};

export default PromotionsPage;