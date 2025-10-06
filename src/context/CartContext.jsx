import React, { createContext, useState, useEffect } from 'react';

// 1. Crear el objeto Contexto
const CartContext = createContext();

// // 2. Hook personalizado para usar el contexto fácilmente
// export const useCart = () => {
//   return useContext(CartContext);
// };
// causaba error, se movió a useCart.js

// 3. Proveedor del Contexto (Provider)
export const CartProvider = ({ children }) => {
  // 1. Lógica de Inicialización: Cargar desde localStorage
  const [cartItems, setCartItems] = useState(() => {
    try {
      const localCart = localStorage.getItem('pmate_cart');
      // Si existe, parseamos el JSON y lo retornamos; si no, array vacío
      return localCart ? JSON.parse(localCart) : []; 
    } catch (e) {
      console.error("Error al cargar carrito desde localStorage:", e);
      return [];
    }
  });

  // 2. Lógica de Sincronización: Guardar en localStorage cada vez que cartItems cambia
  useEffect(() => {
    try {
      // Guardamos el estado actual como una cadena JSON
      localStorage.setItem('pmate_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error("Error al guardar carrito en localStorage:", e);
    }
  }, [cartItems]); // Se ejecuta cada vez que 'cartItems' cambia

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
  
  // FUNCIÓN 1: Eliminar un ítem por completo
  const removeItem = (_id) => {
    // Filtra y remueve el ítem que coincide con el ID
    setCartItems(cartItems.filter(item => item._id !== _id));
  };

  // FUNCIÓN 2: Actualizar la cantidad (+ o -)
  const updateQuantity = (_id, newQuantity) => {
    // Si la nueva cantidad es 0 o menos, eliminamos el producto
    if (newQuantity <= 0) {
      removeItem(_id);
      return;
    }

    setCartItems(
      cartItems.map(item =>
        item._id === _id
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const value = {
    cartItems,
    addItem,
    getTotalItems,
    removeItem,
    updateQuantity
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;