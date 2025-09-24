import React from 'react';
import {
  Button,
  Container,
  Dropdown,
  Form,
  InputGroup,
  Nav,
  Navbar,
} from 'react-bootstrap';
import { FaSearch, FaUserCircle } from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router-dom';
import { useUserStore } from '../store/userStore';

const NavBar = () => {
  const navigate = useNavigate();
  const { user, logout } = useUserStore();

  const handleLogout = () => {
    logout(); 
    navigate('/'); 
  };

  return (
    <>
      <Navbar className="bg-secondary">
        <Container className="d-flex justify-content-between align-items-center">
          <Navbar.Brand>VIDHUB</Navbar.Brand>
          <Nav className="me-auto w-100">
            <Form className="d-flex flex-grow-1 justify-content-center mx-3">
              <InputGroup style={{ maxWidth: '500px', width: '100%' }}>
                <InputGroup.Text>
                  <FaSearch />
                </InputGroup.Text>
                <Form.Control
                  type="search"
                  placeholder="Search category Facebook, Instagram, YouTube"
                  aria-label="Search"
                />
                <Button variant="dark">Search</Button>
              </InputGroup>
            </Form>

            <Dropdown align="end">
              <Dropdown.Toggle
                variant="secondary"
                id="dropdown-basic"
                style={{
                  background: 'transparent',
                  border: 'none',
                  boxShadow: 'none',
                }}
              >
                <FaUserCircle size={32} />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {user ? (
                  <>
                    <Dropdown.Item as={NavLink} to="/profile">
                      Profile
                    </Dropdown.Item>
                    <Dropdown.Item as={NavLink} to="/videocard">
                      Your Videos
                    </Dropdown.Item>
                    <Dropdown.Item onClick={handleLogout}>
                      Logout
                    </Dropdown.Item>
                  </>
                ) : (
                  <Dropdown.Item onClick={() => navigate('/login')}>
                    Login
                  </Dropdown.Item>
                )}
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
