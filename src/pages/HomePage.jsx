import React, { useState, useEffect } from 'react'; // IMPORTANTE: Importamos los Hooks

import axios from 'axios'; // Para hacer llamadas HTTP a la API

import ProductList from '../components/ProductList';
import CategoryCard from '../components/ui/CategoryCard';
import ReviewSection from '../components/ReviewSection';
import ProductCard from '../components/ui/ProductCard'; 
// Importamos los componentes de sección que crearemos después

const API_URL = 'http://localhost:4000/api/products';

function HomePage({ searchKeyword }) {
  // 1. Estados para manejar los datos y el ciclo de vida de la petición
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2. Hook useEffect para ejecutar la llamada a la API una vez al montar el componente
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url;

        // Si hay una palabra clave de búsqueda, usamos la URL de búsqueda.
        // Esto muestra todos los productos que coincidan con la búsqueda, sin importar si son destacados.
        if (searchKeyword) {
          url = `${API_URL}?keyword=${searchKeyword}`;
        } else {
          // Si NO hay búsqueda (página inicial), usamos una URL que traiga TODOS los productos.
          // El filtrado por 'isFeatured' lo haremos en el Frontend.
          url = API_URL;
        }

        // ÚNICA LLAMADA A LA API 
        const response = await axios.get(url);
        
        // El linter ya está feliz porque usamos 'response.data' inmediatamente.
        const allProducts = response.data;
        
        // LÓGICA DE FILTRADO PARA LA HOME PAGE 
        const productsToDisplay = searchKeyword
          ? allProducts // Si hay búsqueda, muestra todos los resultados.
          : allProducts
              .filter(p => p.isFeatured === true) // Filtra solo los destacados
              .slice(0, 4); // e este caso limita solo los primeros 4 destacados.

        setProducts(productsToDisplay);
        
        setError(null);
      } catch (err) {
        console.error("Error al cargar productos:", err);
        // Mensaje de error más útil en consola
        setError('Error al cargar la API de productos. ¿El Backend está corriendo en el puerto 4000?');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchKeyword]); 

  // 3. Renderizado Condicional: Muestra estado de carga o error
  if (loading) {
    return <div style={{ padding: '50px', textAlign: 'center' }}>Cargando productos... 🧉</div>;
  }

  if (error) {
    return <div style={{ padding: '50px', textAlign: 'center', color: 'red' }}>Error: {error}</div>;
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
          {/* Hemos cargado **{products.length} productos** desde la API. ¡Conexión Full-Stack Exitosa!*/}
          Descubrí nuestra selección exclusiva de mates y combos diseñados para cada momento.
        </p>

        {/* Botón CTA (siguiendo el estilo redondeado) */}
        <button className="bg-pmate-accent text-pmate-primary font-bold py-3 px-8 rounded-full shadow-lg hover:bg-[#03bcfa]/80 transition duration-300">
          Ver Combos Exclusivos
        </button>
      </section>

      {/* 2. SECCIONES DE PRODUCTOS (Categorías y Destacados) */}
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-pmate-primary text-center mb-8">
         Explora nuestras Categorías
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
        <h2 className="text-xl font-bold text-pmate-primary text-center mb-8"> Productos Destacados </h2>
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