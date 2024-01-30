import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import ApiURL from "../ApiURL";
import toast from "react-hot-toast";
import { InputGroup } from "../components/InputGroup";
import { Loading } from "../components/Loading";

export const EditCompetiton = () => {
    const { pk } = useParams(); 
    const navigate = useNavigate();
    const [competition, setCompetition] = useState({});
    const [swimmingFacilities, setSwimmingFacilities] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        axios.get(`${ApiURL}/competitions/${pk}/`)
        .then(response => {
            console.log(response);
            setCompetition(response.data);
            axios.get(`${ApiURL}/swimming_facilities/`)
            .then(response => {
                console.log(response);
                setSwimmingFacilities(response.data);
                setLoading(false);
            })
        })
    }, [pk])
    const handleChange = (e) => {
        const value = e.target.value;
        setCompetition({
            ...competition,
            [e.target.name]: value
        });
    };
    const changeDate = (date) => {
        return date && (date.substring(0, 10) + ' ' + date.substring(11, 16));
    }
    const handleEdit = async(e) => {
        e.preventDefault();
        try {
            const Userdata = {
                name: competition.name,
                date_start: competition.date_start,
                date_stop: competition.date_stop,
                status: competition.status,
                swimming_facility_id: competition.swimming_facility_id,
                organiser_id: competition.organiser_id,
            }
            console.log(Userdata);
            const response = await axios.put(`${ApiURL}/competitions/${pk}/`, Userdata);
            console.log(response);
           if (response.status === 200)
            {
                navigate("/mojeZawody");
                toast.success("Udało się edytować zawody!");
            }
        }
        catch (err) {
            toast.error(err.response.non_field_errors[0]);
        }
    }
    return (
        <div className="logowanie">
                    {loading ? <Loading/> : (
                        <div className="group-wrapper">
                            <h1 style={{position: 'absolute', top: '270px', left: '670px'}}>Edytuj zawody</h1>
                            <form className="group" onSubmit={handleEdit}>
                                <InputGroup label={"Nazwa zawodów"} name={"name"} value={competition.name} onChange={handleChange}/>
                                <InputGroup label={"Data rozpoczęcia"} type={"datetime-local"} name={"date_start"} value={changeDate(competition.date_start)} onChange={handleChange}/>
                                <InputGroup label={"Data zakończenia"} type={"datetime-local"} name={"date_stop"} value={changeDate(competition.date_stop)} onChange={handleChange}/>
                                <label className="form-label" htmlFor="swimming_facility_id">Miejsce zawodów</label>
                                <div className="mb-4">
                                    <select className="form-select border border-primary" name="swimming_facility_id" onChange={handleChange} defaultValue={competition.swimming_facility_id.id} required>
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
                    )}
        </div>
    );
};