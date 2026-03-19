import { useEffect, useState } from "react";

export default function useFetch(featchFunction, name) {
    const [datosGet, setDato] = useState([]);
    const [cargandoGet, setCargando] = useState(true);
    const [errorGet, setError] = useState(null);
    
    const executeFetch = async () => {
        try {
            setError(null);
            setCargando(true);
            const request = await featchFunction();
            setDato(request);
        } catch (error) {
            setError(`No se pudieron cargar ${name}.`); 
        } finally {
            setCargando(false);
        }
    };
    useEffect(() => {
        executeFetch();
    }, [featchFunction])    

    return { datosGet, cargandoGet, errorGet, refetch:executeFetch };
}


