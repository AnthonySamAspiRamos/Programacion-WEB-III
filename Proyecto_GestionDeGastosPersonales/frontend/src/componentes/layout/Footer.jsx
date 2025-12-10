import Nav from 'react-bootstrap/Nav';
import { colors } from '../../styles/colors';

function Footer() {
  return (
    <div className='footer' style={{
      position: 'fixed',
      width: '100%',
      backgroundColor: colors.primaryDark,
      bottom: 0,
      zIndex: 999
    }}>
      <Nav justify variant="tabs" defaultActiveKey="/home" 
        style={{
          bottom: 0,
          marginLeft: '25%',       
          width: '50%',        
          zIndex: 999
        }}
      >
        <Nav.Item>
          <Nav.Link href="/Home" style={{ color: 'white' }}>HOME</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/auth" style={{ color: 'white' }}>Registrarse</Nav.Link>
        </Nav.Item>
        
<Nav.Item>
    <Nav.Link 
        eventKey="link-2" 
        style={{color:'white'}}
        // 🚨 Esto dispara la función de descarga definida en el Padre
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

export default Footer;