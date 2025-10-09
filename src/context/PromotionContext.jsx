// src/context/PromotionContext.jsx

import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const PromotionContext = createContext();

export const PromotionProvider = ({ children }) => {
    const [settings, setSettings] = useState({ isActive: false, currentName: 'Promociones Generales' });
    const [loading, setLoading] = useState(true);

    // 1. Obtener el estado actual del Backend al cargar
    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const { data } = await axios.get('http://localhost:4000/api/promotions/status');
                setSettings(data);
            } catch (error) {
                console.error("Error al obtener estado de promoción:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStatus();
    }, []);

    // 2. Función para que el Admin actualice el estado
    const updatePromotionStatus = async (token, newSettings) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`, 
                    'Content-Type': 'application/json',
                },
            };
            const { data } = await axios.put('http://localhost:4000/api/promotions/status', newSettings, config);
            setSettings(data);
            return data;
        } catch (error) {
            console.error("Error al actualizar promoción:", error);
            throw error;
        }
    };

    return (
        <PromotionContext.Provider value={{ settings, loading, updatePromotionStatus }}>
            {children}
        </PromotionContext.Provider>
    );
};

export default PromotionContext;