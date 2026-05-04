import React from 'react';
import { useForm } from 'react-hook-form';

// Componente modular para el input de fecha
const FechaInput = ({ label, name, register, error, validation }) => {
    return (
        <div className="flex flex-col gap-1.5">
            <label htmlFor={name} className="text-sm font-medium text-gray-700">
                {label}
            </label>
            <input
                id={name}
                type="date"
                {...register(name, validation)}
                className="w-full px-3 py-2 text-sm text-gray-900 bg-gray-50/50 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            />
            {error && (
                <span className="text-xs font-medium text-red-500 mt-0.5">
                    {error.message || 'Este campo es requerido'}
                </span>
            )}
        </div>
    );
};

export default function FechaFormulario({ cargandoRegistrosSobre, masRegistros }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm();

    const onSubmit = (data) => {
        const inicio = typeof fechaInicio === 'object'
            ? fechaInicio?.target?.value || fechaInicio?.value || ''
            : fechaInicio;

        const fin = typeof fechaFin === 'object'
            ? fechaFin?.target?.value || fechaFin?.value || ''
            : fechaFin;
        masRegistros(inicio, fin);
    };

    // Validación de la fecha de inicio en relación con la de fin
    const validateFechaInicio = (value) => {
        const fechaFin = watch('fechaFin');
        if (fechaFin && value > fechaFin) {
            return 'La fecha de inicio debe ser anterior a la fecha de fin.';
        }
        return true;
    };

    // Validación de la fecha de fin
    const validateFechaFin = (value) => {
        const fechaInicio = watch('fechaInicio');
        if (fechaInicio && value < fechaInicio) {
            return 'La fecha de fin debe ser posterior a la fecha de inicio.';
        }
        return true;
    };

    return (
        <div className="flex  bg-gray-50/50 p-6">
            <form
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="space-y-1 text-center sm:text-left">
                    <h2 className="text-lg font-semibold text-gray-900 tracking-tight">
                        Filtrar por Rango de Fechas
                    </h2>
                </div>

                <div className="flex mt-2 gap-4">
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
                    <button
                        type='submit'
                        onClick={masRegistros}
                        className="px-6 py-3 bg-gray-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-black transition-all shadow-lg shadow-gray-200"
                    >
                        {cargandoRegistrosSobre ? "Cargando..." : "Aplicar Filtros"}
                    </button>
                </div>

            </form>
        </div>
    );
}