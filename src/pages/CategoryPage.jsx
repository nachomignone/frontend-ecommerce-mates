import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'; // Para leer el parámetro de la URL
import axios from 'axios';
import ProductList from '../components/ProductList';

const API_URL = 'http://localhost:4000/api/products'; 

function CategoryPage() {
    //Obtenemos el parámetro 'categoryName' de la URL (ej: /categorias/mates)
    const { categoryName } = useParams(); 
    
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Formateamos el nombre para mostrarlo en el título (ej: 'mates' -> 'Mates')
    const formattedCategoryName = categoryName 
        ? categoryName.charAt(0).toUpperCase() + categoryName.slice(1)
        : 'Productos';

    useEffect(() => {
        const fetchProductsByCategory = async () => {
            setLoading(true); // Siempre que cambie la categoría, mostramos carga
            try {
                // Llamamos al endpoint GET /api/products?category=categoryName
                const response = await axios.get(`${API_URL}?category=${categoryName}`); 
                setProducts(response.data);
                setError(null);
            } catch (err) {
                console.error("Error al cargar productos por categoría:", err);
                setError('Error al cargar productos de esta categoría.');
            } finally {
                setLoading(false);
            }
        };

        if (categoryName) {
            fetchProductsByCategory();
        }
    }, [categoryName]); // ⬅️ El efecto se ejecuta cada vez que la categoría cambia

    if (loading) {
        return <div className="p-10 text-center">Cargando productos de {formattedCategoryName}...</div>;
    }

    if (error) {
        return <div className="p-10 text-center text-red-600 font-bold">{error}</div>;
    }

    return (
        <div className="max-w-7xl mx-auto p-8">
            <h1 className="text-4xl font-bold text-pmate-primary mb-6">
                Catálogo: {formattedCategoryName} ({products.length})
            </h1>

            {products.length > 0 ? (
                <ProductList products={products} />
            ) : (
                <div className="text-center py-10 bg-gray-50 rounded-lg">
                    <p className="text-xl text-gray-700">No encontramos productos en esta categoría.</p>
                    <Link to="/" className="text-pmate-accent hover:underline mt-4 inline-block">
                        Volver al inicio
                    </Link>
                </div>
            )}
        </div>
    );
}

export default CategoryPage;