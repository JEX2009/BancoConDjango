export default function Layout({ children, nombre, descripcion,autenticado,accionAutenticado }) {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <header>
                <nav className="max-w-7xl mx-auto flex justify-between items-center">
                    <span className='text-3xl font-black text-gray-800 tracking-tight'>{nombre}</span>
                </nav>
                <p className="text-gray-400 font-medium text-sm">{descripcion}</p>
            </header>

            <main className="flex-grow max-w-7xl mx-auto w-full py-8">
                {autenticado === false && (
                    <div className="p-4 bg-amber-50 border border-amber-100 rounded-2xl">
                        <p className="text-amber-600 text-xs font-medium text-center">
                            Si no hay una sesión activa {accionAutenticado}
                        </p>
                    </div>
                )}
                {children}
            </main>

            {/* <footer className="p-4 text-center text-xs text-gray-400">
                © {new Date().getFullYear()} Banco Con Django.
            </footer> */}
        </div>
    );
}