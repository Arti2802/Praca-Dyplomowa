import React, { useState, useEffect } from "react";
import "./style.css";
import ApiURL from "../ApiURL";
import axios from "axios";

export const Results = ({id}) => {
    const [participations, setParticipations] = useState([]);
    useEffect(() => {
        axios.get(`${ApiURL}/competition_types/${id}/participations/`, {
            'Content-Type': 'application/json',
        })
        .then(response => {
            console.log(response);
            setCompetitionTypes(response.data);
        })
    }, [])
    useEffect(() =>  {
        for (let i=0; i<competitionTypes.length; i++) {
            axios.get(`${ApiURL}/competition_types/${competitionTypes[i].id}/participations/`, {
                'Content-Type': 'application/json',
            })
            .then(response => {
                console.log(response);
                setParticipations(response.data);
            })
        }
    }, [competitionTypes])
    // const addCompetitors = (props) => {
    //     const competitor = {
    //       id: props.id,
    //       name: props.name,
    //       last_name: props.last_name
    //     };
    //     setCompetitors([...competitors, competitor]);
    //   };
    return (
        <div className="zawodnik">
            <ul>
                {competitionTypes.length > 0 ? (
                competitionTypes.map((competitionType) => (
                    <li key={competitionType.id}>
                        <h1> {competitionType.length} m styl {competitionType.style} </h1>
                    </li>
                ))) : (
                <h1>Brak konkurencji</h1>
                )}
            </ul>
        </div>
    );
}