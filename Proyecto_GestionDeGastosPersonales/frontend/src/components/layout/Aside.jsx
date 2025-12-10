import React, { useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import { Container, Row, Col, Form, Button, Card,Spinner } from "react-bootstrap";
import { colors } from "../../styles/colors";
import Grafico from "./Grafico";
import TablaGastosModern from "./Tabla";
import CategoryForm from "./CategoryForm";
import { getCategorias } from "../../services/categorias.service";
import { getGastos, createGasto } from "../../services/gastos.service";


function Aside() {
  const [gastos, setGastos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [estadoCarga, setEstadoCarga] = useState({ loading: true, error: null }); 
    
    const [nuevoGasto, setNuevoGasto] = useState({
        cantidad: '',
        descripcion: '',
        fecha: new Date().toISOString().substring(0, 10), 
        categorias_id: '',
    });

    const [formType, setFormType] = useState('gasto'); 
    
    const showGastoForm = () => setFormType('gasto');
    const showCategoryForm = () => setFormType('categoria');
    
    //agregar categoria  
    const handleCategorySubmit = async (data) => {
        try {
            await handleCreateCategory(data); 
        } catch (error) {
       
        } finally {
            showGastoForm();  }
    };
    const handleCreateCategory = async (nuevaCategoria) => {
        try {
            console.log("Enviando categoría al backend:", nuevaCategoria);
             const response = await fetch('http://localhost:3001/api/categorias', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(nuevaCategoria),
            });

            if (!response.ok) {
                throw new Error('Error al crear la categoría en el servidor.');
            }

            const categoriaCreada = await response.json();
            
            setCategorias(prev => [...prev, categoriaCreada]); 
            
            alert(`Categoría "${categoriaCreada.nombre}" guardada exitosamente.`);

        } catch (error) {
            console.error("Error al guardar categoría:", error);
            alert('Ocurrió un error al intentar guardar la categoría.');
        }
    };
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Ejecución paralela
                const [gastosRes, categoriasRes] = await Promise.all([
                    getGastos(), 
                    getCategorias() 
                ]);
                
                setGastos(gastosRes); 
                setCategorias(categoriasRes);                      
            } catch (err) {
                console.error("Error al cargar datos:", err);
                setEstadoCarga({ loading: false, error: "Error al cargar datos. Revisa el backend." });
            } finally {
                setEstadoCarga(prev => ({ ...prev, loading: false })); 
            }
        };
        fetchData();
    }, []);
   
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNuevoGasto(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const gastoCreado = await createGasto(nuevoGasto); 
              setNuevoGasto({
                cantidad: '',
                descripcion: '',
                fecha: new Date().toISOString().substring(0, 10),
                categorias_id: '',
            });
        } catch (error) {
            console.error("Error al crear gasto:", error);
            alert("Error al registrar gasto. Revisa el backend.");
        }
    };

    if (estadoCarga.loading) {
        return (
            <Container fluid className="text-center py-5">
                <Spinner animation="border" role="status" className="me-2" />
                <p>Cargando datos...</p>
            </Container>
        );
    }
    
    if (estadoCarga.error) {
        return (
            <Container fluid className="text-center py-5">
                <p className="text-danger fw-bold">¡Error! {estadoCarga.error}</p>
            </Container>
        );
    }

    const handleDeleteGasto = (idGasto) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este gasto?')) {
            setGastos(gastos.filter(g => g.id !== idGasto));
            alert(`Gasto con ID ${idGasto} eliminado.`);
        }
    };

         const handleEditGasto = (gastoAEditar) => {
        console.log("Editando gasto:", gastoAEditar);
        alert(`Preparando edición del gasto: ${gastoAEditar.descripcion}`);
    };

console.log("Gastos cargados desde backend:", gastos);

  return (
    <Container fluid style={{ marginTop:0}}>
      <Row>
        {/* Columna izquierda: acordeón */}
        <Col md={4} style={{ backgroundColor: "#f7f7f7ff", padding: "20px" ,margin:0}}>
          <Accordion defaultActiveKey={["0"]} alwaysOpen>
            <Accordion.Item eventKey="0">
              <Accordion.Header>INGRESOS</Accordion.Header>
              <Accordion.Body>Metálicos, Estéticos, Zafiro</Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>AJUSTES</Accordion.Header>
              <Accordion.Body>Limpieza dental profesional</Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>COMPARTE</Accordion.Header>
              <Accordion.Body>Implantes dentales con seguimiento profesional</Accordion.Body>
            </Accordion.Item>
          </Accordion>          
          <Grafico gastos={gastos}></Grafico>
        </Col>

{/* CARDSSS Columna derecha contenido mas el form  */}
        <Col md={8} style={{ backgroundColor:colors.primary, position: "relative", padding: "20px" }}>
          
         <div className="cards" style={{
            display:'flex',
            flexWrap:'wrap',
            gap:10,
            width:'70%',
            
        }}>              
           <h2>Gastos Del Dia</h2>
          <p>
            “La gestión de gastos personales no se trata de gastar menos, sino de gastar con propósito.”
          </p>          
          <TablaGastosModern 
            gastos={gastos} 
            categorias={categorias} 
          />           
        </div>
{/* Form flotante a la derecha */}
          <div className="forms">
          <Card
            style={{
              width: "250px",
              position: "absolute",
              top: "20px",
              right: "20px",
              padding: "10px",
              boxShadow: "0 0 10px rgba(0,0,0,0.1)",
              backgroundColor: colors.gray100
            }}
          >
            <Card.Body>                    
                    {/* LÓGICA CONDICIONAL (SWITCH) */}

                    {formType === 'gasto' && (
                        <>
                            <Card.Title>Agregar Gasto</Card.Title>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-2">
                                    <Form.Label>CANTIDAD</Form.Label>
                                    <Form.Control type="number" 
                                        placeholder="Cant. de dinero " 
                                        name="cantidad"
                                        value={nuevoGasto.cantidad}
                                        onChange={handleChange} />
                                </Form.Group>

                                <Form.Group className="mb-2">
                                    <Form.Label>Descripción</Form.Label>
                                    <Form.Control type="text" 
                                        placeholder="Desc. del gasto" 
                                        name="descripcion"
                                        value={nuevoGasto.descripcion}
                                        onChange={handleChange} />
                                </Form.Group>

                                <Form.Group className="mb-2">
                                    <Form.Label>Categoría</Form.Label>
                                    <Form.Select 
                                        name="categorias_id"
                                        value={nuevoGasto.categorias_id}
                                        onChange={(e) => {
                                            if (e.target.value === 'crear-categoria') {
                                                // 🚨 Si selecciona la opción especial, cambia el formulario
                                                showCategoryForm(); 
                                            } else {
                                                handleChange(e);
                                            }
                                        }}
                                    >
                                        <option value="">Selecciona una Categoría</option>
                                        
                                        {/* Opción para Crear Nueva Categoría */}
                                        <option value="crear-categoria" style={{ fontWeight: 'bold', color: 'blue' }}>
                                            + Crear Nueva Categoría
                                        </option>
                                        
                                        {categorias.map(cat => (
                                            <option key={cat.id} value={cat.id}>
                                                {cat.nombre}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group className="mb-2">
                                    <Form.Label>Fecha</Form.Label>
                                    <Form.Control type="Date" 
                                        name="fecha"
                                        value={nuevoGasto.fecha}
                                        onChange={handleChange} />
                                </Form.Group>

                                <Button variant="success" type="submit" className="w-100">
                                    Agregar
                                </Button>
                            </Form>
                        </>
                    )}

                    {formType === 'categoria' && (
// Contenido del Formulario de Categoría
                        <>
                            <Card.Title>Crear Nueva Categoría</Card.Title>
                            {/* Usamos el CategoryForm, pasándole las funciones de manejo */}
                            <CategoryForm 
                                onSubmit={handleCategorySubmit} 
                                onCancel={showGastoForm} 
                            /> 
                        </>
                    )}
                </Card.Body>
          </Card>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
export default Aside;


