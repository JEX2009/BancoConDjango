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
import { IoChevronBackSharp, IoChevronForward, IoChevronForwardSharp } from "react-icons/io5";
import Layout from '../../layout/Layout';

export default function Sobres({
    isAuthenticated, datosGet, cargandoGet, errorGet, getSobres,
    cargandoPost, errorPost, exitoPost, postSobres,
    cargandoPut, errorPut, exitoPut, putSobre,
    exitoDel, cargandoDel, errorDel, del,
    exitoReactivar, cargandoReactivar, errorReactivar, reactivar, autenticado
}) {

    const [modal, setModal] = useState(false);
    const [action, setAccion] = useState("");
    const [sobre, setSobre] = useState();

    const [toast, setToast] = useState({ message: "", type: "success" });

    const [filtroNombre, setFiltroNombre] = useState("");
    const [filtroActivo, setFiltroActivo] = useState("todos");

    const filtrado = useMemo(() => {
        if (!datosGet) return [];
        return datosGet.filter((sobre) => {
            const coincideNombre = sobre.nombre.toLowerCase().includes(filtroNombre.toLowerCase());
            const coincideEstado = filtroActivo === "todos" ? true : sobre.activo === (filtroActivo === "true");
            return coincideNombre && coincideEstado;
        });
    }, [filtroNombre, datosGet, filtroActivo]);

    const { elementosPaginados, siguiente, anterior, paginaActual, totalPaginas, esPrimeraPagina, esUltimaPagina } = usePaginador(filtrado, 3);

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
        if (error) {
            setToast({
                message: error[0] ? error[0] : "Error al procesar la solicitud",
                type: "error"
            });
        }
    }, [errorPost, errorPut, errorDel, errorReactivar]);

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
        <Layout
            nombre={isAuthenticated ? "Mis Sobres" : "Sobres Públicos"}
            descripcion="Administra tus sobres para organizar tus finanzas"
            autenticado={autenticado}
            accionAutenticado={"no se podran crear sobres"}
        >
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <PopUp closeModal={cerrarModal} isModalOpen={modal}>
                    {action === "see" ? <VerSobre sobre={sobre} /> :
                        action === "edit" ? <EditarSobre cargandoPut={cargandoPut} errorPut={errorPut} putSobre={putSobre} cerrarModal={cerrarModal} setInformacion={setToast} sobre={sobre} /> :
                            action === "form" ? <FormularioSobre cargandoPost={cargandoPost} errorPost={errorPost} postSobres={postSobres} cerrarModal={cerrarModal} /> :
                                action === "deactivate" ? <DesactivarSobre cargandoDel={cargandoDel} errorDel={errorDel} del={del} cerrarModal={cerrarModal} sobre={sobre} /> :
                                    <ReactivarSobre cerrarModal={cerrarModal} sobre={sobre} cargandoReactivar={cargandoReactivar} errorReactivar={errorReactivar} reactivar={reactivar} />}
                </PopUp>
                {autenticado && (
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 pb-6 border-b border-gray-100/60">
                        <button
                            onClick={() => modalAccion("form")}
                            className="px-6 py-4 bg-purple-600 text-white font-extrabold text-xs uppercase tracking-widest rounded-2xl hover:bg-purple-700 active:scale-[0.98] transition-all shadow-xl shadow-purple-200/40 cursor-pointer flex items-center gap-3"
                        >
                            <span className="text-sm">+</span> Agregar Sobre
                        </button>
                    </div>
                )}

                <div className="max-w-4xl w-full mb-8 bg-white border border-gray-100 p-6 rounded-3xl shadow-xl shadow-gray-200/20">
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1 flex flex-col gap-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Buscar por nombre</label>
                        <input
                            type="text"
                            placeholder="Escribe para buscar..."
                            value={filtroNombre}
                            onChange={(e) => setFiltroNombre(e.target.value)}
                            className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-gray-700 font-semibold text-sm focus:bg-white focus:border-purple-500 outline-none transition-all"
                        />
                    </div>

                    <div className="w-full md:w-48 flex flex-col gap-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Estado</label>
                        <select
                            value={filtroActivo}
                            onChange={(e) => manejadorSelect(e.target.value)}
                            className="w-full px-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold text-gray-600 focus:bg-white focus:border-purple-500 outline-none cursor-pointer transition-all text-center"
                        >
                            <option value="todos">Todos</option>
                            <option value="true">Activos</option>
                            <option value="false">Inactivos</option>
                        </select>
                    </div>
                </div>
            </div>

            <div key={`${paginaActual}-${filtroNombre}`} className="min-h-[400px] mb-10 space-y-4">
                {elementosPaginados.length > 0 ? (
                    elementosPaginados.map(sobre => (
                        <Sobre key={sobre.id} modalAccion={modalAccion} sobre={sobre} />
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center py-16 bg-gray-50/50 rounded-3xl border-2 border-dashed border-gray-100">
                        <p className="text-gray-400 font-medium italic text-sm">No hay resultados</p>
                    </div>
                )}
            </div>

            {totalPaginas > 1 && (
                <div className="flex items-center justify-between bg-white px-6 py-4 rounded-2xl border border-gray-100/80 shadow-md max-w-sm mx-auto">
                    <button onClick={anterior} disabled={esPrimeraPagina} className="flex items-center justify-center w-12 h-12 rounded-xl transition-all bg-purple-50 hover:bg-purple-100 text-purple-600 disabled:opacity-30 disabled:bg-transparent">
                        <IoChevronBackSharp className="text-xl" />
                    </button>

                    <div className="flex flex-col items-center text-center">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Página</span>
                        <div className="flex items-baseline gap-1">
                            <span className="text-xl font-black text-purple-600">{paginaActual}</span>
                            <span className="text-xs font-bold text-gray-400">/ {totalPaginas}</span>
                        </div>
                    </div>

                    <button onClick={siguiente} disabled={esUltimaPagina} className="flex items-center justify-center w-12 h-12 rounded-xl transition-all bg-purple-50 hover:bg-purple-100 text-purple-600 disabled:opacity-30 disabled:bg-transparent">
                        <IoChevronForwardSharp className="text-xl" />
                    </button>
                </div>
            )}

            <Toast
                message={toast.message}
                type={toast.type}
                setInformation={(msg) => setToast(prev => ({ ...prev, message: msg }))}
            />
        </div>
        </Layout >
    );
}