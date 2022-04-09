import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getNextRoundInfo } from '../../api/utilities'
import Countdown from '../countdown/Countdown'
import './NextRace.scss'

const NextRace = () => {
    const [nextRace, setnextRace] = useState(null)
    const [loaded, setloaded] = useState(false)

    useEffect(() => {
        if (JSON.parse(localStorage.getItem('nextRoundInfo'))) {
            setnextRace(JSON.parse(localStorage.getItem('nextRoundInfo')))
            setloaded(true)
        } else {
            async function getData() {
                let response = await getNextRoundInfo()
                setnextRace(response)
                localStorage.setItem('nextRoundInfo', JSON.stringify(response))
                setloaded(true)
            }
            getData()
        }
    }, [])

    var days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    const convertTime = (isoTime) => {
        var t = isoTime.split(/[^0-9]/);
        var d = new Date (t[0],t[1]-1,t[2],t[3],t[4],t[5]);
        d.setHours(d.getHours() - (d.getTimezoneOffset()/60))
        return d.toLocaleTimeString('en-US', {hour: 'numeric'})
    }

    return (
        <>
            <div className='container m-auto' id='next-race-container'>
                <h2>Next Race</h2>
                <div className="card" id='next-race-card'>
                    {
                    loaded
                        ?
                        <>
                            <div className="row">
                                <div className="col-4" id='next-track-image'>
                                    <img src={`./track-images/${nextRace.Circuit.Location.locality}.png`} className="img-fluid" alt={nextRace.Circuit.circuitName} />
                                </div>
                                <div className="col d-flex">
                                    <div className="card-block text-center m-auto" id='countdown-container'>
                                        <Countdown nextRaceInfo={nextRace} />
                                    </div>
                                    <div className='card-block text-center m-auto' id='quali-container'>
                                        <div className='practice d-flex' id='practice-1'>
                                            <h6 id='info'>Practice 1</h6>
                                            <h6 id='race-day-week'>{days[new Date(nextRace.FirstPractice.date).getDay()]}</h6>
                                            <h6 id='race-time'>{convertTime(nextRace.FirstPractice.date +"T"+ nextRace.FirstPractice.time)}</h6>
                                        </div>
                                        <div className='practice d-flex' id='practice-2'>
                                            <h6 id='info'>Practice 2</h6>
                                            <h6 id='race-day-week'>{days[new Date(nextRace.SecondPractice.date).getDay()]}</h6>
                                            <h6 id='race-time'>{convertTime(nextRace.SecondPractice.date +"T"+ nextRace.SecondPractice.time)}</h6>
                                        </div>
                                        <div className='practice d-flex' id='practice-3'>
                                            <h6 id='info'>Practice 3</h6>
                                            <h6 id='race-day-week'>{days[new Date(nextRace.ThirdPractice.date).getDay()]}</h6>
                                            <h6 id='race-time'>{convertTime(nextRace.ThirdPractice.date +"T"+ nextRace.ThirdPractice.time)}</h6>
                                        </div>
                                        <div className='practice d-flex' id='qualifying'>
                                            <h6 id='info'>Qualifying</h6>
                                            <h6 id='race-day-week'>{days[new Date(nextRace.Qualifying.date).getDay()]}</h6>
                                            <h6 id='race-time'>{convertTime(nextRace.Qualifying.date +"T"+ nextRace.Qualifying.time)}</h6>
                                        </div>
                                        <div className='practice d-flex' id='race'>
                                            <h5 id='info'>Race</h5>
                                            <h5 id='race-day-week'>{days[new Date(nextRace.date).getDay()]}</h5>
                                            <h5 id='race-time'>{convertTime(nextRace.date +"T"+ nextRace.time)}</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Link to={'/schedule'} style={{'width': 'auto'}}>
                                <button type='button' className='btn btn-light' id='full-schedule-btn'>View Full Schedule</button>
                            </Link>
                        </>
                        :
                        <div class="box">
                            <div class="loader"></div>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

export default NextRace