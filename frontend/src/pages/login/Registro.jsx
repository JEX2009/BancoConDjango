import { useForm } from 'react-hook-form';
import { useRegistro } from '../../hooks/useRegistro';

export default function Registro() {
    const { registrarUsuario, loading, error: serverError } = useRegistro();
    
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = (data) => {
        registrarUsuario(data);
    };

    const password = watch("password");

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md border border-gray-100">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">Crear Cuenta</h2>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Usuario</label>
                    <input 
                        type="text" 
                        className={`w-full border p-2 rounded mt-1 outline-none focus:ring-2 ${errors.username ? 'border-red-500 focus:ring-red-200' : 'focus:ring-blue-200'}`}
                        {...register("username", { required: "El usuario es obligatorio" })}
                    />
                    {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>}
                    {serverError?.username && <p className="text-red-500 text-xs mt-1">Este usuario ya existe.</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input 
                        type="email" 
                        className={`w-full border p-2 rounded mt-1 outline-none focus:ring-2 ${errors.email ? 'border-red-500' : 'focus:ring-blue-200'}`}
                        {...register("email", { 
                            required: "El email es obligatorio",
                            pattern: { value: /^\S+@\S+$/i, message: "Email no válido" }
                        })}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Contraseña</label>
                    <input 
                        type="password" 
                        className="w-full border p-2 rounded mt-1 outline-none focus:ring-2 focus:ring-blue-200"
                        {...register("password", { 
                            required: "La contraseña es obligatoria",
                            minLength: { value: 6, message: "Mínimo 6 caracteres" }
                        })}
                    />
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Confirmar Contraseña</label>
                    <input 
                        type="password" 
                        className="w-full border p-2 rounded mt-1 outline-none focus:ring-2 focus:ring-blue-200"
                        {...register("password_confirm", { 
                            required: "Debes confirmar tu contraseña",
                            validate: value => value === password || "Las contraseñas no coinciden"
                        })}
                    />
                    {errors.password_confirm && <p className="text-red-500 text-xs mt-1">{errors.password_confirm.message}</p>}
                </div>

                {serverError?.non_field_errors && (
                    <div className="bg-red-50 p-2 rounded text-red-600 text-sm">
                        {serverError.non_field_errors}
                    </div>
                )}

                <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-blue-600 text-white p-2 rounded font-semibold hover:bg-blue-700 disabled:bg-blue-300 transition-colors"
                >
                    {loading ? 'Procesando...' : 'Registrarse'}
                </button>
            </form>
        </div>
    );
}