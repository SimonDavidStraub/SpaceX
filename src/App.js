import React from 'react';
import './App.scss';
import Home from './Home.js'
import Rockets from './Rockets.js'
import RocketDetails from './RocketDetails.js'
import Missions from './missions/Missions.js'
import MissionDetails from './missions/MissionDetails.js'
import Crew from './Crew.js'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  Redirect
} from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

function App() {
  return (
    <Router>
      <Navbar bg="dark" variant="dark">
        <Container>
          <NavLink to="/home" className="navbar-brand">SpaceX</NavLink>
          <Nav className="mr-auto justify-content-end">
            <Nav.Item>
              <NavLink to="/home" className="nav-link" activeClassName="active">Home</NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink to="/rockets" className="nav-link" activeClassName="active">Rockets</NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink to="/missions" className="nav-link" activeClassName="active">Missions</NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink to="/crew" className="nav-link" activeClassName="active">Crew</NavLink>
            </Nav.Item>
          </Nav>
        </Container>
      </Navbar>

      <Switch>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/rockets/:id">
          <RocketDetails />
        </Route>
        <Route path="/rockets">
          <Rockets />
        </Route>
        <Route path="/missions/:missionId/:rocketId">
          <MissionDetails />
        </Route>
        <Route path="/missions">
          <Missions />
        </Route>
        <Route path="/crew">
          <Crew />
        </Route>
        <Route path="/">
          <Redirect to="/home" />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
