// src/components/ui/FilterSidebar.jsx

import React from 'react';

const FilterSidebar = ({ filters, onFilterChange, productCount }) => {
    // Categorías principales
    const categories = ['Mates', 'Combos', 'Yerbas', 'Bombillas', 'Termos', 'Materas'];
    
    // Tipos de mate (se muestran solo si "Mates" o "Combos" está seleccionado)
    const mateTypes = [
        'Imperial',
        'Camionero', 
        'Torpedo',
        'Ranchero'
    ];

    // Materiales/acabados adicionales
    const materials = [
        'Alpaca Liso',
        'Alpaca Cincelado',
        'Algarrobo',
        'Acero',
        'Deluxe'
    ];

    // Verifica si debe mostrar los filtros secundarios
    const showSecondaryFilters = filters.categories.some(cat => 
        cat.toLowerCase() === 'mates' || cat.toLowerCase() === 'combos'
    );

    // Handler para cambiar categorías
    const handleCategoryChange = (category) => {
        const newCategories = filters.categories.includes(category)
            ? filters.categories.filter(c => c !== category)
            : [...filters.categories, category];
        
        onFilterChange({ ...filters, categories: newCategories });
    };

    // Handler para cambiar tipos de mate
    const handleTypeChange = (type) => {
        const newTypes = filters.types.includes(type)
            ? filters.types.filter(t => t !== type)
            : [...filters.types, type];
        
        onFilterChange({ ...filters, types: newTypes });
    };

    // Handler para cambiar materiales
    const handleMaterialChange = (material) => {
        const newMaterials = filters.materials.includes(material)
            ? filters.materials.filter(m => m !== material)
            : [...filters.materials, material];
        
        onFilterChange({ ...filters, materials: newMaterials });
    };

    // Limpiar todos los filtros
    const clearFilters = () => {
        onFilterChange({ categories: [], types: [], materials: [] });
    };

    const hasActiveFilters = filters.categories.length > 0 || 
                            filters.types.length > 0 || 
                            filters.materials.length > 0;

    return (
        <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-pmate-primary">Filtros</h3>
                {hasActiveFilters && (
                    <button
                        onClick={clearFilters}
                        className="text-sm text-pmate-accent hover:underline"
                    >
                        Limpiar
                    </button>
                )}
            </div>

            {/* Contador de productos */}
            <div className="mb-6 p-3 bg-pmate-light rounded-lg">
                <p className="text-sm text-gray-700">
                    <span className="font-bold text-pmate-primary">{productCount}</span> productos encontrados
                </p>
            </div>

            {/* Filtro por Categorías */}
            <div className="mb-6">
                <h4 className="font-semibold text-gray-800 mb-3 border-b pb-2">Categorías</h4>
                <div className="space-y-2">
                    {categories.map((category) => (
                        <label 
                            key={category} 
                            className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded transition"
                        >
                            <input
                                type="checkbox"
                                checked={filters.categories.includes(category)}
                                onChange={() => handleCategoryChange(category)}
                                className="w-4 h-4 text-pmate-primary focus:ring-pmate-accent rounded"
                            />
                            <span className="text-gray-700">{category}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Filtros secundarios (solo si Mates o Combos está seleccionado) */}
            {showSecondaryFilters && (
                <>
                    {/* Filtro por Tipo de Mate */}
                    <div className="mb-6">
                        <h4 className="font-semibold text-gray-800 mb-3 border-b pb-2">Tipo de Mate</h4>
                        <div className="space-y-2">
                            {mateTypes.map((type) => (
                                <label 
                                    key={type} 
                                    className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded transition"
                                >
                                    <input
                                        type="checkbox"
                                        checked={filters.types.includes(type)}
                                        onChange={() => handleTypeChange(type)}
                                        className="w-4 h-4 text-pmate-primary focus:ring-pmate-accent rounded"
                                    />
                                    <span className="text-gray-700">{type}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Filtro por Material/Acabado */}
                    <div className="mb-6">
                        <h4 className="font-semibold text-gray-800 mb-3 border-b pb-2">Material/Acabado</h4>
                        <div className="space-y-2">
                            {materials.map((material) => (
                                <label 
                                    key={material} 
                                    className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded transition"
                                >
                                    <input
                                        type="checkbox"
                                        checked={filters.materials.includes(material)}
                                        onChange={() => handleMaterialChange(material)}
                                        className="w-4 h-4 text-pmate-primary focus:ring-pmate-accent rounded"
                                    />
                                    <span className="text-gray-700">{material}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default FilterSidebar;