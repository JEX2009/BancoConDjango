import '/src/static/Tailwind.css';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { HiOutlineHome, HiOutlineInboxIn, HiOutlineLogout, HiOutlineUserAdd, HiOutlineLogin } from 'react-icons/hi';
import { authService } from '../api/UserService';

// Componente de ítem de navegación modularizado
const NavItem = ({ to, icon: Icon, label, activeStyle }) => (
    <li>
        <Link to={to} className={activeStyle(to)}>
            <Icon className="text-xl" />
            <span className="font-medium">{label}</span>
        </Link>
    </li>
);

export default function Sidebar({ autenticado, setAutenticado, setError }) {
    const navigate = useNavigate();
    const location = useLocation();

    const deslogueo = async () => {
        try {
            await authService.logout();
            setAutenticado(false);
            navigate('/login');
        } catch (error) {
            setError("Ha ocurrido un error");
        }
    };

    const styloLink = (path) => {
        const base = "flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 text-sm mb-1";
        const active = "bg-blue-600 text-white shadow-md shadow-blue-200";
        const inactive = "text-gray-500 hover:bg-blue-50 hover:text-blue-600";
        return `${base} ${location.pathname === path ? active : inactive}`;
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* BARRA LATERAL */}
            <aside className="w-64 bg-white border-r border-gray-200 flex flex-col sticky top-0 h-screen">
                
                {/* Logo / Branding */}
                <div className="p-6 border-b border-gray-100">
                    <Link to="/" className="flex items-center space-x-3">
                        <div className="bg-blue-600 p-2 rounded-xl">
                            <HiOutlineInboxIn className="text-white text-2xl" />
                        </div>
                        <h1 className="text-xl font-bold text-gray-800 tracking-tight">MisSobres</h1>
                    </Link>
                </div>

                {/* Navegación Principal */}
                <nav className="flex-1 p-4 overflow-y-auto">
                    <ul className="space-y-1">
                        <NavItem to="/" icon={HiOutlineHome} label="Inicio" activeStyle={styloLink} />
                        <NavItem to="/Gestion" icon={HiOutlineInboxIn} label="Ingresos y Egresos" activeStyle={styloLink} />
                        <NavItem to="/Sobres" icon={HiOutlineInboxIn} label="Mis Sobres" activeStyle={styloLink} />
                        <NavItem to="/Reparto-Masivo" icon={HiOutlineInboxIn} label="Reparto en Sobres" activeStyle={styloLink} />
                    </ul>
                </nav>

                {/* Footer de la Sidebar (Auth) */}
                <div className="p-4 border-t border-gray-100">
                    <ul className="space-y-1">
                        {autenticado ? (
                            <li>
                                <button
                                    onClick={deslogueo}
                                    className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm text-red-600 hover:bg-red-50 transition-colors"
                                >
                                    <HiOutlineLogout className="text-xl" />
                                    <span className="font-medium">Cerrar Sesión</span>
                                </button>
                            </li>
                        ) : (
                            <>
                                <NavItem to="/login" icon={HiOutlineLogin} label="Entrar" activeStyle={styloLink} />
                                <NavItem to="/registro" icon={HiOutlineUserAdd} label="Registrarse" activeStyle={styloLink} />
                            </>
                        )}
                    </ul>
                </div>
            </aside>

            {/* CONTENIDO PRINCIPAL */}
            <main className="flex-1 overflow-y-auto p-8">
                <div className="max-w-5xl mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}