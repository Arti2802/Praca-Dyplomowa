import React, { useState, useEffect } from "react";
//import { Rectangle } from "./Rectangle";
import ApiURL from "../ApiURL";
import axios from "axios";
import { Competition } from "../components/Competition";

export const Competitions = () => {
    const [competitions, setCompetitions] = useState([]);
    useEffect(() => {
        axios.get(`${ApiURL}/competitions/?status=zaakceptowane`)
        .then(response => {
            console.log(response);
            setCompetitions(response.data);
        })
    }, []);
    // const handleDelete = (id) => {
    //     axios.delete(`${ApiURL}/competitions/${id}/`)
    //     .then(response => {
    //         console.log(response);
    //     })
    // }
    return (
        <div className="zawody">
            <h1>Zawody</h1>
            <div className="div">
                <ul>
                    {competitions.length > 0 ? (
                    competitions.map((competition) => (
                        <Competition key={competition.id} competition={competition}>
                        </Competition>
                    ))) : (
                        <h1>Brak zawodów</h1>
                    )}
                </ul>
            </div>
        </div>
    );
};