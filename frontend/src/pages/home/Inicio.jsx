import { useState, useEffect } from "react";
import useInicio from "./hook/useInicio";
import Toast from "../../components/Toast";
import LoadingSpinner from "../../components/LoadingSpinner";
import ErrorMessage from "../../components/ErrorMessage";
import { HiOutlineArrowNarrowDown, HiOutlineArrowNarrowUp, HiOutlineInbox } from "react-icons/hi";
import usePaginador from "../../hooks/usePaginador";
import TablaTransacciones from "./TablaTransacciones";
import FechaFormulario from "./FechaFormulario";

export default function Inicio({ autenticado }) {
    const {
        masRegistros,
        registrosSobre,
        cargandoRegistrosSobre,
        errorRegistrosSobre,
        datosGet,
        cargandoGet,
        errorGet
    } = useInicio();

    const [fuenteDatos, setFuenteDatos] = useState([]);

    // Sincronizar fuente de datos (Prioriza resultados de filtros sobre carga inicial)
    useEffect(() => {
        const datos = registrosSobre.length > 0 ? registrosSobre : (datosGet || []);
        setFuenteDatos(datos);
    }, [datosGet, registrosSobre]);

    // Implementación de tu hook de paginación
    const {
        elementosPaginados, siguiente, anterior,
        paginaActual, totalPaginas, esPrimeraPagina, esUltimaPagina
    } = usePaginador(fuenteDatos, 6);

    if (cargandoGet) return <LoadingSpinner />;


    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            {/* Header Minimalista */}
            <div className="mb-10 flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-black text-gray-800 tracking-tighter">Movimientos</h1>
                    <p className="text-gray-400 font-medium text-sm">Historial detallado de actividad</p>
                </div>

                {totalPaginas > 0 && (
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest bg-gray-50 px-3 py-1 rounded-full">
                        Página {paginaActual} de {totalPaginas}
                    </span>
                )}
            </div>
            <FechaFormulario
                cargandoRegistrosSobre={cargandoRegistrosSobre}
                masRegistros={masRegistros}
            />
            {autenticado === false && (
                <div className="mb-6 p-4 bg-amber-50 border border-amber-100 rounded-2xl">
                    <p className="text-amber-600 text-xs font-medium text-center">
                        Si no hay una sesión activa no se podrán ver los registros.
                    </p>
                </div>
            )}
            {/* Contenedor Principal */}
            <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-hidden">
                {fuenteDatos.length === 0 ? (
                    /* Estado Vacío */
                    <div className="py-20 flex flex-col items-center justify-center text-center">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                            <HiOutlineInbox className="text-gray-300 text-2xl" />
                        </div>
                        <h3 className="text-gray-500 font-bold">No hay registros</h3>
                        <p className="text-gray-400 text-xs mt-1">No se encontraron movimientos en este periodo.</p>
                    </div>
                ) : (
                    /* Tabla de Datos */
                    <div className="overflow-x-auto">
                        <TablaTransacciones
                            elementosPaginados={registrosSobre ? registrosSobre : elementosPaginados}
                        />
                    </div>
                )}
            </div>

            {/* Paginación y Acción Superior */}
            <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4">



                {totalPaginas > 1 && (
                    <div className="flex items-center space-x-2 bg-white p-1.5 rounded-2xl border border-gray-100">
                        <button
                            onClick={anterior}
                            disabled={esPrimeraPagina}
                            className="px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-gray-900 disabled:opacity-20 transition-colors"
                        >
                            Anterior
                        </button>
                        <div className="w-[1px] h-4 bg-gray-100"></div>
                        <button
                            onClick={siguiente}
                            disabled={esUltimaPagina}
                            className="px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-gray-900 disabled:opacity-20 transition-colors"
                        >
                            Siguiente
                        </button>
                    </div>
                )}
            </div>

            {/* Notificaciones */}
            {errorRegistrosSobre && <Toast message={errorRegistrosSobre} type="error" />}
            {cargandoRegistrosSobre && <div className="fixed bottom-10 right-10 scale-75"><LoadingSpinner /></div>}
        </div>
    );
}