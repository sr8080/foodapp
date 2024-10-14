import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { RootState } from '../../store';

export const CustomNavbar: React.FC = () => {
  const [logbox, setLogbox] = useState(false);
  const { isAuthenticatedUser, loading, error,user } = useSelector((state: RootState) => state.auth);

  console.log(user.name,"uuuunavbar")

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login');
    window.location.reload()
  };

  return (
    <Navbar
      bg="light"
      expand="lg"
      fixed="top"
      style={{
        boxShadow: '1px 1px 1px rgba(0, 0, 0, 0.2)',
        zIndex: 999,
        backgroundColor: '#fff',
        padding: '5px 10px',
        height:'100px'
      }}
    >
      <Container>
        <Navbar.Brand>
          <img
            src="https://png.pngtree.com/template/20191014/ourmid/pngtree-pin-food-delivery-map-location-delivery-logo-concept-image_318151.jpg"
            alt="Swiggy Logo"
            style={{
              transition: 'transform 0.6s',
              borderRadius: '50%',
              width: '50px',
              cursor: 'pointer',
              
            }}
           
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              as={Link}
              to="#"
              style={{
                fontWeight: 600,
                fontSize: '20px',
                marginLeft: '20px',
                color: '#000',
              }}
            >
              <u>
                {/* {userData[0].location} */}
                Location
              </u>
              <i className="fas fa-angle-down ml-2"></i>
            </Nav.Link>
          </Nav>
          <Nav className="ml-auto">
            {/* <Nav.Link as={Link} to="#" style={{ color: 'rgb(83, 82, 82)' }}>
              <i className="fas fa-search"></i> Search
            </Nav.Link> */}
            <Nav.Link as={Link} to="#" style={{ color: 'rgb(83, 82, 82)' }}>
              <i className="fas fa-percentage"></i> Offers
            </Nav.Link>
            <Nav.Link as={Link} to="#" style={{ color: 'rgb(83, 82, 82)' }}>
              <i className="far fa-life-ring"></i> Help
            </Nav.Link>
            <NavDropdown
              title={
                <>
                  <i className="fas fa-user"></i>
                  {/* {userData[0].name} */}
                  {user.name}
                  
                </>
              }
              id="basic-nav-dropdown"
              onMouseOver={() => setLogbox(true)}
              onMouseLeave={() => setLogbox(false)}
              show={logbox}
              style={{ color: 'rgb(83, 82, 82)' }}
            >
              <NavDropdown.Item>Profile</NavDropdown.Item>
              <NavDropdown.Item>Orders</NavDropdown.Item>
              
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} to="/cart" style={{ color: 'rgb(83, 82, 82)' }}>
              <i className="fas fa-shopping-cart"></i> Cart
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
