import React, { useState, useEffect } from 'react'
import { Tab } from 'bootstrap'
import { Tabs } from 'react-bootstrap'
import { getCurrentDriverStandings, getCurrentConstructorStandings } from "../../api/utilities"
import './Standings.scss'

function Standings( {active} ) {
    const [driver, setdriver] = useState(null);
    const [constructor, setconstructor] = useState(null);
    const [loaded, setloaded] = useState(false);

    useEffect(() => {
        if (JSON.parse(localStorage.getItem("driverStandingsInfo")) && JSON.parse(localStorage.getItem("constructorStandingsInfo"))) {
            setdriver(JSON.parse(localStorage.getItem("driverStandingsInfo")));
            setconstructor(JSON.parse(localStorage.getItem("constructorStandingsInfo")));
            setloaded(true);
        } else {
            async function getData() {
                let ds = await getCurrentDriverStandings();
                let cs = await getCurrentConstructorStandings();
                setdriver(ds);
                setconstructor(cs);
                localStorage.setItem("driverStandingsInfo", JSON.stringify(ds));
                localStorage.setItem("constructorStandingsInfo", JSON.stringify(cs));
                setloaded(true);
            }
            getData();
        }
    }, []);

    return (
        <>
            <div className="container m-auto text-center" id="driver-standings-container">
                <div className="content-main">
                    <h2>Championship Standings</h2>
                    {loaded ?
                        <>
                            <Tabs defaultActiveKey={active} id="tabb">
                                <Tab eventKey="driver" title="Driver Standings">
                                    <div className='driver standings table-responsive d-flex m-auto'>
                                        <table class="table align-middle">
                                            <thead>
                                                <tr id='headings'>
                                                    <td>Pos</td>
                                                    <td>Driver</td>
                                                    <td>Nationality</td>
                                                    <td>#</td>
                                                    <td>Constructor</td>
                                                    <td>Wins</td>
                                                    <td>Points</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {driver.DriverStandings.map(
                                                    (resultD) => 
                                                        <>
                                                            <tr>
                                                                <td>{resultD.position}</td>
                                                                <td>{resultD.Driver.givenName} {resultD.Driver.familyName}</td>
                                                                <td>{resultD.Driver.nationality}</td>
                                                                <td>{resultD.Driver.permanentNumber}</td>
                                                                <td>
                                                                    {
                                                                        resultD.Constructors[0].name === "Haas F1 Team"
                                                                        ? "Haas"
                                                                        : resultD.Constructors[0].name === "Alpine F1 Team"
                                                                        ? "Alpine"
                                                                        : resultD.Constructors[0].name
                                                                    }
                                                                </td>
                                                                <td>{resultD.wins === "0" ? "-" : resultD.wins}</td>
                                                                <td>{resultD.points === "0" ? "-" : resultD.points}</td>
                                                            </tr>
                                                        </>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </Tab>
                                <Tab eventKey="constructor" title="Constructor Standings">
                                    <div className='constructor standings table-responsive d-flex m-auto'>
                                        <table class="table align-middle">
                                            <thead>
                                                <tr id='headings'>
                                                    <td>Pos</td>
                                                    <td>Constructor</td>
                                                    <td>Nationality</td>
                                                    <td>Wins</td>
                                                    <td>Points</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {constructor.ConstructorStandings.map(
                                                    (resultC) => 
                                                        <>
                                                            <tr>
                                                                <td>{resultC.position}</td>
                                                                <td>
                                                                    {
                                                                        resultC.Constructor.name === "Haas F1 Team"
                                                                        ? "Haas"
                                                                        : resultC.Constructor.name === "Alpine F1 Team"
                                                                        ? "Alpine"
                                                                        : resultC.Constructor.name
                                                                    }
                                                                </td>
                                                                <td>{resultC.Constructor.nationality}</td>
                                                                <td>{resultC.wins === "0" ? "-" : resultC.wins}</td>
                                                                <td>{resultC.points === "0" ? "-" : resultC.points}</td>
                                                            </tr>
                                                        </>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </Tab>
                            </Tabs>
                        </>
                        :
                        <>
                            <div class="box">
                                <div class="loader" />
                            </div>
                        </>
                    }
                </div>
            </div>
        </>
    )
}

export default Standings