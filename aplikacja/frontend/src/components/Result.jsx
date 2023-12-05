import React, { useState, useEffect } from "react";
//import "./style.css";
import ApiURL from "../ApiURL";
import axios from "axios";

export const Result = ({id}) => {
    const [participation, setParticipation] = useState({});
    const [hours, setHours] = useState("00");
    const [minutes, setMinutes] = useState("00");
    const [seconds, setSeconds] = useState("00");
    const [houndreths, setHoundreths] = useState("00");
    useEffect(() => {
        axios.get(`${ApiURL}/participations/${id}/`, {
            'Content-Type': 'application/json',
        })
        .then(response => {
            console.log(response);
            setParticipation(response.data);
        })
    }, [id])
    const [data, setData] = useState({
        result: "00:00:00.00",
        series_nr: 1,
        track_nr: 1,
        disqualification: false
      });
    
    const handleChange = (e) => {
        const value = e.target.value;
        setData({
            ...data,
            [e.target.name]: value
        });
    };
    const addResult = (id) => {
        setData({
            ...data,
            result: hours + ':' + minutes + ':' + seconds + '.' + houndreths,
        });
        axios.put(`${ApiURL}/participations/${id}/`, data)
        .then(response => {
            console.log(response);
        })
    }
    return (
        <>
            <p>{participation.competitor_id}</p>
            <form onSubmit={() => addResult(participation.id)}>
                <input type="number" min="00" max="23" name="hours"  value="00" onChange={(e) => setHours(e.target.value)}/>
                <input type="number" min="00" max="59" name="minutes" onChange={(e) => setMinutes(e.target.value)}/>
                <input type="number" min="00" max="59" name="seconds" onChange={(e) => setSeconds(e.target.value)}/>
                <input type="number" min="00" max="99" name="houndreths" onChange={(e) => setHoundreths(e.target.value)}/>
                <label>Dyskwalifikacja</label>
                <input type="checkbox" name="disqualification" onChange={handleChange}/>
                <button>Zatwierdź</button>
            </form>
        </>           
    );
}