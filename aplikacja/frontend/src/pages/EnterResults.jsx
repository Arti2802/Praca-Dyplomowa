import React, { useState, useEffect } from "react";
import ApiURL from "../ApiURL";
import axios from "axios";
import { Result } from "../components/Result";
import { useNavigate, useParams } from "react-router-dom";


export const EnterResults = () => {
    const { pk } = useParams();
    const navigate = useNavigate();
    const [competitionType, setCompetitionType] = useState({});
    const [participations, setParticipations] = useState([]);
    const [isTrigerred, setIsTrigerred] = useState(1);
    useEffect(() => {
        axios.get(`${ApiURL}/competition_types/${pk}/`)
        .then(response => {
            console.log(response);
            setCompetitionType(response.data);
        })
        axios.get(`${ApiURL}/competition_types/${pk}/participations/`)
        .then(response => {
            console.log(response);
            setParticipations(response.data);
        })
    }, [pk])
    useEffect(() => {
        if (isTrigerred !== 1) {
            alert('Udało się wprowadzić wyniki!');
            navigate('/mojeZawody');
        }
    }, [isTrigerred, pk, navigate])
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
            <h1> {competitionType.length} m styl {competitionType.style} {competitionType.gender ? 'mężczyzn' : 'kobiet'} </h1>
            <form>
                <ul>
                    {participations.length > 0 ? (
                    participations.map((participation) => (
                        <li key={participation.id}>
                            <Result participation={participation} gotChanged={isTrigerred} pk={pk}/>
                        </li>
                    ))) : (
                    <h1>Brak wyników</h1>
                    )}
                </ul>
                <button type="submit" onClick={() => setIsTrigerred((prev) => prev + 1)} >Zatwierdź</button>
            </form>
        </div>
    );
};