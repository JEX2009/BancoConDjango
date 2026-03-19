import { useState } from "react"

export default function Paginador({ elementos, elementosPagina = 5 }) {
    const [paginaActual, setPaginaActual] = useState(1);
    const indiceFinal = paginaActual * elementosPagina;
    const indiceInicial = indiceFinal - elementosPagina
    const elementosPaginados = elementos.slice(indiceInicial, indiceFinal)
    const totalPaginas = Math.ceil(elementos.length / elementosPagina)

    const siguiente = () => {
        if (paginaActual < totalPaginas) {
            setPaginaActual(paginaActual + 1)
        }
    }
    const anterior = () => {
        if (paginaActual !== 1) {
            setPaginaActual(paginaActual - 1)
        }
    }
    return (
        <>
        </>
    )
}