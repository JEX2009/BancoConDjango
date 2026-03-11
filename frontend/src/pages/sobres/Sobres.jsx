import { useEffect, useState } from 'react';
import { useSobres } from '../../hooks/useSobres'
import PopUp  from '../../components/PopUp'
import SeeEnvelopment from './SeeEnvelopment'
import EditEnvelopment from './EditEnvelopment'
import DeactivateEnvelopment from './DeactivateEnvelopment'
import ReactivateEnvelopment from './ReactivateEnvelopment'
import EnvelopmentForm from './EnvelopmentForm'

export default function Sobres({ isAuthenticated }) {
    const { sobres, error, loading, getSobres } = useSobres();
    const [modal, setModal] = useState(false);
    const [action, setAccion] = useState("");

    const closeModal = () => {
        setModal(false);
    };

    const actionModal = (realizatedAction) => { 
        setModal(true)
        setAccion(realizatedAction);
    };

    useEffect(() => {
        getSobres();
    }, []);

    return (
        <div>
            <PopUp closeModal={closeModal} isModalOpen={modal}>
                {
                    action === "see" ?
                        (<SeeEnvelopment />):
                    action === "edit" ?
                        (<EditEnvelopment />):
                    action === "form" ?
                        (<EnvelopmentForm />): 
                    action === "deactivate" ?
                        (<DeactivateEnvelopment />): 
                    (<ReactivateEnvelopment />)
                }
            </PopUp>
            <div className='flex flex-row justify-between items-center mb-6 pb-4 border-b border-gray-200'>
                <h2 className='text-2xl font-bold text-gray-800'>{isAuthenticated ? "Tus Sobres" : "Sobres Publicos"}</h2>
                <button
                    className='bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105'
                    onClick={()=>actionModal("form")}
                >
                    + Agregar Sobre
                </button>
            </div>
            <div>
                {sobres.map(sobre => (
                    <div
                        key={sobre.id}
                        className={`flex flex-row justify-between items-center p-4 my-2 rounded-lg shadow-sm ${sobre.activo ? 'border-l-4 border-green-600 bg-white' : 'border-l-4 border-red-600 bg-gray-50'}`}
                    >
                        {/* Lado Izquierdo: Información del sobre */}
                        <div className="flex flex-col">
                            <h4 className="text-lg font-bold"> Nombre: {sobre.nombre}</h4>
                            <span className="text-gray-600 font-medium">Saldo Actual: ${sobre.saldo}</span>
                            {/* 
                            <span>{sobre.limite}</span>
                            <span>{sobre.porcentaje}</span>
                            <span>{sobre.fecha_creacion}</span> 
                            */}
                        </div>

                        {/* Lado Derecho: Botones de acción */}
                        <div className='flex flex-row gap-2 items-center'>
                            <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                                onClick={() => actionModal("see")}
                            >
                                Ver
                            </button>
                            <button className="px-3 py-1 bg-amber-500 text-white rounded hover:bg-amber-600 transition-colors"
                                onClick={() => actionModal("edit")}
                            >
                                Modificar
                            </button>
                            {sobre.activo ?
                                (<>
                                    <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-700 transition-colors"
                                        onClick={() => actionModal("deactivate")}
                                    >
                                        Desactivar
                                    </button>
                                </>)
                                :
                                (<>
                                    <button className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-700 transition-colors"
                                        onClick={() => actionModal("reactivate")}
                                    >
                                        Reactivar
                                    </button>
                                </>)}

                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
