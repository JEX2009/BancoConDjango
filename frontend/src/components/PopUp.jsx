export default function PopUp  (props) {
    const { closeModal, isModalOpen, children } = props;

    if (!isModalOpen) return null;

    return (
        // Añadimos z-50 para que esté por encima de los botones (que suelen estar en z-0 o z-10)
        // Añadimos un fondo oscuro semi-transparente para dar profundidad
        <div className="fixed inset-0 z-50 flex justify-center items-center overflow-hidden">
            
            {/* Capa de fondo oscura (Overlay) que bloquea el clic al fondo */}
            <div 
                className="absolute inset-0 bg-black/40 backdrop-blur-sm" 
                onClick={closeModal} 
            />

            {/* El contenedor del contenido del pop-up */}
            <div className="bg-slate-300 p-8 rounded-2xl shadow-2xl relative z-10 max-w-lg w-full m-4 border border-white/20">
                {/* Botón para cerrar el modal */}
                <button
                    onClick={closeModal}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl font-bold transition-colors leading-none"
                >
                    &times;
                </button>

                {children}  
            </div>
        </div>
    );
}