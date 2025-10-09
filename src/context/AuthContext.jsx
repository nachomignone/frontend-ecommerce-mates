// src/context/AuthContext.jsx

import React, { createContext, useState } from 'react';

// 1. Crear el objeto Contexto
const AuthContext = createContext();

// 2. Proveedor del Contexto (Provider)
export const AuthProvider = ({ children }) => {
    // Inicializa el estado leyendo de localStorage
    const [user, setUser] = useState(() => {
        const userInfo = localStorage.getItem('userInfo');
        return userInfo ? JSON.parse(userInfo) : null;
    });

    // Función global para manejar el inicio de sesión
    const login = (userInfo) => {
        // Guarda el token y datos del usuario en el estado
        setUser(userInfo);
        // Guarda en el almacenamiento local para persistencia
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
    };

    // Función global para manejar el cierre de sesión
    const logout = () => {
        setUser(null);
        localStorage.removeItem('userInfo');
        // También eliminamos el carrito si existe (opcional, pero buena UX)
        localStorage.removeItem('pmate_cart'); 
    };

    // FUNCIÓN PARA ACTUALIZAR EL PERFIL 
    const updateProfile = (updatedUser) => {
        setUser(updatedUser);
        localStorage.setItem('userInfo', JSON.stringify(updatedUser));
    };

    const value = {
        user,
        login,
        logout,
        updateProfile,
        isAuthenticated: !!user, // Booleano para saber si el usuario está logueado
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;