import PrestamoItem from "./PrestamoItem";

export default function PrestamosList({ prestamos, pagarPrestamo, cargandoPago }) {
    if (!prestamos || prestamos.length === 0) {
        return (
            <div className="text-center p-8 bg-gray-50 rounded-2xl border border-gray-100">
                <p className="text-gray-400 text-sm font-medium">No hay préstamos registrados.</p>
            </div>
        );
    }

    return (
        <div className="grid gap-4">
            {prestamos.map((prestamo) => (
                <PrestamoItem 
                    key={prestamo.id} 
                    prestamo={prestamo} 
                    pagarPrestamo={pagarPrestamo} 
                    cargandoPago={cargandoPago} 
                />
            ))}
        </div>
    );
}