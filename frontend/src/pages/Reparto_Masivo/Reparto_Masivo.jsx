import { useEffect, useState } from 'react';
import ErrorMessage from '../../components/ErrorMessage';
import Toast from '../../components/Toast';
import { useForm } from 'react-hook-form';
import { sobreService } from '../../api/SobreService';
import useCreate from '../../hooks/useCreate';

export default function Reparto_Masivo({ autenticado }) {
    const { cargandoPost, errorPost, exitoPost, post } = useCreate(sobreService.repartir);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const [toastConfig, setToastConfig] = useState({ message: "", type: "success" });
    const [desglose, setDesglose] = useState(null);

    useEffect(() => {
        if (exitoPost) {
            setToastConfig({ message: "Reparto global ejecutado con éxito", type: "success" });
            reset(); 
        }
    }, [exitoPost, reset]);

    useEffect(() => {
        if (errorPost) {
            setToastConfig({ message: errorPost || "Error al procesar el reparto", type: "error" });
        }
    }, [errorPost]);

    const onSubmit = async (data) => {
        setDesglose(null);
        const apiRespuesta = await post(data);
        console.log(apiRespuesta)
        if (apiRespuesta && apiRespuesta.respuesta_visual) {
            setDesglose(apiRespuesta.respuesta_visual);
        }
    };

    return (
        <div className="max-w-2xl mx-auto py-12 px-4">
            <Toast 
                message={toastConfig.message} 
                type={toastConfig.type} 
                setInformation={(val) => setToastConfig({ ...toastConfig, message: val })} 
            />

            {autenticado === false && (
                <div className="mb-6 p-4 bg-amber-50 border border-amber-100 rounded-2xl">
                    <p className="text-amber-600 text-xs font-medium text-center">
                        Si no hay una sesión activa no se podrá repartir dinero entre los sobres.
                    </p>
                </div>
            )}

            <div className="bg-white rounded-[40px] p-10 shadow-sm border border-gray-100">
                <div className="flex items-center space-x-4 mb-10">
                    <div>
                        <h2 className="text-xl font-black text-gray-800 tracking-tight">Reparto Global</h2>
                        <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest">Distribución automática</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    <div className="space-y-3">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">
                            Monto a repartir entre todos los sobres
                        </label>

                        <div className="relative group">
                            <span className="absolute left-6 top-1/2 -translate-y-1/2 text-indigo-200 font-black text-2xl group-focus-within:text-indigo-600 transition-colors italic">
                                ₡
                            </span>

                            <input
                                type="number"
                                step="0.01"
                                disabled={!autenticado || cargandoPost}
                                {...register("monto", {
                                    required: "El monto es necesario",
                                    min: { value: 0.01, message: "Mínimo ₡0.01" }
                                })}
                                className={`w-full pl-14 pr-8 py-6 bg-gray-50 border-none rounded-[28px] outline-none font-black text-3xl text-indigo-600 transition-all placeholder:text-gray-200 focus:ring-4 focus:ring-indigo-500/5 focus:bg-white ${
                                    !autenticado ? "cursor-not-allowed opacity-50" : ""
                                }`}
                                placeholder="0.00"
                            />
                        </div>
                        {errors.monto && (
                            <span className="text-[10px] text-red-500 font-black uppercase ml-4 tracking-tighter">
                                {errors.monto.message}
                            </span>
                        )}
                    </div>

                    {desglose && (
                        <div className="animate-in fade-in slide-in-from-top-2 duration-500 bg-indigo-50/30 rounded-3xl p-6 border border-indigo-50">
                            <h3 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-4 ml-1">Resultados del reparto</h3>
                            <div className="space-y-3">
                                {Object.entries(desglose).map(([nombre, monto]) => (
                                    <div key={nombre} className="flex justify-between items-center border-b border-indigo-100/50 pb-2 last:border-0">
                                        <span className="text-xs font-bold text-gray-600">{nombre}</span>
                                        <span className="text-xs font-black text-indigo-600">₡{monto}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <p className="text-[11px] text-gray-400 px-2 leading-relaxed">
                        Este monto se distribuirá automáticamente entre tus sobres activos basándose en los
                        <span className="text-indigo-500 font-bold"> porcentajes configurados</span>.
                    </p>

                    <button
                        type="submit"
                        disabled={!autenticado || cargandoPost}
                        className={`w-full py-5 rounded-[24px] font-black uppercase text-[11px] tracking-[0.2em] transition-all transform active:scale-[0.98] flex items-center justify-center space-x-3 ${
                            cargandoPost
                                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                : "bg-indigo-600 text-white shadow-xl shadow-indigo-100 hover:bg-indigo-700"
                        }`}
                    >
                        {cargandoPost ? (
                            <>
                                <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                                <span>Procesando...</span>
                            </>
                        ) : (
                            <span>Ejecutar Reparto Masivo</span>
                        )}
                    </button>
                </form>
            </div>

            {errorPost && <ErrorMessage message={errorPost} />}
        </div>
    );
}