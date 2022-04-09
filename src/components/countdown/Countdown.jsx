import React, { useEffect, useState } from 'react'
import { useCountdown } from '../../hooks/useCountdown'
import './Countdown.scss'

const Countdown = ( {nextRaceInfo} ) => {
    const [raceDate, setraceDate] = useState(new Date())

    var dateTime = "".concat(nextRaceInfo.date,'T',nextRaceInfo.time)
    var a = dateTime.split(/[^0-9]/);
    var d = new Date (a[0],a[1]-1,a[2],a[3],a[4],a[5]);
    d.setHours(d.getHours() - (d.getTimezoneOffset()/60))

    useEffect(() => {
        setraceDate(new Date(d).toString())
    }, [])
    
    const [days, hours, minutes, seconds] = useCountdown(raceDate)
    
    return (
        <>
            <div className='countdown-info'>
                <p>Round {nextRaceInfo.round}</p>
                <h4>{nextRaceInfo.raceName}</h4>
                <h6>{nextRaceInfo.Circuit.circuitName}</h6>
                <h6 id='race-date'>{nextRaceInfo.date}</h6>
            </div>
            <div className='d-flex' id='countdown'>
                <div className='d-flex-col'>
                    <p id='num'>{days}</p>
                    <p id='info'>days</p>
                </div>  
                :
                <div className='d-flex-col'>
                    <p id='num'>{hours}</p>
                    <p id='info'>hours</p>
                </div>
                :
                <div className='d-flex-col'>
                    <p id='num'>{minutes}</p>
                    <p id='info'>mins</p>
                </div>
                :
                <div className='d-flex-col'>
                    <p id='num'>{seconds}</p>
                    <p id='info'>secs</p>
                </div>
            </div>
        </>
    )
}

export default Countdown