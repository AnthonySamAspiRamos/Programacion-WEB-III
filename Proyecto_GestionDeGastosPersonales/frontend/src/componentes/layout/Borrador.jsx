// Componente: TablaGastosModern.jsx (o reemplaza el contenido de DatosTabla.jsx)
import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { Edit, Trash2 } from 'lucide-react'; 
import { useNavigate, Link } from 'react-router-dom';

function TablaGastosModern() {
  // Nota: Aquí se recibirán los gastos como prop
  // function TablaGastosModern({ gastos }) { ...

  return (
    <div className="overflow-x-auto shadow-md rounded-lg"> 
      
      {/* Usa Table de Bootstrap y le aplica clases de Tailwind */}
      <Table className="min-w-full divide-y divide-gray-200">
        
        {/* Cabecera (Thead) con fondo claro */}
        <thead className="bg-gray-50">
          <tr>
            {/* Clases Tailwind para padding, tamaño de fuente y color */}
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Descripción
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Categoría
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Fecha
            </th>
            <th className="px-6 py-3 text-right text-xs font-bold text-red-600 uppercase tracking-wider">
              Monto
            </th>
            <th className="relative px-6 py-3">
              Acciones
            </th>
          </tr>
        </thead>
        
        {/* Cuerpo (Tbody) */}
        <tbody className="bg-white divide-y divide-gray-200">
          
          {/* ============================================================
            ESTA ES LA ESTRUCTURA DE UNA FILA (ITERACIÓN PENDIENTE)
            ============================================================
          */}
          
          <tr className="bg-white hover:bg-gray-100 transition duration-150">
            {/* Descripción */}
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              Café y Almuerzo de hoy
            </td>
            
            {/* Categoría */}
            <td className="px-6 py-4 whitespace-nowrap">
              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                Comida
              </span>
            </td>
            
            {/* Fecha */}
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              10/12/2025
            </td>
            
            {/* Monto (Negativo y Rojo) */}
            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-right text-red-600">
              -$150.00
            </td>
            
            {/* Acciones */}
            <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
              <Button variant="link" className="p-0 me-2 text-info">
                <Edit size={16} />
              </Button>
              <Button variant="link" className="p-0 text-danger">
                <Trash2 size={16} />
              </Button>
            </td>
          </tr>
          
          {/* Fila Alternada (usarías una clase condicional en la iteración) */}
          <tr className="bg-gray-50 hover:bg-gray-100 transition duration-150">
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Pago de Electricidad</td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                Servicios
              </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">05/12/2025</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-right text-red-600">-$800.00</td>
            <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
              <Button variant="link" className="p-0 me-2 text-info"><Edit size={16} /></Button>
              <Button variant="link" className="p-0 text-danger"><Trash2 size={16} /></Button>
            </td>
          </tr>
          
        </tbody>
      </Table>
    </div>
  );
}

export default TablaGastosModern;

