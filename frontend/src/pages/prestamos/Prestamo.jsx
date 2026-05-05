import { useState } from "react";
import ErrorMessage from "../../components/ErrorMessage";
import LoadingSpinner from "../../components/LoadingSpinner";
import PopUp from "../../components/PopUp";
import usePrestamo from "./hook/usePrestamo";
import PrestamosList from "./PrestamosList";
import FormularioPrestamo from "./FormularioPrestamo";

export default function Prestamo({ autenticado, sobres }) {
    const {
        prestamos, cargandoGet, errorGet, refetch,
        cargandoPost, errorPost, exitoPost,
        post, pagarPrestamo, cargandoPago, errorPago, exitoPago
    } = usePrestamo();

    const [modal, setModal] = useState(false);

    if (cargandoGet) return <LoadingSpinner />;

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                <div>
                    <h1 className="text-4xl font-black text-gray-900 tracking-tight">Movimientos</h1>
                    <p className="text-gray-400 font-medium text-sm mt-1">Historial detallado de actividad</p>
                </div>
                
                <button
                    onClick={() => setModal(true)}
                    className="px-6 py-4 bg-purple-600 text-white font-extrabold text-xs uppercase tracking-widest rounded-2xl hover:bg-purple-700 active:scale-[0.98] transition-all shadow-xl shadow-purple-200/40 cursor-pointer"
                >
                    Crear Préstamo
                </button>
            </div>

            {autenticado === false && (
                <div className="mb-6 p-4 bg-amber-50 border border-amber-100/60 rounded-2xl">
                    <p className="text-amber-600 text-xs font-semibold text-center">
                        Si no hay una sesión activa no se podrán ver los registros.
                    </p>
                </div>
            )}

            {errorGet && (
                <div className="mb-6">
                    <ErrorMessage message={errorGet} />
                </div>
            )}

            <div className="mb-6 space-y-3">
                {cargandoPost && (
                    <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl text-sm font-medium text-blue-600">
                        Creando préstamo...
                    </div>
                )}
                
                {cargandoPago && (
                    <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl text-sm font-medium text-blue-600">
                        Procesando pago...
                    </div>
                )}

                {errorPost && <PopUp type="error" message={errorPost} />}
                {exitoPost && <PopUp type="success" message="Préstamo creado con éxito" />}

                {errorPago && <PopUp type="error" message={errorPago} />}
                {exitoPago && <PopUp type="success" message="Pago registrado exitosamente" />}
            </div>

            <PopUp closeModal={() => setModal(false)} isModalOpen={modal}>
                <FormularioPrestamo
                    sobres={sobres}
                    cargandoPost={cargandoPost}
                    errorPost={errorPost}
                    exitoPost={exitoPost}
                    post={post}
                    closeModal={() => setModal(false)}
                />
            </PopUp>

            <PrestamosList
                prestamos={prestamos}
                pagarPrestamo={pagarPrestamo}
                cargandoPago={cargandoPago}
            />
        </div>
    );
}