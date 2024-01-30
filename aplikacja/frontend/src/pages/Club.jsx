import React, { useState } from "react";
import { useEffect } from "react";
import ApiURL from "../ApiURL";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { UserTypeComponent } from "../components/UserTypeComponent";
import { CompetitorElement } from "../components/CompetitorElement";
import { PersonalElement } from "../components/PersonalElement";
import { HeaderAndButton } from "../components/HeaderAndButton";
import { FaPlusCircle } from "react-icons/fa";
import toast from "react-hot-toast";
import { Loading } from "../components/Loading";

export const Club = () => {
    const navigate = useNavigate();
    const { pk } = useParams();
    const [club, setClub] = useState({});
    const [loading, setLoading] = useState(true);
    const [competitors, setCompetitors] = useState([]);
    const [loading2, setLoading2] = useState(true);
    const [add, setAdd] = useState(false);
    const [data, setData] = useState({
            first_name: '',
            last_name: '',
            gender: true,
            username: 'test',
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
        axios.get(`${ApiURL}/clubs/${pk}`)
        .then(response => {
            console.log(response);
            setClub(response.data);
            setLoading(false);
        })
        .catch(err => {
            if (err.response.status === 404) {
                navigate('/');
                toast.error('Ten klub nie istnieje lub został usunięty!');
            }
        })
        axios.get(`${ApiURL}/clubs/${pk}/competitors/`)
        .then(response => {
            console.log(response);
            setCompetitors(response.data);
            setLoading2(false);
        })
    }, [pk, navigate])
    const handleChange = (e) => {
        const value = e.target.value;
        setData({
            ...data,
            [e.target.name]: value
        });
        console.log(data);
    };
    const handleCompetitor = () => {
        console.log(data);
        const competitorData = {
            first_name: data.first_name,
            last_name: data.last_name,
            gender: data.gender,
            username: data.username,
            password: '.',
            date_of_birth: data.date_of_birth,
            club_id: pk
        }
        axios.post(`${ApiURL}/clubs/${pk}/competitors/`, competitorData)
        .then(response => {
            console.log(response);
            setCompetitors([...competitors, response.data]);
            toast.success('Udało się dodać zawodnika!');
            setAdd(false);
        })
        .catch(err => {
            toast.error('Wypełnij wszystkie pola!');
        })
    }
    return (
        <div className="klub">
            <div className="div">
                <div className="overlap-group">
                    {loading ? <Loading/> : <h1 className="text-wrapper-2">{club.username}</h1>}
                </div>
                <HeaderAndButton header={"Zawodnicy"}>
                    <PersonalElement id={pk}><UserTypeComponent number='2'><button className="icon" onClick={() => {setAdd(true)}}><FaPlusCircle className="add"/></button></UserTypeComponent></PersonalElement>
                </HeaderAndButton>
                <form style={addForm}>
                    <label htmlFor="username">Nr legitymacji</label>
                    <input type="text" name="username" pattern="[0-9]{12}" maxLength={12} onChange={handleChange} required/>
                    <label htmlFor="first_name">Imię</label>
                    <input type="text" name="first_name" onChange={handleChange} required/>
                    <label htmlFor="last_name">Nazwisko</label>
                    <input type="text" name="last_name" onChange={handleChange} required/>
                    <label htmlFor="date_of_birth">Data urodzenia</label>
                    <input type="date" name="date_of_birth" onChange={handleChange} required/>
                    <input type="radio" id="kobieta" name="gender" value={false} onChange={handleChange}/>
                    <label htmlFor="kobieta">Kobieta</label>
                    <input type="radio" id="mężczyzna" name="gender" value={true} onChange={handleChange}/>
                    <label htmlFor="mężczyzna">Mężczyzna</label>
                    <button className="btn btn-success" type="button" onClick={handleCompetitor}>Zatwierdź</button>
                </form>
                <ul>
                    {loading2 ? (
                        <Loading/>
                    ) : (
                        competitors.length > 0 ? (
                            competitors.map((competitor) => (
                                <li key={competitor.id}>
                                    <CompetitorElement competitor={competitor}/>
                                </li>
                            ))) : (
                                <h3>Brak zawodników</h3>
                        )
                    )}
                </ul>
            </div>
        </div>
    );
};