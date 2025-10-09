// src/components/common/ProtectedRoute.jsx

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';

const ProtectedRoute = () => {
    const { isAuthenticated } = useAuth(); // Estado global de autenticación

    // Outlet permite renderizar el componente hijo (ProfilePage o OrdersPage)
    // Si isAuthenticated es TRUE, muestra el contenido.
    // Si isAuthenticated es FALSE, redirige a /login.
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;