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
    },

    reactivate: async (id) => {
        await api.post(`Sobres/${id}/reactivar/`);
    },
    repartir: async (monto) => {
        const response = await api.post('Sobres/repartir/', monto)
        return response.data;
    }
};