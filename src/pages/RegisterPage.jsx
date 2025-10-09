// src/pages/RegisterPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/useAuth';

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const { login } = useAuth(); 
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        setMessage('');

        if (password !== confirmPassword) {
            setMessage('Las contraseñas no coinciden.');
            return;
        }

        try {
            // Llamada al Backend para autenticar
            const { data: _data } = await axios.post(
                'http://localhost:4000/api/users/register', // <-- ¡AQUÍ ESTABA EL ERROR!
                { name, email, password }
            );

            console.log('Datos de autenticación/registro recibidos:', _data);

            //  LÓGICA DE ÉXITO DE REGISTRO
            
            // 1. Guardar el estado de usuario globalmente
            login(_data);

            // 2. Mostrar el mensaje de éxito antes de redirigir
            setMessage('✅ Registro exitoso! Redirigiendo a la tienda...');

            // 3. Redirigir al usuario después de un breve retraso (buena UX)
            setTimeout(() => {
                navigate('/');
            }, 1000); // Redirige después de 1 segundo

        } catch (error) {
            let errorMessage = 'Error al registrar. Intenta de nuevo.';

            // Priorizar el mensaje de error del servidor si existe (incluye validaciones)
            if (error.response && error.response.data && error.response.data.message) {
                errorMessage = error.response.data.message;
            } else if (error.message) {
                errorMessage = error.message; // Mensaje de red (ej: "Network Error")
            }

            // ⭐️ ESTO ES CLAVE: Necesitas saber el mensaje exacto para corregir la contraseña.
            console.error("Error detallado del Servidor:", error.response);

            setMessage(errorMessage);
        }
    };

    return (
        <div className="max-w-md mx-auto my-12 p-8 bg-pmate-background rounded-xl shadow-2xl">
            <h1 className="text-3xl font-bold text-pmate-primary mb-6 text-center">Crear Cuenta</h1>
            {message && <p className={`p-3 mb-4 rounded ${message.includes('éxito') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{message}</p>}

            <form onSubmit={submitHandler} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-pmate-primary mb-1">Nombre</label>
                    <input
                        type="text"
                        value={name}
                        required
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-pmate-accent focus:border-pmate-accent"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-pmate-primary mb-1">Email</label>
                    <input
                        type="email"
                        value={email}
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-pmate-accent focus:border-pmate-accent"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-pmate-primary mb-1">Contraseña</label>
                    <input
                        type="password"
                        value={password}
                        required
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-pmate-accent focus:border-pmate-accent"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-pmate-primary mb-1">Confirmar Contraseña</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        required
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-pmate-accent focus:border-pmate-accent"
                    />
                </div>

                <button type="submit" className="w-full bg-pmate-primary text-white py-3 rounded-full font-bold hover:bg-pmate-secondary transition duration-300 shadow-md">
                    Registrarse
                </button>
            </form>

            <div className="pt-4 text-center text-sm">
                ¿Ya tienes una cuenta? <Link to="/login" className="text-pmate-accent hover:underline font-semibold">Iniciar Sesión</Link>
            </div>
        </div>
    );
};

export default RegisterPage;