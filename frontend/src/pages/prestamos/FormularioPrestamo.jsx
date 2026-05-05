import { useForm } from 'react-hook-form';
import CustomSelectReactForm from "../../components/CustomSelectReactForm";
import { useState } from 'react';

export default function FormularioPrestamo({ sobres, cargandoPost, errorPost, exitoPost, post, closeModal }) {
    const {
        register,
        handleSubmit,
        control: controlOrigen,
        control: controlDestino,
        formState: { errors },
    } = useForm();

    const sobresActivos = sobres.filter(sobre => sobre.activo).map(sobre => ({
        value: sobre.id,
        label: `Nombre: ${sobre.nombre ?? 'S/N'}. Saldo: ₡${sobre.saldo}. Limite: ${sobre.limite !== 0 ? sobre.limite : 'Sin Limite'}`
    }))

    const [error, setError] = useState();


    const onsubmit = (data) => {
        console.log(data);
        post(data);
        if (errorPost) {
            setError(errorPost);
        }
        else {
            closeModal()
        }
    };

    return (
        <div className="max-w-3xl mx-auto bg-white border border-gray-100/80 rounded-3xl p-8 shadow-2xl shadow-gray-200/40">
            {error && <p className="text-sm text-red-600 mb-4">{error}</p>}
            <form onSubmit={handleSubmit(onsubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col space-y-2">
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Sobre Origen</label>
                        <span className="text-[9px] font-medium text-gray-400 uppercase tracking-wider ml-1 mb-1">Este es el sobre que da el préstamo</span>

                        <CustomSelectReactForm
                            name="sobre_origen"
                            control={controlOrigen}
                            options={sobresActivos}
                            placeholder="Elegir sobre..."
                            rules={{ required: "Debes seleccionar un sobre" }}
                        />
                    </div>

                    <div className="flex flex-col space-y-2">
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Sobre Destino</label>
                        <span className="text-[9px] font-medium text-gray-400 uppercase tracking-wider ml-1 mb-1">Este es el sobre que recibe el préstamo</span>

                        <CustomSelectReactForm
                            name="sobre_destino"
                            control={controlDestino}
                            options={sobresActivos}
                            placeholder="Elegir sobre..."
                            rules={{ required: "Debes seleccionar un sobre" }}
                        />
                    </div>
                </div>

                <div className="flex flex-col space-y-2 pt-4 border-t border-gray-50">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Monto a Prestar</label>
                    <div className="relative group">
                        <span className="absolute left-5 top-1/2 -translate-y-1/2 text-purple-300 font-black text-xl group-focus-within:text-purple-600 transition-colors duration-300">₡</span>
                        <input
                            type="number"
                            step="0.01"
                            {...register("monto_total", { required: true, min: 0.01 })}
                            className="w-full pl-12 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-purple-500/5 focus:border-purple-500 outline-none font-extrabold text-2xl text-purple-600 transition-all placeholder:text-gray-300"
                            placeholder="0.00"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={cargandoPost}
                    className="w-full py-4 mt-4 bg-purple-600 text-white rounded-2xl font-extrabold uppercase text-xs tracking-widest hover:bg-purple-700 active:scale-[0.98] transition-all shadow-xl shadow-purple-200/50 disabled:bg-gray-100 disabled:text-gray-400 disabled:shadow-none cursor-pointer"
                >
                    {cargandoPost ? 'Procesando...' : 'Confirmar Préstamo'}
                </button>
            </form>
        </div>
    );
}