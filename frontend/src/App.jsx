import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import api from './api/ApiBase';
import AppLayout from './layout/AppLayout';
import Inicio from './pages/home/Inicio';
import Registro from './pages/login/Registro';
import Login from './pages/login/Login';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await api.get('usuarios/me/');
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  return (
    <Routes>
      <Route element={<AppLayout isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />}>

        <Route path="/" element={<Inicio />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/Sobres" element={<Inicio />} />

        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} loading={loading} />}>
        </Route>
      </Route>
    </Routes>
  );
}