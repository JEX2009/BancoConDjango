import { useEffect, useState } from "react";

export default function useFetch(featchFunction, name) {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const executeFetch = async () => {
        try {
            setError(null);
            setIsLoading(true);
            const request = await featchFunction();
            setData(request);
        } catch (error) {
            setError(`No se pudieron cargar ${name}.`); 
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        executeFetch();
    }, [featchFunction])    

    return { data, isLoading, error, refetch: executeFetch };
}

