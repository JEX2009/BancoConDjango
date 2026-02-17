import '/src/static/Tailwind.css';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { HiOutlineHome, HiOutlineInboxIn,HiOutlineLogout, HiOutlineUserAdd, HiOutlineLogin } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import {authService} from '../api/UserService'
export default function Navbar({ isAuthenticated, setIsAuthenticated }) {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await authService.logout();
            setIsAuthenticated(false); // Limpiamos el estado global
            navigate('/login'); // Redirigimos al login
        } catch (error) {
            console.error("Error al cerrar sesión", error);
        }
    };
    const location = useLocation();

    const linkStyle = (path) => {
        const base = "flex items-center space-x-1 px-3 py-2 rounded-md transition-colors text-sm";
        const active = "bg-blue-50 text-blue-600 font-semibold";
        const inactive = "text-gray-600 hover:bg-gray-100 hover:text-gray-900";
        return `${base} ${location.pathname === path ? active : inactive}`;
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
                <div className='container mx-auto flex justify-between items-center p-4'>

                    <Link to="/" className="flex items-center space-x-2">
                        <div className="bg-blue-600 p-2 rounded-lg">
                            <HiOutlineInboxIn className="text-white text-xl" />
                        </div>
                        <h1 className="text-xl font-bold text-gray-800 tracking-tight">MisSobres</h1>
                    </Link>

                    <nav>
                        <ul className="flex space-x-2">
                            <li>
                                <Link to="/" className={linkStyle('/')}>
                                    <HiOutlineHome />
                                    <span>Inicio</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/Sobres" className={linkStyle('/Sobres')}>
                                    <HiOutlineInboxIn />
                                    <span>Mis Sobres</span>
                                </Link>
                            </li>
                            {isAuthenticated ? (
                                <>
                                    <li>
                                    <button 
                                        onClick={handleLogout}
                                        className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm text-red-600 hover:bg-red-50 transition-colors"
                                    >
                                        <HiOutlineLogout />
                                        <span>Salir</span>
                                    </button>
                                </li>
                                </>
                            ) : (
                                <>
                                    <li>
                                        <Link to="/login" className={linkStyle('/login')}>
                                            <HiOutlineLogin />
                                            <span>Entrar</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/registro" className={linkStyle('/registro')}>
                                            <HiOutlineUserAdd />
                                            <span>Registrarse</span>
                                        </Link>
                                    </li>

                                </>
                            )}
                        </ul>
                    </nav>
                </div>
            </header>

            <main className="container mx-auto p-6">
                <Outlet />
            </main>
        </div>
    );
}