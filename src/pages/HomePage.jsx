import React, { useState, useEffect } from 'react'; // IMPORTANTE: Importamos los Hooks
import { Link } from 'react-router-dom';
import axios from 'axios'; // Para hacer llamadas HTTP a la API

import ProductList from '../components/ProductList';
import CategoryCard from '../components/ui/CategoryCard';
import ReviewSection from '../components/ReviewSection';
import ProductCard from '../components/ui/ProductCard'; 
import PromotionBanner from '../components/ui/PromotionBanner';
// Importamos los componentes de sección que crearemos después

const API_URL = 'http://localhost:4000/api/products';

// ⭐️ DATOS DE CATEGORÍAS CON IMÁGENES ⭐️
const ALL_CATEGORIES = [
    { name: 'Mates', image: '/assets/images/categoryMates.png' },
    { name: 'Combos', image: '/assets/images/categoryCombos.png' },
    { name: 'Bombillas', image: '/assets/images/categoryBombillas.png' },
    { name: 'Termos', image: '/assets/images/categoryTermos.png' },
    { name: 'Yerbas', image: '/assets/images/categoryYerbas.png' },
    { name: 'Materas', image: '/assets/images/categoryMatera.png' },
];

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
      
      {/* BANNER DE PROMOCIÓN ACTIVA */}
      <PromotionBanner /> 

      {/* ⭐️ HERO SECTION (Banner con Imagen) ⭐️ */}
            <div className="relative h-96 md:h-[500px] bg-pmate-primary overflow-hidden">
                {/* Imagen de Fondo (Asegúrate de que la URL sea correcta) */}
                <img
                    src="/assets/images/bannerHero2.jpg"
                    alt="Colección de mates y termos de Pmate"
                    className="w-full h-full object-cover opacity-60"
                />
                
                {/* Contenido Central */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                    <h1 className="text-5xl md:text-7xl font-black text-white drop-shadow-lg mb-4 uppercase tracking-tight">
                        PMATE
                    </h1>
                    <p className="text-xl md:text-2xl text-white font-semibold mb-8 max-w-lg">
                        Un mate a la medida de cada ocasión.
                    </p>
                    <Link
                        to="/tienda"
                        className="bg-pmate-accent text-pmate-primary font-bold py-3 px-8 rounded-full shadow-xl hover:bg-pmate-secondary transition duration-300 transform hover:scale-105"
                    >
                        Ver Catálogo
                    </Link>
                </div>
            </div>
      {/* 2. SECCIONES DE PRODUCTOS (Categorías y Destacados) */}
            <section className="py-12 px-6 max-w-7xl mx-auto"> 
                <h2 className="text-3xl font-bold text-pmate-primary text-center mb-8">
                    Explorá nuestras Categorías
                </h2>

                {/* Contenedor Grid: 6 columnas para Desktop (lg:grid-cols-6) */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"> 
                    {ALL_CATEGORIES.map((category) => (
                        <CategoryCard 
                            key={category.name} 
                            name={category.name} 
                            imageUrl={category.image} // ⬅️ PASAMOS LA IMAGEN
                        />
                    ))}
                </div>
            </section>


      <section className="section-destacados py-12">
        <h2 className="text-3xl font-bold text-pmate-primary text-center mb-8"> Productos Destacados </h2>
        {products.length > 0 ? (
          <ProductList products={products.slice(0,3)} />
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