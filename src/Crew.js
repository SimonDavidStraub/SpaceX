import React from 'react';
import useSpaceXApi from './SpaceXApi.js';
import { withRouter } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';


function Crew() {
  const crew = useSpaceXApi('get', 'crew');

  if (!crew) {
    return <Spinner animation="border" />;
  }

  return (
    <Container>
      <Row>
        {
          crew.map((member) => {
            return <div key={member.id} className="col-12">
                    <div className="card crew-card">
                      <Row>
                      <div className="col-2 card-head">
                        <img src={member.image} alt={member.name} />
                      </div>
                      <div className="col-10 card-body">
                        <h5 className="card-title">{member.name}</h5>
                        <p>Agency: {member.agency}</p>
                        <p>Status: {member.status}</p>
                        <p>Missions: {member.launches.length}</p>
                        <p>Wikipedia: <a href={member.wikipedia} target="_blank" rel="noopener noreferrer">{member.wikipedia}</a></p>
                      </div>
                      </Row>
                    </div>
                  </div>
          })
        }
      </Row>
    </Container>
  )
}

export default withRouter(Crew)
