import React, { useState, useEffect } from "react";
import "./style.css";
import ApiURL from "../ApiURL";
import axios from "axios";


export const RegisterCompetitors = () => {
    const [competitors, setCompetitors] = useState([]);
    const [competitionTypes, setCompetitionTypes] = useState([]);
    useEffect(() => {
        axios.get(`${ApiURL}/club/1/competitors/`, {
            'Content-Type': 'application/json',
        })
        .then(response => {
            console.log(response);
            setCompetitors(response.data);
        })
        axios.get(`${ApiURL}/competitions/1/competition_types/`, {
            'Content-Type': 'application/json',
        })
        .then(response => {
            console.log(response);
            setCompetitionTypes(response.data);
        })
    }, [])
    return (
        <div className="zawodnik">
            <ul>
                {competitionTypes.length > 0 ? (
                competitionTypes.map((competitionType) => 
                    <li>
                        <h1>{competitionType.length} m {competitionType.style} </h1>
                    </li>
                )) : (
                <h1>Brak konkurencji</h1>
                )}
            </ul>
        </div>
    );
};