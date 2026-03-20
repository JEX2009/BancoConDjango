import { useEffect, useMemo, useState } from 'react';
import { useSobres } from './hooks/useSobres'
import PopUp from '../../components/PopUp'
import VerSobre from './VerSobre'
import EditarSobre from './EditarSobre'
import DesactivarSobre from './DesactivarSobre'
import ReactivarSobre from './ReactivarSobre'
import FormularioSobre from './FormularioSobre'
import ErrorMessage from '../../components/ErrorMessage';
import Sobre from './Sobre';
import LoadingSpinner from '../../components/LoadingSpinner';
import Toast from '../../components/Toast';
import usePaginador from '../../hooks/usePaginador';
import { IoChevronBackSharp } from "react-icons/io5";
import { IoChevronForward } from "react-icons/io5";


export default function Sobres({ isAuthenticated }) {
    const { datosGet, cargandoGet, errorGet, getSobres, cargandoPost, errorPost, exitoPost, postSobres, cargandoPut, errorPut, exitoPut, putSobre, exitoDel, cargandoDel, errorDel, del, exitoReactivar, cargandoReactivar, errorReactivar, reactivar } = useSobres();


    const [modal, setModal] = useState(false);
    const [action, setAccion] = useState("");
    const [sobre, setSobre] = useState();
    const [informacion, setInformacion] = useState("");
    const [filtroNombre, setFiltroNombre] = useState("");
    const [filtroActivo, setFiltroActivo] = useState("todos");

    const filtrado = useMemo(() => {
        if (!datosGet) return [];

        return datosGet.filter((sobre) => {
            const coincideNombre = sobre.nombre.toLowerCase().includes(filtroNombre.toLowerCase());
            const coincideEstado = filtroActivo === "todos" ? true : sobre.activo === filtroActivo;
            return coincideNombre && coincideEstado;
        });
    }, [filtroNombre, datosGet, filtroActivo]);

    const { elementosPaginados, siguiente, anterior, paginaActual, totalPaginas, esPrimeraPagina, esUltimaPagina } = usePaginador(filtrado, 5);

    const cerrarModal = () => {
        setModal(false);
    };

    const manejadorSelect = (valor) => {
        if (valor === "todos") {
            setFiltroActivo("todos");
        } else {
            setFiltroActivo(valor === "true");
        }
    };

    const modalAccion = (realizatedAction, sobre) => {
        setModal(true)
        setAccion(realizatedAction);
        setSobre(sobre)
    };

    useEffect(() => {
        getSobres();
    }, []);

    if (cargandoGet) {
        return (
            <LoadingSpinner />
        )
    };
    if (errorGet) {
        return (
            <ErrorMessage
                message={errorGet}
            />
        )
    };
    return (
        <div className="max-w-4xl mx-auto px-4 py-4">
            <PopUp closeModal={cerrarModal} isModalOpen={modal}>
                {
                    action === "see" ?
                        (<VerSobre sobre={sobre} />) :
                        action === "edit" ?
                            (<EditarSobre
                                cargandoPut={cargandoPut}
                                errorPut={errorPut}
                                putSobre={putSobre}
                                cerrarModal={cerrarModal}
                                setInformacion={setInformacion}
                                sobre={sobre}
                            />) :
                            action === "form" ?
                                (<FormularioSobre
                                    cargandoPost={cargandoPost}
                                    errorPost={errorPost}
                                    postSobres={postSobres}
                                    cerrarModal={cerrarModal}
                                    setInformacion={setInformacion}
                                />) :
                                action === "deactivate" ?
                                    (<DesactivarSobre
                                        cargandoDel={cargandoDel}
                                        errorDel={errorDel}
                                        del={del}
                                        cerrarModal={cerrarModal}
                                        setInformacion={setInformacion}
                                        sobre={sobre}
                                    />) :
                                    (<ReactivarSobre
                                        cerrarModal={cerrarModal}
                                        setInformacion={setInformacion}
                                        sobre={sobre}
                                        cargandoReactivar={cargandoReactivar}
                                        errorReactivar={errorReactivar}
                                        reactivar={reactivar}
                                    />)
                }
            </PopUp>

            {/* Cabecera */}
            <div className='flex flex-row justify-between items-center mb-8 pb-4 border-b border-gray-100'>
                <div>
                    <h2 className='text-3xl font-black text-gray-800 tracking-tight'>
                        {isAuthenticated ? "Mis Sobres" : "Sobres Públicos"}
                    </h2>
                    <p className='text-sm text-gray-400 font-medium'>Gestiona tus presupuestos de forma inteligente</p>
                </div>
                <button
                    className='bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-2xl shadow-lg shadow-indigo-100 transition-all active:scale-95 flex items-center gap-2'
                    onClick={() => modalAccion("form")}
                >
                    <span className="text-xl leading-none">+</span> Agregar Sobre
                </button>
            </div>

            {/* Filtros*/}
            <div className="max-w-2xl w-full mb-8 group">
                <div className="flex flex-row gap-4 ml-4 mb-2">
                    <label className="flex-1 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] transition-colors group-focus-within:text-indigo-500">
                        Buscar por nombre
                    </label>
                    <label className="w-40 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] transition-colors group-focus-within:text-indigo-500">
                        Estado
                    </label>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                        <input
                            type="text"
                            placeholder="Escribe para buscar..."
                            value={filtroNombre}
                            onChange={(e) => setFiltroNombre(e.target.value)}
                            className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl text-gray-700 font-medium placeholder-gray-300 focus:bg-white focus:border-indigo-500 focus:ring-0 transition-all duration-300 shadow-inner"
                        />
                    </div>
                    <select
                        value={filtroActivo}
                        onChange={(e) => manejadorSelect(e.target.value)}
                        className="w-full sm:w-40 px-4 py-4 bg-gray-50 border-2 border-transparent rounded-2xl text-sm font-bold text-gray-600 appearance-none cursor-pointer focus:bg-white focus:border-indigo-500 transition-all duration-300 shadow-inner text-center"
                    >
                        <option value="todos">Todos</option>
                        <option value="true">Activos</option>
                        <option value="false">Inactivos</option>
                    </select>
                </div>
            </div>

            {/* Listado de Sobres con Espacio Mínimo */}
            <div
                key={`${paginaActual}-${filtroNombre}`}
                className="min-h-[450px] mb-10 space-y-4 animate-fade-in-list"
            >
                {elementosPaginados.length > 0 ? (
                    elementosPaginados.map(sobre => (
                        <Sobre
                            key={sobre.id}
                            modalAccion={modalAccion}
                            sobre={sobre}
                        />
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 bg-gray-50/50 rounded-[2rem] border-2 border-dashed border-gray-100 animate-fade-in-list">
                        <p className="text-gray-400 font-medium italic text-sm">No hay sobres que coincidan con tu búsqueda</p>
                    </div>
                )}
            </div>

            {/* Paginador Estilizado */}
            {/* Paginador Estilizado */}
            {totalPaginas > 1 && (
                <div className="flex items-center justify-between bg-white p-2 rounded-2xl border border-gray-100 shadow-sm max-w-sm mx-auto">

                    {/* Botón Atrás */}
                    <button
                        onClick={anterior}
                        disabled={esPrimeraPagina}
                        className="flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300 group hover:bg-indigo-50 disabled:opacity-20 disabled:cursor-not-allowed"
                    >
                        <IoChevronBackSharp
                            className={`text-2xl transition-colors ${esPrimeraPagina ? 'text-gray-400' : 'text-indigo-600 group-hover:scale-110'
                                }`}
                        />
                    </button>

                    {/* Indicador central */}
                    <div className="flex flex-col items-center">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Página</span>
                        <div className="flex items-baseline gap-1">
                            <span className="text-xl font-black text-indigo-600 leading-none">{paginaActual}</span>
                            <span className="text-xs font-bold text-gray-300">/</span>
                            <span className="text-sm font-bold text-gray-400">{totalPaginas}</span>
                        </div>
                    </div>

                    {/* Botón Siguiente */}
                    <button
                        onClick={siguiente}
                        disabled={esUltimaPagina}
                        className="flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300 group hover:bg-indigo-50 disabled:opacity-20 disabled:cursor-not-allowed"
                    >
                        <IoChevronForward
                            className={`text-2xl transition-colors ${esUltimaPagina ? 'text-gray-400' : 'text-indigo-600 group-hover:scale-110'
                                }`}
                        />
                    </button>
                </div>
            )}

            <Toast
                information={informacion}
                setInformation={setInformacion}
                exito={exitoPost || exitoPut || exitoDel || exitoReactivar}
            />
        </div>
    );
}