// src/pages/ProfilePage.jsx

import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/useAuth';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
    // Obtenemos el usuario y la función de actualización del contexto
    const { user, logout, updateProfile } = useAuth(); 
    const navigate = useNavigate();

    //  Estados para el Formulario 
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [gender, setGender] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [message, setMessage] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    
    // Estado para dirección (Simplificada: usaremos solo calle y ciudad por ahora)
    const [addressStreet, setAddressStreet] = useState('');
    const [addressCity, setAddressCity] = useState('');

    // Cargar datos iniciales del usuario al montar el componente
    useEffect(() => {
        if (user) {
            setName(user.name || '');
            setEmail(user.email || '');
            setDateOfBirth(user.dateOfBirth ? user.dateOfBirth.substring(0, 10) : '');
            setGender(user.gender || '');
            
            // Cargar la primera dirección (si existe)
            const defaultAddress = user.shippingAddresses && user.shippingAddresses[0];
            setAddressStreet(defaultAddress ? defaultAddress.street : '');
            setAddressCity(defaultAddress ? defaultAddress.city : '');
        }
    }, [user]);

    const submitHandler = async (e) => {
        e.preventDefault();
        setMessage('');

        if (password !== confirmPassword) {
            setMessage('Las contraseñas no coinciden.');
            return;
        }

        try {
            const config = {
                headers: {
                    //  ENVIAR EL TOKEN JWT EN LOS HEADERS DE AUTORIZACIÓN 
                    Authorization: `Bearer ${user.token}`, 
                    'Content-Type': 'application/json',
                },
            };
            
            // Datos a enviar (solo incluimos password si el campo no está vacío)
            const updateData = {
                name,
                email,
                password: password || undefined,
                dateOfBirth,
                gender,
                shippingAddress: { // Enviamos la dirección como un objeto simple
                    street: addressStreet,
                    city: addressCity,
                    country: 'Argentina',
                    postalCode: 'T4000', // Código postal de Tucumán como ejemplo
                }
            };

            const { data } = await axios.put(
                'http://localhost:4000/api/users/profile',
                updateData,
                config // Enviamos los headers con el Token
            );

            // Actualizar el estado global de autenticación con la nueva información
            updateProfile(data); 

            setMessage('Perfil actualizado con éxito.');
            setIsEditing(false); // Sale del modo edición

        } catch (error) {
            const errorMessage = error.response && error.response.data.message
                ? error.response.data.message
                : 'Error al actualizar el perfil.';
            
            setMessage(errorMessage);

            //  USO DE navigate: Si el token falla (401), redirigimos al login 
            if (error.response && error.response.status === 401) {
                logout(); // Limpia la sesión actual del Frontend
                navigate('/login');
            }
        }
    };

    if (!user) return <div className="p-8 text-center">Inicia sesión para ver tu perfil.</div>;


    return (
        <div className="max-w-4xl mx-auto my-10 p-8 bg-white rounded-xl shadow-2xl">
            <h1 className="text-4xl font-extrabold text-pmate-primary mb-6 border-b pb-2">
                Mi Perfil
            </h1>
            
            {message && <p className={`p-3 mb-4 rounded ${message.includes('éxito') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{message}</p>}

            {/* BOTÓN DE EDICIÓN / CANCELAR */}
            <div className="text-right mb-6">
                <button 
                    onClick={() => { setIsEditing(!isEditing); setMessage(''); }}
                    className="bg-pmate-accent text-white py-2 px-6 rounded-full font-semibold hover:bg-pmate-secondary transition"
                >
                    {isEditing ? 'Cancelar Edición' : 'Editar Información'}
                </button>
            </div>
            
            <form onSubmit={submitHandler}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    
                    {/*  SECCIÓN 1: DETALLES DE USUARIO */}
                    <div>
                        <h2 className="text-2xl font-bold text-pmate-primary mb-4">Detalles del Usuario</h2>
                        <div className="space-y-4">
                            <label className="block">
                                <span className="text-gray-700">Nombre Completo:</span>
                                <input type="text" value={name} onChange={(e) => setName(e.target.value)} 
                                    readOnly={!isEditing} 
                                    className={`w-full mt-1 p-3 border rounded-lg ${isEditing ? 'bg-white border-pmate-accent' : 'bg-gray-100 border-gray-300'}`}
                                />
                            </label>
                            
                            <label className="block">
                                <span className="text-gray-700">Fecha de Nacimiento:</span>
                                <input type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} 
                                    readOnly={!isEditing} 
                                    className={`w-full mt-1 p-3 border rounded-lg ${isEditing ? 'bg-white border-pmate-accent' : 'bg-gray-100 border-gray-300'}`}
                                />
                            </label>

                            <label className="block">
                                <span className="text-gray-700">Sexo:</span>
                                <select value={gender} onChange={(e) => setGender(e.target.value)} 
                                    disabled={!isEditing}
                                    className={`w-full mt-1 p-3 border rounded-lg ${isEditing ? 'bg-white border-pmate-accent' : 'bg-gray-100 border-gray-300'}`}
                                >
                                    <option value="">Seleccione</option>
                                    <option value="Masculino">Masculino</option>
                                    <option value="Femenino">Femenino</option>
                                    <option value="Otro">Otro</option>
                                </select>
                            </label>
                        </div>
                    </div>

                    {/*  SECCIÓN 2: DATOS DE ACCESO Y DIRECCIONES  */}
                    <div>
                        <h2 className="text-2xl font-bold text-pmate-primary mb-4">Datos de Acceso</h2>
                        <div className="space-y-4">
                            <label className="block">
                                <span className="text-gray-700">Email:</span>
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} 
                                    readOnly={!isEditing} 
                                    className={`w-full mt-1 p-3 border rounded-lg ${isEditing ? 'bg-white border-pmate-accent' : 'bg-gray-100 border-gray-300'}`}
                                />
                            </label>
                            
                            <label className="block">
                                <span className="text-gray-700">Nueva Contraseña:</span>
                                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} 
                                    readOnly={!isEditing} 
                                    placeholder={isEditing ? "Dejar vacío para no cambiar" : "********"}
                                    className={`w-full mt-1 p-3 border rounded-lg ${isEditing ? 'bg-white border-pmate-accent' : 'bg-gray-100 border-gray-300'}`}
                                />
                            </label>

                            <label className="block">
                                <span className="text-gray-700">Confirmar Contraseña:</span>
                                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} 
                                    readOnly={!isEditing} 
                                    placeholder={isEditing ? "Dejar vacío para no cambiar" : "********"}
                                    className={`w-full mt-1 p-3 border rounded-lg ${isEditing ? 'bg-white border-pmate-accent' : 'bg-gray-100 border-gray-300'}`}
                                />
                            </label>
                        </div>
                    </div>
                    
                    {/* SECCIÓN 3: DIRECCIONES DE ENVÍO  */}
                    <div className="md:col-span-2 border-t pt-6">
                        <h2 className="text-2xl font-bold text-pmate-primary mb-4">Direcciones de Envío</h2>
                        <label className="block">
                            <span className="text-gray-700">Calle y Número:</span>
                            <input type="text" value={addressStreet} onChange={(e) => setAddressStreet(e.target.value)} 
                                readOnly={!isEditing} 
                                className={`w-full mt-1 p-3 border rounded-lg ${isEditing ? 'bg-white border-pmate-accent' : 'bg-gray-100 border-gray-300'}`}
                            />
                        </label>
                        <label className="block mt-4">
                            <span className="text-gray-700">Ciudad:</span>
                            <input type="text" value={addressCity} onChange={(e) => setAddressCity(e.target.value)} 
                                readOnly={!isEditing} 
                                className={`w-full mt-1 p-3 border rounded-lg ${isEditing ? 'bg-white border-pmate-accent' : 'bg-gray-100 border-gray-300'}`}
                            />
                        </label>
                    </div>

                    {/* SECCIÓN 4: BOTÓN DE GUARDAR Y AYUDA */}
                    <div className="md:col-span-2 pt-4">
                        {isEditing && (
                            <button type="submit" className="w-full bg-pmate-secondary text-white py-3 rounded-full font-bold hover:bg-pmate-primary transition duration-300 shadow-lg">
                                Guardar Cambios
                            </button>
                        )}
                        <div className="mt-6 p-4 bg-gray-50 rounded-lg text-center">
                        <h3 className="font-semibold text-pmate-primary mb-2">¿Necesitas Ayuda?</h3>
                        <p className="text-sm text-gray-600 mb-4">Para cualquier consulta, contáctanos a soporte@pmate.com</p>
                        
                        {/*  USO DE logout: Botón de Cierre de Sesión  */}
                        <button 
                            onClick={logout} 
                            className="text-sm text-red-600 font-semibold hover:underline"
                        >
                            Cerrar Sesión Aquí
                        </button>
                    </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ProfilePage;