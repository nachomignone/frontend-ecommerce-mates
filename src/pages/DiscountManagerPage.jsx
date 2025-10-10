// src/pages/DiscountManagerPage.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/useAuth';

const API_URL = 'http://localhost:4000/api/products';
const DISCOUNT_URL = 'http://localhost:4000/api/discounts';

const DiscountManagerPage = () => {
    const { user } = useAuth(); // Necesitamos el token del usuario logueado
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    const token = user?.token;

    // 1. Fetch de todos los productos (para ver precios originales y descuentos)
    const fetchProducts = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(API_URL);
            //  Añadimos el estado de edición y precio nuevo al objeto
            const productsWithState = data.map(p => ({
                ...p,
                isEditing: false,
                newDiscountPrice: p.price * 0.70, // Precio sugerido por defecto (30% off)
                offerDescription: p.offerDescription || 'Oferta Especial', // Inicializa con la descripción actual o vacío
            }));
            setProducts(productsWithState);
            setMessage('');
        } catch (error) {
            setMessage('Error al cargar los productos. Asegúrate que el backend esté activo.', error);
        } finally {
            setLoading(false);
        }
    };

        useEffect(() => {
        if (token) fetchProducts();
        // Nota: El fetchProducts se encarga de llamar al Backend.
        // No necesitamos inicializar offerDescription aquí.
    }, [token]);

    // 2. Manejar la creación/actualización del descuento
    const handleSetDiscount = async (product) => {
        if (!token) return setMessage('Error: No logueado.');

        // ⭐️ CLAVE: EL ADMIN INGRESA EL PORCENTAJE (ej: 0.20 para 20%) ⭐️
        const discountPercentage = parseFloat(product.newDiscountPrice); // Usamos newDiscountPrice para el %
        
        if (isNaN(discountPercentage) || discountPercentage < 0 || discountPercentage > 100) {
            setMessage(`El descuento debe ser un porcentaje válido entre 0 y 100.`);
            return;
        }

        // ⭐️ Calcular el precio FINAL para enviar al Backend ⭐️
        const originalPrice = product.originalPrice || product.price;
        const discountedPrice = originalPrice * (1 - (discountPercentage / 100)); // Pasa 20 a 0.80

        try {
            const config = { headers: { Authorization: `Bearer ${token}` } };
            //  Llamada al Backend para crear/actualizar el descuento
            const { data } = await axios.post(
                DISCOUNT_URL,
                {
                    productId: product._id,
                    discountedPrice: discountedPrice,
                    offerDescription: product.offerDescription,
                },
                config
            );
            setMessage(`✅ Descuento de ${data.discountedPercentage} aplicado a ${product.name}`);
            fetchProducts(); // Refrescar la lista para ver el cambio
        } catch (error) {
            setMessage(`❌ Error al aplicar descuento: ${error.response?.data?.message || error.message}`);
        }
    };

    // 3. Manejar la eliminación del descuento
    const handleRemoveDiscount = async (discountId) => {
        if (!token) return setMessage('Error: No logueado.');

        // ⭐️ Verifica si el ID es nulo antes de llamar ⭐️
        if (!discountId) {
            setMessage('Error: ID de promoción faltante. El producto no tiene una promoción activa registrada.');
            return;
        }

        const config = { headers: { Authorization: `Bearer ${token}` } };
        
        try {
            await axios.delete(`${DISCOUNT_URL}/${discountId}`, config);
            setMessage('✅ Promoción eliminada con éxito.');
            fetchProducts();
        } catch (error) {
            setMessage(`❌ Error al eliminar descuento: ${error.response?.data?.message || error.message}`);
        }
    };

    // Funciones de utilidad para el Frontend
    const startEditing = (_id) => {
        setProducts(products.map(p => ({ ...p, isEditing: p._id === _id ? true : false })));
    };

    const handlePriceChange = (_id, value) => {
        setProducts(products.map(p => 
            p._id === _id ? { ...p, newDiscountPrice: value } : p
        ));
    };

    if (!user?.isAdmin) {
        return <div className="p-10 text-center text-red-600 font-bold">ACCESO DENEGADO. Solo Administradores.</div>;
    }
    
    if (loading) {
        return <div className="p-10 text-center">Cargando catálogo de administrador...</div>;
    }

     // Función de utilidad para manejar el cambio de precio (reutilizada para la descripción)
    const handleInputChange = (_id, field, value) => {
        setProducts(products.map(p => 
            p._id === _id ? { ...p, [field]: value } : p
        ));
    };

    return (
        <div className="max-w-7xl mx-auto my-8 p-8 bg-pmate-background rounded-xl shadow-2xl">
            <h1 className="text-4xl font-extrabold text-pmate-primary mb-2">
                Gestión de Descuentos
            </h1>
            <p className="text-gray-600 mb-6">Administrar los precios promocionales por producto.</p>
            
            {message && <p className={`p-3 rounded mb-6 ${message.includes('✅') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{message}</p>}

            <div className="space-y-4">
                {products.map((product) => (
                    <div key={product._id} className={`flex items-center p-4 bg-white rounded-lg shadow-sm border ${product.isPromotion ? 'border-red-500' : 'border-gray-200'}`}>
                        
                        <div className="flex-grow">
                            <p className="text-lg font-semibold text-pmate-primary">{product.name} ({product.sku})</p>
                            
                            {/*  Mostrar Precio Original y Estado  */}
                            <p className="text-gray-500 text-sm">
                                Precio Base: <span className="line-through">{new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(product.originalPrice || product.price)}</span>
                                <span className={`ml-3 px-2 py-0.5 rounded text-xs font-bold ${product.isPromotion ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-500'}`}>
                                    {product.isPromotion ? `PROMO ACTIVA: ${product.price} ARS` : 'Sin Promoción'}
                                </span>
                            </p>
                        </div>

                        {/*  CONTROLES  */}
                        <div className="flex space-x-2 items-center">
                            
                            {product.isEditing ? (
                                <div className="space-y-2">
                                    <input 
                                        type="number" 
                                        value={product.newDiscountPrice} // Usamos newDiscountPrice para el porcentaje
                                        onChange={(e) => handlePriceChange(product._id, e.target.value)}
                                        className="w-24 p-2 border border-pmate-accent rounded text-gray-800"
                                        placeholder="%"
                                    />
                                    <input 
                                        type="text" 
                                        value={product.offerDescription}
                                        onChange={(e) => handleInputChange(product._id, 'offerDescription', e.target.value)}
                                        className="w-full p-2 border border-pmate-accent rounded text-gray-800 text-sm"
                                        placeholder="Ej: Día de la Madre 20% OFF"
                                    />
                                    <button 
                                        onClick={() => handleSetDiscount(product)}
                                        className="bg-green-600 text-white p-2 rounded hover:bg-green-700 transition"
                                    >
                                        Aplicar %
                                    </button>
                                    <button 
                                        onClick={() => startEditing(null)}
                                        className="bg-gray-400 text-white p-2 rounded hover:bg-gray-500 transition"
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <button 
                                        onClick={() => startEditing(product._id)}
                                        className="bg-pmate-secondary text-white p-2 rounded hover:bg-pmate-primary transition"
                                    >
                                        Asignar Descuento
                                    </button>
                                    {product.isPromotion && (
                                        <button 
                                            // Llama usando el ID inyectado en product.discount._id
                                            onClick={() => handleRemoveDiscount(product.discount?._id)} 
                                            className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition"
                                        >
                                            Eliminar Promo
                                        </button>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DiscountManagerPage;