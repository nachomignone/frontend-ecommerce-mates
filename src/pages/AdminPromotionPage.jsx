// src/pages/AdminPromotionPage.jsx

import React, { useState } from 'react';
import { usePromotions } from '../context/usePromotions';
import { useAuth } from '../context/useAuth';

const AdminPromotionPage = () => {
    const { settings, updatePromotionStatus } = usePromotions();
    const { user } = useAuth(); // Necesitamos el token y el user para permisos
    
    const [localName, setLocalName] = useState(settings.currentName);
    const [localActive, setLocalActive] = useState(settings.isActive);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const submitHandler = async (e) => {
        e.preventDefault();
        setMessage('');
        setLoading(true);

        try {
            const updated = await updatePromotionStatus(user.token, {
                isActive: localActive,
                currentName: localName,
            });
            setMessage(`Estado actualizado a: ${updated.isActive ? 'ACTIVO' : 'INACTIVO'} - ${updated.currentName}`);
        } catch (error) {
            console.error("Error al actualizar la promoción:", error); 

            const errorMessage = error.response && error.response.data.message 
                ? error.response.data.message
                : 'Error: No se pudo conectar o no tienes permisos.';

            setMessage(errorMessage);
        } finally {
            setLoading(false);
        }
    };
    
    // **NOTA CRUCIAL:** Si el usuario no es admin, no debería ver esta página.
    // Esto se gestiona en la ruta, pero es buena práctica en el componente.
    if (!user || !user.isAdmin) {
         return <div className="p-10 text-center text-red-600">ACCESO DENEGADO. Solo para Administradores.</div>;
    }

    return (
        <div className="max-w-xl mx-auto my-12 p-8 bg-white rounded-xl shadow-2xl">
            <h1 className="text-3xl font-extrabold text-pmate-primary mb-6 border-b pb-2">
                Panel de Administración - Promociones
            </h1>

            <form onSubmit={submitHandler} className="space-y-6">
                
                {message && <p className={`p-3 rounded mb-4 ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>{message}</p>}

                <div className="flex items-center space-x-4 p-4 border rounded-lg">
                    <input 
                        type="checkbox" 
                        checked={localActive}
                        onChange={(e) => setLocalActive(e.target.checked)}
                        className="h-6 w-6 text-pmate-accent rounded border-gray-300 focus:ring-pmate-accent"
                    />
                    <label className="text-lg font-bold text-gray-800">
                        {localActive ? 'PROMOCIÓN ACTIVA' : 'PROMOCIÓN INACTIVA'}
                    </label>
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del Evento (ej: Día de la Madre)</label>
                    <input 
                        type="text" 
                        value={localName} 
                        onChange={(e) => setLocalName(e.target.value)}
                        className="w-full p-3 border rounded-lg focus:ring-pmate-accent focus:border-pmate-accent" 
                        placeholder="Ej: Día de la Madre / Black Friday"
                    />
                </div>

                <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-pmate-secondary text-white py-3 rounded-full font-bold hover:bg-pmate-primary transition duration-300 shadow-md disabled:opacity-50"
                >
                    {loading ? 'Guardando...' : 'Guardar Estado de Promoción'}
                </button>
            </form>
        </div>
    );
};

export default AdminPromotionPage;