import api from './ApiBase';

export const authService = {
    registro: async (userData) => {
        // userData debe contener: username, email, password, password_confirm
        const response = await api.post('/registro/', userData);
        return response.data;
    },

    login: async (credentials) => {
        const response = await api.post('/login/', credentials);
        return response.data;
    },

    logout: async () => {
        const response = await api.post('/logout/');
        return response.data;
    }
};