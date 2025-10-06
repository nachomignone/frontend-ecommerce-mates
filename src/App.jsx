import React from 'react';
// ➡️ Importamos elementos clave de React Router
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

function App() {
  return (
    // Contenedor principal para estilos globales (definido en el paso anterior)
    <div className="mx-auto font-sans max-w-screen min-h-screen flex flex-col">
      
      {/* 1. COMPONENTES ESTRUCTURALES FIJOS */}
      <Navbar /> 
      
      {/* 2. CONTENIDO PRINCIPAL Y ENRUTAMIENTO */}
      <main className="flex-grow">
        <Routes>
          {/* Ruta principal (HomePage) */}
          <Route path="/" element={<HomePage />} />
          
          {/* Rutas definidas en el Navbar */}
          <Route path="/tienda" element={<TiendaPage />} />
          <Route path="/combos" element={<CombosPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/contacto" element={<ContactoPage />} />

          {/* RUTA DINÁMICA: Usa el parámetro ":id" */}
          <Route path="/products/:id" element={<ProductDetailPage />} /> 

          {/* Manejo de Rutas No Encontradas (404) */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      {/* 3. COMPONENTE ESTRUCTURAL FIJO */}
      <Footer /> 
    </div>
  );
}

export default App;