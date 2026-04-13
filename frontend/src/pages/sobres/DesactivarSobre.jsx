import ErrorMessage from "../../components/ErrorMessage";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function DesactivarSobre({ cargandoDel, errorDel, del, cerrarModal, setInformacion, sobre }) {

    const manejadorDesactivar = async () => {
        await del(sobre.id);
        cerrarModal();
    };

    return (
        <div className="flex flex-col items-center p-4 text-center max-w-sm mx-auto">

            {/* 1. Icono de Advertencia */}
            <div className="w-20 h-20 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mb-6 animate-pulse">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
            </div>

            {/* 2. Texto Explicativo */}
            <h3 className="text-2xl font-black text-gray-800 mb-3">¿Desactivar sobre?</h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-8">
                Estás a punto de desactivar <span className="font-bold text-gray-700">"{sobre.nombre}"</span>.
                Este sobre dejará de recibir fondos automáticamente, pero podrás reactivarlo cuando quieras.
            </p>

            {/* 3. Acciones (Botones) */}
            <div className="flex flex-col sm:flex-row gap-3 w-full">
                <button
                    onClick={cerrarModal}
                    className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold rounded-2xl transition-all order-2 sm:order-1"
                >
                    No, cancelar
                </button>

                {cargandoDel ? (
                    <div className="flex-1 flex justify-center items-center py-3 order-1 sm:order-2">
                        <LoadingSpinner />
                    </div>
                ) : (
                    <button
                        onClick={manejadorDesactivar}
                        className="flex-1 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-2xl shadow-lg shadow-amber-200 transition-all active:scale-95 order-1 sm:order-2"
                    >
                        Sí, desactivar
                    </button>
                )}
            </div>

            {/* 4. Mensaje de Error */}
            {errorDel && (
                <div className="mt-6 w-full text-left">
                    <ErrorMessage
                        message="No pudimos desactivar el sobre. Revisa tu conexión o intenta más tarde."
                    />
                </div>
            )}
        </div>
    );
}