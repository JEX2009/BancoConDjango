export default function Sobre({ sobre, modalAccion }) {
    const isDisabled = !sobre.activo;
    
    const colors = {
        blue: "bg-blue-600 hover:bg-blue-700 shadow-blue-100",
        amber: "bg-amber-500 hover:bg-amber-600 shadow-amber-100",
        red: "bg-red-500 hover:bg-red-600 shadow-red-100",
        green: "bg-green-500 hover:bg-green-600 shadow-green-100"
    };

    const getButtonClass = (colorKey) => {
        const baseStyles = "px-4 py-2 text-[11px] uppercase tracking-widest font-bold text-white rounded-xl transition-all active:scale-95 shadow-lg";
        const disabledStyles = "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none";
        
        return `${baseStyles} ${isDisabled ? disabledStyles : colors[colorKey]}`;
    };

    return (
        <div className={`flex flex-row justify-between items-center p-6 my-3 rounded-[2rem] border transition-all ${
            sobre.activo 
            ? 'border-gray-100 bg-white shadow-sm' 
            : 'border-transparent bg-gray-50 opacity-80'
        }`}>
            {/* Lado Izquierdo */}
            <div className="flex flex-col">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Sobre</span>
                <h4 className="text-lg font-bold text-gray-800 tracking-tighter italic">
                    {sobre.nombre}
                </h4>
                <span className={`text-sm font-bold mt-1 ${sobre.activo ? 'text-indigo-600' : 'text-gray-400'}`}>
                    ₡{sobre.saldo}
                </span>
            </div>

            {/* Acciones */}
            <div className='flex flex-row gap-3 items-center'>
                <button
                    className={getButtonClass('blue')}
                    onClick={() => !isDisabled && modalAccion("see", sobre)}
                    disabled={isDisabled}
                >
                    Ver
                </button>

                <button
                    className={getButtonClass('amber')}
                    onClick={() => !isDisabled && modalAccion("edit", sobre)}
                    disabled={isDisabled}
                >
                    Editar
                </button>

                {sobre.activo ? (
                    <button
                        className="px-4 py-2 bg-gray-900 text-white text-[11px] font-black uppercase tracking-widest rounded-xl hover:bg-black transition-all shadow-lg shadow-gray-200"
                        onClick={() => modalAccion("deactivate", sobre)}
                    >
                        Desactivar
                    </button>
                ) : (
                    <button
                        className="px-4 py-2 bg-green-500 text-white text-[11px] font-black uppercase tracking-widest rounded-xl hover:bg-green-600 transition-all shadow-lg shadow-green-100"
                        onClick={() => modalAccion("reactivate", sobre)}
                    >
                        Activar
                    </button>
                )}
            </div>
        </div>
    );
}