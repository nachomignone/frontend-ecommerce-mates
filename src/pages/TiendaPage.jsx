import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductList from '../components/ProductList';

// ⭐️ NO recibe el keyword/filtro por defecto ⭐️
const API_URL = 'http://localhost:4000/api/products'; 

function TiendaPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAllProducts = async () => {
            try {
                // Llama al endpoint de productos sin filtros
                const response = await axios.get(API_URL); 
                setProducts(response.data);
            } catch (err) {
                setError('Error al cargar la tienda completa.', err);
            } finally {
                setLoading(false);
            }
        };

        fetchAllProducts();
    }, []); // Se ejecuta solo una vez al montar

    if (loading) {
        return <div className="p-10 text-center">Cargando catálogo completo...</div>;
    }

    if (error) {
        return <div className="p-10 text-center text-red-600 font-bold">{error}</div>;
    }

    return (
        <div className="max-w-7xl mx-auto p-8">
            <h1 className="text-4xl font-extrabold text-pmate-primary mb-8">
                Catálogo Completo ({products.length} Productos)
            </h1>
            
            {/* ⭐️ Usa el componente ProductList para mostrar la cuadrícula ⭐️ */}
            <ProductList products={products} />
        </div>
    );
}

export default TiendaPage;