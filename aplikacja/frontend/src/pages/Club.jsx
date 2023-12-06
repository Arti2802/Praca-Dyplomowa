import React, { useState } from "react";
import { useEffect } from "react";
import ApiURL from "../ApiURL";
import axios from "axios";
import { useParams } from "react-router-dom";

export const Club = () => {
    const { pk } = useParams();
    const [competitors, setCompetitors] = useState([]);
    const [add, setAdd] = useState(false);
    const [data, setData] = useState({
        first_name: '',
        last_name: '',
        gender: true,
        username: 'test',
        email: 'test@test.com',
        password: '123',
        date_of_birth: '2000-01-01',
        club_id: pk
    });
    let addForm = {};
    if (add) {
        addForm.display = 'block';
    }
    else {
        addForm.display = 'none';
    }
    useEffect(() => {
        axios.get(`${ApiURL}/clubs/${pk}`, {
                'Content-Type': 'application/json',
        })
        .then(response => {
            console.log(response);
        })
        axios.get(`${ApiURL}/clubs/${pk}/competitors/`, {
            'Content-Type': 'application/json',
        })
        .then(response => {
            console.log(response);
            setCompetitors(response.data);
        })
    }, [pk])
    const handleChange = (e) => {
        const value = e.target.value;
        setData({
            ...data,
            [e.target.name]: value
        });
    };
    const handleCompetitor = () => {
        axios.post(`${ApiURL}/competitors/`, data)
        .then(response => {
            console.log(response);
        })
    }
    return (
        <div className="klub">
            <div className="div">
                <div className="overlap-group">
                    <div className="text-wrapper-2">MTP Kormoran</div>
                    <img className="icon-medal-star" alt="Icon medal star" src="icon-medal-star.png" />
                </div>
                <div className="text-wrapper-3">Zawodnicy</div>
                <button onClick={() => {setAdd(true)}}>Dodaj zawodnika</button>
                <form style={addForm} onSubmit={handleCompetitor}>
                    <label htmlFor="first_name">Imię</label>
                    <input type="text" name="first_name" onChange={handleChange}/>
                    <label htmlFor="last_name">Nazwisko</label>
                    <input type="text" name="last_name" onChange={handleChange}/>
                    <label htmlFor="date_of_birth">Data urodzenia</label>
                    <input type="date" name="date_of_birth" onChange={handleChange}/>
                    <input type="radio" id="kobieta" name="gender" value={false} onChange={handleChange}/>
                    <label htmlFor="kobieta">Kobieta</label>
                    <input type="radio" id="mężczyzna" name="gender" value={true} onChange={handleChange}/>
                    <label htmlFor="mężczyzna">Mężczyzna</label>
                    <button>Zatwierdź</button>
                </form>
                <ul>
                    {competitors.length > 0 ? (
                    competitors.map((competitor) => (
                        <li key={competitor.id}>
                            <div className="rectangle">
                                <div className="div">{competitor.first_name} {competitor.last_name}</div>
                            </div>
                        </li>
                    ))) : (
                        <h1>Brak zawodników</h1>
                    )}
                </ul>
            </div>
        </div>
    );
};