const ErrorMessage = ({ message }) => (
    <div className="flex justify-center items-center p-8 bg-red-100 border border-red-400 rounded">
        <p className='text-lg text-red-700'>
            Error: {message || "Ocurrió un problema inesperado."}
        </p>
    </div>
);
export default ErrorMessage;