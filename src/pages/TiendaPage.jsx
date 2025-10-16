// src/pages/TiendaPage.jsx

import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import ProductList from '../components/ProductList';
import FilterSidebar from '../components/ui/FilterSidebar';
import PromotionBanner from '../components/ui/PromotionBanner';
import { usePromotions } from '../context/usePromotions';

const API_URL = 'http://localhost:4000/api/products'; 

const TiendaPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const { settings } = usePromotions();
    
    useEffect(() => {
        setLoading(true);

        const allParams = location.search;
        let url = API_URL;

        if (allParams) {
            url = `${API_URL}${allParams}`;
        }
        
        axios.get(url)
            .then(response => {
                setProducts(response.data); 
            })
            .catch(error => {
                console.error("Error al cargar productos:", error);
            })
            .finally(() => {
                setLoading(false);
            });
            
    }, [location.search]); 

    // Función para obtener el valor del query param 'category'
    const getCategoryFromUrl = () => {
        const params = new URLSearchParams(location.search);
        return params.get('category');
    };

    // Mejorar el título de la página
    const currentCategory = getCategoryFromUrl();
    const pageTitle = currentCategory 
        ? `Categoría: ${currentCategory}`
        : 'Catálogo Completo de Productos';

    return (
        <div className="min-h-screen">
            {settings.isActive && <PromotionBanner />}
            <div className="max-w-7xl mx-auto py-12 px-4">
                <h1 className="text-4xl font-extrabold text-pmate-primary mb-8 text-center">
                    {pageTitle} ({products.length})
                </h1>

                {loading && (
                    <p className="text-center text-xl text-gray-500">Cargando productos...</p>
                )}

                {!loading && products.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-2xl font-semibold text-red-500">
                            ¡Lo sentimos! No hay productos en esta sección.
                        </p>
                        <Link to="/tienda" className="text-pmate-accent hover:underline mt-4 inline-block">
                             Ver Catálogo Completo
                        </Link>
                    </div>
                )}

                {!loading && products.length > 0 && (
                    <ProductList products={products} />
                )}
            </div>
        </div>
    );
};

export default TiendaPage;