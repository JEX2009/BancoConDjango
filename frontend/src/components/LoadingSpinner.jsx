import { CgSpinner } from "react-icons/cg";


const LoadingSpinner = () =>  (
    <div className="flex justify-center items-center p-8">
        <p className='text-lg text-green-500 animate-pulse'>Cargando...</p>
        <CgSpinner  className="ml-2 text-2xl text-green-500 motion-safe:animate-spin" />
    </div>
);
export default LoadingSpinner;