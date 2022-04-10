import React, { useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { getCurrentConstructorStandings } from '../../api/utilities'
import './ConstructorStandings.scss'

const ConstructorStandings = () => {
    const [data, setdata] = useState(null)
    const [loaded, setloaded] = useState(false)

    useEffect(() => {
        if (JSON.parse(sessionStorage.getItem('constructorStandingsInfo'))) {
            setdata(JSON.parse(sessionStorage.getItem('constructorStandingsInfo')))
            setloaded(true)
        } else {
            async function getData() {
                let response = await getCurrentConstructorStandings()
                setdata(response)
                sessionStorage.setItem('constructorStandingsInfo', JSON.stringify(response))
                setloaded(true)
            }
            getData()
        }
    }, [])
    
    return (
        <>
            <div className='container m-auto text-center' id='constructor-standings-container'>
                <h2>Constructor Standings</h2>
                {
                    loaded ?
                    <>
                        <div className='standings-main d-flex m-auto'>
                            <div className='row constructorStanding d-flex flex-nowrap' id='standings-headings'>
                                <h4 className='col-1' id={'result-position'}>Position</h4>
                                <h4 className='col-2' id={'result-nationality'}>Country</h4>
                                <h4 className='col-3' id={'result-constructor'}>Constructor</h4>
                                <h4 className='col-1' id={'result-wins'}>Wins</h4>
                                {/* <h4 className='col-1' id={'result-podiums'}>Podiums</h4> */}
                                <h4 className='col-1' id={'result-points'}>Points</h4>
                            </div>
                            {data.ConstructorStandings.filter((result, indx) => indx < 5).map(
                                (result) => 
                                    <>
                                        <div className={'row constructorStanding d-flex flex-nowrap'} id={'standing-' + result.position}>
                                            <h4 className='col-1' id={'result-position'}>{result.position}</h4>
                                            <h4 className='col-2' id={'result-nationality'}>{result.Constructor.nationality}</h4>
                                            <h4 className='col-3' id={'result-constructor'} style={{'borderRight': `4px solid var(--${result.Constructor.constructorId}`}}>
                                                {
                                                result.Constructor.name === "Haas F1 Team"
                                                    ? "Haas"
                                                    : result.Constructor.name === "Alpine F1 Team"
                                                    ? "Alpine"
                                                    : result.Constructor.name
                                                }
                                            </h4>
                                            <h4 className='col-1' id={'result-wins'}>{result.wins === "0" ? "-" : result.wins}</h4>
                                            <h4 className='col-1' id={'result-points'}>{result.points === "0" ? "-" : result.points}</h4>
                                        </div>
                                    </>
                            )}
                            <Link to={'/constructor-standings'} style={{'width': 'auto'}}>
                                <button type='button' className='btn btn-light' id='full-standings-btn'>View Full Standings</button>
                            </Link>
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

export default ConstructorStandings