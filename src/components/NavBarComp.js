import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
import { BsBook } from 'react-icons/bs';
import About from './About';
import Home from './Home';

const NavBarComp = () => {
  return (
    <Router>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <BsBook style={{ fontSize: '30px', marginRight: '10px', color: '#FFFFFF' }} />
            <div style={{ color: '#FFFFFF', fontSize: '1.5rem', fontWeight: 'bold' }}>
              Proverbs App
            </div>
          </div>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to={`${process.env.PUBLIC_URL}/home`}>
                Home
              </Nav.Link>
              <Nav.Link as={Link} to={`${process.env.PUBLIC_URL}/about`}>
                About
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Switch>
        <Route path={`${process.env.PUBLIC_URL}/home`} component={Home} />
        <Route path={`${process.env.PUBLIC_URL}/about`} component={About} />
      </Switch>
    </Router>
  );
};

export default NavBarComp;
