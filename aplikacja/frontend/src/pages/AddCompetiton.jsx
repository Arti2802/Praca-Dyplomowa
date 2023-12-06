import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import axios from 'axios';
import ApiURL from "../ApiURL";


export const AddCompetiton = () => {
    const navigate = useNavigate();
    const [errMsg, setErrMsg] = useState("");
    const [swimmingFacilities, setSwimmingFacilities] = useState([]);
    const [data, setData] = useState({});
    const [competitionTypes, setCompetitionTypes] = useState([]);
    const lengths = ['25', '50', '100', '200', '400', '800', '1500'];
    const styles = ['motylkowy', 'grzbietowy', 'klasyczny', 'dowolny', 'zmienny'];
    useEffect(() => {
        axios.get(`${ApiURL}/swimming_facilities/`)
        .then(response => {
            console.log(response);
            setSwimmingFacilities(response.data);
        })
    }, [])
    
    const handleChange = (e) => {
        const value = e.target.value;
        setData({
            ...data,
            [e.target.name]: value
        });
    };
    const handleLength= (index, e) => {
        const newCompetitionType = [...competitionTypes];
        competitionTypes[index].length = e.target.value;
        console.log(e);
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
            style: 'motylkowy'
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
    // useEffect(() => {
    //     if (session === "true") {
    //       navigate("/"); 
    //     }
    // }, [navigate]);
    const handleLogin = async(e) => {
        e.preventDefault();
        try {
            const Userdata = {
                name: data.name,
                date_start: data.date_start,
                date_stop: data.date_stop,
                swimming_facility_id: data.swimming_facility_id,
                organiser_id: 1,
            }
            console.log(Userdata);
            const response = await axios.post(`${ApiURL}/competitions/`, Userdata);
            // body: JSON.stringify({
            //     id_username: email,
            //     id_password: password
             // }
            console.log(response);
           if (response.status === 201)
            {
                console.log(response);
                const id = response.data.id;
                for (let i=0; i<competitionTypes.length; i++) {
                    const female_data = {
                        length: competitionTypes[i].length,
                        style: competitionTypes[i].style,
                        gender: false,
                        competition_id: id
                    }
                    const male_data = {
                        length: competitionTypes[i].length,
                        style: competitionTypes[i].style,
                        gender: true,
                        competition_id: id
                    }
                    axios.post(`${ApiURL}/competition_types/`, female_data)
                    .then(response => {
                        console.log(response);
                    })
                    axios.post(`${ApiURL}/competition_types/`, male_data)
                    .then(response => {
                        console.log(response);
                    })
                }
                navigate("/mojeZawody");
                alert("Udało się dodać zawody!");
                //window.location.reload(false);
            }
            else
            {
                setErrMsg('Błędne dane');
            }
        } catch (err) {
            if (!err.response) {
                setErrMsg('Brak odpowiedzi od serwera');
            } else if (err.response?.status === 400){
                setErrMsg('Nie wszystkie pola są wypełnione');
            } else if (err.response?.status === 401){
                setErrMsg('Brak autoryzacji');
            } else {
                setErrMsg('Coś poszło nie tak');
            }
        }
    }
    return (
        <div className="logowanie">
            <p>{errMsg}</p>
            <div className="group-wrapper">
                <form className="group" onSubmit={handleLogin}>
                    <div>
                        <label className="div">Nazwa</label>
                        <input className="text-field" name="name" onChange={handleChange} value={data.email}/>
                    </div>
                    <div>
                        <label className="div">Data rozpoczęcia</label>
                        <input className="text-field" type="datetime-local" name="date_start" value={data.password} onChange={handleChange}/>
                    </div>
                    <div>
                        <label className="div">Data zakończenia</label>
                        <input className="text-field" type="datetime-local" name="date_stop" value={data.password} onChange={handleChange}/>
                    </div>
                    <label>Miejsce zawodów</label>
                    <select name="swimming_facility_id" onChange={handleChange} defaultValue={0}>
                    <option value={0} disabled>Wybierz obiekt</option>
                        {swimmingFacilities.map((swimmingFacility) => (
                            <option value={swimmingFacility.id} key={swimmingFacility.id}>{swimmingFacility.name}</option>
                        ))}
                    </select>
                    <p>Dostępne konkurencje: </p>
                    <button onClick={handleCompetitionTypes} type="button">Dodaj konkurencję</button><br/>
                    <ul>
                        {competitionTypes.length > 0 ? (
                            competitionTypes.map((competitionType, index) => (
                                <li key={index}>
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
                                    <button type="button" onClick={() => delCompetitionType(competitionType.id)}>Usuń</button><br/>
                                </li>
                            ))
                        ) : null}
                    </ul>
                    <button type="submit">Zatwierdź</button>
                </form>
            </div>
        </div>
    );
};