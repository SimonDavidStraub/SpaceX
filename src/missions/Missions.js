import React from 'react';
import useSpaceXApi from '../SpaceXApi.js';
import { withRouter } from 'react-router-dom';
import MissionsList from './MissionsList';

import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';


function Missions(props) {
  const launches = useSpaceXApi('get', 'launches');
  const rockets = useSpaceXApi('get', 'rockets')

  if (!launches) {
    return <Spinner animation="border" />;
  }
  if (!rockets) {
    return <Spinner animation="border" />;
  }

  return (
    <Container>
      <Row>
        <MissionsList launches={launches} rockets={rockets} />
      </Row>
    </Container>
  )
}

export default withRouter(Missions)
