import axios from 'axios';

//La URL base del Backend API
const API_URL = 'http://localhost:4000/api/products'; 

/**
 * Obtiene la lista de todos los productos desde el Backend.
 */
export const getProducts = async () => {
    try {
        // Utilizamos el endpoint que ya validamos con Jest
        const response = await axios.get(API_URL); 

        // Retorna los datos que ya están en formato JSON
        return response.data; 
    } catch (error) {
        // Manejo de errores (por ejemplo, si el Backend está caído)
        console.error("Error al obtener productos:", error);
        // Lanzamos el error para que el componente lo maneje
        throw error; 
    }
};

// Futuras funciones:
// export const getProductById = async (id) => { ... }
// export const createProduct = async (productData) => { ... }