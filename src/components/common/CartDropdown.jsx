import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/useCart';

// Este componente solo se muestra si la prop 'isOpen' es true
function CartDropdown() {
    const { cartItems, getTotalItems } = useCart();
    
    // Calcula el subtotal para mostrarlo en el dropdown
    const subtotal = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity, 
        0
    );
    
    const formattedSubtotal = new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
    }).format(subtotal);

    return (
        // Contenedor principal del Dropdown: Posicionamiento absoluto y diseño Tailwind
        <div className="absolute right-0 mt-3 w-72 bg-white rounded-lg shadow-xl z-50 border border-gray-100">
            <div className="p-4">
                <h3 className="text-lg font-bold text-pmate-primary border-b pb-2 mb-3">
                    ({getTotalItems()}) Artículos
                </h3>

                {cartItems.length === 0 ? (
                    <p className="text-gray-500 text-sm text-center py-4">Tu carrito está vacío.</p>
                ) : (
                    <>
                        {/* Lista de los primeros 3 ítems */}
                        <div className="max-h-48 overflow-y-auto space-y-3">
                            {cartItems.slice(0, 3).map((item) => (
                                <div key={item._id} className="flex items-center text-sm">
                                    <img src={item.images[0] || 'https://via.placeholder.com/40x40'} alt={item.name} className="w-10 h-10 object-cover rounded mr-2" />
                                    <div className="flex-grow">
                                        <p className="font-medium text-gray-800 truncate">{item.name}</p>
                                        <p className="text-xs text-gray-500">{item.quantity} x {new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(item.price)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        {/* Resumen y Botón de Acción */}
                        <div className="mt-4 pt-3 border-t">
                            <div className="flex justify-between font-bold mb-3">
                                <span>Subtotal:</span>
                                <span className="text-pmate-accent">{formattedSubtotal}</span>
                            </div>
                            
                            {/* ⭐️ BOTÓN QUE REDIRIGE A LA PÁGINA COMPLETA DEL CARRITO ⭐️ */}
                            <Link to="/cart" className="w-full block text-center py-2 text-white font-semibold rounded-full bg-pmate-secondary hover:bg-pmate-primary transition">
                                Ver Carrito ({getTotalItems()})
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default CartDropdown;