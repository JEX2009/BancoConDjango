import { useState, useCallback } from 'react'
import { sobreService } from '../../../api/SobreService'
import useCreate from '../../../hooks/useCreate';
import useFetch from '../../../hooks/useFeatch';
import useUpdate from '../../../hooks/useUpdate';

export function useSobres() {
    const { datosGet, cargandoGet, errorGet, refetch: executeFetch } = useFetch(sobreService.getAll);
    const { cargandoPost, errorPost, exitoPost, post } = useCreate(sobreService.create,executeFetch);
    const { datosPut, cargandoPut, errorPut, exitoPut, put } = useUpdate(sobreService.update,executeFetch)
    const getSobres =()=>{
        executeFetch();
    };

    const postSobres = (data)=>{
        post(data);
    };
    const putSobre = (id,data)=>{
        put(id,data);
    };

    const [exitoDel, setExito] = useState(false);
    const [cargandoDel, setCargando] = useState(false);
    const [errorDel, setError] = useState(false);

    const del = async (id) => {
        try {
            setError(null);
            setCargando(true);
            const response = await sobreService.delete(id);
            executeFetch();
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

    const [exitoReactivar, setExitoReactivar] = useState(false);
    const [cargandoReactivar, setCargandoReactivar] = useState(false);
    const [errorReactivar, setErrorReactivar] = useState(false);

    const reactivar = async (id) => {
        try {
            setErrorReactivar(null);
            setCargandoReactivar(true);
            const response = await sobreService.reactivate(id);
            executeFetch();
            setExitoReactivar(true);
            return response;
        } catch (error) {
            setErrorReactivar(true);
        } finally {
            setCargandoReactivar(false);
            setTimeout(() => {
                setErrorReactivar(false);
                setExitoReactivar(false)
            }, 5000);
        }
    }

    return {datosGet ,cargandoGet,errorGet,getSobres,cargandoPost, errorPost, exitoPost,postSobres,datosPut, cargandoPut, errorPut, exitoPut,putSobre,exitoDel,cargandoDel,errorDel,del,exitoReactivar,cargandoReactivar,errorReactivar,reactivar};
}