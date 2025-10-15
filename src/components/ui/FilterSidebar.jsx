// src/components/ui/FilterSidebar.jsx

import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// Datos de filtros detallados (basados en tu catálogo)
const FILTER_OPTIONS = [
    {
        title: 'Categoría Principal',
        key: 'category', // Usamos 'category' como la clave de la query
        options: ['Mates', 'Combos', 'Bombillas', 'Termos', 'Yerbas', 'Materas'],
    },
    {
        title: 'Material (Mates)',
        key: 'material', // Nueva clave de query
        options: ['Alpaca', 'Acero', 'Algarrobo', 'Cincelado', 'Cuero'],
    },
];

const FilterSidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    const currentParams = new URLSearchParams(location.search);
    const activeFilters = {};
    
    // Extraer filtros activos para marcar los checkboxes
    for (const [key, value] of currentParams.entries()) {
        activeFilters[key] = value;
    }

    // Manejador principal de clics en filtros
    const handleFilterChange = (key, value) => {
        const newParams = new URLSearchParams(location.search);

         // ⭐️ FIX: Convertir el valor a minúsculas antes de enviar ⭐️
        const lowerValue = value.toLowerCase();

        // Si el filtro ya está activo, lo elimina. Si no, lo establece.
        if (newParams.get(key) === lowerValue) {
            newParams.delete(key);
        } else {
            // Reemplaza cualquier filtro existente de esa CLAVE (ej: si cambia de 'Mate' a 'Combo')
            newParams.set(key, lowerValue); 
        }

        // Navega a la nueva URL con los parámetros actualizados
        navigate(`${location.pathname}?${newParams.toString()}`);
    };

    // ⭐️ LÓGICA CLAVE: Determinar si el filtro de material debe estar habilitado ⭐️
    const isMaterialFilterEnabled = activeFilters.category && (
        activeFilters.category === 'Mates' || activeFilters.category === 'Combos'
    );

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 sticky top-4">
            <h2 className="text-xl font-bold text-pmate-primary mb-6">Filtrar Productos</h2>

            {FILTER_OPTIONS.map((filterGroup) => (
                <div key={filterGroup.title} className="mb-6 border-b pb-4 last:border-b-0">
                    <h3 className="text-md font-semibold text-gray-700 mb-3">{filterGroup.title}</h3>
                    
                    <div className="space-y-2">
                        {filterGroup.options.map((option) => {
                            const isActive = activeFilters[filterGroup.key] === option;
                            
                            // ⭐️ LÓGICA DE DESHABILITACIÓN DEL FILTRO DE MATERIAL ⭐️
                            const isDisabled = filterGroup.key === 'material' && !isMaterialFilterEnabled;
                            
                            return (
                                <button
                                    key={option}
                                    onClick={() => handleFilterChange(filterGroup.key, option)}
                                    disabled={isDisabled} // Deshabilitar si no es Mate o Combo
                                    className={`w-full text-left py-2 px-3 rounded-lg text-sm transition duration-150 
                                                ${isDisabled ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 
                                                isActive ? 'bg-pmate-accent text-pmate-primary font-bold shadow-md' : 
                                                'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                                >
                                    {option}
                                </button>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FilterSidebar;