import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute({ isAuthenticated, loading }) {
    if (loading) return <div className="text-center mt-10">Cargando...</div>;

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}