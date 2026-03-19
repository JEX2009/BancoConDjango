import { useState, useEffect } from "react";

export default function usePaginador(elementos, elementosPagina = 5) {
    const [paginaActual, setPaginaActual] = useState(1);

    useEffect(() => {
        setPaginaActual(1);
    }, [elementos.length]); 

    const totalPaginas = Math.ceil(elementos.length / elementosPagina);
    
    const indiceFinal = paginaActual * elementosPagina;
    const indiceInicial = indiceFinal - elementosPagina;
    
    const elementosPaginados = elementos.slice(indiceInicial, indiceFinal);

    const siguiente = () => {
        if (paginaActual < totalPaginas) setPaginaActual(prev => prev + 1);
    };

    const anterior = () => {
        if (paginaActual > 1) setPaginaActual(prev => prev - 1);
    };

    return {
        elementosPaginados,
        siguiente,
        anterior,
        paginaActual,
        totalPaginas,
        esPrimeraPagina: paginaActual === 1,
        esUltimaPagina: paginaActual === totalPaginas || totalPaginas === 0
    };
}