import React from 'react';
import useSpaceXApi from './SpaceXApi.js';
import { withRouter } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';


function Home(props) {
  const company = useSpaceXApi('get', 'company');

  if (!company) {
    return <Spinner animation="border" />;
  }

  return (
    <Container>
      <Row>
        <div className="col-12">
          <h1>{company.name}</h1>
          <h5>Founder: {company.founder}</h5>
          <p>{company.summary}</p>
          <br /><br />
        </div>
        <div className="col-4">
          <div className="card home-card" onClick={() => props.history.push('/rockets') }>
            <div className="card-body">
              <h5 className="card-title">Rockets</h5>
              <p>All Rockets from SpaceX</p>
            </div>
          </div>
        </div>
        <div className="col-4">
        <div className="card home-card" onClick={() => props.history.push('/missions') }>
          <div className="card-body">
            <h5 className="card-title">Missions</h5>
            <p>All Missions from SpaceX</p>
          </div>
        </div>
        </div>
        <div className="col-4">
        <div className="card home-card" onClick={() => props.history.push('/crew') }>
          <div className="card-body">
            <h5 className="card-title">Crew</h5>
            <p>The SpaceX Crew</p>
          </div>
        </div>
        </div>
      </Row>
    </Container>
  )
}

export default withRouter(Home)
