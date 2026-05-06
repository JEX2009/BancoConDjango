import React from 'react';
import { useForm } from 'react-hook-form';

const FechaInput = ({ label, name, register, error, validation }) => {
    return (
        <div className="flex flex-col space-y-2 w-full">
            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">
                {label}
            </label>
            <input
                type="date"
                {...register(name, validation)}
                className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-purple-500/5 focus:border-purple-500 outline-none font-semibold text-sm text-gray-700 transition-all placeholder:text-gray-300"
            />
            {error && (
                <span className="text-[9px] font-semibold text-red-500 mt-1 ml-1">
                    {error.message || 'Este campo es requerido'}
                </span>
            )}
        </div>
    );
};

export default function FechaFormulario({ cargandoRegistrosSobre, masRegistros,setConsultando }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm();

    const onSubmit = (data) => {
        masRegistros(data.fechaInicio, data.fechaFin);
        setConsultando(true);
    };

    const validateFechaInicio = (value) => {
        const fechaFin = watch('fechaFin');
        if (fechaFin && value > fechaFin) {
            return 'Debe ser anterior a la fecha de fin.';
        }
        return true;
    };

    const validateFechaFin = (value) => {
        const fechaInicio = watch('fechaInicio');
        if (fechaInicio && value < fechaInicio) {
            return 'Debe ser posterior a la fecha de inicio.';
        }
        return true;
    };

    return (
        <div className="w-full mb-8 bg-white border border-gray-100/80 p-8 rounded-3xl shadow-2xl shadow-gray-200/40">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col md:flex-row items-end gap-6">
                <div className="flex flex-col md:flex-row gap-6 w-full md:flex-1">
                    <FechaInput
                        label="Fecha de Inicio"
                        name="fechaInicio"
                        register={register}
                        error={errors.fechaInicio}
                        validation={{
                            required: 'Este campo es requerido.',
                            validate: validateFechaInicio,
                        }}
                    />
                    
                    <FechaInput
                        label="Fecha de Fin"
                        name="fechaFin"
                        register={register}
                        error={errors.fechaFin}
                        validation={{
                            required: 'Este campo es requerido.',
                            validate: validateFechaFin,
                        }}
                    />
                </div>

                <button
                    type="submit"
                    disabled={cargandoRegistrosSobre}
                    className="w-full md:w-auto px-8 py-4 bg-purple-600 text-white font-extrabold uppercase text-xs tracking-widest rounded-2xl hover:bg-purple-700 active:scale-[0.98] transition-all shadow-xl shadow-purple-200/50 disabled:bg-gray-100 disabled:text-gray-400 disabled:shadow-none cursor-pointer whitespace-nowrap"
                >
                    {cargandoRegistrosSobre ? 'Cargando...' : 'Aplicar Filtros'}
                </button>
            </form>
        </div>
    );
}