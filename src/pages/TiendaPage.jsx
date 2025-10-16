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
    const [allProducts, setAllProducts] = useState([]); // Todos los productos del servidor
    const [filteredProducts, setFilteredProducts] = useState([]); // Productos después de filtrar
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const { settings } = usePromotions();
    
    // Estado de filtros
    const [filters, setFilters] = useState({
        categories: [],
        types: [],
        materials: []
    });

    // Cargar TODOS los productos desde el servidor (sin filtros de URL)
    useEffect(() => {
        setLoading(true);
        
        // ⭐️ SIEMPRE cargamos todos los productos, sin importar la URL
        axios.get(API_URL)
            .then(response => {
                setAllProducts(response.data);
                setFilteredProducts(response.data);
                
                // Si viene de una categoría específica en la URL, pre-seleccionar el filtro
                const params = new URLSearchParams(location.search);
                const categoryParam = params.get('category');
                if (categoryParam) {
                    setFilters(prev => ({
                        ...prev,
                        categories: [categoryParam]
                    }));
                }
            })
            .catch(error => {
                console.error("Error al cargar productos:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []); // ⭐️ Solo se ejecuta una vez al montar el componente 

    // Aplicar filtros cuando cambien
    useEffect(() => {
        let result = [...allProducts];

        // Filtrar por categorías (SI hay categorías seleccionadas)
        if (filters.categories.length > 0) {
            result = result.filter(product => 
                filters.categories.some(cat => 
                    product.category.toLowerCase() === cat.toLowerCase()
                )
            );
        }

        // ⭐️ Solo aplicar filtros secundarios si hay Mates o Combos seleccionados
        const hasMateSOrCombos = filters.categories.some(cat => 
            cat.toLowerCase() === 'mates' || cat.toLowerCase() === 'combos'
        );

        if (hasMateSOrCombos) {
            // Filtrar por tipo de mate (busca en el nombre del producto)
            if (filters.types.length > 0) {
                result = result.filter(product =>
                    filters.types.some(type =>
                        product.name.toLowerCase().includes(type.toLowerCase())
                    )
                );
            }

            // Filtrar por material/acabado
            if (filters.materials.length > 0) {
                result = result.filter(product =>
                    filters.materials.some(material =>
                        product.name.toLowerCase().includes(material.toLowerCase())
                    )
                );
            }
        }

        setFilteredProducts(result);
    }, [filters, allProducts]);

    // Handler para cambiar filtros con lógica inteligente
    const handleFilterChange = (newFilters) => {
        // ⭐️ Limpiar filtros secundarios si no hay Mates ni Combos seleccionados
        const hasMateSOrCombos = newFilters.categories.some(cat => 
            cat.toLowerCase() === 'mates' || cat.toLowerCase() === 'combos'
        );

        if (!hasMateSOrCombos) {
            // Si deseleccionamos Mates y Combos, limpiamos tipos y materiales
            setFilters({
                ...newFilters,
                types: [],
                materials: []
            });
        } else {
            setFilters(newFilters);
        }
    };

    // Título simplificado
    const pageTitle = 'Catálogo de Productos';

    return (
        <div className="min-h-screen bg-gray-50">
            {settings.isActive && <PromotionBanner />}
            <div className="max-w-7xl mx-auto py-12 px-4">
                <h1 className="text-4xl font-extrabold text-pmate-primary mb-8 text-center">
                    {pageTitle}
                </h1>

                {loading && (
                    <p className="text-center text-xl text-gray-500">Cargando productos...</p>
                )}

                {!loading && allProducts.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-2xl font-semibold text-red-500">
                            ¡Lo sentimos! No hay productos en esta sección.
                        </p>
                        <Link to="/tienda" className="text-pmate-accent hover:underline mt-4 inline-block">
                             Ver Catálogo Completo
                        </Link>
                    </div>
                )}

                {!loading && allProducts.length > 0 && (
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Sidebar de Filtros */}
                        <div className="lg:col-span-1">
                            <FilterSidebar 
                                filters={filters}
                                onFilterChange={handleFilterChange}
                                productCount={filteredProducts.length}
                            />
                        </div>

                        {/* Lista de Productos */}
                        <div className="lg:col-span-3">
                            {filteredProducts.length === 0 ? (
                                <div className="text-center py-20">
                                    <p className="text-xl text-gray-500">
                                        No se encontraron productos con los filtros seleccionados.
                                    </p>
                                    <button
                                        onClick={() => setFilters({ categories: [], types: [], materials: [] })}
                                        className="mt-4 px-6 py-2 bg-pmate-primary text-white rounded-lg hover:bg-pmate-accent transition"
                                    >
                                        Limpiar Filtros
                                    </button>
                                </div>
                            ) : (
                                <ProductList products={filteredProducts} />
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TiendaPage;