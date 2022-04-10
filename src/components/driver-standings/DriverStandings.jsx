import React, { useState, useEffect } from 'react'
import { getCurrentDriverStandings } from '../../api/utilities'
import { Link } from 'react-router-dom'
import './DriverStandings.scss'

const DriverStandings = () => {
    const [data, setdata] = useState(null)
    const [loaded, setloaded] = useState(false)

    useEffect(() => {
        if (JSON.parse(sessionStorage.getItem('driverStandingsInfo'))) {
            setdata(JSON.parse(sessionStorage.getItem('driverStandingsInfo')))
            setloaded(true)
        } else {
            async function getData() {
            let response = await getCurrentDriverStandings()
            setdata(response)
            sessionStorage.setItem('driverStandingsInfo', JSON.stringify(response))
            setloaded(true)
            }
            getData()
        }
    }, [])

    return (
        <>
            <div className='container m-auto text-center' id='driver-standings-container'>
                <h2>Driver Standings</h2>
                {
                    loaded ?
                    <>
                        <div className='standings-main d-flex m-auto'>
                            <div className='row driverStanding d-flex flex-nowrap' id='standings-headings'>
                                <h4 className='col-1' id={'result-position'}>Position</h4>
                                <h4 className='col-1' id={'result-driver-number'}>#</h4>
                                <h4 className='col-3' id={'result-driver-name'}>Driver</h4>
                                <h4 className='col-2' id={'result-constructor'}>Constructor</h4>
                                <h4 className='col-1' id={'result-wins'}>Wins</h4>
                                <h4 className='col-1' id={'result-points'}>Points</h4>
                            </div>
                            {data.DriverStandings.filter((r, indx) => indx < 10).map(
                                (result) => 
                                <>
                                    <div className={'row driverStanding d-flex flex-nowrap'} id={'standing-' + result.position}>
                                    <h4 className='col-1' id={'result-position'} >{result.position}</h4>
                                    <h4 className='col-1' id={'result-driver-number'} style={{'borderLeft': `4px solid var(--${result.Constructors[0].constructorId}`}}>{result.Driver.permanentNumber}</h4>

                                    <h4 className='col-3' id={'result-driver-name'} style={{'borderRight': `4px solid var(--${result.Constructors[0].constructorId}`}}>{result.Driver.givenName} <strong>{result.Driver.familyName}</strong></h4>
                                    
                                    <h4 className='col-2' id={'result-constructor'}>
                                        {
                                        result.Constructors[0].name === "Haas F1 Team"
                                        ? "Haas"
                                        : result.Constructors[0].name === "Alpine F1 Team"
                                        ? "Alpine"
                                        : result.Constructors[0].name
                                        }
                                    </h4>

                                    <h4 className='col-1' id={'result-wins'}>{result.wins === "0" ? "-" : result.wins}</h4>
                                    <h4 className='col-1' id={'result-points'}>{result.points === "0" ? "-" : result.points}</h4>
                                    </div>
                                </>
                            )}
                            <Link to={'/driver-standings'} style={{'width': 'auto'}}>
                                <button type='button' className='btn btn-light' id='full-standings-btn'>View Full Standings</button>
                            </Link>
                        </div>
                    </>
                    :
                    <div className="box">
                        <div className="loader" />
                    </div>
                }
            </div>
        </>
    )
}

export default DriverStandings