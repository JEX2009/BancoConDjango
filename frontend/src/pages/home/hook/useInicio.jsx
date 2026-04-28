import { useState, useEffect } from "react";
import { transaccionService } from "../../../api/TransaccionService";
import useFetch from "../../../hooks/useFeatch";

export default function useInicio() {
    // Carga inicial de transacciones (las primeras)
    const { datosGet, cargandoGet, errorGet, refetch: executeFetch } = useFetch(transaccionService.getFirsts);

    const [registrosSobre, setRegistrosSobre] = useState([]);
    const [cargandoRegistrosSobre, setCargandoRegistrosSobre] = useState(false);
    const [errorRegistrosSobre, setErrorRegistrosSobre] = useState(null);

    useEffect(() => {
        executeFetch();
    }, []);

    const masRegistros = async (sobre_id, fecha_inicio, fecha_fin) => {
        try {
            setErrorRegistrosSobre(null);
            setCargandoRegistrosSobre(true);
            const response = await transaccionService.getSobreTransacction(sobre_id, fecha_inicio, fecha_fin);
            const data = response;
            setRegistrosSobre(data);
            return data;
        } catch (error) {
            setErrorRegistrosSobre("No se pudieron obtener los movimientos filtrados");
            return null;
        } finally {
            setCargandoRegistrosSobre(false);
        }
    };

    return { 
        masRegistros, 
        registrosSobre, 
        cargandoRegistrosSobre, 
        errorRegistrosSobre, 
        datosGet, 
        cargandoGet, 
        errorGet 
    };
}