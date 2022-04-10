import React, { useEffect, useState } from 'react'
import { getLastRoundInfo } from '../../api/utilities'
import './LastRace.scss'

const LastRace = () => {
    const [data, setdata] = useState(null)
    const [loaded, setloaded] = useState(false)

    useEffect(() => {
        async function getData() {
            let response = await getLastRoundInfo()
            setdata(response)
            setloaded(true)
        }
        getData()
    }, [])

    return (
        <>
            <div className='container m-auto text-center' id='last-race-container'>
                {
                    loaded
                    ?
                    <>
                        <h2>Last Round Results</h2>
                        <h5>{data.raceName}</h5>
                        <h6>{data.date}</h6>
                        <div className="table-responsive d-flex m-auto">
                            <table className="table align-middle">
                                <thead>
                                    <tr id='headings'>
                                        <td>Pos</td>
                                        <td>Driver</td>
                                        <td>Constructor</td>
                                        <td>Laps</td>
                                        <td>Time</td>
                                        <td>Avg Speed (kph)</td>
                                        <td>Points</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.Results.map(
                                        (result) => <>
                                            <tr>
                                                <td>{result.position}</td>
                                                <td>{result.Driver.givenName} <strong>{result.Driver.familyName}</strong></td>
                                                <td>{
                                                    result.Constructor.name === "Haas F1 Team"
                                                        ? "Haas"
                                                        : result.Constructor.name === "Alpine F1 Team"
                                                        ? "Alpine"
                                                        : result.Constructor.name
                                                }</td>
                                                <td>{result.laps}</td>
                                                {result.hasOwnProperty('FastestLap') && result.FastestLap.rank === '1'
                                                    ? <td id='fastest'>
                                                    <svg width="24px" height="24px" fill='#ec00ec' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M18.3,8.59l.91-.9a1,1,0,0,0-1.42-1.42l-.9.91a8,8,0,0,0-9.79,0l-.91-.92A1,1,0,0,0,4.77,7.69l.92.91A7.92,7.92,0,0,0,4,13.5,8,8,0,1,0,18.3,8.59ZM12,19.5a6,6,0,1,1,6-6A6,6,0,0,1,12,19.5Zm-2-15h4a1,1,0,0,0,0-2H10a1,1,0,0,0,0,2Zm3,6a1,1,0,0,0-2,0v1.89a1.5,1.5,0,1,0,2,0Z"/></svg>
                                                    {
                                                        result.hasOwnProperty('Time')
                                                        ? result.Time.time
                                                        : result.status
                                                    }</td>
                                                    : <td>{
                                                        result.hasOwnProperty('Time')
                                                        ? result.Time.time
                                                        : result.status
                                                    }</td>
                                                }
                                                <td>{
                                                    result.hasOwnProperty('FastestLap')
                                                    ? result.FastestLap.AverageSpeed.speed
                                                    : result.positionText
                                                }</td>
                                                <td>{result.points === "0" ? "-" : result.points}</td>
                                            </tr>
                                        </>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </>
                    :
                    <div className="box">
                        <div className="loader"></div>
                    </div>
                }
            </div>
        </>
    )
}

export default LastRace