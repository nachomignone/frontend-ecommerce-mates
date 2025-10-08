// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/useAuth'; // hook personalizado para usar el contexto de autenticación

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const { login } = useAuth(); // Obtenemos la función de login del contexto
    const navigate = useNavigate(); // Hook para la redirección

    const submitHandler = async (e) => {
        e.preventDefault();
        setMessage('');

        try {
            // Llamada al Backend para autenticar
            const { data: _data } = await axios.post(
                'http://localhost:4000/api/users/login',
                { email, password, name } // Envía name solo si es la página de registro
            );

            console.log('Datos de autenticación/registro recibidos:', _data);

            // LÓGICA DE ESTADO
            // Gestion de estado: llama a la funcion global de login
            login(_data); 
            // Redirige a la página principal después del login
            navigate('/');

            setMessage('Inicio de sesión exitoso! Redirigiendo...'); // o Registro exitoso! Redirigiendo a la tienda...
            // En un paso futuro, guardaremos el token y el usuario aquí

        } catch (error) {
            setMessage(error.response && error.response.data.message
                ? error.response.data.message
                : error.message);
        }
    };

    return (
        <div className="max-w-md mx-auto my-12 p-8 bg-pmate-background rounded-xl shadow-2xl">
            <h1 className="text-3xl font-bold text-pmate-primary mb-6 text-center">Iniciar Sesión</h1>
            {message && <p className={`p-3 mb-4 rounded ${message.includes('éxito') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{message}</p>}

            <form onSubmit={submitHandler} className="space-y-4">
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

                <button type="submit" className="w-full bg-pmate-primary text-white py-3 rounded-full font-bold hover:bg-pmate-secondary transition duration-300 shadow-md">
                    Iniciar Sesión
                </button>
            </form>

            <div className="pt-4 text-center text-sm">
                ¿Aún no tienes una cuenta? <Link to="/register" className="text-pmate-accent hover:underline font-semibold">Regístrate Aquí</Link>
            </div>
        </div>
    );
};

export default LoginPage;