import React, { useEffect, useState } from "react"
import { Col, Row } from "react-bootstrap"
import { getAllResults, getAllRoundInfo } from "../../api/utilities"
import "./Schedule.scss"

function Schedule() {
    const [data, setdata] = useState(null)
    const [results, setresults] = useState(null)
    const [loaded, setloaded] = useState(false)

    useEffect(() => {
        if (JSON.parse(localStorage.getItem("allRoundsInfo")) && JSON.parse(localStorage.getItem("allResultsInfo"))) {
            setdata([JSON.parse(localStorage.getItem("allRoundsInfo")), JSON.parse(localStorage.getItem("allResultsInfo"))])
            setloaded(true)
        } else {
            async function getData() {
                let response = await getAllRoundInfo()
                let response2 = await getAllResults()
                setdata([response, response2])
                localStorage.setItem("allRoundsInfo", JSON.stringify(response))
                localStorage.setItem("allResultsInfo", JSON.stringify(response2))
                setloaded(true)
            }
            getData()
        }
    }, [])

    var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    const convertTime = (isoTime) => {
        var t = isoTime.split(/[^0-9]/);
        var d = new Date(t[0], t[1] - 1, t[2], t[3], t[4], t[5]);
        d.setHours(d.getHours() - d.getTimezoneOffset() / 60);
        // return d.toLocaleTimeString('en-US')
        return d
    }

    const moreInfoToggle = (circuitId) => {
        var x = document.getElementById(circuitId)
        var y = document.getElementById('openArrow-'+circuitId)
        if (x.style.display === "none") {
            x.style.display = "block"
            y.style.transform = "rotate(180deg)"
        } else {
            x.style.display = "none"
            y.style.transform = "none"
        }
    }

    return (
        <>
            <div className="container m-auto text-center" id="driver-standings-container">
                <div className="content-main">
                    {
                    loaded ?
                    <>
                        <h1>{data[0].season} F1 Schedule</h1>
                        <div className="schedule-main">
                            {data[0].Races.map((race) => (
                                <>
                                    <div className="race-main shadow-lg card row-auto" onClick={() => moreInfoToggle(race.Circuit.circuitId)}>
                                        <Row>
                                            <Col md={1} id="info">
                                                <p id="numberCircle">{race.round}</p>
                                            </Col>
                                            <Col md={6} id="content">
                                                <h4>{race.raceName}</h4>
                                                <p>{race.Circuit.circuitName}</p>
                                                <p>
                                                {race.Circuit.Location.locality},{" "}
                                                {race.Circuit.Location.country}
                                                </p>
                                                &#183;
                                                <p>
                                                {convertTime(race.date + "T" + race.time).toLocaleDateString("en-us", {
                                                    month: "long",
                                                    day: "numeric",
                                                    hour: "numeric",
                                                })}
                                                </p>
                                            </Col>
                                            <Col md={4} id="track-image">
                                                <img
                                                src={`./track-images/${race.Circuit.Location.locality}.png`}
                                                className="img-fluid"
                                                alt={race.Circuit.Location.locality}
                                                />
                                    
                                            </Col>
                                            <svg id={"openArrow-"+race.Circuit.circuitId} width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M15.5 7L12 10.5L8.5 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M15.5 13L12 16.5L8.5 13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                            </svg>
                                        </Row>
                                    </div>
                                    <div className="hidden-div" id={race.Circuit.circuitId} style={{ display: "none" }}>
                                        {data[1].Races[(parseInt(race.round)-1)] ? (
                                        // {convertTime(race.date + "T" + race.time) < new Date() ? (
                                        <>
                                            <h5>Results</h5>
                                            {data[1].Races[(parseInt(race.round)-1)].Results.filter((result, indx) => indx < 3).map(
                                            (result) => 
                                                <>
                                                    <div>
                                                        <p><strong>{result.position}</strong> - {result.Driver.code} ({result.points} Pts)</p>
                                                    </div>
                                                </>
                                            )}
                                        </>
                                        ) : (
                                        <>
                                            <p>
                                                <strong>FP1</strong> -{" "}
                                                {convertTime(race.FirstPractice.date + "T" + race.FirstPractice.time).toLocaleDateString("en-us", {
                                                    month: "long",
                                                    day: "numeric",
                                                    hour: "numeric"
                                                })}
                                            </p>
                                            <p>
                                                <strong>FP2</strong> -{" "}
                                                {convertTime(race.SecondPractice.date + "T" + race.SecondPractice.time).toLocaleDateString("en-us", {
                                                    month: "long",
                                                    day: "numeric",
                                                    hour: "numeric"
                                                })}
                                            </p>
                                            {race.hasOwnProperty("ThirdPractice") ? (
                                            <p>
                                                <strong>FP3</strong> -{" "}
                                                {convertTime(race.ThirdPractice.date + "T" + race.ThirdPractice.time).toLocaleDateString("en-us", {
                                                    month: "long",
                                                    day: "numeric",
                                                    hour: "numeric"
                                                })}
                                            </p>
                                            ) : (
                                            <p>
                                                <strong>SPRT</strong> -{" "}
                                                {convertTime(race.Sprint.date + "T" + race.Sprint.time).toLocaleDateString("en-us", {
                                                    month: "long",
                                                    day: "numeric",
                                                    hour: "numeric"
                                                })}
                                            </p>
                                            )}
                                            <p>
                                                <strong>QUAL</strong> -{" "}
                                                {convertTime(race.Qualifying.date + "T" + race.Qualifying.time).toLocaleDateString("en-us", {
                                                    month: "long",
                                                    day: "numeric",
                                                    hour: "numeric"
                                                })}
                                            </p>
                                        </>
                                        )}
                                    </div>
                                </>
                            ))}
                        </div>
                    </>
                    :
                    <>
                        <h1> F1 Schedule</h1>
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

export default Schedule