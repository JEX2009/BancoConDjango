import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import api from './api/ApiBase';
import AppLayout from './layout/AppLayout';
import Inicio from './pages/home/Inicio';
import Sobres from './pages/sobres/Sobres';
import Registro from './pages/login/Registro';
import Login from './pages/login/Login';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  const [autenticado, setAutenticado] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error,setError]= useState(false);
  useEffect(() => {
    const checkAuth = async () => {
      try {
        await api.get('me/');
        setAutenticado(true);
      } catch (error) {
        setAutenticado(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);


  return (
    <Routes>
      <Route element={<AppLayout autenticado={autenticado} setAutenticado={setAutenticado} setError={setError}/>}>
        <Route path="/" element={<Inicio />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/login" element={<Login setAutenticado={setAutenticado} />} />
        <Route path="/Sobres" element={<Sobres autenticado={autenticado} />} />
        <Route element={<ProtectedRoute autenticado={autenticado} loading={loading} />}>
        </Route>
      </Route>
    </Routes>
  );
}