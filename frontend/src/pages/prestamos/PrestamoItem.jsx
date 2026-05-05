export default function PrestamoItem({ prestamo, pagarPrestamo, cargandoPago }) {
    return (
        <div className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
                <p className="text-sm font-bold text-gray-800">
                    Origen: {prestamo.sobre_origen?.nombre} ➔ Destino: {prestamo.sobre_destino?.nombre}
                </p>
                <div className="flex flex-wrap gap-x-4 text-xs font-medium text-gray-400 mt-1">
                    <span>Monto total: <b className="text-gray-600">${prestamo.monto_total}</b></span>
                    <span>Pagado: <b className="text-gray-600">${prestamo.monto_pagado}</b></span>
                    <span>Saldo pendiente: <b className="text-indigo-600">${prestamo.saldo_pendiente}</b></span>
                </div>
            </div>
            <div>
                <button
                    onClick={() => pagarPrestamo(prestamo.id, { monto: 50 })}
                    disabled={prestamo.completado || cargandoPago}
                    className={`w-full md:w-auto px-4 py-2 text-xs font-bold rounded-xl transition-all ${prestamo.completado
                            ? 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed'
                            : 'bg-indigo-600 text-white hover:bg-indigo-700'
                        }`}
                >
                    {prestamo.completado ? 'Completado' : 'Pagar'}
                </button>
            </div>
        </div>
    );
}