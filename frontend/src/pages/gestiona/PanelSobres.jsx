import { useEffect } from 'react';
import ErrorMessage from '../../components/ErrorMessage';
import LoadingSpinner from '../../components/LoadingSpinner';
import CustomSelectReactForm from '../../components/CustomSelectReactForm';
import { useForm } from 'react-hook-form';

export default function PanelSobres({ autenticado, datosGet, cargandoGet, errorGet, getSobres }) {
    const cargandoPost = false;

    useEffect(() => {
        getSobres();
    }, []);

    const {
        register: regIngreso,
        handleSubmit: handleIngreso,
        control: controlIngreso,
        reset: resetIngreso,
        formState: { isDirty: estaIngresando }
    } = useForm({ defaultValues: { sobre: '', monto: '' } });

    const {
        register: regRetiro,
        handleSubmit: handleRetiro,
        control: controlRetiro,
        reset: resetRetiro,
        formState: { isDirty: estaRetirando }
    } = useForm({ defaultValues: { sobre: '', monto: '' } });

    const guardar = (data, tipo) => {
        console.log(`Procesando ${tipo}:`, data);
        // logica post pendiente
    };

    if (cargandoGet) return <LoadingSpinner />;
    if (errorGet) return <ErrorMessage message={errorGet} />;

    const sobresFiltrados = datosGet.filter(
        sobre => {
            const sobresSinLimite = sobre.limite === 0
            const sobresSinLlenar = sobre.limite > sobre.saldo
            return sobresSinLimite || sobresSinLlenar
        }
    )

    const opcionesSobres = sobresFiltrados.map(sobre => ({
        value: sobre.id,
        label: `Nombre: ${sobre.nombre ?? 'S/N'}. Saldo:$${sobre.saldo}. Limite: ${sobre.limite !== 0 ? sobre.limite : 'Sin Limite'}`
    }))


    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="mb-12 ml-2">
                <h1 className="text-3xl font-black text-gray-700 tracking-tighter">Gestión de Fondos</h1>
                <p className="text-gray-400 font-medium">Administra tus movimientos con precisión</p>
                {autenticado === false && (
                <div className="mb-6 p-4 bg-amber-50 border border-amber-100 rounded-2xl">
                    <p className="text-amber-600 text-xs font-medium text-center">
                        Si no hay una sesión activa no se podrá repartir dinero entre los sobres.
                    </p>
                </div>
            )}
                
            </div>


            <div className="grid lg:grid-cols-2 gap-10 items-start">

                {/* PANEL IZQUIERDO: INGRESAR */}
                <div className={`transition-all duration-500 bg-white rounded-[40px] p-10 shadow-sm border border-gray-100 ${estaRetirando ? "opacity-20 grayscale pointer-events-none scale-[0.97]" : "opacity-100"
                    }`}>
                    <div className="flex justify-between items-start mb-10">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center">
                                <span className="text-purple-600 text-xl font-black">↓</span>
                            </div>
                            <h2 className="text-xl font-black text-gray-800 tracking-tight">Ingresar</h2>
                        </div>
                        {estaIngresando && (
                            <button onClick={() => resetIngreso()} className="text-[10px] font-black text-purple-400 uppercase tracking-widest hover:text-purple-600 transition-colors">
                                [ Limpiar ]
                            </button>
                        )}
                    </div>

                    <form onSubmit={handleIngreso(data => guardar(data, 'ingreso'))} className="space-y-8">
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Sobre Destino</label>
                            <CustomSelectReactForm
                                name="sobre"
                                control={controlIngreso}
                                options={opcionesSobres}
                                placeholder="Elegir sobre..."
                                rules={{ required: true }}
                            />
                        </div>

                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Monto a Sumar</label>
                            <div className="relative group">
                                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-purple-200 font-black text-xl group-focus-within:text-purple-600 transition-colors">₡</span>
                                <input
                                    type="number"
                                    step="0.01"
                                    {...regIngreso("monto", { required: true, min: 0.01 })}
                                    className="w-full pl-12 pr-6 py-5 bg-gray-50 border-none rounded-[24px] focus:ring-4 focus:ring-purple-500/5 outline-none font-bold text-2xl text-purple-600 transition-all placeholder:text-gray-200"
                                    placeholder="0.00"
                                />
                            </div>
                        </div>

                        <button className="w-full py-5 bg-purple-600 text-white rounded-[24px] font-black uppercase text-[11px] tracking-[0.2em] hover:bg-purple-700 transition-all shadow-xl shadow-purple-100">
                            Confirmar Depósito
                        </button>
                    </form>
                </div>

                {/* PANEL DERECHO: RETIRAR */}
                <div className={`transition-all duration-500 bg-white rounded-[40px] p-10 shadow-sm border border-gray-100 ${estaIngresando ? "opacity-20 grayscale pointer-events-none scale-[0.97]" : "opacity-100"
                    }`}>
                    <div className="flex justify-between items-start mb-10">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center">
                                <span className="text-red-600 text-xl font-black">↑</span>
                            </div>
                            <h2 className="text-xl font-black text-gray-800 tracking-tight">Retirar</h2>
                        </div>
                        {estaRetirando && (
                            <button onClick={() => resetRetiro()} className="text-[10px] font-black text-red-400 uppercase tracking-widest hover:text-red-600 transition-colors">
                                [ Limpiar ]
                            </button>
                        )}
                    </div>

                    <form onSubmit={handleRetiro(data => guardar(data, 'retiro'))} className="space-y-8">
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Sobre de Origen</label>
                            <CustomSelectReactForm
                                name="sobre"
                                control={controlRetiro}
                                options={opcionesSobres}
                                placeholder="Elegir sobre..."
                                rules={{ required: true }}
                            />
                        </div>

                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Monto a Restar</label>
                            <div className="relative group">
                                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-red-200 font-black text-xl group-focus-within:text-red-600 transition-colors">₡</span>
                                <input
                                    type="number"
                                    step="0.01"
                                    {...regRetiro("monto", { required: true, min: 0.01 })}
                                    className="w-full pl-12 pr-6 py-5 bg-gray-50 border-none rounded-[24px] focus:ring-4 focus:ring-red-500/5 outline-none font-bold text-2xl text-red-600 transition-all placeholder:text-gray-200"
                                    placeholder="0.00"
                                />
                            </div>
                        </div>

                        <button className="w-full py-5 bg-gray-900 text-white rounded-[24px] font-black uppercase text-[11px] tracking-[0.2em] hover:bg-black transition-all shadow-xl shadow-gray-100">
                            Confirmar Retiro
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}