import React, { useState, useEffect } from "react";
import ApiURL from "../ApiURL";
import axios from "axios";
import { CompetitionTypeDetail } from "./CompetitionTypeDetail";
import toast from "react-hot-toast";
import { FcCancel } from "react-icons/fc";


export const CompetitionTypeElement = ({competitionType, competitors, onDataGet, gotChanged, set, setResults}) => {
    const [chosenCompetitors, setChosenCompetitors] = useState([]);
    useEffect(() => {
    if (gotChanged !== 1) {
        onDataGet(chosenCompetitors);
        console.log(chosenCompetitors);
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
                })
                .catch(err => {
                    toast.error(`${chosenCompetitors[i].gender ? 'Zawodnik' : 'Zawodniczka'} ${chosenCompetitors[i].first_name} ${chosenCompetitors[i].last_name} został już dodany do tej konkurencji`);
                })
        }
        set(1);
        setResults();
        if (chosenCompetitors.length !== 0)
        {
            toast.success('Zapisano zawodników do konkurencji ' + competitionType.length + ' ' + competitionType.style);
        }
    }
    }, [gotChanged, chosenCompetitors, competitionType, onDataGet, set, setResults]);
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
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const addCompetitor = (competitor) => {
        const isCompetitorAdded = chosenCompetitors.some((addedCompetitor) => addedCompetitor.id === competitor.id);

        if (!isCompetitorAdded) {
            setChosenCompetitors([...chosenCompetitors, competitor]);
        } 
        else {
            toast.error(`'Zawodnik' ${competitor.first_name} ${competitor.last_name} jest już dodany do tej konkurencji`);
        }
    };
    return (
        <div key={competitionType.id} className="zawodnik col">
            <h4><CompetitionTypeDetail competitionType={competitionType}/></h4>
            <ul>
                {chosenCompetitors.length > 0 ? (
                chosenCompetitors.map((competitor) => (
                    <li key={competitor.id}>
                        <span>{competitor.first_name} {competitor.last_name}</span>
                        <button className="icon" onClick={() => delCompetitor(competitor.id)}><FcCancel className="delete"/></button>
                    </li>
                ))) : (
                <h5>Brak zawodników</h5>
                )}
            </ul>
            <button className="btn btn-primary" onClick={addCompetitors}>Dodaj wszystkich</button>
            <div className="col dropdown position-relative">
                <button className="btn btn-primary dropdown-toggle" type="button" onClick={toggleDropdown}>
                    Dodaj z listy
                </button>
                {isDropdownOpen && (
                    <ul className="dropdown-list" style={{ position: 'absolute', zIndex: 2 }}>
                        {competitors.filter(competitors => competitors.gender === competitionType.gender).length > 0 ? (
                            competitors.filter(competitors => competitors.gender === competitionType.gender).map((competitor) => (
                                <li className="dropdown-item bg-primary" key={competitor.id} onClick={() => addCompetitor(competitor)}>
                                    <span>{competitor.first_name} {competitor.last_name}</span>
                                </li>
                            ))) : (
                                <li className="dropdown-item disabled" onClick={(e) => e.preventDefault()}>
                                    <span>Brak zawodników</span>
                                </li>
                        )}
                    </ul>
                )}
            </div>
        </div>
    );
};