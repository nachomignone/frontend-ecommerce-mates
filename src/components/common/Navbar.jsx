import React from 'react';

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-logo">
        <a href="/">Mates de Tucumán</a>
      </div>
      <nav className="navbar-links">
        {/* Enlaces clave según tu wireframe */}
        <a href="/categorias">Categorías</a>
        <a href="/promociones">Promociones</a>
        <a href="/blog">Blog</a>
        <a href="/contacto">Contacto</a>
      </nav>
      <div className="navbar-actions">
        <button>🛒 Carrito (0)</button>
        <input type="text" placeholder="Buscar..." />
      </div>
    </header>
  );
}

export default Navbar;