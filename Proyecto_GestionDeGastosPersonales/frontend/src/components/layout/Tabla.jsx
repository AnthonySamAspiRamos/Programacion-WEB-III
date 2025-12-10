
import { useState, useMemo } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Edit, Trash2 } from 'lucide-react'; 
import { useNavigate, Link } from 'react-router-dom';

function TablaGastosModern({ gastos = [], categorias = [] }) {
    const [periodoActivo, setPeriodoActivo] = useState('dia'); 

    const getButtonClass = (periodo) => 
        `px-4 py-2 text-sm font-medium transition-all duration-150 rounded-lg shadow-sm ${
            periodoActivo === periodo 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'bg-white text-gray-700 hover:bg-gray-100'
        }`;

    const obtenerNombreCategoria = (categorias_id) => 
        categorias.find(cat => cat.id === categorias_id)?.nombre || 'Sin Categoría';

    const gastosFiltrados = useMemo(() => {
        if (gastos.length === 0) return [];
        
        const hoy = new Date();
        const hoyString = hoy.toISOString().substring(0, 10);
        const hoyObjetoLimpio = new Date(hoyString);

        const esFechaValida = (fechaGasto) => {
             if (!fechaGasto || isNaN(new Date(fechaGasto).getTime())) {
                return false;
            }
            
             const fechaGastoObjeto = new Date(fechaGasto);
            const fechaGastoString = fechaGastoObjeto.toISOString().substring(0, 10);
            fechaGastoObjeto.setHours(0, 0, 0, 0); 

            switch (periodoActivo) {
                case 'dia':
                    return fechaGastoString === hoyString; 

                case 'semana':
                     const inicioSemana = new Date(hoyObjetoLimpio);
                    const diaDeSemana = (hoyObjetoLimpio.getDay() + 6) % 7; 
                    inicioSemana.setDate(hoyObjetoLimpio.getDate() - diaDeSemana);
                    return fechaGastoObjeto >= inicioSemana && fechaGastoObjeto <= hoyObjetoLimpio;

                case 'mes':
                     return fechaGastoObjeto.getMonth() === hoyObjetoLimpio.getMonth() && 
                           fechaGastoObjeto.getFullYear() === hoyObjetoLimpio.getFullYear();

                default:
                    return true;
            }
        };
        
        return gastos.filter(gasto => esFechaValida(gasto.fecha));
    }, [gastos, periodoActivo]); 
    

    return (
        <div className="p-4 bg-white rounded-xl shadow-xl border border-gray-100">
            
            {/* HEADER Y BOTONES  */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-5">
                <h3 className="text-xl font-extrabold text-gray-800 mb-3 md:mb-0">
                    Detalle de Transacciones
                </h3>

                {/* Grupo de botones */}
                <div className="flex space-x-2 p-1 rounded-xl bg-gray-100 shadow-inner">
                    {['dia', 'semana', 'mes'].map((periodo) => (
                        <button
                            key={periodo}
                            className={getButtonClass(periodo)}
                            onClick={() => setPeriodoActivo(periodo)}
                        >
                            {periodo.charAt(0).toUpperCase() + periodo.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            {/* TABLA */}
            <div className="overflow-x-auto">
                <Table className="min-w-full divide-y divide-gray-200">
                    
                    <thead>
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descripción</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoría</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Monto</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                        </tr>
                    </thead>
                    
                    <tbody className="bg-white divide-y divide-gray-200">
                        {gastosFiltrados.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                                    No hay gastos registrados para este período.
                                </td>
                            </tr>
                        ) : (
                            gastosFiltrados.map((gasto, index) => (
                                <tr 
                                    key={gasto.id} 
                                    className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-100 transition duration-150`}
                                >
                                    
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {gasto.descripcion}
                                    </td>
                                    
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                            {obtenerNombreCategoria(gasto.categorias_id)}
                                        </span>
                                    </td>
                                    
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(gasto.fecha).toLocaleDateString()}
                                    </td>
                                   
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-right text-red-600">
                                      -${parseFloat(gasto.cantidad).toFixed(2)} 
                                  </td>
                                    
                                    <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                                        <Button variant="link" className="p-0 me-2 text-info">
                                            <Edit size={16} />
                                        </Button>
                                        <Button variant="link" className="p-0 text-danger">
                                            <Trash2 size={16} />
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </Table>
            </div>
            
        </div>
    );
}

export default TablaGastosModern;