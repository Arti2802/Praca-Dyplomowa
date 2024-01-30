import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import axios from 'axios';
import ApiURL from "../ApiURL";
import { FaPlusCircle } from "react-icons/fa";
import { FcCancel } from "react-icons/fc";

export const AddCompetitonTypes = () => {
    const { pk } = useParams();
    const navigate = useNavigate();
    const [competition, setCompetition] = useState({});
    const [competitionTypes, setCompetitionTypes] = useState([]);
    const lengths = ['25', '50', '100', '200', '400', '800', '1500'];
    const styles = ['motylkowy', 'grzbietowy', 'klasyczny', 'dowolny', 'zmienny'];
    const [success, setSuccess] = useState(false);
    useEffect(() => {
        axios.get(`${ApiURL}/competitions/${pk}/`)
        .then(response => {
            setCompetition(response.data);
        })
    }, [pk])
    const handleLength= (index, e) => {
        const newCompetitionType = [...competitionTypes];
        competitionTypes[index].length = e.target.value;
        setCompetitionTypes(newCompetitionType);
        console.log(competitionTypes);
    };
    const handleStyle = (index, e) => {
        const newCompetitionType = [...competitionTypes];
        competitionTypes[index].style = e.target.value;
        setCompetitionTypes(newCompetitionType);
        console.log(competitionTypes);
    };
    const handleCompetitionTypes = () => {
        const data = {
            id: uuidv4(),
            length: '25',
            style: 'motylkowy',
            message: ''
        }
        setCompetitionTypes([...competitionTypes, data]);
    };
    const delCompetitionType = (id) => {
        setCompetitionTypes([
            ...competitionTypes.filter((competitionType) => {
            return competitionType.id !== id;
            }),
        ]);
    };
    const handleAddCompetitionTypes = async(e) => {
        for (let i=0; i<competitionTypes.length; i++) {
            const female_data = {
                length: competitionTypes[i].length,
                style: competitionTypes[i].style,
                gender: false,
                competition_id: pk
            }
            const male_data = {
                length: competitionTypes[i].length,
                style: competitionTypes[i].style,
                gender: true,
                competition_id: pk
            }
            try {
                axios.post(`${ApiURL}/competition_types/`, female_data);
            }
            catch (err) {
                if (err.response.status === 400)
                {
                    console.log(err.response);
                    competitionTypes[i].message = 'Coś poszło nie tak';
                    setSuccess(false);
                }
            }
            try {
                axios.post(`${ApiURL}/competition_types/`, male_data);
            }
            catch (err) {
                if (err.response.status === 400)
                {
                    console.log(err.response);
                    competitionTypes[i].message = 'Coś poszło nie tak';
                    setSuccess(false);
                }
            }
        }
        console.log(success);
        if (success)
        {
            navigate("/mojeZawody");
            alert("Udało się dodać konkurencje!");
        }
    }
    return (
        <div className="logowanie">
            <div className="group-wrapper">
                <form className="group" onSubmit={handleAddCompetitionTypes}>
                    <div className="row row-cols-auto">
                        <div className="col px-1">
                            <h2>Dostępne konkurencje:</h2>
                        </div>
                        <div className="col-1 align-self-center px-1">
                            <button className="icon" type="button" onClick={handleCompetitionTypes}><FaPlusCircle className="add"/></button>
                        </div>
                    </div>
                    <ul>
                        {competitionTypes.length > 0 ? (
                            competitionTypes.map((competitionType, index) => (
                                <li key={index} className="mb-2">
                                    <select name="length" value={competitionType.length} onChange={(e) => handleLength(index, e)}>
                                        {lengths.map((length, index) => (
                                            <option key={index} value={length}>{length}</option>
                                        ))}
                                    </select>
                                    <select name="style" value={competitionType.style} onChange={(e) => handleStyle(index, e)}>
                                        {styles.map((style, index) => (
                                            <option key={index} value={style}>{style}</option>
                                        ))}
                                    </select>
                                    <button className="icon" type="button" onClick={() => delCompetitionType(competitionType.id)}><FcCancel className="edit"/></button><br/>
                                    <span>{competitionType.message}</span>
                                </li>
                            ))
                        ) : null}
                    </ul>
                    <button type="submit">Zatwierdź</button>
                </form>
            </div>
        </div>
    )
}