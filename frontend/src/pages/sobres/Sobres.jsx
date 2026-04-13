import { useEffect, useMemo, useState } from 'react';
import PopUp from '../../components/PopUp';
import VerSobre from './VerSobre';
import EditarSobre from './EditarSobre';
import DesactivarSobre from './DesactivarSobre';
import ReactivarSobre from './ReactivarSobre';
import FormularioSobre from './FormularioSobre';
import ErrorMessage from '../../components/ErrorMessage';
import Sobre from './Sobre';
import LoadingSpinner from '../../components/LoadingSpinner';
import Toast from '../../components/Toast';
import usePaginador from '../../hooks/usePaginador';
import { IoChevronBackSharp, IoChevronForward } from "react-icons/io5";

export default function Sobres({
    isAuthenticated, datosGet, cargandoGet, errorGet, getSobres,
    cargandoPost, errorPost, exitoPost, postSobres,
    cargandoPut, errorPut, exitoPut, putSobre,
    exitoDel, cargandoDel, errorDel, del,
    exitoReactivar, cargandoReactivar, errorReactivar, reactivar
}) {

    const [modal, setModal] = useState(false);
    const [action, setAccion] = useState("");
    const [sobre, setSobre] = useState();

    // --- ESTADO UNIFICADO DEL TOAST ---
    const [toast, setToast] = useState({ message: "", type: "success" });

    const [filtroNombre, setFiltroNombre] = useState("");
    const [filtroActivo, setFiltroActivo] = useState("todos");

    // Lógica de filtrado
    const filtrado = useMemo(() => {
        if (!datosGet) return [];
        return datosGet.filter((sobre) => {
            const coincideNombre = sobre.nombre.toLowerCase().includes(filtroNombre.toLowerCase());
            const coincideEstado = filtroActivo === "todos" ? true : sobre.activo === filtroActivo;
            return coincideNombre && coincideEstado;
        });
    }, [filtroNombre, datosGet, filtroActivo]);

    const { elementosPaginados, siguiente, anterior, paginaActual, totalPaginas, esPrimeraPagina, esUltimaPagina } = usePaginador(filtrado, 5);

    // --- MANEJO DE NOTIFICACIONES (EFECTOS) ---
    useEffect(() => {
        if (exitoPost) setToast({ message: "Sobre creado con éxito", type: "success" });
    }, [exitoPost]);

    useEffect(() => {
        if (exitoPut) setToast({ message: "Cambios guardados", type: "success" });
    }, [exitoPut]);

    useEffect(() => {
        if (exitoDel) setToast({ message: "Sobre desactivado", type: "success" });
    }, [exitoDel]);

    useEffect(() => {
        if (exitoReactivar) setToast({ message: "Sobre reactivado", type: "success" });
    }, [exitoReactivar]);

    useEffect(() => {
        const error = errorPost || errorPut || errorDel || errorReactivar;
        const mensaje = error
        console.log(mensaje)
        if (error) {
            setToast({
                message: error[0] ? error[0] : "Error al procesar la solicitud",
                type: "error"
            });
        }
    }, [errorPost, errorPut, errorDel, errorReactivar]);

    // --- FUNCIONES ---
    const cerrarModal = () => setModal(false);

    const manejadorSelect = (valor) => {
        if (valor === "todos") setFiltroActivo("todos");
        else setFiltroActivo(valor === "true");
    };

    const modalAccion = (realizatedAction, sobre) => {
        setModal(true);
        setAccion(realizatedAction);
        setSobre(sobre);
    };

    useEffect(() => {
        getSobres();
    }, []);

    if (cargandoGet) return <LoadingSpinner />;
    if (errorGet) return <ErrorMessage message={errorGet} />;

    return (
        <div className="max-w-4xl mx-auto px-4 py-4">
            <PopUp closeModal={cerrarModal} isModalOpen={modal}>
                {action === "see" ? <VerSobre sobre={sobre} /> :
                    action === "edit" ? <EditarSobre cargandoPut={cargandoPut} errorPut={errorPut} putSobre={putSobre} cerrarModal={cerrarModal} sobre={sobre} /> :
                        action === "form" ? <FormularioSobre cargandoPost={cargandoPost} errorPost={errorPost} postSobres={postSobres} cerrarModal={cerrarModal} /> :
                            action === "deactivate" ? <DesactivarSobre cargandoDel={cargandoDel} errorDel={errorDel} del={del} cerrarModal={cerrarModal} sobre={sobre} /> :
                                <ReactivarSobre cerrarModal={cerrarModal} sobre={sobre} cargandoReactivar={cargandoReactivar} errorReactivar={errorReactivar} reactivar={reactivar} />}
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

            {/* Filtros */}
            <div className="max-w-2xl w-full mb-8 group">
                <div className="flex flex-row gap-4 ml-4 mb-2">
                    <label className="flex-1 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Buscar por nombre</label>
                    <label className="w-40 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Estado</label>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                    <input
                        type="text"
                        placeholder="Escribe para buscar..."
                        value={filtroNombre}
                        onChange={(e) => setFiltroNombre(e.target.value)}
                        className="flex-1 px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl text-gray-700 font-medium focus:bg-white focus:border-indigo-500 outline-none transition-all shadow-inner"
                    />
                    <select
                        value={filtroActivo}
                        onChange={(e) => manejadorSelect(e.target.value)}
                        className="w-full sm:w-40 px-4 py-4 bg-gray-50 border-2 border-transparent rounded-2xl text-sm font-bold text-gray-600 focus:bg-white focus:border-indigo-500 outline-none cursor-pointer transition-all shadow-inner text-center"
                    >
                        <option value="todos">Todos</option>
                        <option value="true">Activos</option>
                        <option value="false">Inactivos</option>
                    </select>
                </div>
            </div>

            {/* Listado */}
            <div key={`${paginaActual}-${filtroNombre}`} className="min-h-[450px] mb-10 space-y-4">
                {elementosPaginados.length > 0 ? (
                    elementosPaginados.map(sobre => (
                        <Sobre key={sobre.id} modalAccion={modalAccion} sobre={sobre} />
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 bg-gray-50/50 rounded-[2rem] border-2 border-dashed border-gray-100">
                        <p className="text-gray-400 font-medium italic text-sm">No hay resultados</p>
                    </div>
                )}
            </div>

            {/* Paginador */}
            {totalPaginas > 1 && (
                <div className="flex items-center justify-between bg-white p-2 rounded-2xl border border-gray-100 shadow-sm max-w-sm mx-auto">
                    <button onClick={anterior} disabled={esPrimeraPagina} className="flex items-center justify-center w-12 h-12 rounded-xl transition-all hover:bg-indigo-50 disabled:opacity-20">
                        <IoChevronBackSharp className="text-2xl text-indigo-600" />
                    </button>
                    <div className="flex flex-col items-center text-center">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Página</span>
                        <div className="flex items-baseline gap-1">
                            <span className="text-xl font-black text-indigo-600">{paginaActual}</span>
                            <span className="text-sm font-bold text-gray-400">/ {totalPaginas}</span>
                        </div>
                    </div>
                    <button onClick={siguiente} disabled={esUltimaPagina} className="flex items-center justify-center w-12 h-12 rounded-xl transition-all hover:bg-indigo-50 disabled:opacity-20">
                        <IoChevronForward className="text-2xl text-indigo-600" />
                    </button>
                </div>
            )}

            {/* TOAST UNIFICADO */}
            <Toast
                message={toast.message}
                type={toast.type}
                setInformation={(msg) => setToast(prev => ({ ...prev, message: msg }))}
            />
        </div>
    );
}