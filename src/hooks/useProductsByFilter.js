// src/hooks/useProductsByFilter.js

import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:4000/api/products'; 

// ⭐️ Este hook permite buscar por cualquier campo (keyword, category, isFeatured, etc.)
export const useProductsByFilter = (filterKey, filterValue) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                let url = API_URL;

                // Construye la URL de filtro
                if (filterKey && filterValue) {
                    url = `${API_URL}?${filterKey}=${filterValue}`;
                }
                
                const response = await axios.get(url);
                setProducts(response.data);
                
            } catch (err) {
                console.error(`Error fetching products with filter ${filterKey}:`, err);
                setError('Error al cargar los productos filtrados.');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [filterKey, filterValue]); // Se ejecuta cuando el filtro cambia

    return { products, loading, error };
};