import { CgSpinner } from "react-icons/cg";


const LoadingSpinner = ({mensaje}) =>  (
    <div className="flex justify-center items-center p-8">
        <p className='text-lg text-green-500 animate-pulse'>{mensaje? mensaje: "Cargando..."}</p>
        <CgSpinner  className="ml-2 text-2xl text-green-500 motion-safe:animate-spin" />
    </div>
);
export default LoadingSpinner;