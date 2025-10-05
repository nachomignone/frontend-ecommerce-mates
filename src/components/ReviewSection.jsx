// src/components/ReviewSection.jsx

import React from 'react';

function ReviewSection() {
  return (
    // Contenedor principal: Usaremos el fondo crema (pmate-background) para esta sección
    <section className="bg-pmate-background py-16 px-4">
        <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-pmate-primary text-center mb-12">
                ⭐ La Confianza de Pmate y el Ritual Matero
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Columna 1: Reseñas Destacadas (Confianza) */}
                <div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-pmate-secondary">
                    <h3 className="text-xl font-bold text-pmate-primary mb-4">
                        Opiniones de Clientes
                    </h3>
                    <p className="italic text-gray-700 mb-3">
                        "¡El mejor mate que he tenido! La calidad del cuero es premium y el grabado es perfecto." - Sofía G.
                    </p>
                    <p className="italic text-gray-700 mb-4">
                        "Compré un combo y llegó en 24 horas. Impecable servicio." - Roberto P.
                    </p>
                    <button className="text-sm font-semibold text-pmate-accent hover:underline">
                        Ver todas las reseñas
                    </button>
                </div>

                {/* Columna 2: Blog y Enlace de Contacto */}
                <div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-pmate-secondary">
                    <h3 className="text-xl font-bold text-pmate-primary mb-4">
                        Nuestro Blog y Contacto
                    </h3>
                    <p className="text-gray-600 mb-4">
                        Descubre consejos de curado y cebado en nuestro blog exclusivo.
                    </p>
                    <a href="/blog" className="block mb-4 text-pmate-accent hover:underline font-medium">
                        Leer el último post
                    </a>
                    
                    {/* Botón de Contacto (Siguiendo el estilo redondeado y primario) */}
                    <button className="w-full py-2 mt-2 text-white font-semibold rounded-full bg-pmate-primary hover:bg-pmate-secondary transition duration-300">
                        Contactar Vendedor
                    </button>
                </div>

                {/* Columna 3: Redes Sociales (Engagement) */}
                <div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-pmate-secondary">
                    <h3 className="text-xl font-bold text-pmate-primary mb-4">
                        Síguenos en Redes
                    </h3>
                    <p className="text-gray-600 mb-4">
                        Mira videos de cebado, nuevos diseños y sorteos exclusivos.
                    </p>
                    <div className="space-y-3">
                        <button className="w-full py-2 text-pmate-primary border border-pmate-accent rounded-full hover:bg-pmate-accent/10 transition duration-300">
                            Instagram: @Pmate.tuc
                        </button>
                        <button className="w-full py-2 text-pmate-primary border border-pmate-accent rounded-full hover:bg-pmate-accent/10 transition duration-300">
                            TikTok: @Pmate.tuc
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
}

export default ReviewSection;