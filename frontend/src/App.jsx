import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import api from './api/ApiBase';
import AppLayout from './layout/AppLayout';
import Inicio from './pages/home/Inicio';
import Sobres from './pages/sobres/Sobres';
import Registro from './pages/login/Registro';
import Login from './pages/login/Login';
import ProtectedRoute from './components/ProtectedRoute';
import PanelSobres from './pages/gestiona/PanelSobres';
import Reparto_Masivo from './pages/Reparto_Masivo/Reparto_Masivo';
import { useSobres } from './pages/sobres/hooks/useSobres'

export default function App() {
  const [autenticado, setAutenticado] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { datosGet, cargandoGet, errorGet, getSobres, cargandoPost, errorPost, exitoPost, postSobres, cargandoPut, errorPut, exitoPut, putSobre, exitoDel, cargandoDel, errorDel, del, exitoReactivar, cargandoReactivar, errorReactivar, reactivar } = useSobres();
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
      <Route element={<AppLayout autenticado={autenticado} setAutenticado={setAutenticado} setError={setError} />}>
        <Route path="/" element={<Inicio />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/login" element={<Login setAutenticado={setAutenticado} />} />
        <Route path="/Sobres" element={<Sobres
          autenticado={autenticado}
          datosGet={datosGet}
          cargandoGet={cargandoGet}
          errorGet={errorGet}
          getSobres={getSobres}
          cargandoPost={cargandoPost}
          errorPost={errorPost}
          exitoPost={exitoPost}
          postSobres={postSobres}
          cargandoPut={cargandoPut}
          errorPut={errorPut}
          exitoPut={exitoPut}
          putSobre={putSobre}
          exitoDel={exitoDel}
          cargandoDel={cargandoDel}
          errorDel={errorDel}
          del={del}
          exitoReactivar={exitoReactivar}
          cargandoReactivar={cargandoReactivar}
          errorReactivar={errorReactivar}
          reactivar={reactivar}
        />} />
        <Route path="/Gestion" element={<PanelSobres
          autenticado={autenticado}
          datosGet={datosGet}
          cargandoGet={cargandoGet}
          errorGet={errorGet}
          getSobres={getSobres}
        />} />
        <Route path="/Reparto-Masivo" element={<Reparto_Masivo
          autenticado={autenticado}
        />} />
        <Route element={<ProtectedRoute autenticado={autenticado} loading={loading} />}>
        </Route>
      </Route>
    </Routes>

    
  );
}