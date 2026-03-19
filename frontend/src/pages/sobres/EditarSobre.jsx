import { useForm } from "react-hook-form";
import LoadingSpinner from "../../components/LoadingSpinner";
import ErrorMessage from "../../components/ErrorMessage";

export default function FormularioSobre({ cargandoPut,errorPut,putSobre,cerrarModal,setInformacion,sobre }) {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues:{
            nombre:sobre.nombre,
            porcentaje:sobre.porcentaje,
            limite:sobre.limite
        }
    });

    const enviar = async (data) => {
        await putSobre(sobre.id,data);
        if (!errorPut) {
            setInformacion("Se modifico el sobre "+ sobre.nombre +" con exito");
            cerrarModal();
        } else {
            reset();
        };
    };

    const ClaseIngreso = (error) => `
        w-full px-4 py-3 rounded-xl border transition-all duration-200 outline-none text-gray-700
        ${error
            ? 'border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200'
            : 'border-gray-200 bg-gray-50 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100'
        }
    `;



    return (
        <div className="max-w-md mx-auto bg-white p-8 rounded-3xl shadow-2xl border border-gray-100">
            {/* Encabezado del Formulario */}
            <div className="mb-8">
                <h2 className="text-2xl font-black text-gray-800 tracking-tight">Editando el sobre {sobre.nombre}</h2>
            </div>

            <form onSubmit={handleSubmit(enviar)} className="space-y-5">

                {/* Campo: Nombre */}
                <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Nombre del Sobre</label>
                    <input
                        {...register("nombre", { required: "Ponle un nombre a tu sobre" })}
                        placeholder="Es un nombre unico"
                        className={ClaseIngreso(errors.nombre)}
                    />
                    {errors.nombre && <span className="text-red-500 text-xs font-medium ml-1"> {errors.nombre.message}</span>}
                </div>


                {/* Fila Doble: Meta y Porcentaje */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Meta / Límite</label>
                        <input
                            type="number"
                            {...register("limite", {
                                required: "Define un límite", min: { value: 0, message: "Mínimo 0" },
                                valueAsNumber: true,
                                validate: (value) =>  parseFloat(sobre.saldo) <  parseFloat(value) || "El límite no puede ser menor ni igual al saldo actual"
                            })}
                            placeholder="₡ Límite"
                            className={ClaseIngreso(errors.limite)}
                            step={1}
                        />
                        {errors.limite && <span className="text-red-500 text-xs font-medium ml-1">{errors.limite.message}</span>}
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">% Distribución</label>
                        <input
                            type="number"
                            {...register("porcentaje", {
                                required: "Escribe un %",
                                min: { value: 0, message: "Mínimo 0" },
                                max: { value: 100, message: "Máximo 100" },
                                valueAsNumber: true
                            })}
                            placeholder="15%"
                            className={ClaseIngreso(errors.porcentaje)}
                            step={1}
                        />
                        {errors.porcentaje && <span className="text-red-500 text-xs font-medium ml-1">{errors.porcentaje.message}</span>}
                    </div>
                </div>

                {/* Botón de Envío */}
                {!cargandoPut ?
                    <button
                        type="submit"
                        className="w-full mt-4 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-indigo-200 transition-all active:scale-[0.98]"

                    >
                        Actualizar mi Sobre
                    </button> :
                    <LoadingSpinner mensaje={"Subiendo..."} />
                }
            </form>
            {errorPut && (
                <div className="mt-2">
                    <ErrorMessage
                        message={"Ha ocurrido un error al actualizar el sobre, revisa todos los campos o puedes reportar el problema con soporte"}
                    />
                </div>
            )}
        </div>
    );
}