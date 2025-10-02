// src/components/common/Navbar.jsx

import React from 'react';

function Navbar() {
  return (
    // Contenedor principal: Color de fondo primario (azul oscuro) y texto blanco
    <header className="bg-pmate-primary text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Contenedor Flex para alinear Logo, Enlaces y Acciones */}
        <div className="flex items-center justify-between h-16">

          {/* Logo y Nombre de la Marca */}
          <div className="flex items-center space-x-3">
            {/* 💡 Aquí iría el logo de "Pmate" */}
            <span className="text-xl font-bold tracking-wider">Pmate</span>
          </div>

          {/* Enlaces Principales (Centrado) */}
          <nav className="hidden md:flex space-x-6 text-sm font-medium">
            <a
              href="/"
              className="text-white hover:text-pmate-accent transition duration-150"
            >
              Inicio
            </a>
            <a
              href="/categorias"
              className="text-white hover:text-pmate-accent transition duration-150"
            >
              Categorías
            </a>
            <a
              href="/promociones"
              className="text-white hover:text-pmate-accent transition duration-150"
            >
              Promociones
            </a>
            <a
              href="/blog"
              className="text-white hover:text-pmate-accent transition duration-150"
            >
              Blog
            </a>
            <a
              href="/contacto"
              className="text-white hover:text-pmate-accent transition duration-150"
            >
              Contacto
            </a>
          </nav>

          {/* Buscador y Carrito (Acciones) */}
          <div className="flex items-center space-x-3">

            {/* Buscador (Input visible) */}
            <input
              type="text"
              placeholder="Buscar Mate o Combo..."
              className="p-1.5 text-sm rounded-lg border-none focus:ring-2 focus:ring-pmate-accent text-gray-800 hidden sm:block"
            />

            {/* Botón Carrito */}
            <button
              className="p-2 text-white rounded-full hover:bg-pmate-secondary transition duration-150 relative"
            >
              {/* Icono de Carrito (Reemplazar con un ícono real, ej: Heroicons) */}
              🛒 <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">0</span>
            </button>

          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;