// src/components/ui/PromotionBanner.jsx

import React from 'react';
import { usePromotions } from '../../context/usePromotions';
import { Link } from 'react-router-dom';

const PromotionBanner = () => {
    const { settings, loading } = usePromotions();

    if (loading || !settings.isActive) {
        return null; // No mostrar nada si está cargando o inactivo
    }

    return (
        <div className="bg-red-600 text-white p-4 my-8 shadow-xl transform skew-y-1 md:skew-y-0 md:h-24 flex items-center justify-center relative overflow-hidden">
            <div className="relative z-10 text-center">
                <h2 className="text-2xl md:text-3xl font-black uppercase tracking-wider">
                    {settings.currentName} ¡HA COMENZADO!
                </h2>
                <p className="mt-1 text-sm font-semibold">
                    Descuentos exclusivos del 20% al 40% OFF.
                    <Link to="/promociones" className="ml-2 underline hover:text-yellow-300 transition">
                        Ver todas las ofertas
                    </Link>
                </p>
            </div>
            
            {/* Fondo decorativo */}
            <div className="absolute inset-0 bg-red-700 opacity-20 animate-pulse"></div>
        </div>
    );
};

export default PromotionBanner;