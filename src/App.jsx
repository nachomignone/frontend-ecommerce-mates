import React, { useState } from 'react';
// Importamos elementos clave de React Router
import { Routes, Route } from 'react-router-dom';

// Importamos componentes estructurales
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

// Importamos todas las páginas que creamos
import HomePage from './pages/HomePage';
import TiendaPage from './pages/TiendaPage';
import CombosPage from './pages/CombosPage';
import BlogPage from './pages/BlogPage';
import ContactoPage from './pages/ContactoPage';
import NotFoundPage from './pages/NotFoundPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CategoryPage from './pages/CategoryPage';
import CartPage from './pages/CartPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';

// Importar el Proveedor del Contexto
import { CartProvider } from './context/CartContext';

function App() {
  // 1. Estado para almacenar el término de búsqueda
  const [searchKeyword, setSearchKeyword] = useState('');
  return (
    <CartProvider> {/* Envolvemos toda la app con el proveedor del contexto */}
      <div className="mx-auto font-sans max-w-screen min-h-screen flex flex-col">
        {/* 1. COMPONENTES ESTRUCTURALES FIJOS */}
        <Navbar setSearchKeyword={setSearchKeyword} />

        {/* 2. CONTENIDO PRINCIPAL Y ENRUTAMIENTO */}
        <main className="flex-grow">
          <Routes>
            {/* Rutas de Autenticación */}
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />

            {/* Ruta principal (HomePage) */}
            <Route path="/" element={<HomePage searchKeyword={searchKeyword} />} />

            {/* Rutas definidas en el Navbar */}
            <Route path="/tienda" element={<TiendaPage />} />
            <Route path="/combos" element={<CombosPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/contacto" element={<ContactoPage />} />
            <Route path="/cart" element={<CartPage />} />

            {/* Ruta dinámica para categorías */}
            <Route path="/categorias/:categoryName" element={<CategoryPage />} />

            {/* RUTA DINÁMICA: Usa el parámetro ":id" */}
            <Route path="/products/:id" element={<ProductDetailPage />} />

            {/* Manejo de Rutas No Encontradas (404) */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        {/* 3. COMPONENTE ESTRUCTURAL FIJO */}
        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;