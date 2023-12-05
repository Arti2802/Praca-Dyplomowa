import React, { useState } from "react";
// import "./style.css";
// import ApiURL from "../ApiURL";
// import axios from "axios";


export const CompetitionTypeElement = (competitionType, competitors) => {
    const [chosenCompetitors, setChosenCompetitors] = useState([]);
    console.log("Konkurencja", competitionType);
    const addCompetitors = (props) => {
        for (let i=0; i<competitors.length; i++)
        {
            const competitor = {
                id: competitors[i].id,
                username: competitors[i].username,
                last_name: competitors[i].last_name
              };
              setChosenCompetitors([...chosenCompetitors, competitor]);    
        }
      };
    return (
        <div className="zawodnik">
            <li key={competitionType.id}>
                <h1> {competitionType.length} m styl {competitionType.style} </h1>
                <ul>
                    {competitors.length > 0 ? (
                    competitors.map((competitor) => (
                        <li key={competitor.id}>
                            <p>{competitor.name} {competitor.last_name}</p>
                        </li>
                    ))) : (
                    <h1>Brak zawodników</h1>
                    )}
                </ul>
                <button onClick={addCompetitors}>Zgłoś wszystkich</button>
            </li>
        </div>
    );
};