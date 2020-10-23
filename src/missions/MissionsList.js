import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import Moment from 'react-moment';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';


function MissionsList(props) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const [selectedYear, setSelectedYear] = useState(urlParams.has('year') ? urlParams.get('year') : 'all');
  const [selectedMission, setSelectedMission] = useState(urlParams.has('mission') ? urlParams.get('mission') : 'all');
  const [selectedLanding, setSelectedLanding] = useState(urlParams.has('landing') ? urlParams.get('landing') : 'all');
  const [years, setYears] = useState([]);
  const [searchParams, setSearchParams] = useState(new URLSearchParams());
  let yearsLocal = [];


  useEffect(() => {
    props.launches.map((launch, index) => {
      let date = new Date(Date.parse(launch.date_local))  //Converts date string into date object
      yearsLocal[index] = date.getFullYear()
      let uniqueYears = [...new Set(yearsLocal)]
      setYears(uniqueYears)
    })
  }, [])

  if (!props.launches) {
    return <Spinner animation="border" />;
  }

  const onFilterChange = (key, value, setState) => {
    setState(value);

    if (searchParams.has(key)) {
      searchParams.set(key, value)
    } else {
      searchParams.append(key, value)
    }
    props.history.push(`/missions?${searchParams}`)
  }

  const getYearsFilter = (elem) => {
    const thisDate = new Date(Date.parse(elem.date_local))  //Converts date string into date object
    const thisYear = thisDate.getFullYear()
    if (selectedYear == thisYear || selectedYear === 'all') {
      return true
    }
    return false
  }

  const getMissionsFilter = (elem) => {
    const showSuccessMission = elem.success && selectedMission === 'yes',
          showFailedMission = !elem.success && selectedMission === 'no',
          showFailedAndSuccessMission = (!elem.success || elem.success) && selectedMission === 'all';

    if (showSuccessMission || showFailedMission || showFailedAndSuccessMission) {
      return true
    }
    return false
  }

  const getLandingsFilter = (elem) => {
    const showSuccessLanding = elem.cores[0].landing_success && selectedLanding === 'yes',
          showFailedLanding = !elem.cores[0].landing_success && selectedLanding === 'no',
          showFailedAndSuccessLanding = (!elem.cores[0].landing_success || elem.cores[0].landing_success) && selectedLanding === 'all';

    if (showSuccessLanding || showFailedLanding || showFailedAndSuccessLanding) {
      return true
    }
    return false
  }

  return (
    <>
      <Col xs={12}>
        <span className="form-title">Filter</span>
        <Form className="filter">
          <Row>
            <Col xs={4}>
              <Form.Group controlId="filterForm.YearSelect">
                <Form.Label>Year</Form.Label>
                <Form.Control as="select" onChange={(e) => onFilterChange('year', e.target.value, setSelectedYear)}>
                  <option value="all" selected={selectedYear == "all"}>All</option>
                  {years.map((year) => {
                    return <option key={year} value={year} selected={selectedYear == year}>{year}</option>
                  })}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col xs={4}>
              <Form.Group controlId="filterForm.SuccessMissionSelect">
                <Form.Label>Successful missions</Form.Label>
                <Form.Control as="select" onChange={(e) => onFilterChange('mission', e.target.value, setSelectedMission)}>
                  <option value="all" selected={selectedMission == 'all'}>All</option>
                  <option value="yes" selected={selectedMission == 'yes'}>Yes</option>
                  <option value="no" selected={selectedMission == 'no'}>No</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col xs={4}>
              <Form.Group controlId="filterForm.SuccessLandingSelect">
                <Form.Label>Successful landings</Form.Label>
                <Form.Control as="select" onChange={(e) => onFilterChange('landing', e.target.value, setSelectedLanding)}>
                  <option value="all" selected={selectedLanding == 'all'}>All</option>
                  <option value="yes" selected={selectedLanding == 'yes'}>Yes</option>
                  <option value="no" selected={selectedLanding == 'no'}>No</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Col>
      { props.launches.filter(getYearsFilter).filter(getMissionsFilter).filter(getLandingsFilter).map((launch) => {
          const rocket = props.rockets.filter(elem => elem.id === launch.rocket)
          return <div key={launch.id} className="col-4">
                  <div className="card mission-card" onClick={() => props.history.push(`/missions/${launch.id}/${rocket[0].id}`) }>
                    <div className="card-head">
                      { launch.links.patch.small
                        ? <img src={launch.links.patch.small} alt="mission-previw" />
                        : <img src={props.launches[0].links.patch.small} alt="mission-previw" /> }
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">{launch.name}</h5>
                      <span className="mission-date"><Moment format="DD.MM.YYYY">{launch.date_local}</Moment></span>
                      { launch.details
                        ? <p>{launch.details}</p>
                        : <p>Keine Beschreibung vorhanden.</p> }
                    </div>
                  </div>
                </div>
        })
      }
    </>
  )
}

export default withRouter(MissionsList)
