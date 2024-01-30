import React, { useState, useEffect } from "react";
//import "./style.css";
import ApiURL from "../ApiURL";
import axios from "axios";

export const Participation = ({participation, gotChanged}) => {
    const [series, setSeries] = useState(0);
    const [track, setTrack] = useState(0);
    const [competitor, setCompetitor] = useState({});
    console.log(participation);
    useEffect(() => {
        axios.get(`${ApiURL}/competitors/${participation.competitor_id}/`)
        .then(response => {
            console.log(response);
            setCompetitor(response.data);
        })
    }, [participation])
    useEffect(() => {
        if (gotChanged !== 1) {
            const data = {
                series_nr: series,
                track_nr: track
            }
            console.log(data);
            axios.put(`${ApiURL}/participations/${participation.id}/`, data)
            .then(response => {
                console.log(response);
                console.log(data);
            })
        }
    }, [series, track, participation, gotChanged])
    return (
        <>
            <span>{competitor.id} </span>
            <label>Seria</label>
            <input type="number" min={1} onChange={(e) => setSeries(e.target.value)}/>
            <label>Tor</label>
            <input type="number" min={0} onChange={(e) => setTrack(e.target.value)}/>
        </>           
    );
}