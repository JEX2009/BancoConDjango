import api from './ApiBase';

export const transaccionService = {
    getFirsts: async () => {
        const response = await api.get('transaccion/Transacciones/');
        return response.data
    },
    getSobreTransacction: async ( fecha_inicio, fecha_fin) => {
        const response = await api.get('transaccion/Transacciones/?fecha_inicio='+fecha_inicio+'&fecha_fin='+ fecha_fin);
        return response.data
    }
}