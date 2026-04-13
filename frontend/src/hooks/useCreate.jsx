import { useState } from "react";

export default function useCreate(createFunction, actualizeFunction = null) {
    const [exitoPost, setExito] = useState(false);
    const [cargandoPost, setCargando] = useState(false);
    const [errorPost, setError] = useState("");


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
            // console.log(error.response.data.error);
            setError(error.response.data.error);
        } finally {
            setCargando(false);
            setTimeout(() => {
                setError("");
                setExito(false)
            }, 5000);
        }
    }

    return { cargandoPost, errorPost, exitoPost, post };
}