import {  useState } from "react";

export default function useCreate(createFunction, actualizeFunction = null) {
    const [exitoPost, setExito] = useState(false);
    const [cargandoPost, setCargando] = useState(false);
    const [errorPost, setError] = useState(false);


    const post = async (dataToSend) => {
        try {
            setCargando(true);
            const response = await createFunction(dataToSend);
            if (actualizeFunction !== null) {
                actualizeFunction();
            }
            setExito(true);
            return response;
        } catch (error) {
            setError(true);
        } finally {
            setCargando(false);
            setTimeout(() => {
                setError(false);
                setExito(false)
            }, 5000);
        }
    }

    return { cargandoPost, errorPost, exitoPost, post };
}