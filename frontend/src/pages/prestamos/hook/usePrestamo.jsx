import { useState } from "react";
import { prestamoService } from "../../../api/PrestamoService";
import useCreate from "../../../hooks/useCreate";
import useFetch from "../../../hooks/useFeatch";

export default function usePrestamo() {
    const { datosGet: prestamos, cargandoGet, errorGet, refetch } = useFetch(prestamoService.getAll, 'prestamos');
    const { cargandoPost, errorPost, exitoPost, post } = useCreate(prestamoService.create, refetch);

    const [cargandoPago, setCargandoPago] = useState(false);
    const [pago, setPago] = useState();
    const [errorPago, setErrorPago] = useState();
    const [exitoPago, setExitoPago] = useState();
    
    const pagarPrestamo = async (id, monto) => {
        try {
            setCargandoPago(true);
            const response = await prestamoService.pagar(id, monto);
            setPago(response);
            setExitoPago(true);
            refetch(); 
        } catch (error) {
            setErrorPago(error);
        } finally{
            setCargandoPago(false);
            setTimeout(() => {
                setErrorPago("");
                setExitoPago(false)
            }, 5000);
        }
    };   

    return { prestamos, cargandoGet, errorGet, refetch, cargandoPost, errorPost, exitoPost, post, pagarPrestamo, cargandoPago, errorPago, exitoPago };
}