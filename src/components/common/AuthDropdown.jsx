// src/components/common/AuthDropdown.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';

export const AuthDropdown = ({ setIsAuthOpen }) => {
    // Obtenemos el estado de autenticación y la función de logout
    const { user, isAuthenticated, logout } = useAuth();

    // Función para cerrar el dropdown al hacer clic en un enlace o botón
    const handleAction = () => {
        setIsAuthOpen(false);
    };

    return (
        <div className="absolute right-0 mt-3 w-48 bg-white rounded-lg shadow-xl z-50 border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100">
                {isAuthenticated ? (
                    // VISTA DE USUARIO AUTENTICADO 
                    <div>
                        <p className="text-sm font-semibold text-gray-800 truncate">Hola, {user.name || user.email.split('@')[0]}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                ) : (
                    // VISTA DE USUARIO NO AUTENTICADO 
                    <p className="text-sm text-gray-500">Accede a tu cuenta</p>
                )}
            </div>

            <div className="py-1">
                {isAuthenticated ? (
                    <>
                        {/* Enlaces para usuarios logueados */}
                        <Link 
                            to="/profile" // Necesitarías crear esta ruta más adelante
                            onClick={handleAction} 
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                            Mi Perfil
                        </Link>
                        <Link 
                            to="/orders" // Necesitarías crear esta ruta más adelante
                            onClick={handleAction} 
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                            Mis Pedidos
                        </Link>
                        {/* Si el usuario es administrador, mostramos el panel de gestión*/}
                        {isAuthenticated && user.isAdmin && (
                            <Link
                                to="/admin/discounts"
                                onClick={handleAction}
                                className="block px-4 py-2 text-sm font-semibold text-orange-600 hover:bg-orange-50 transition border-t mt-1 pt-1"
                            >
                                Gestión de Precios
                            </Link>
                        )}
                        {/*  ENLACE DIRECTO A GESTIÓN DE Promociones  */}
                        {user.isAdmin && (
                            <Link 
                                to="/admin/promotions" 
                                onClick={handleAction} 
                                className="block px-4 py-2 text-sm font-semibold text-orange-600 hover:bg-orange-50 transition border-b border-gray-100"
                            >
                                Gestión de Promociones
                            </Link>
                        )}
                        <button
                            onClick={() => { logout(); handleAction(); }}
                            className="w-full text-left px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 transition"
                        >
                            Cerrar Sesión
                        </button>
                    </>
                ) : (
                    <>
                        {/* Enlaces para usuarios NO logueados */}
                        <Link 
                            to="/login" 
                            onClick={handleAction} 
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-semibold"
                        >
                            🔑 Iniciar Sesión
                        </Link>
                        <Link 
                            to="/register" 
                            onClick={handleAction} 
                            className="block px-4 py-2 text-sm text-pmate-primary hover:bg-gray-100"
                        >
                            ➕ Crear Cuenta
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
};

