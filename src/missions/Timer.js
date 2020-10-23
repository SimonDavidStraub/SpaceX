import React, { useState, useEffect } from 'react';

import Row from 'react-bootstrap/Row';


function Timer(props) {
  const [ days, setDays ] = useState(props.timeBetween / 86400000);
  const [ hours, setHours ] = useState((days - Math.trunc(days)) * 24);
  const [ minutes, setMinutes ] = useState((hours - Math.trunc(hours)) * 60);
  const [ seconds, setSeconds ] = useState((minutes - Math.trunc(minutes)) * 60);


  useEffect(() => {
    setDays(Math.trunc(days))
    setHours(Math.trunc(hours))
    setMinutes(Math.trunc(minutes))
    setSeconds(Math.trunc(seconds))
    const timer = window.setInterval(() => {
      if (seconds > 1) {
        setSeconds(seconds => seconds - 1)
      }
      if (seconds < 2) {
        if (minutes < 2) {
          if (hours < 2) {
            if (days < 2) {
              window.clearInterval(timer)
            } else {
              setDays(days => days - 1)
              setHours(23)
              setMinutes(59)
              setSeconds(59)
            }
          } else {
            setHours(hours => hours - 1)
            setMinutes(59)
            setSeconds(59)
          }
        } else {
          setMinutes(minutes => minutes - 1)
          setSeconds(59)
        }
      }
    }, 1000)
    return () => {
      window.clearInterval(timer)
    }
  }, [seconds])

  return (
    <div className="timer">
      <Row>
        <div className="col-3">
          <h2>Days</h2>
          <h2>{days}</h2>
        </div>
        <div className="col-3">
          <h2>Hours</h2>
          <h2>{hours}</h2>
        </div>
        <div className="col-3">
          <h2>Minutes</h2>
          <h2>{minutes}</h2>
        </div>
        <div className="col-3">
          <h2>Seconds</h2>
          <h2>{seconds}</h2>
        </div>
      </Row>
    </div>
  )
}

export default Timer
