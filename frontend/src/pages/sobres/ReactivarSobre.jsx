import ErrorMessage from "../../components/ErrorMessage";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function ReactivarSobre({ cerrarModal, setInformacion, sobre, cargandoReactivar, errorReactivar, reactivar }) {
    
    const manejadorReactivar = async () => {
        await reactivar(sobre.id);
        if (!errorReactivar) {
            setInformacion(`¡Excelente! El sobre "${sobre.nombre}" está activo de nuevo.`);
            cerrarModal();
        }
    };

    return (
        <div className="flex flex-col items-center p-4 text-center max-w-sm mx-auto">
            
            {/* 1. Icono de Éxito/Activación */}
            <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            </div>

            {/* 2. Texto Explicativo */}
            <h3 className="text-2xl font-black text-gray-800 mb-3">¿Reactivar sobre?</h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-8">
                Estás a punto de reactivar <span className="font-bold text-gray-700">"{sobre.nombre}"</span>. 
                El sobre volverá a aparecer en tus listas de distribución y reportes activos.
            </p>

            {/* 3. Acciones (Botones) */}
            <div className="flex flex-col sm:flex-row gap-3 w-full">
                <button
                    onClick={cerrarModal}
                    className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold rounded-2xl transition-all order-2 sm:order-1"
                >
                    No, cancelar
                </button>

                {cargandoReactivar ? (
                    <div className="flex-1 flex justify-center items-center py-3 order-1 sm:order-2">
                        <LoadingSpinner />
                    </div>
                ) : (
                    <button
                        onClick={manejadorReactivar}
                        className="flex-1 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-2xl shadow-lg shadow-emerald-200 transition-all active:scale-95 order-1 sm:order-2"
                    >
                        Sí, reactivar
                    </button>
                )}
            </div>

            {/* 4. Mensaje de Error */}
            {errorReactivar && (
                <div className="mt-6 w-full text-left">
                    <ErrorMessage
                        message="Error al intentar reactivar. Por favor, verifica tu conexión."
                    />
                </div>
            )}
        </div>
    );
}