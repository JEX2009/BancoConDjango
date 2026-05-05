import api from './ApiBase';

export const prestamoService={
    getAll: async () => {
        const response = await api.get('prestamo/prestamos/');
        return response.data;
    },

    create: async (data) => {
        const response = await api.post('prestamo/prestamos/', data);
        return response.data;
    },  
    pagar : async (id, monto) => {
        const response = await api.put(`prestamo/prestamos/${id}/pagar/`, {monto});
        return response.data;
    }
}