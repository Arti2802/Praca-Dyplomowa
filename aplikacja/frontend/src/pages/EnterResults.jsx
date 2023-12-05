import React, { useState, useEffect } from "react";
import "./style.css";
import ApiURL from "../ApiURL";
import axios from "axios";


export const EnterResults = () => {
    const [competitionTypes, setCompetitionTypes] = useState([]);
    const [participations, setParticipations] = useState([[]]);
    useEffect(() => {
        axios.get(`${ApiURL}/competitions/1/competition_types`, {
            'Content-Type': 'application/json',
        })
        .then(response => {
            console.log(response);
            setCompetitionTypes(response.data);
        })
        for (let i=0; i<competitionTypes.length; i++) {
            axios.get(`${ApiURL}/competition_types/${competitionTypes[i].id}/participations/`, {
                'Content-Type': 'application/json',
            })
            .then(response => {
                console.log(response);
                setParticipations([response.data[i]]);
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
                competitionTypes.map((competitionType) => 
                    <li>
                        <h1> {competitionType.length} m styl {competitionType.style} </h1>
                        {participations.length > 0 ? (
                        participations.map((participation) => 
                            <li>
                                <p>{participation.result}</p>
                            </li>
                        )) : (
                        <h1>Brak zawodników</h1>
                        )}
                        <button>Zgłoś wszystkich</button>
                    </li>
                )) : (
                <h1>Brak konkurencji</h1>
                )}
            </ul>
        </div>
    );
};