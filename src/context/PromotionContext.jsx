// src/context/PromotionContext.jsx

import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const PromotionContext = createContext();

// URL de la API para obtener/actualizar el estado global de promociones
const PROMOTION_STATUS_URL = 'http://localhost:4000/api/promotions/status';

export const PromotionProvider = ({ children }) => {
    const [settings, setSettings] = useState({ isActive: false, currentName: 'Promociones Generales' });
    const [loading, setLoading] = useState(true);
    const [lastUpdated, setLastUpdated] = useState(Date.now()); // Disparador de recarga

    // FUNCIÓN PARA OBTENER EL ESTADO INICIAL DEL BACKEND
    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const { data } = await axios.get(PROMOTION_STATUS_URL);
                setSettings(data);
            } catch (error) {
                console.error("Error al obtener estado de promoción:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStatus();
    }, []);

    // ⭐️ FUNCIÓN PRINCIPAL FALTANTE: Actualizar el estado global y disparar la automatización ⭐️
    const updatePromotionStatus = async (token, newSettings) => {
        try {
            // Configuración del Header de Seguridad (Bearer Token)
            const config = { 
                headers: { 
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}` 
                } 
            };

            // Llamada PUT a la ruta protegida del Backend
            const { data } = await axios.put(PROMOTION_STATUS_URL, newSettings, config);
            
            // Actualizar el estado del contexto
            setSettings(data); 
            // Disparar la recarga de productos en HomePage
            setLastUpdated(Date.now()); 
            
            return data;
        } catch (error) {
            console.error("Error al actualizar promoción (401/500):", error);
            throw error;
        }
    };

    const value = { 
        settings, 
        loading, 
        lastUpdated, 
        updatePromotionStatus, // ⬅️ Ahora está definido y exportado
    };

    return (
        <PromotionContext.Provider value={value}>
            {children}
        </PromotionContext.Provider>
    );
};

export default PromotionContext;