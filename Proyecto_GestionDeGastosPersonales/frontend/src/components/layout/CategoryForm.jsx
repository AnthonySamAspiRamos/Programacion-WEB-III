import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

function CategoryForm({ onSubmit, onCancel }) {
    const [nombre, setNombre] = useState('');   
    const [descripcion, setDescripcion] = useState(''); 

    const handleSubmit = (e) => {
        e.preventDefault();
        if (nombre.trim()) {
            onSubmit({ 
                nombre: nombre.trim(), 
                descripcion: descripcion.trim() 
            });
            setNombre('');
            setDescripcion(''); 
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>Nombre de la Categoría</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Ej: Comida, Viajes, Renta"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                />
            </Form.Group>
            
            {/* Descripción */}
            <Form.Group className="mb-3">
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                    as="textarea" 
                    placeholder="Detalles sobre esta categoría"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                />
            </Form.Group>
            
            <Button variant="success" type="submit" className="w-100 mb-2">
                Guardar Categoría
            </Button>
            
            <Button variant="secondary" onClick={onCancel} className="w-100">
                Volver a Gastos
            </Button>
        </Form>
    );
}

export default CategoryForm;