import React, { useState, useEffect } from "react";
//import { A } from "./A";
import axios from "axios";
import ApiURL from "../ApiURL";

export const Competitors = () => {
    const [competitors, setCompetitors] = useState([]);
    useEffect(() => {
        axios.get(`${ApiURL}/competitors/`, {
                'Content-Type': 'application/json',
        })
        .then(response => {
            console.log(response);
            setCompetitors(response.data);
        })
    }, [])
    return (
        <div className="zawodnicy">
            <div className="text-wrapper-2">Zawodnicy</div>
            <ul>
            {competitors.length > 0 ? (
                    competitors.map((competitor) => (
                        <li key={competitor.id}>
                            <div className="a">
                                <p className="tomasz-adamczyk-adam">{competitor.first_name} {competitor.last_name}</p>
                            </div>
                        </li>
                    ))) : (
                        <h1>Brak zawodników</h1>
                    )}
            </ul>
        </div>
    );
};