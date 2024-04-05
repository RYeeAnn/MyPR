import React from 'react';
import { Navbar as Navbarbs, Container, Nav, Button, NavDropdown } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

function NavbarComponent({ logout, isAuthenticated, user, loginWithRedirect }) {

  return (
    <Navbarbs bg="light" expand="lg">
      <Container>
        <Navbarbs.Brand><Nav.Link to="/" as={NavLink}>MyPR</Nav.Link></Navbarbs.Brand>
        <Navbarbs.Toggle aria-controls="basic-navbar-nav" />
        <Navbarbs.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link to="/" as={NavLink}>
              Home
            </Nav.Link>
            <Nav.Link to="/logs" as={NavLink}>
              Logs
            </Nav.Link>
            {isAuthenticated && (
              <NavDropdown title="User" id="basic-nav-dropdown" drop="start">
                <NavDropdown.Item>Welcome, {user.name}!</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => logout({ returnTo: window.location.origin })}>Log Out</NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
          <Nav>
            {!isAuthenticated ? (
              <Button variant="primary" onClick={() => loginWithRedirect()}>
                Log In
              </Button>
            ) : null}
          </Nav>
        </Navbarbs.Collapse>
      </Container>
    </Navbarbs>
  );
}

export default NavbarComponent;
