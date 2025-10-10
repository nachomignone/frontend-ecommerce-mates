// src/pages/AdminPromotionPage.jsx (CÓDIGO CORREGIDO Y FINAL)

import React, { useState, useEffect } from 'react';
import { usePromotions } from '../context/usePromotions';
import { useAuth } from '../context/useAuth';
import { useNavigate } from 'react-router-dom';

const AdminPromotionPage = () => {
    const { settings, loading, updatePromotionStatus } = usePromotions();
    const { user } = useAuth();
    const navigate = useNavigate();

    // ⭐️ ESTADOS INICIALIZADOS DE FORMA SEGURA (USANDO useEffect) ⭐️
    const [localName, setLocalName] = useState('');
    const [message, setMessage] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [localPercentage, setLocalPercentage] = useState(0); 
    const [targetCategories, setTargetCategories] = useState([]);
    const [localStartDate, setLocalStartDate] = useState('');
    const [localEndDate, setLocalEndDate] = useState('');
    
    // LISTA DE CATEGORÍAS DISPONIBLES
    const ALL_CATEGORIES = ['Mates', 'Combos', 'Bombillas', 'Termos', 'Yerbas', 'Materas'];

    // ⭐️ SINCRONIZAR ESTADO LOCAL CON EL CONTEXTO (settings) ⭐️
    useEffect(() => {
        if (!loading && settings) {
            setLocalName(settings.currentName || '');
            setLocalPercentage(settings.discountPercentage || 20); // Usamos 20% como valor por defecto
            setTargetCategories(settings.targetCategories || []);
            // Convertir las fechas de Date a string de fecha (si existen)
            setLocalStartDate(settings.startDate ? settings.startDate.substring(0, 10) : '');
            setLocalEndDate(settings.endDate ? settings.endDate.substring(0, 10) : '');
        }
    }, [loading, settings]);

    // Manejador para la selección de categorías
    const handleCategoryToggle = (category) => {
        setTargetCategories(prev =>
            prev.includes(category)
                ? prev.filter(c => c !== category)
                : [...prev, category]
        );
    };

    // ⭐️ LÓGICA DE ACTIVACIÓN/ACTUALIZACIÓN (EJECUTADA AL ENVIAR FORMULARIO) ⭐️
    const submitHandler = async (e) => {
        e.preventDefault();
        setMessage('');
        setIsSaving(true);
        
        // 1. VALIDACIÓN
        if (!localName || !localStartDate || !localEndDate || localPercentage <= 0 || targetCategories.length === 0) {
             setMessage('Error: Complete Nombre, Fechas, Porcentaje y seleccione Categorías.');
             setIsSaving(false);
             return;
        }

        // 2. LLAMADA A LA API (Activar o Actualizar)
        try {
            await updatePromotionStatus(user.token, {
                isActive: true, // Siempre activamos si se envía el formulario (el botón es de activación)
                currentName: localName,
                discountPercentage: localPercentage,
                targetCategories: targetCategories,
                startDate: localStartDate, 
                endDate: localEndDate,
            });
            
            setMessage(`✅ Promoción '${localName}' activada! Redirigiendo a la Home...`);
            setTimeout(() => {
                navigate('/');
            }, 1000);

        } catch (error) {
            setMessage('❌ Error: Al aplicar las reglas (Verifique permisos o Backend).', error);
        } finally {
            setIsSaving(false);
        }
    };

    // ⭐️ LÓGICA DE DESACTIVACIÓN INMEDIATA ⭐️
    const handleDeactivation = async () => {
        if (!window.confirm('¿Está seguro que desea desactivar esta promoción inmediatamente?')) return;
        setIsSaving(true);
        try {
            await updatePromotionStatus(user.token, {
                isActive: false, // Forzar la desactivación
            });
            setMessage(`✅ Promoción '${localName}' desactivada con éxito.`);
        } catch (error) {
            setMessage('❌ Error al desactivar la promoción.', error);
        } finally {
            setIsSaving(false);
        }
    };
    
    // ⭐️ RENDERIZADO CONDICIONAL Y ESTRUCTURA (JSX) ⭐️
    if (loading) {
        return <div className="p-10 text-center">Cargando configuración de promoción...</div>;
    }

    if (!user || !user.isAdmin) {
        return <div className="p-10 text-center text-red-600">ACCESO DENEGADO. Solo para Administradores.</div>;
    }

    return (
        <div className="max-w-xl mx-auto my-12 p-8 bg-pmate-background rounded-xl shadow-2xl">
            <h1 className="text-3xl font-extrabold text-pmate-primary mb-6 border-b pb-2">
                Panel de Administración - Eventos
            </h1>

            {message && <p className={`p-3 rounded mb-4 ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>{message}</p>}

            {/* ⭐️ FORMULARIO PRINCIPAL DE ACTIVACIÓN ⭐️ */}
            <form onSubmit={submitHandler} className="space-y-6"> 
                
                {/* Nombre, Porcentaje, Categorías y Fechas */}
                {/* ... (código para inputs y selección de categorías) ... */}
                
                {/* Nombre del Evento */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del Evento (ej: Día de la Madre)</label>
                    <input type="text" value={localName} onChange={(e) => setLocalName(e.target.value)}
                        className="w-full p-3 border rounded-lg focus:ring-pmate-accent focus:border-pmate-accent" placeholder="Ej: Día de la Madre / Black Friday" required
                    />
                </div>
                
                {/* Porcentaje */}
                <div className="flex justify-between items-center space-x-4">
                    <label className="block text-sm font-medium text-gray-700">Porcentaje de Descuento (%):</label>
                    <input type="number" value={localPercentage} onChange={(e) => setLocalPercentage(e.target.value)}
                        min="1" max="99" className="w-24 p-3 border rounded-lg text-lg text-center" required
                    />
                </div>

                {/* Selección de Categorías */}
                <div className="pt-3 border-t border-gray-300">
                    <h3 className="text-lg font-bold text-pmate-primary mb-3">Categorías Afectadas</h3>
                    <div className="grid grid-cols-3 gap-2">
                        {ALL_CATEGORIES.map(category => (
                            <button key={category} type="button" onClick={() => handleCategoryToggle(category)}
                                className={`p-2 text-sm rounded-full transition ${targetCategories.includes(category) 
                                    ? 'bg-pmate-accent text-pmate-primary font-bold' 
                                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'}`
                                }
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Fechas */}
                <div className="grid grid-cols-2 gap-4">
                    <label className="block">
                        <span className="text-gray-700">Fecha de Inicio:</span>
                        <input type="date" value={localStartDate} onChange={(e) => setLocalStartDate(e.target.value)} required className="w-full p-2 border rounded-lg" />
                    </label>
                    <label className="block">
                        <span className="text-gray-700">Fecha de Fin:</span>
                        <input type="date" value={localEndDate} onChange={(e) => setLocalEndDate(e.target.value)} required className="w-full p-2 border rounded-lg" />
                    </label>
                </div>

                {/* BOTÓN DE ACTIVACIÓN */}
                <button type="submit" disabled={isSaving} className="w-full bg-pmate-accent text-pmate-primary py-3 rounded-full font-bold hover:bg-pmate-secondary transition duration-300 shadow-md disabled:opacity-50">
                    {isSaving ? 'Aplicando Reglas...' : 'Activar Promoción'}
                </button>
            </form>
            
            {/* ⭐️ BOTÓN DE DESACTIVACIÓN INMEDIATA (Fuera del Formulario) ⭐️ */}
            {settings.isActive && (
                <button 
                    onClick={handleDeactivation}
                    disabled={isSaving}
                    className="w-full mt-4 bg-red-600 text-white py-2 rounded-full hover:bg-red-700 transition duration-300 disabled:opacity-50"
                >
                    Desactivar Promoción Inmediatamente
                </button>
            )}
        </div>
    );
};

export default AdminPromotionPage;