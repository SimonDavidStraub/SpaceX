import React from 'react';
import useSpaceXApi from './SpaceXApi.js';
import { withRouter } from 'react-router-dom';
import Moment from 'react-moment';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';
import Carousel from 'react-bootstrap/Carousel';
import Table from 'react-bootstrap/Table';


function RocketDetails(props) {

  const rocket = useSpaceXApi('get',`rockets/${props.match.params.id}`)

  if (!rocket) {
    return <Spinner animation="border" />;
  }

  function eGerman(x){
    return x.toLocaleString('de-DE');
  }

  return (
    <Container>
      <Row>
        <div className="col-6">
          <h1>{rocket.name}</h1>
          <p>{rocket.description}</p>
          <Table striped bordered hover variant="dark">
            <tbody>
              <tr>
                <td>First flight</td>
                <td><Moment format="DD.MM.YYYY">{rocket.first_flight}</Moment></td>
              </tr>
              <tr>
                <td>Cost per launch</td>
                <td>{eGerman(rocket.cost_per_launch)} USD</td>
              </tr>
              <tr>
                <td>Hight</td>
                <td>{eGerman(rocket.height.meters)} m</td>
              </tr>
              <tr>
                <td>Mass</td>
                <td>{eGerman(rocket.mass.kg)} kg</td>
              </tr>
              <tr>
                <td>Landing legs</td>
                <td>{rocket.landing_legs.number ? 'Yes' : 'No'}</td>
              </tr>
              <tr>
                <td>Active</td>
                <td>{rocket.active ? 'Yes' : 'No'}</td>
              </tr>
            </tbody>
          </Table>
        </div>
        <div className="col-6">
          <Carousel>
            {rocket.flickr_images.map((img, index) => {
              return <Carousel.Item key={index}>
                        <img className="slider-img d-block" src={img} alt="slider-img" />
                      </Carousel.Item>
            })}
          </Carousel>
        </div>
      </Row>
    </Container>
  )
}

export default withRouter(RocketDetails)
