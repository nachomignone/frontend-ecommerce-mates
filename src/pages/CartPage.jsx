import React from 'react';
import { useCart } from '../context/useCart';
import { Link } from 'react-router-dom';

function CartPage() {
    // Obtenemos los ítems del carrito y las funciones
    const { cartItems, removeItem, updateQuantity } = useCart();

    // Función para calcular el subtotal (precio * cantidad)
    const subtotal = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    const formattedSubtotal = new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
    }).format(subtotal);

    return (
        <div className="max-w-7xl mx-auto p-8">
            <h1 className="text-4xl font-extrabold text-pmate-primary mb-8 text-center">
                🛒 Tu Carrito de Pmate
            </h1>

            {cartItems.length === 0 ? (
                <div className="text-center py-20 bg-gray-50 rounded-lg shadow-inner">
                    <p className="text-xl text-gray-700 mb-4">Tu carrito está vacío. ¡Es hora de empezar a matear!</p>
                    <Link
                        to="/"
                        className="text-pmate-accent font-semibold hover:underline"
                    >
                        Volver a la tienda
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* COLUMNA IZQUIERDA: LISTA DE PRODUCTOS */}
                    <div className="lg:col-span-2 space-y-4">
                        {cartItems.map((item) => (
                            <div key={item._id} className="flex items-center bg-white p-4 rounded-lg shadow-md border-l-4 border-pmate-secondary">
                                <img src={item.images[0] || 'https://via.placeholder.com/80x80?text=Mate'} alt={item.name} className="w-20 h-20 object-cover rounded mr-4" />

                                {/* Detalles y Controles */}
                                <div className="flex-grow">
                                    <h3 className="text-lg font-semibold text-pmate-primary">{item.name}</h3>

                                    {/* CONTROLES DE CANTIDAD */}
                                    <div className="flex items-center space-x-2 mt-2">
                                        <button
                                            onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                            className="bg-gray-200 text-pmate-primary font-bold w-6 h-6 rounded-full hover:bg-gray-300 transition"
                                        >
                                            -
                                        </button>
                                        <span className="text-md font-medium">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                            className="bg-gray-200 text-pmate-primary font-bold w-6 h-6 rounded-full hover:bg-gray-300 transition"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                {/* Precio y Botón Eliminar */}
                                <div className="text-right">
                                    <div className="text-xl font-bold text-pmate-accent mb-2">
                                        {new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(item.price * item.quantity)}
                                    </div>
                                    <button
                                        onClick={() => removeItem(item._id)}
                                        className="text-red-500 hover:text-red-700 text-sm transition"
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* COLUMNA DERECHA: RESUMEN DE COMPRA */}
                    <div className="bg-white p-6 rounded-lg shadow-xl border-t-4 border-pmate-accent">
                        <h2 className="text-2xl font-bold text-pmate-primary mb-4">Resumen</h2>

                        <div className="flex justify-between border-b pb-2 mb-2">
                            <span className="text-gray-600">Subtotal:</span>
                            <span className="font-medium text-pmate-primary">{formattedSubtotal}</span>
                        </div>

                        <div className="flex justify-between font-bold text-xl mt-4 pt-2 border-t border-gray-200">
                            <span>Total:</span>
                            <span className="text-pmate-accent">{formattedSubtotal}</span>
                        </div>

                        <button className="w-full mt-6 py-3 text-white font-bold rounded-full bg-pmate-secondary hover:bg-pmate-primary transition duration-300">
                            Finalizar Compra
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CartPage;