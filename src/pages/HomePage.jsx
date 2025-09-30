import React, { useState, useEffect } from 'react'; // ⬅️ IMPORTANTE: Importamos los Hooks
import { getProducts } from '../services/productService'; // ⬅️ Importamos el servicio de la API
// Importamos los componentes de sección que crearemos después

function HomePage() {
  // 1. Estados para manejar los datos y el ciclo de vida de la petición
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2. Hook useEffect para ejecutar la llamada a la API una vez al montar el componente
  useEffect(() => {
    // Función asíncrona para traer los datos
    const fetchProducts = async () => {
      try {
        const data = await getProducts(); // Llama a la función del servicio
        setProducts(data); // Actualiza el estado con los datos
        setError(null); // Limpiamos cualquier error previo
      } catch (err) {
        console.error("Error al cargar productos:", err);
        // En caso de fallo de conexión o error 500 del backend
        setError('Error al cargar la API de productos. ¿El Backend está corriendo?'); 
      } finally {
        setLoading(false); // La carga ha terminado (éxito o fallo)
      }
    };

    fetchProducts();
  }, []); // Array de dependencias vacío para ejecutar solo en el montaje

  // 3. Renderizado Condicional: Muestra estado de carga o error
  if (loading) {
    return <div style={{padding: '50px', textAlign: 'center'}}>Cargando productos... 🧉</div>;
  }

  if (error) {
    return <div style={{padding: '50px', textAlign: 'center', color: 'red'}}>Error: {error}</div>;
  }
  
  // 4. Renderizado de la Página Principal (cuando los datos están listos)
  return (
    <div className="home-page">
      
      {/* 1. BANNER PRINCIPAL */}
      <section className="hero-banner">
        <h1>¡La mejor selección de Mates del NOA!</h1>
        <p>Hemos cargado **{products.length} productos** desde la API. ¡Conexión Full-Stack Exitosa! 🎉</p> 
        <button>Ver Promociones</button>
      </section>

      {/* 2. SECCIONES DE PRODUCTOS (Categorías y Destacados) */}
      <section className="section-categorias">
        <h2>🛍️ Explora nuestras Categorías</h2>
        {/* Aquí irían las tarjetas de categorías */}
      </section>

      <section className="section-destacados">
        <h2>🔥 Productos Destacados (Lista de prueba)</h2>
        {products.length > 0 ? (
            // Muestra el nombre de los primeros 5 productos como prueba de conexión
            products.slice(0, 5).map(p => (
                <p key={p._id}>- {p.name} (${p.price})</p>
            ))
        ) : (
            <p>No hay productos en la base de datos. Usa tu API POST para agregar algunos.</p>
        )}
      </section>
      
      {/* 3. BLOG, REDES y RESEÑAS */}
      <section className="section-social">
        <h2>✨ Inspírate: Nuestro Blog y Redes</h2>
        {/* Aquí iría la integración de Instagram y TikTok */}
      </section>
      
    </div>
  );
}

export default HomePage;