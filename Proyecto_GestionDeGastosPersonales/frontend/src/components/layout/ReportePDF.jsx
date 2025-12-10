import React, { useRef, useEffect, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGastos, selectAllGastos } from '../modules/store/gastosSlice'; // Ajusta la ruta a tu slice de gastos

const ReportePDF = () => {
    const pdfRef = useRef(null);
    const dispatch = useDispatch();

    const gastos = useSelector(selectAllGastos); 
    const loading = useSelector(state => state.gastos.loading); // Ejemplo de estado

    useEffect(() => {
         if (gastos.length === 0) {
            dispatch(fetchGastos());
        }
    }, [dispatch, gastos.length]);

    const downloadPDF = () => {
        const input = pdfRef.current; 

        html2canvas(input, { scale: 2 }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4'); 
            
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const imgHeight = (canvas.height * pdfWidth) / canvas.width;
            
            let position = 0;
            let heightLeft = imgHeight;

            pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
            heightLeft -= pdfHeight;

            while (heightLeft > 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
                heightLeft -= pdfHeight;
            }

            pdf.save('reporte_gastos.pdf');
        });
    };

    return (
        <div className="report-container p-4">
            <h2 className="mb-4">Generación de Reporte PDF</h2>
            
            <button className="btn btn-primary mb-3" onClick={downloadPDF} disabled={loading}>
                {loading ? 'Cargando datos...' : 'Descargar Reporte PDF'}
            </button>
            
             <div ref={pdfRef} className="pdf-content p-4 bg-white border">
                <h1 className="text-xl font-bold mb-2">Reporte Detallado de Gastos</h1>
                <p className="text-sm text-gray-500 mb-4">Generado el: {new Date().toLocaleDateString()}</p>
                
                    {gastos.length > 0 ? (
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Fecha</th>
                                <th>Monto</th>
                                <th>Descripción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {gastos.map((gasto) => (
                                <tr key={gasto.id_gasto}>
                                    <td>{gasto.id_gasto}</td>
                                    <td>{new Date(gasto.fecha).toLocaleDateString()}</td>
                                    <td>${gasto.monto.toFixed(2)}</td>
                                    <td>{gasto.descripcion}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No hay datos de gastos para generar el reporte.</p>
                )}
            </div>
        </div>
    );
};

export default ReportePDF;