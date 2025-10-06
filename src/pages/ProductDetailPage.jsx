// src/pages/ProductDetailPage.jsx

import React, { useState, useEffect } from 'react';
// ➡️ Hook para obtener el parámetro de la URL (el ID)
import { useParams, Link } from 'react-router-dom'; 
import axios from 'axios';

const API_URL = 'http://localhost:4000/api/products'; 

function ProductDetailPage() {
    // Obtenemos el parámetro 'id' de la URL (ej: /products/12345)
    const { id } = useParams(); 
    
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                // Llamamos al endpoint GET /api/products/:id
                const response = await axios.get(`${API_URL}/${id}`); 
                setProduct(response.data);
            } catch (err) {
                if (err.response && err.response.status === 404) {
                    setError('Producto no encontrado (404)');
                } else {
                    setError('Error al cargar los detalles del producto.');
                }
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchProduct();
        }
    }, [id]); // El efecto se ejecuta cada vez que el ID de la URL cambia

    if (loading) {
        return <div className="p-10 text-center">Cargando detalles del mate...</div>;
    }

    if (error) {
        return <div className="p-10 text-center text-red-600 font-bold">{error}</div>;
    }
    
    // Formateo del precio (igual que en ProductCard)
    const formattedPrice = new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
    }).format(product.price);

    // ➡️ Estructura básica de la página de detalle
    return (
        <div className="max-w-7xl mx-auto p-8">
            <Link to="/" className="text-sm text-pmate-accent hover:underline mb-4 block">
                ← Volver a la Tienda
            </Link>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-pmate-background p-6 rounded-lg shadow-xl">
                {/* Columna de Imagen */}
                <div>
                    <img 
                        src={product.images[0] || 'https://via.placeholder.com/500x500?text=Pmate'}
                        alt={product.name}
                        className="w-full h-auto object-cover rounded-lg"
                    />
                </div>
                
                {/* Columna de Detalles */}
                <div>
                    <h1 className="text-4xl font-extrabold text-pmate-primary mb-4">{product.name}</h1>
                    <p className="text-gray-700 mb-6">{product.description}</p>
                    
                    <div className="text-3xl font-bold text-pmate-accent mb-4">{formattedPrice}</div>
                    
                    <button className="bg-pmate-secondary text-white py-3 px-8 rounded-full font-semibold hover:bg-pmate-primary transition">
                        Añadir al Carrito
                    </button>
                    
                    <p className="mt-4 text-sm text-gray-600">Stock: {product.stock}</p>
                </div>
            </div>
        </div>
    );
}

export default ProductDetailPage;