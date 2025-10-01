import React from 'react';

function ReviewSection() {
  return (
    <section className="review-social-section">
      <h2>⭐ Lo que dicen nuestros clientes y las novedades</h2>

      <div className="content-grid-2">
        {/* Sección de Reseñas */}
        <div className="section-reviews">
          <h3>Opiniones Destacadas</h3>
          {/* Aquí iría la lógica para mapear reseñas */}
          <p className="review-item">"¡El mejor mate de calabaza que he comprado! 5/5" - María L.</p>
          <p className="review-item">"Envío rápido y excelente calidad." - Juan P.</p>
          <button className="btn-secondary">Ver todas las reseñas</button>
        </div>

        {/* Sección de Blog/Redes */}
        <div className="section-blog-social">
          <h3>Blog y Novedades</h3>
          <p>Mantente al día con nuestro ritual matero.</p>
          <div className="social-links">
            <button className="btn-social">Instagram @MatesTucuman</button>
            <button className="btn-social">TikTok @MatesTucuman</button>
            <a href="/blog">Leer el último post del Blog</a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ReviewSection;