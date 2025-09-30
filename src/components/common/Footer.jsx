import React from 'react';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© {new Date().getFullYear()} Mates de Tucumán. Todos los derechos reservados.</p>
        <div className="social-links">
          {/* Aquí irían los íconos de Instagram y TikTok */}
          <a href="#instagram">Instagram</a> | 
          <a href="#tiktok">TikTok</a> | 
          <a href="/terminos">Términos y Condiciones</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;