import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import axios from 'axios';
import ApiURL from "../ApiURL";
import { FaPlusCircle } from "react-icons/fa";
import { FcCancel, FcCheckmark } from "react-icons/fc";
import { CompetitionTypeDetail } from "../components/CompetitionTypeDetail";
import { DeleteButton } from "../components/DeleteButton";
import { ConfirmationWindow } from "../components/ConfirmationWindow";
import toast from "react-hot-toast";
import { Loading } from "../components/Loading";

export const ChangeCompetitonTypes = () => {
    const { pk } = useParams();
    const navigate = useNavigate();
    const [competition, setCompetition] = useState({});
    const [addedCompetitionTypes, SetAddedCompetitionTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loading2, setLoading2] = useState(true);
    const [competitionTypes, setCompetitionTypes] = useState([]);
    const lengths = ['25', '50', '100', '200', '400', '800', '1500'];
    const styles = ['motylkowy', 'grzbietowy', 'klasyczny', 'dowolny', 'zmienny'];
    const [id, setId] = useState(null);
    const [show, setShow] = useState(false);
    useEffect(() => {
        axios.get(`${ApiURL}/competitions/${pk}/`)
        .then(response => {
            setCompetition(response.data);
            setLoading(false);
        })
        axios.get(`${ApiURL}/competitions/${pk}/competition_types/`)
        .then(response => {
            SetAddedCompetitionTypes(response.data);
            setLoading2(false);
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
    const handleMessage= (index, message) => {
        const newCompetitionType = [...competitionTypes];
        competitionTypes[index].message = message;
        setCompetitionTypes(newCompetitionType);
    };
    const handleAdd = (index) => {
        const newCompetitionType = [...competitionTypes];
        competitionTypes[index].add = true;
        setCompetitionTypes(newCompetitionType);
    }
    const showDeleteModal = (id) => {
        setShow(true);
        setId(id);
    };
    const hideConfirmationModal = () => {
        setShow(false);
    };
    const handleDelete = (id) => {
        axios.delete(`${ApiURL}/competition_types/${id}/`)
        .then(response => {
            console.log(response);
        })
        setShow(false);
        SetAddedCompetitionTypes(addedCompetitionTypes.filter((addedCompetitionType) => addedCompetitionType.id !== id));
    }
    const handleCompetitionTypes = () => {
        const data = {
            id: uuidv4(),
            length: '25',
            style: 'motylkowy',
            message: '',
            color: 'red',
            add: false
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
            if (!competitionTypes[i].add) {
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
                    const response = await axios.post(`${ApiURL}/competition_types/`, female_data);
                    if (response.status === 201)
                    {
                        handleMessage(i, 'Dodano');
                        handleAdd(i);
                    }
                }
                catch (err) {
                    if (err.response.status === 400)
                    {
                        handleMessage(i, err.response.data.non_field_errors[0], 'red');
                    }
                }
                try {
                    const response = await axios.post(`${ApiURL}/competition_types/`, male_data);
                    if (response.status === 201)
                    {
                        handleMessage(i, 'Dodano');
                        handleAdd(i);
                    }
                }
                catch (err) {
                    if (err.response.status === 400)
                    {
                        handleMessage(i, err.response.data.non_field_errors[0], 'red');
                    }
                }
            }
        }
        const errors = competitionTypes.filter((competitionType) => !competitionType.add );
        if (errors.length === 0)
        {
            navigate("/mojeZawody");
            toast.success("Udało się zmienić konkurencje!");
        }
    }
    return (
        <div className="logowanie">
            <div className="group-wrapper">
                <form className="group">
                    {loading ? <Loading/> : (
                        <div className="text-center mb-4">
                            <h1>{competition.name}</h1>
                            <p>{competition.swimming_facility_id.name} {competition.swimming_facility_id.city}</p>
                            <p>Długość basenu: {competition.swimming_facility_id.pool_length} m</p>
                        </div>
                    )}
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
                                        {!competitionType.add ? (
                                            <>
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
                                                <span style={{color: 'red'}}>{competitionType.message}</span>
                                            </>
                                        ) : (
                                            <>
                                                <span>{competitionType.length} m styl {competitionType.style} <FcCheckmark className="edit"/></span>
                                            </>
                                        )}
                                    </li>
                                ))
                        ) : null}
                        {loading2 ? <Loading/> : (
                            addedCompetitionTypes.length > 0 ? (
                                addedCompetitionTypes.map((addedCompetitionType) => (
                                    <li key={addedCompetitionType.id} className="mb-2 row row-cols-auto">
                                        <CompetitionTypeDetail competitionType={addedCompetitionType}/>
                                        <div className="col">
                                            <DeleteButton fn={() => showDeleteModal(id)}/>
                                        </div>
                                    </li>
                                ))
                            ) : null
                        )}
                    </ul>
                    <button className="btn btn-success" type="button" onClick={handleAddCompetitionTypes}>Zatwierdź</button>
                </form>
            </div>
            <ConfirmationWindow showModal={show} hideModal={hideConfirmationModal} confirmModal={() => handleDelete(id)} id={id} message={`Czy na pewno chcesz usunąć tę konkurencję?`}/>
        </div>
    )
}