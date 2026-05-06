export default function FiltrosPrestamo() {
    return (
        <div className="w-full mb-8 bg-white border border-gray-100/80 p-8 rounded-3xl shadow-2xl shadow-gray-200/40 mt-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-end">
                <div className="flex flex-col space-y-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">
                        Buscar Estado del Préstamo
                    </label>
                    <select className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-purple-500/5 focus:border-purple-500 outline-none font-semibold text-sm text-gray-700 transition-all cursor-pointer">
                        <option value="">Todos</option>
                        <option value="Pendiente">Debiendo</option>
                        <option value="Completado">Pagados</option>
                    </select>
                </div>

                {/* <div className="flex flex-col space-y-2 w-full">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">
                        Buscar Por Fechas
                    </label>
                    <div className="flex flex-col sm:flex-row gap-4 w-full">
                        <input 
                            type="date" 
                            className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-purple-500/5 focus:border-purple-500 outline-none font-semibold text-sm text-gray-700 transition-all" 
                        />
                        <input 
                            type="date" 
                            className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-purple-500/5 focus:border-purple-500 outline-none font-semibold text-sm text-gray-700 transition-all" 
                        />
                    </div>
                </div> */}

                <div className="w-full">
                    <button className="w-full px-8 py-4 bg-purple-600 text-white font-extrabold uppercase text-xs tracking-widest rounded-2xl hover:bg-purple-700 active:scale-[0.98] transition-all shadow-xl shadow-purple-200/50 cursor-pointer whitespace-nowrap">
                        Aplicar Filtros
                    </button>
                </div>
            </div>
        </div>
    )
}