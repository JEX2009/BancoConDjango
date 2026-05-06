import { useState } from "react";
import ErrorMessage from "../../components/ErrorMessage";
import LoadingSpinner from "../../components/LoadingSpinner";
import PopUp from "../../components/PopUp";
import usePrestamo from "./hook/usePrestamo";
import PrestamosList from "./PrestamosList";
import FormularioPrestamo from "./FormularioPrestamo";
import Layout from "../../layout/Layout";
import FiltrosPrestamo from "./FiltrosPrestamo";

export default function Prestamo({ autenticado, sobres }) {
    const {
        prestamos, cargandoGet, errorGet, refetch,
        cargandoPost, errorPost, exitoPost,
        post, pagarPrestamo, cargandoPago, errorPago, exitoPago
    } = usePrestamo();

    const [modal, setModal] = useState(false);

    if (cargandoGet) return <LoadingSpinner />;

    return (
        <Layout
            nombre="Prestamos"
            descripcion="Administra tus préstamos, solicita nuevos o registra pagos para mantener tus finanzas organizadas"
            autenticado={autenticado}
            accionAutenticado={"no se podran ni ver, ni crear prestamos"}
        >
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 ">
                {autenticado&&(
                    <button
                        onClick={() => setModal(true)}
                        className="px-6 py-4 bg-purple-600 text-white font-extrabold text-xs uppercase tracking-widest rounded-2xl hover:bg-purple-700 active:scale-[0.98] transition-all shadow-xl shadow-purple-200/40 cursor-pointer"
                    >
                        Crear Préstamo
                    </button>
                )}

        
                <FiltrosPrestamo />

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

                    {errorPost && <ErrorMessage type="error" message={errorPost} />}

                    {errorPago && <ErrorMessage type="error" message={errorPago} />}
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
        </Layout>
    );
}