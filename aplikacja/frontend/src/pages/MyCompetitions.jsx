import React, { useState, useEffect } from "react";
//import { Rectangle } from "./Rectangle";
import ApiURL from "../ApiURL";
import axios from "axios";
import { Competition } from "../components/Competition";

export const MyCompetitions = () => {
    const [competitions, setCompetitions] = useState([]);
    useEffect(() => {
        axios.get(`${ApiURL}/competitions/`, {
                'Content-Type': 'application/json',
        })
        .then(response => {
            console.log(response);
            setCompetitions(response.data);
        })
    }, []);
    const handleDelete = (id) => {
        axios.delete(`${ApiURL}/competitions/${id}/`)
        .then(response => {
            console.log(response);
        })
    }
    return (
        <div className="zawody">
            <h1>Moje zawody</h1>
            <a href="/dodajZawody"><button>Dodaj zawody</button></a>
            <div className="div">
                <ul>
                    {competitions.length > 0 ? (
                    competitions.map((competition) => (
                        <Competition key={competition.id} competition={competition}>
                            <a href={`/edytujZawody/${competition.id}`}><button>Edytuj</button></a>
                            <button onClick={() => handleDelete(competition.id)}>Usuń</button>
                        </Competition>
                    ))) : (
                        <h1>Brak zawodów</h1>
                    )}
                </ul>
            </div>
        </div>
    );
};