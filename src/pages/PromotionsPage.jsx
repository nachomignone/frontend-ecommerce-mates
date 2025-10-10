// src/pages/PromotionsPage.jsx

// ⭐️ IMPORTAR useMemo ⭐️
import React, { useMemo } from 'react'; 
import ProductList from '../components/ProductList'; 
import { useProductsByFilter } from '../hooks/useProductsByFilter'; 
import { usePromotions } from '../context/usePromotions';

const PromotionsPage = () => {
    const { settings } = usePromotions();
    
    // ⭐️ FIX: Memoizar el objeto vacío para que sea estable ⭐️
    // Esto asegura que la referencia del objeto de filtros sea la misma en cada renderizado.
    const stableFilters = useMemo(() => ({}), []);
    
    // Traemos TODOS los productos (el Backend inyecta el flag isPromotion: true/false)
    const { products, loading, error } = useProductsByFilter(stableFilters); // ⬅️ Usamos el objeto estable
    
    // ⭐️ FILTRADO CLAVE: Solo mostrar productos donde la bandera fue inyectada por el Backend ⭐️
    const promotionalProducts = products.filter(p => p.isPromotion === true);
    
    const eventName = settings.currentName || 'Ofertas';

    //  Nuevo: Comprobación de estado activo 
    const isPromoActive = settings.isActive;

    if (loading) return <div className="p-10 text-center">Cargando ofertas...</div>;
    if (error) return <div className="p-10 text-center text-red-600">Error al cargar ofertas.</div>;
    
    return (
        <div className="max-w-7xl mx-auto p-8">
            {/* ⭐️ FIX 1: Título Condicional ⭐️ */}
            <h1 className="text-4xl font-extrabold text-red-600 mb-2">
                {isPromoActive ? eventName.toUpperCase() : 'NO HAY PROMOCIONES ACTIVAS'}
            </h1>
            <p className="text-lg text-gray-600 mb-8">
                {isPromoActive
                    ? `¡Descuentos válidos! ${promotionalProducts.length} productos en oferta.`
                    : 'Visita la tienda para ver nuestro catálogo completo.'}
            </p>
            
            {promotionalProducts.length === 0 ? (
                 // ⭐️ FIX 2: Mostrar mensaje de inactividad si no hay productos filtrados ⭐️
                 <p className="text-xl text-gray-700 text-center py-10 bg-pmate-background rounded-lg">
                    Actualmente no hay promociones disponibles.
                </p>
            ) : (
                <ProductList products={promotionalProducts} />
            )}
        </div>
    );
};

export default PromotionsPage;