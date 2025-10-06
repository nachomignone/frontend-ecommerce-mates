import React, { createContext, useState } from 'react';

// 1. Crear el objeto Contexto
const CartContext = createContext();

// // 2. Hook personalizado para usar el contexto fácilmente
// export const useCart = () => {
//   return useContext(CartContext);
// };
// causaba error, se movió a useCart.js

// 3. Proveedor del Contexto (Provider)
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Función para añadir un ítem al carrito
  const addItem = (product) => {
    // Verificar si el producto ya está en el carrito
    const existingItem = cartItems.find(item => item._id === product._id);

    if (existingItem) {
      // Si existe, aumentar la cantidad
      setCartItems(
        cartItems.map(item =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      // Si no existe, añadirlo con cantidad 1
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };
  
  // Función para obtener el total de ítems en el carrito (para el Navbar)
  const getTotalItems = () => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  };
  
  // 💡 NOTA: Más adelante añadiremos removeItem, clearCart y updateQuantity.

  const value = {
    cartItems,
    addItem,
    getTotalItems,
    // Aquí irán las otras funciones
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;