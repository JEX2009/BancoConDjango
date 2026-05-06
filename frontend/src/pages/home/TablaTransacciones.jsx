import { HiOutlineArrowNarrowDown, HiOutlineArrowNarrowUp } from "react-icons/hi";

export default function TablaTransacciones({ elementosPaginados }) {
    const saldoClaro = (saldo) => {
        if (saldo === null || saldo === undefined) {
            return '0';
        }

        const numero = parseFloat(saldo);

        if (isNaN(numero)) {
            return '0';
        }

        return numero.toLocaleString('es-CR', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
        });
    };
    return (
        <table className="w-full text-left border-collapse">
            <thead>
                <tr className="bg-gray-50/50">
                    <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Sobre</th>
                    <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Monto</th>
                    <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Fecha</th>
                    <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Tipo</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
                {elementosPaginados.length === 0 ? (
                    <tr>
                        <td colSpan="4" className="px-8 py-5 text-center text-gray-500">
                            No hay registros para mostrar.
                        </td>
                    </tr>
                ) : (
                    elementosPaginados.map((t, i) => (
                        <tr key={i} className="hover:bg-gray-50/30 transition-colors">
                            <td className="px-8 py-5">
                                <p className="font-bold text-gray-700">{t.movimiento_sobre}</p>
                                <p className="text-[10px] text-gray-400 truncate max-w-[150px]">{t.descripcion}</p>
                            </td>
                            <td className="px-8 py-5 font-black text-gray-800 text-lg">
                                ₡{saldoClaro(t.monto)}
                            </td>
                            <td className="px-8 py-5 text-xs font-medium text-gray-500 uppercase tracking-tighter">
                                {new Date(t.fecha_creacion).toLocaleDateString('es-CR', { day: '2-digit', month: 'short' })}
                            </td>
                            <td className="px-8 py-5">
                                <div className="flex justify-center">
                                    {t.estado === 'DE' ? (
                                        <div className="p-2 bg-emerald-50 text-emerald-600 rounded-2xl"><HiOutlineArrowNarrowDown size={18} /></div>
                                    ) : t.estado === 'PR' ? (
                                        <div className="p-2 bg-amber-50 text-amber-600 rounded-2xl" title="Préstamo">
                                            <HiOutlineScale size={18} />
                                        </div>
                                    ) : (
                                        <div className="p-2 bg-rose-50 text-rose-600 rounded-2xl"><HiOutlineArrowNarrowUp size={18} /></div>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))
                )}
            </tbody>
        </table>
    )
}