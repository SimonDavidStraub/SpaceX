import React from 'react';
import useSpaceXApi from '../SpaceXApi.js';
import { withRouter } from 'react-router-dom';
import Moment from 'react-moment';
import Timer from './Timer'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';
import Carousel from 'react-bootstrap/Carousel';
import Table from 'react-bootstrap/Table';

function MissionDetails(props) {
  const launch = useSpaceXApi('get',`launches/${props.match.params.missionId}`)
  const rocket = useSpaceXApi('get',`rockets/${props.match.params.rocketId}`)

  if (!launch) {
    return <Spinner animation="border" />;
  }
  if (!rocket) {
    return <Spinner animation="border" />;
  }

  const date = new Date()
  const currDate = Date.parse(date)
  const futureDate = Date.parse(launch.date_local)
  const timeBetween = (futureDate - currDate);

  return (
    <Container>
      <Row>
        { timeBetween > 0
          ? <div className="col-12">
              <h1>Mission will start on <Moment format="DD.MM.YYYY">{launch.date_local}</Moment></h1>
              <h5>For mor details wait until the Timer is done...</h5>
              <Timer timeBetween={timeBetween} />
            </div>
          : <>
              <div className="col-6">
                <h1 className="mission-title">{launch.name}</h1>
                <span className="mission-date"><Moment format="DD.MM.YYYY">{launch.date_local}</Moment></span>
                <p>{launch.details}</p>
                <Table striped bordered hover variant="dark">
                  <thead>
                    <tr>
                      <td>Mission Successful:</td>
                      <td>{launch.success ? 'Yes' : 'No'}</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Tried to landing:</td>
                      <td>{launch.cores[0].landing_attempt ? 'Yes' : 'No'}</td>
                    </tr>
                    <tr>
                      <td>Landing successful:</td>
                      <td>{launch.cores[0].landing_success ? 'Yes' : 'No'}</td>
                    </tr>
                    <tr>
                      <td>Landing type:</td>
                      <td>{launch.cores[0].landing_type ? launch.cores[0].landing_type : '--'}</td>
                    </tr>
                    <tr className="clickable" onClick={() => props.history.push(`/rockets/${rocket.id}`) }>
                      <td>Rocket:</td>
                      <td>{rocket.name}</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
              <div className="col-6">
                <Carousel>
                  {launch.links.flickr.original.map((img, index) => {
                    return <Carousel.Item key={index}>
                              <img className="slider-img d-block" src={img} alt="slider-img" />
                            </Carousel.Item>
                  })}
                </Carousel>
              </div>
              <div className="col-12">
                <div className="youtube-wrapper">
                  <iframe width="100%" height="100%" title="youtube" src={`https://www.youtube.com/embed/${launch.links.youtube_id}`} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
              </div>
            </>
        }
      </Row>
    </Container>
  )
}

export default withRouter(MissionDetails)
