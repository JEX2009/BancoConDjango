import api from './ApiBase';

export const sobreService = {
    getAll: async () => {
        const response = await api.get('Sobres/');
        return response.data;
    },

    create: async (data) => {
        const response = await api.post('Sobres/', data);
        return response.data;
    },

    update: async (id, data) => {
        const response = await api.put(`Sobres/${id}/`, data);
        return response.data;
    },

    delete: async (id) => {
        await api.delete(`Sobres/${id}/`);
    }
};