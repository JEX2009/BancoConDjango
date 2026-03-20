import { useState } from "react";

export default function useUpdate(updateFunction,actualizeFunction) {
    const [datosPut, setDatos] = useState([]);
    const [exitoPut, setExito] = useState(false);
    const [cargandoPut, setCargando] = useState(false);
    const [errorPut, setError] = useState(false);

    const put = async (id, dataToSend) => {
        try {
            setError(null);
            setCargando(true);
            const response = await updateFunction(id, dataToSend);
            if (actualizeFunction !== null) {
                actualizeFunction();
            }
            setDatos(response);
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
    return { datosPut, cargandoPut, errorPut, exitoPut, put };
}
