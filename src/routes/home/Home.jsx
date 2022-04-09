import React from 'react';
import NextRace from '../../components/nextRace/NextRace';
import DriverStandings from '../../components/driver-standings/DriverStandings';
import ConstructorStandings from '../../components/team-standings/ConstructorStandings';
import LastRaceResult from '../../components/lastRace/LastRace';
import './Home.scss';

function Home() {
    return (
        <>
            <div className='home'>
                <NextRace />
                <DriverStandings />
                <ConstructorStandings />
                <LastRaceResult />
            </div>
        </>
    )
}

export default Home;