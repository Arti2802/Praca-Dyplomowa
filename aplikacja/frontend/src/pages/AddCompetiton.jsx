import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import ApiURL from "../ApiURL";
import toast from "react-hot-toast";
import { InputGroup } from "../components/InputGroup";


export const AddCompetiton = () => {
    const navigate = useNavigate();
    //const [errMsg, setErrMsg] = useState("");
    const [swimmingFacilities, setSwimmingFacilities] = useState([]);
    const [data, setData] = useState({});
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
        console.log(data.swimming_facility_id);
    };
    const handleLogin = async(e) => {
        e.preventDefault();
        try {
            const Userdata = {
                name: data.name,
                date_start: data.date_start,
                date_stop: data.date_stop,
                swimming_facility_id: data.swimming_facility_id,
                organiser_id: sessionStorage.getItem('id'),
            }
            const response = await axios.post(`${ApiURL}/competitions/add/`, Userdata);
            console.log(response);
            if (response.status === 201)
            {
                const id = response.data.id;
                toast.success("Udało się dodać zawody!");
                navigate(`${id}/dodajKonkurencje`);
            }
            else
            {
                toast.error('Błędne dane');
            }
        } catch (err) {
            console.log(err);
            if (!err.response) {
                toast.error('Brak odpowiedzi od serwera');
            } else if (err.response?.status === 400){
                toast.error(err.response.data.msg[0]);
            } else if (err.response?.status === 401){
                toast.error('Brak autoryzacji');
            } else {
                toast.error('Coś poszło nie tak');
            }
        }
    }
    return (
        <div className="logowanie">
            <div className="group-wrapper">
                <h1 style={{position: 'absolute', top: '270px', left: '670px'}}>Dodaj zawody</h1>
                <form className="group" onSubmit={handleLogin}>
                    <InputGroup label={"Nazwa zawodów"} name={"name"} value={data.name} onChange={handleChange}/>
                    <InputGroup label={"Data rozpoczęcia"} type={"datetime-local"} name={"date_start"} value={data.date_start} onChange={handleChange}/>
                    <InputGroup label={"Data zakończenia"} type={"datetime-local"} name={"date_stop"} value={data.date_stop} onChange={handleChange}/>
                    <label className="form-label" htmlFor="swimming_facility_id">Miejsce zawodów</label>
                    <div className="mb-4">
                        <select className="form-select border border-primary" name="swimming_facility_id" onChange={handleChange} defaultValue={""} required>
                            <option disabled value="">Wybierz obiekt</option>
                            {swimmingFacilities.map((swimmingFacility) => (
                                <option value={swimmingFacility.id} key={swimmingFacility.id}>{swimmingFacility.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="align-items-center">
                        <button className="btn btn-success w-100" type="submit">Zatwierdź</button>
                    </div>
                </form>
            </div>
        </div>
    );
};