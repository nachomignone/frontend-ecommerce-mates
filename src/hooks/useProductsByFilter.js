// src/hooks/useProductsByFilter.js

import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:4000/api/products'; 

// ⭐️ EL HOOK ACEPTA UN OBJETO DE FILTROS ⭐️
export const useProductsByFilter = (filters = {}) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Utilizamos JSON.stringify para que el useEffect se dispare correctamente si cambian los filtros
     const filtersString = useMemo(() => JSON.stringify(filters), [filters]);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                let url = API_URL;
                const params = new URLSearchParams();

                // 1. Construir parámetros de la URL
                for (const key in filters) {
                    if (filters[key]) {
                        params.append(key, filters[key]);
                    }
                }
                
                // 2. Si hay parámetros, añadir la query string
                if (params.toString()) {
                    url = `${API_URL}?${params.toString()}`;
                }
                
                const response = await axios.get(url);
                setProducts(response.data);
                
            } catch (err) {
                console.error(`Error fetching products with filter:`, err);
                setError('Error al cargar los productos filtrados.');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    // ⭐️ El efecto depende de la stringificación de los filtros ⭐️
    }, [filtersString, filters]); 

    return { products, loading, error };
};