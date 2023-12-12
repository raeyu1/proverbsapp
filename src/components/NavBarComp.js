import React, { Component } from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { BsBook } from 'react-icons/bs'; // Import the Bible icon
import About from './About';
import Home from './Home';

export default class NavBarComp extends Component {
  render() {
    return ( 
      <Router>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <BsBook style={{ fontSize: '30px', marginRight: '10px', color: '#FFFFFF' }} />
            <Navbar.Brand href="home">Proverbs App</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="home">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="about">
                  About
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <div>
          <Switch>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/about">
              <About />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}
