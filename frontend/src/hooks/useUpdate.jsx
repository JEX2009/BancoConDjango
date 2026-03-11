import { useState } from "react";

export default function useUpdate(updateFunction) {
    const [data, setData] = useState([]);
    const [succes, setSucces] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleUpdate = async (id, dataToSend) => {
        try {
            setError(null);
            setIsLoading(true);
            const response = await updateFunction(id, dataToSend);
            setData(response);
            setSucces("Se a actualizado con exito");
            return response;
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    }
    return { data, isLoading, error, succes, handleUpdate };
}