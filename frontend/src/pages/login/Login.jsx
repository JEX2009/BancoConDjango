// src/pages/usuarios/Login.jsx
import { useForm } from 'react-hook-form';
import { authService } from '../../api/UserService';
import { useNavigate } from 'react-router-dom';

export default function Login({setIsAuthenticated}) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
    try {
        await authService.login(data);
        setIsAuthenticated(true); 
        navigate('/');
    } catch (err) {
        alert("Error en las credenciales");
    }
};

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md border">
            <h2 className="text-2xl font-bold mb-6">Iniciar Sesión</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <input {...register("username", { required: true })} placeholder="Usuario" className="w-full border p-2 rounded" />
                <input type="password" {...register("password", { required: true })} placeholder="Contraseña" className="w-full border p-2 rounded" />
                <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">Entrar</button>
            </form>
        </div>
    );
}