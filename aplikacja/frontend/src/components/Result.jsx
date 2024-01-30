import React, { useState, useEffect } from "react";
import InputMask from "react-input-mask";
import ApiURL from "../ApiURL";
import axios from "axios";
import toast from "react-hot-toast";

export const Result = ({participation, gotChanged, set, pk}) => {
    const [result, setResult] = useState("00:__:__.__");
    const [disqualification, setDisqualification] = useState(false);
    const [competitor, setCompetitor] = useState({});
    console.log(participation);
    useEffect(() => {
        axios.get(`${ApiURL}/competitors/${participation.competitor_id.id}/`)
        .then(response => {
            console.log(response);
            setCompetitor(response.data);
        })
    }, [participation])
    useEffect(() => {
        if (gotChanged !== 1) {
            try {
                const data = {
                    result: disqualification ? null : result,
                    disqualification: disqualification
                }
                console.log(data);
                axios.put(`${ApiURL}/participations/${participation.id}/`, data)
                .then(response => {
                    console.log(response);
                })
                axios.put(`${ApiURL}/put_places/${pk}/`);
                set(1);
            }
            catch (err) {
                toast.error(err);
            }
        }
    }, [disqualification, result, participation, gotChanged, set, pk])
    // const pat = "[0-1]{1}[0-9]{1}:[0-5]{1}[0-9]{1}:[0-5]{1}[0-9]{1}.[0-9]{2}";
    return (
        <>
            <p>{competitor.first_name} {competitor.last_name}</p>
            <InputMask mask="99:99:99.99" name="result" pattern="[0-1]{1}[0-9]{1}:[0-5]{1}[0-9]{1}:[0-5]{1}[0-9]{1}.[0-9]{2}" value={result} disabled={disqualification} onChange={(e) => setResult(e.target.value)}/>
            <label>Dyskwalifikacja</label>
            <input type="checkbox" name="disqualification" value={disqualification} onChange={(e) => setDisqualification((prev) => !prev)}/>
        </>           
    );
}