import React, { useState } from "react";
import ApiURL from "../ApiURL";
import axios from "axios";


export const CompetitionTypeElement = ({competitionType, competitors, onDataGet, gotChanged, set}) => {
    const [chosenCompetitors, setChosenCompetitors] = useState([]);
    // useEffect(() => {
    // if (gotChanged !== 1) {
    //     onDataGet(chosenCompetitors);
    //     console.log(chosenCompetitors);
    //     for (let i=0; i<chosenCompetitors.length; i++)
    //     {
    //         const data = {
    //             result: null,
    //             series_nr: null,
    //             track_nr: null,
    //             disqualification: false,
    //             place: null,
    //             competitor_id: chosenCompetitors[i].id,
    //             competition_type_id: competitionType.id
    //         }
    //         // axios.post(`${ApiURL}/participations/`, data)
    //         // .then(response => {
    //         //     console.log(response);
    //         // })
    //     }
    //     alert(gotChanged);
    //     set(1);
    // }
    // }, [gotChanged, chosenCompetitors, competitionType, onDataGet, set]);
    const addCompetitors = () => {
        setChosenCompetitors(competitors.filter(competitors => competitors.gender === competitionType.gender));
    };
    const delCompetitor = (id) => {
        setChosenCompetitors([
            ...chosenCompetitors.filter((competitor) => {
            return competitor.id !== id;
            }),
        ]);
    };
    const regCompetitors = () => {
       for (let i=0; i<chosenCompetitors.length; i++)
       {
            const data = {
                result: null,
                series_nr: null,
                track_nr: null,
                disqualification: false,
                place: null,
                competitor_id: chosenCompetitors[i].id,
                competition_type_id: competitionType.id
            }
            axios.post(`${ApiURL}/participations/`, data)
            .then(response => {
                console.log(response);
                alert('Udało się zapisać zawodników!');
            })
       }
    }
    return (
        <div className="zawodnik">
            <li key={competitionType.id}>
                <h1> {competitionType.length} m styl {competitionType.style} {competitionType.gender ? 'mężczyzn' : 'kobiet'}</h1>
                <ul>
                    {chosenCompetitors.length > 0 ? (
                    chosenCompetitors.map((competitor) => (
                        <li key={competitor.id}>
                            <p>{competitor.first_name} {competitor.last_name}</p>
                            <button onClick={() => delCompetitor(competitor.id)}>Usuń</button>
                        </li>
                    ))) : (
                    <h1>Brak zawodników</h1>
                    )}
                </ul>
                <button onClick={addCompetitors}>Zgłoś wszystkich</button>
                <button onClick={regCompetitors}>Zatwierdź</button>
            </li>
        </div>
    );
};