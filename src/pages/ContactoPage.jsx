// src/pages/ContactPage.jsx
import React from 'react';
import { useAuth } from '../context/useAuth';

const ContactPage = () => {
    const { user } = useAuth(); // Podemos precargar el email del usuario logueado

    return (
        <div className="max-w-4xl mx-auto my-12 p-8 bg-pmate-background rounded-xl shadow-2xl">
            <h1 className="text-4xl font-bold text-pmate-primary mb-6 border-b pb-3">
                ¿Necesitas Ayuda? Contáctanos
            </h1>
            <p className="text-gray-700 mb-6">
                Te responderemos a la brevedad. Tu consulta es importante para el equipo de Pmate.
            </p>

            <form className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-pmate-primary mb-1">Tu Nombre</label>
                    <input type="text" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-pmate-accent focus:border-pmate-accent" placeholder="Juan Ignacio" defaultValue={user ? user.name : ''} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-pmate-primary mb-1">Tu Email</label>
                    <input type="email" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-pmate-accent focus:border-pmate-accent" placeholder="juan.ignacio@email.com" defaultValue={user ? user.email : ''} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-pmate-primary mb-1">Mensaje</label>
                    <textarea rows="4" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-pmate-accent focus:border-pmate-accent" placeholder="Escribe aquí tu consulta..."></textarea>
                </div>
                
                <button type="submit" className="w-full bg-pmate-accent text-pmate-primary py-3 rounded-full font-bold hover:bg-pmate-primary/90 transition duration-300 shadow-md">
                    Enviar Mensaje
                </button>
            </form>
        </div>
    );
};

export default ContactPage;