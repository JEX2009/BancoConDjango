export default function Sobre({ sobre, modalAccion }) {
    const isDisabled = !sobre.activo;

    const getButtonClass = (baseColor) => {
        const activeStyles = `bg-${baseColor}-500 hover:bg-${baseColor}-600`;
        const disabledStyles = "bg-gray-400 cursor-not-allowed opacity-60";

        return `px-3 py-1 text-white rounded transition-colors ${isDisabled ? disabledStyles : activeStyles
            }`;
    };
    return (<div
        className={`flex flex-row justify-between items-center p-4 my-2 rounded-lg shadow-sm ${sobre.activo ? 'border-l-4 border-green-600 bg-white' : 'border-l-4 border-red-600 bg-gray-50'}`}
    >
        {/* Lado Izquierdo: Información del sobre */}
        <div className="flex flex-col">
            <h4 className="text-lg font-bold"> Nombre: {sobre.nombre}</h4>
            <span className="text-gray-600 font-medium">Saldo Actual: ₡{sobre.saldo}</span>
        </div>
        <div className='flex flex-row gap-2 items-center'>
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
                Modificar
            </button>

            {sobre.activo ? (
                <button
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-700 transition-colors"
                    onClick={() => modalAccion("deactivate", sobre)}
                >
                    Desactivar
                </button>
            ) : (
                <button
                    className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-700 transition-colors"
                    onClick={() => modalAccion("reactivate", sobre)}
                >
                    Re Activar 
                </button>
            )}
        </div>
    </div>)
}