import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/useCart';
import CartDropdown from './CartDropdown';

function Navbar({ setSearchKeyword }) {
  // Estado local para controlar el valor del input
  const [inputValue, setInputValue] = useState('');

  // Hook para obtener el total de ítems en el carrito
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems(); // El número actual de ítems

  // estado para controlar el dropdown del carrito (cerrado por defecto)
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Función que se ejecuta al presionar Enter en el input
  const handleSearch = (e) => {
    // Previene el envío del formulario (que recargaría la página)
    e.preventDefault();

    // Llama a la función del App.jsx para actualizar el estado global
    setSearchKeyword(inputValue);
  };

  return (
    // Contenedor principal: Color de fondo primario (azul oscuro) y texto blanco
    <header className="bg-pmate-primary text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Contenedor Flex para alinear Logo, Enlaces y Acciones */}
        <div className="flex items-center justify-between h-16">

          {/* Logo y Nombre de la Marca */}
          <a href="/" className="flex items-center space-x-3 hover:opacity-80 transition">
            {/* Aquí iría el logo de "Pmate" */}
            <span className="text-xl font-bold tracking-wider">Pmate</span>
          </a>

          {/* Enlaces Principales (Centrado) */}
          <nav className="hidden md:flex space-x-6 text-sm font-medium">
            {/* Usaremos 'Tienda' como enlace directo a todos los productos */}
            <Link to="/Tienda" className="text-white hover:text-pmate-accent transition duration-150">Tienda</Link>
            <Link to="/categorias/Combos" className="text-white hover:text-pmate-accent transition duration-150">Combos</Link>
            <Link to="/promociones" className="text-white hover:text-pmate-accent transition duration-150">Promociones</Link>
            <Link to="/blog" className="text-white hover:text-pmate-accent transition duration-150">Blog</Link>
            <Link to="/contacto" className="text-white hover:text-pmate-accent transition duration-150">Contacto</Link>
          </nav>

          {/* Buscador y Carrito (Acciones) */}
          <div className="flex items-center space-x-3">

            {/* 1. FORMULARIO ÚNICO PARA BUSCAR  */}
            <form onSubmit={handleSearch} className="hidden sm:block">
              <input
                type="text"
                placeholder="Buscar Mate o Combo..."
                value={inputValue} // Conecta el input al estado local
                onChange={(e) => setInputValue(e.target.value)} // Actualiza el estado local al escribir
                // Aplicamos el diseño de Tailwind
                className="p-1.5 text-sm rounded-lg border-none focus:ring-2 focus:ring-pmate-accent text-gray-800"
              />
            </form>

            {/* 2. Botón Carrito */}
            {/* CONTENEDOR PRINCIPAL: DIV con posición relativa  */}
            <div className="relative">

              {/* 1. Botón Carrito: SOLO para alternar el estado (onClick) */}
              <button
                // Al hacer clic, alterna el estado isCartOpen
                onClick={() => setIsCartOpen(!isCartOpen)}
                className="p-2 text-white rounded-full hover:bg-pmate-secondary transition duration-150 relative"
              >
                🛒
                {/* Contador */}
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                  {totalItems}
                </span>
              </button>

              {/* 2. Renderizar el Dropdown SOLO si isCartOpen es true */}
              {/* Si está abierto, lo mostramos; el Link a /cart está DENTRO de CartDropdown.jsx ⭐️ */}
              {isCartOpen && <CartDropdown />}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;