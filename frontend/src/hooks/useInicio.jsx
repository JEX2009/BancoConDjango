import { useState, useCallback } from 'react'
import { sobreService } from '../../api/SobreService'

export function useInicio() {
    const [sobres, setSobres] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const getSobres = useCallback(async () => {
        setError(null);
        setLoading(true);
        try {
            const data = await sobreService.getAll();
            setSobres(data);
        } catch (err) {
            setError(err.response?.data?.detail || "Error al conectar con el servidor");
        } finally {
            setLoading(false);
        }
    }, []); 

    return {
        sobres,
        error,
        loading,
        getSobres
    };
}