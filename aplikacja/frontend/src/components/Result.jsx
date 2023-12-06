import React, { useState, useEffect } from "react";
//import "./style.css";
import InputMask from "react-input-mask";
import ApiURL from "../ApiURL";
import axios from "axios";

export const Result = ({participation, gotChanged, pk}) => {
    const [result, setResult] = useState("00:__:__.__");
    const [disqualification, setDisqualification] = useState(false);
    const [competitor, setCompetitor] = useState({});
    console.log(participation);
    // const handleChange = (e) => {
    //     const value = e.target.value;
    //     setData({
    //         ...data,
    //         [e.target.name]: value
    //     });
    // };
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
                result: result,
                disqualification: disqualification
            }
            console.log(data);
            axios.put(`${ApiURL}/participations/${participation.id}/`, data)
            .then(response => {
                console.log(response);
                console.log(data);
            })
            axios.put(`${ApiURL}/put_places/${pk}/`)
        }
    }, [disqualification, result, participation, gotChanged, pk])
    return (
        <>
            <p>{competitor.first_name} {competitor.last_name}</p>
            <InputMask mask="99:99:99.99" name="result" value={result} onChange={(e) => setResult(e.target.value)}/>
            <label>Dyskwalifikacja</label>
            <input type="checkbox" name="disqualification" onChange={(e) => setDisqualification(e.target.value)}/>
        </>           
    );
}