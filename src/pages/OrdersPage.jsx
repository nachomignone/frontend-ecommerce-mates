// src/pages/OrdersPage.jsx

import React from 'react';

const OrdersPage = () => {
    // En el futuro, aquí haría una llamada a la API para /api/orders
    const orders = [
        { id: 'ORD-2025001', date: '2025-10-01', total: 45000, status: 'Entregado' },
        { id: 'ORD-2025002', date: '2025-09-15', total: 32000, status: 'En camino' },
    ];

    return (
        <div className="max-w-6xl mx-auto my-10 p-8 bg-white rounded-xl shadow-lg border border-gray-100">
            <h1 className="text-4xl font-extrabold text-pmate-primary mb-6 border-b pb-2">
                Mis Pedidos
            </h1>
            
            {orders.length === 0 ? (
                <p className="text-lg text-gray-600">Aún no tienes pedidos realizados.</p>
            ) : (
                <div className="space-y-4">
                    {orders.map((order) => (
                        <div key={order.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow-sm">
                            <div>
                                <p className="font-bold text-pmate-primary">Pedido {order.id}</p>
                                <p className="text-sm text-gray-500">Fecha: {order.date}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-xl font-bold text-green-600">${order.total.toLocaleString('es-AR')}</p>
                                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${order.status === 'Entregado' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}`}>
                                    {order.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OrdersPage;