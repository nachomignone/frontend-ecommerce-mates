import { useContext } from 'react';
import CartContext from './CartContext'; // Importamos el objeto Contexto

// Hook personalizado para usar el contexto del carrito
export const useCart = () => {
  // Este hook permite a cualquier componente acceder a los valores del CartContext
  return useContext(CartContext);
};