export default function VerSobre({ sobre }) {
    if (!sobre) return null;
    const fechaObjeto = new Date(sobre.fecha_creacion);
    const meses = {
        0:"enero",
        1:"febrero",
        2:"marzo",
        3:"abril",
        4:"mayo",
        5:"junio",
        6:"julio",
        7:"agosto",
        8:"septiembre",
        9:"octubre",
        10:"noviembre",
        11:"diciembre"
    }
    return (
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 transition-all duration-300">

            <div className={`p-6 text-white ${sobre.activo ? 'bg-gradient-to-r from-blue-600 to-indigo-700' : 'bg-gradient-to-r from-gray-500 to-gray-700'}`}>
                <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold uppercase tracking-widest opacity-80">
                        Detalle del Sobre
                    </span>
                    <span className={`px-2 py-1 rounded-full text-[10px] font-black  ${sobre.activo ? 'bg-green-400 text-green-100' : 'bg-red-400 text-red-100'}`}>
                        {sobre.activo ? '● Activo' : '○ Inactivo'}
                    </span>
                </div>
                <h4 className="text-3xl font-extrabold truncate drop-shadow-sm">
                    {sobre.nombre}
                </h4>
            </div>

            <div className="p-6 space-y-6">

                {/* Sección de Saldo (Destacada) */}
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 flex flex-col items-center justify-center">
                    <span className="text-xs font-bold text-slate-400 uppercase mb-1">Saldo Disponible</span>
                    <p className="text-4xl font-black text-slate-800 tracking-tight">
                        ₡{Number(sobre.saldo).toLocaleString('es-CR')}
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-4">

                    {/* Límite */}
                    <div className="flex flex-col p-3 bg-gray-50/50 rounded-xl">
                        <span className="text-[10px] font-bold text-gray-400 uppercase">Límite Sugerido</span>
                        <span className="text-sm font-bold text-gray-700">
                            {sobre.limite ? `₡${Number(sobre.limite).toLocaleString('es-CR')}` : 'Sin límite'}
                        </span>
                    </div>

                    {/* Porcentaje y Barra Visual */}
                    <div className="flex flex-col p-3 bg-gray-50/50 rounded-xl">
                        <span className="text-[10px] font-bold text-gray-400 uppercase">Distribución</span>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="text-sm font-bold text-indigo-600">{sobre.porcentaje}%</span>
                        </div>
                    </div>
                </div>

                {/* Fecha de Creación */}
                <div className="pt-4 border-t border-gray-100 flex items-center justify-center gap-2 text-gray-400">
                    <span className="text-xs font-medium italic">
                        Creado el {fechaObjeto.getDate()} de {meses[fechaObjeto.getMonth()]} del {fechaObjeto.getFullYear()}
                    </span>
                </div>

            </div>
        </div>
    );
}