// src/components/common/Footer.jsx

import React from 'react';

function Footer() {
  return (
    // Contenedor principal: Fondo azul oscuro de la marca
    <footer className="bg-pmate-primary text-gray-300 border-t-4 border-pmate-accent mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* FILA SUPERIOR: CONTACTO RÁPIDO Y LOGO */}
        <div className="flex flex-col md:flex-row justify-between items-center border-b border-pmate-secondary/50 pb-6 mb-6">
          
          {/* Logo y Copyright */}
          <div className="text-2xl font-bold text-white mb-4 md:mb-0">
            Pmate
            <p className="text-xs text-gray-400 font-normal mt-1">
              © {new Date().getFullYear()} Un mate a la medida de cada ocasión.
            </p>
          </div>
          
          {/* Información de Contacto (Basado en el logo) */}
          <div className="flex items-center space-x-6 text-sm">
            <span className="flex items-center space-x-1 text-white">
              {/* Icono de Teléfono (Ejemplo de Heroicons) */}
              📞
              <span>381 337-9439</span> 
            </span>
            <span className="flex items-center space-x-1 text-white">
              {/* Icono de Email */}
              📧
              <span>contacto@pmate.com</span> 
            </span>
          </div>
        </div>
        
        {/* FILA INFERIOR: ENLACES DE NAVEGACIÓN Y LEGALES */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
          
          {/* 1. Navegación Rápida */}
          <div>
            <h5 className="font-bold text-white mb-3">Tienda</h5>
            <ul>
              <li><a href="/categorias" className="hover:text-pmate-accent transition">Mates</a></li>
              <li><a href="/combos" className="hover:text-pmate-accent transition">Combos</a></li>
              <li><a href="/ofertas" className="hover:text-pmate-accent transition">Ofertas</a></li>
            </ul>
          </div>

          {/* 2. Empresa */}
          <div>
            <h5 className="font-bold text-white mb-3">Empresa</h5>
            <ul>
              <li><a href="/nosotros" className="hover:text-pmate-accent transition">Sobre Nosotros</a></li>
              <li><a href="/contacto" className="hover:text-pmate-accent transition">Contacto</a></li>
              <li><a href="/blog" className="hover:text-pmate-accent transition">Blog</a></li>
            </ul>
          </div>
          
          {/* 3. Información Legal */}
          <div>
            <h5 className="font-bold text-white mb-3">Legal</h5>
            <ul>
              <li><a href="/terminos" className="hover:text-pmate-accent transition">Términos y Condiciones</a></li>
              <li><a href="/devoluciones" className="hover:text-pmate-accent transition">Política de Devolución</a></li>
            </ul>
          </div>
          
          {/* 4. Redes Sociales */}
          <div>
            <h5 className="font-bold text-white mb-3">Síguenos</h5>
            <div className="flex space-x-3">
              <a href="https://instagram.com/pmate.tuc" target="_blank" rel="noopener noreferrer" className="text-pmate-accent hover:text-white">
                {/* Ícono de Instagram */}
                
              </a>
              <a href="https://facebook.com/pmate.tuc" target="_blank" rel="noopener noreferrer" className="text-pmate-accent hover:text-white">
                {/* Ícono de Facebook */}
                
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;