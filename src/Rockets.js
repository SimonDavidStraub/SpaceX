import React from 'react';
import useSpaceXApi from './SpaceXApi.js';
import { withRouter } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';


function Rockets(props) {
  const rockets = useSpaceXApi('get', 'rockets');

  if (!rockets) {
    return <Spinner animation="border" />;
  }

  return (
    <Container>
      <Row>
        {
          rockets.map((rocket) => {
            return <div key={rocket.id} className="col-3">
                    <div className="card" onClick={() => props.history.push(`/rockets/${rocket.id}`) }>
                      <img src={rocket.flickr_images[0]} alt={rocket.name} />
                      <div className="card-body">
                        <h5 className="card-title">{rocket.name}</h5>
                        <p>{rocket.description}</p>
                      </div>
                    </div>
                  </div>
          })
        }
      </Row>
    </Container>
  )
}

export default withRouter(Rockets)
