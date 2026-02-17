import axios from 'axios';

const api = axios.create({
    // La URL de tu contenedor de Django
    baseURL: 'http://localhost:8000/', 
    withCredentials: true,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});

export default api;