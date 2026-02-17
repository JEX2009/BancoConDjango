import '/src/static/Tailwind.css'
// import { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import AppLayout from './layout/AppLayout';
import Inicio from './pages/home/Inicio'


export default function App() {
  // const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('access_token'));

  // const handleLoginSuccess = () => {
  //   setIsAuthenticated(true);
  // }

  // const handleLogOut = () => {
  //   setIsAuthenticated(false);
  //   localStorage.removeItem('access_token');
  //   localStorage.removeItem('refresh_token');
  // }

  return (
    <Routes>
      <Route element={<AppLayout />}>
        {/* <Route element={<AppLayout handleLogOut={handleLogOut} isAuthenticated={isAuthenticated} />}> */}
        {/* <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login onLoginSuccess={handleLoginSuccess} />} /> */}
        <Route path='/' element={<Inicio />} />
      </Route>
    </Routes >
  );
}