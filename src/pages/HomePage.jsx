import React, { useState, useEffect } from 'react'; // ⬅️ IMPORTANTE: Importamos los Hooks
import { getProducts } from '../services/productService'; // ⬅️ Importamos el servicio de la API
import ProductList from '../components/ProductList';
import CategoryCard from '../components/ui/CategoryCard';
import ReviewSection from '../components/ReviewSection';
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
      <section className="bg-pmate-background py-20 text-center border-b-4 border-pmate-accent">
        <h1 className="text-5xl font-extrabold text-pmate-primary mb-4">
          Un Mate a la Medida de Cada Ocasión
        </h1>
        <p className="text-xl font-medium text-gray-700 mb-6">
          Hemos cargado **{products.length} productos** desde la API. ¡Conexión Full-Stack Exitosa! 🎉
        </p>
        
        {/* Botón CTA (siguiendo el estilo redondeado) */}
        <button className="bg-pmate-accent text-pmate-primary font-bold py-3 px-8 rounded-full shadow-lg hover:bg-[#03bcfa]/80 transition duration-300">
          Ver Combos Exclusivos
        </button>
      </section>

      {/* 2. SECCIONES DE PRODUCTOS (Categorías y Destacados) */}
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-pmate-primary text-center mb-8">
          🛍️ Explora nuestras Categorías
        </h2>
        
        {/* Contenedor Grid: 3 columnas en desktop, es mejor para mostrar variedad */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"> 
          <CategoryCard name="Mates" link="/categorias/mates" />
          <CategoryCard name="Combos" link="/categorias/combos" />
          <CategoryCard name="Bombillas" link="/categorias/bombillas" />
          <CategoryCard name="Termos" link="/categorias/termos" />
          <CategoryCard name="Yerbas" link="/categorias/yerbas" />
          <CategoryCard name="Materas" link="/categorias/materas" />
        </div>
      </section>


      <section className="section-destacados">
        <h2>🔥 Productos Destacados (Lista de prueba)</h2>
        {products.length > 0 ? (
            // Muestra el nombre de los primeros 5 productos como prueba de conexión
            <ProductList products={products} />
        ) : (
            <p>No hay productos en la base de datos. Usa tu API POST para agregar algunos.</p>
        )}
      </section>
      
      {/* 3. BLOG, REDES y RESEÑAS */}
      <ReviewSection /> {/* Componente para la sección de reseñas y blog */}
      
    </div>
  );
}

export default HomePage;