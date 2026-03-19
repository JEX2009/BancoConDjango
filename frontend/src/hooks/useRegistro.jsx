import { useState } from 'react';
import { authService } from '../api/UserService';
import { useNavigate } from 'react-router-dom';

export function useRegistro() {
    const [cargar, setCargar] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const registrarUsuario = async (formData) => {
        setCargar(true);
        setError(null);
        try {
            await authService.registro(formData);
            navigate('/login');
        } catch (err) {
            setError(err.response?.data || "Error al registrar usuario");
        } finally {
            setCargar(false);
        }
    };

    return { registrarUsuario, cargar, error };
}