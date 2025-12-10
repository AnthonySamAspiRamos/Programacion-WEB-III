import { useState, useMemo } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Edit, Trash2 } from 'lucide-react'; 
import { colors } from '../../styles/colors';
import { updateGasto, deleteGasto } from '../services/gastosServices.jsx';

function TablaGastosModern({ gastos = [], categorias = [], onGastoActualizado, onGastoEliminado }) {
    const [periodoActivo, setPeriodoActivo] = useState('dia'); 
    const [gastoEditando, setGastoEditando] = useState(null);
    const [formEdit, setFormEdit] = useState({
        cantidad: '',
        descripcion: '',
        fecha: '',
        categoria_Id: ''
    });

    const getButtonClass = (periodo) => 
        `px-4 py-2 text-sm font-medium transition-all duration-150 rounded-lg shadow-sm ${
            periodoActivo === periodo 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'bg-white text-gray-700 hover:bg-gray-100'
        }`;

    const obtenerNombreCategoria = (categorias_id) => {         
        const categoria = categorias.find(cat => cat.id == categorias_id);
        return categoria ? categoria.nombre : 'Sin Categoría';
    };
 
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

    // handlers
    const iniciarEdicion = (gasto) => {
        setGastoEditando(gasto.id);
        setFormEdit({
            cantidad: gasto.cantidad,
            descripcion: gasto.descripcion,
            fecha: gasto.fecha.substring(0, 10), 
            categorias_id: gasto.categorias_id
        });
    };

    const cancelarEdicion = () => {
        setGastoEditando(null);
        setFormEdit({
            cantidad: '',
            descripcion: '',
            fecha: '',
            categorias_Id: ''
        });
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setFormEdit(prev => ({ ...prev, [name]: value }));
    };

    const guardarEdicion = async () => {
        if (!gastoEditando) return;

        try {
            await updateGasto(gastoEditando, formEdit);
               
            if (onGastoActualizado) {
                onGastoActualizado();
            }
            
            cancelarEdicion();
            alert('Gasto actualizado exitosamente');
        } catch (error) {
            console.error('Error al actualizar gasto:', error);
            alert('Error al actualizar el gasto');
        }
    };

    // handler para Eliminar
    const handleEliminar = async (id) => {
        if (!window.confirm('¿Estás seguro de eliminar este gasto?')) {
            return;
        }

        try {
            await deleteGasto(id);

            if (onGastoEliminado) {
                onGastoEliminado();
            }
            
            alert('Gasto eliminado exitosamente');
        } catch (error) {
            console.error('Error al eliminar gasto:', error);
            alert('Error al eliminar el gasto');
        }
    };

    // render
    return (
        <div className="p-4 bg-white rounded-xl shadow-xl border border-gray-100">
                
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-5">
                <h3 className="text-xl font-extrabold text-gray-800 mb-3 md:mb-0">
                    Detalle de Transacciones
                </h3>
          
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
                                    {gastoEditando === gasto.id ? (                                     
                                        <>
                                            <td className="px-6 py-4">
                                                <input
                                                    type="text"
                                                    name="descripcion"
                                                    value={formEdit.descripcion}
                                                    onChange={handleEditChange}
                                                    className="w-full px-2 py-1 border rounded"
                                                />
                                            </td>
                                            
                                            <td className="px-6 py-4">
                                                <select
                                                    name="categoria_Id"
                                                    value={formEdit.categorias_id}
                                                    onChange={handleEditChange}
                                                    className="w-full px-2 py-1 border rounded"
                                                >
                                                    <option value="">Seleccionar</option>
                                                    {categorias.map(cat => (
                                                        <option key={cat.id} value={cat.id}>
                                                            {cat.nombre}
                                                        </option>
                                                    ))}
                                                </select>
                                            </td>
                                            
                                            <td className="px-6 py-4">
                                                <input
                                                    type="date"
                                                    name="fecha"
                                                    value={formEdit.fecha}
                                                    onChange={handleEditChange}
                                                    className="w-full px-2 py-1 border rounded"
                                                />
                                            </td>
                                            
                                            <td className="px-6 py-4">
                                                <input
                                                    type="number"
                                                    name="cantidad"
                                                    value={formEdit.cantidad}
                                                    onChange={handleEditChange}
                                                    step="0.01"
                                                    min="0.01"
                                                    className="w-full px-2 py-1 border rounded text-right"
                                                />
                                            </td>
                                            
                                            <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                                                <Button 
                                                    variant="success" 
                                                    size="sm" 
                                                    className="me-2"
                                                    onClick={guardarEdicion}
                                                >
                                                    Guardar
                                                </Button>
                                                <Button 
                                                    variant="secondary" 
                                                    size="sm"
                                                    onClick={cancelarEdicion}
                                                >
                                                    Cancelar
                                                </Button>
                                            </td>
                                        </>
                                    ) : (                                      
                                        <>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {gasto.descripcion}
                                            </td>
                                            
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span 
                                                    style={{
                                                        backgroundColor: colors.accent + '20',
                                                        color: colors.primaryDark,
                                                        padding: '2px 8px',
                                                        borderRadius: '9999px',
                                                        fontSize: '0.75rem',
                                                        fontWeight: '600',
                                                        display: 'inline-flex'
                                                    }}
                                                >
                                                    {obtenerNombreCategoria(gasto.categorias_id)}
                                                </span>
                                            </td>
                                            
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {new Date(gasto.fecha).toLocaleDateString('es-ES')}
                                            </td>
                                           
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-right text-red-600">
                                                -${parseFloat(gasto.cantidad).toFixed(2)} 
                                            </td>
                                            
                                            <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                                                <Button 
                                                    variant="link" 
                                                    className="p-0 me-2 text-info"
                                                    onClick={() => iniciarEdicion(gasto)}
                                                >
                                                    <Edit size={16} />
                                                </Button>
                                                <Button 
                                                    variant="link" 
                                                    className="p-0 text-danger"
                                                    onClick={() => handleEliminar(gasto.id)}
                                                >
                                                    <Trash2 size={16} />
                                                </Button>
                                            </td>
                                        </>
                                    )}
                                </tr>
                            ))
                        )}
                    </tbody>
                </Table>
            </div>
            
            {gastosFiltrados.length > 0 && (
                <div className="mt-6 pt-4 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">
                            Total de {gastosFiltrados.length} gastos en este período:
                        </span>
                        <span className="text-lg font-bold text-red-600">
                            -$
                            {gastosFiltrados
                                .reduce((total, gasto) => total + parseFloat(gasto.cantidad || 0), 0)
                                .toFixed(2)}
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
}

export default TablaGastosModern;