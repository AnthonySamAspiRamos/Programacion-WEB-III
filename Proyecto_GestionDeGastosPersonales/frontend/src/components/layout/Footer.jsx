import Nav from 'react-bootstrap/Nav';
import { colors } from '../../styles/colors';
import { useNavigate, Link } from 'react-router-dom';

function JustifiedExample() {
  return (
    <div className='footer' style={{
    position:'fixed',
    width:'100%',
    backgroundColor:colors.primaryDark,
    bottom: 0,
    zIndex: 999}}>
      
    <Nav justify variant="tabs" defaultActiveKey="/home" 
    style={{bottom: 0,
    marginLeft:'25%',       
    width: '50%',        
    zIndex: 999}}>
      <Nav.Item >
        <Nav.Link href="/home" style={{color:'black'}}>HOME</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-1" style={{color:'black'}}>Registrarse</Nav.Link>
      </Nav.Item>
      
<Nav.Item>
    <Nav.Link 
        eventKey="link-2" 
        style={{color:'black'}}
        onClick={(e) => {
            e.preventDefault(); 
            onGenerarPDF && onGenerarPDF(); 
        }}
    >
        Generar pdf
    </Nav.Link>
</Nav.Item>      
    </Nav>
    </div>
  );
}

export default JustifiedExample;