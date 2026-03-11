// src/pages/usuarios/Login.jsx
import { set, useForm } from 'react-hook-form';
import { authService } from '../../api/UserService';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Login({ setIsAuthenticated }) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [error, setError] = useState()
    const onSubmit = async (data) => {
        try {
            await authService.login(data);
            setIsAuthenticated(true);
            navigate('/');
        } catch (err) {
            setError(true)
            
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md border">
            <h2 className="text-2xl font-bold mb-6">Iniciar Sesión</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <input {...register("username", { required: "El usuario es obligatorio" })} placeholder="Usuario" className={`w-full border p-2 rounded ${errors.username ? 'border-red-500' : 'border-gray-300'}`} />
                    {errors.username && (
                        <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
                    )}
                </div>
                <div>
                    <input type="password" {...register("password", { required: "La contraseña es obligatora"})} placeholder="Contraseña" className={`w-full border p-2 rounded ${errors.password ? 'border-red-500' : 'border-gray-300'}`} />
                    {errors.username && (
                        <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                    )}
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">Entrar</button>
                {error && (<span className="text-red-500 text-sm mt-1"></span>)}
            </form>
        </div>
    );
}