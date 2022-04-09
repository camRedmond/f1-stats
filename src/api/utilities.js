import axios from "axios"

var config = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*'
};

export async function getCurrentDriverStandings() {
    const resp = await axios.get('http://ergast.com/api/f1/current/driverStandings.json', config)
    return resp.data.MRData.StandingsTable.StandingsLists[0]
}

export async function getCurrentConstructorStandings() {
    const resp = await axios.get('https://ergast.com/api/f1/current/constructorStandings.json', config)
    return resp.data.MRData.StandingsTable.StandingsLists[0]
}

export async function getNextRoundInfo() {
    const resp = await axios.get('https://ergast.com/api/f1/current/next.json', config)
    return resp.data.MRData.RaceTable.Races[0]
}

export async function getLastRoundInfo() {
    const resp = await axios.get('https://ergast.com/api/f1/current/last/results.json', config)
    return resp.data.MRData.RaceTable.Races[0]
}

export async function getAllRoundInfo() {
    const resp = await axios.get('https://ergast.com/api/f1/current.json', config)
    return resp.data.MRData.RaceTable
}

export async function getRoundInfo(roundId) {
    const resp = await axios.get(`https://ergast.com/api/f1/current/${roundId}/results.json`, config)
    return resp.data.MRData.RaceTable
}

export async function getAllResults() {
    const resp = await axios.get(`https://ergast.com/api/f1/current/results.json`, config)
    return resp.data.MRData.RaceTable
}