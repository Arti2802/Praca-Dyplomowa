import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import ApiURL from "../ApiURL";


export const EditSwimmingFacility = () => {
    const { pk } = useParams(); 
    const navigate = useNavigate();
    //const [errMsg, setErrMsg] = useState("");
    const [swimmingFacility, setSwimmingFacility] = useState({});
    useEffect(() => {
        axios.get(`${ApiURL}/swimming_facilities/${pk}/`)
        .then(response => {
            console.log(response);
            setSwimmingFacility(response.data);
        })
    }, [pk])
    const handleChange = (e) => {
        const value = e.target.value;
        setSwimmingFacility({
            ...swimmingFacility,
            [e.target.name]: value
        });
    };
    const handleEdit = async(e) => {
        e.preventDefault();
        try {
            const data = {
                name: swimmingFacility.name,
                address: swimmingFacility.address,
                city: swimmingFacility.city,
                pool_length: swimmingFacility.pool_length
            }
            console.log(data);
            const response = await axios.put(`${ApiURL}/swimming_facilities/${pk}/`, swimmingFacility);
            console.log(response);
           if (response.status === 200)
            {
                alert("Udało się edytować obiekt!");
                navigate("/obiektyPlywackie", { replace: true });
                window.location.reload(false);
            }
        }
        catch {
            console.log("Hej");
        }
    }
    return (
        <div className="logowanie">
        <div className="group-wrapper">
            <form className="group" onSubmit={handleEdit}>
                <div>
                    <label className="div">Nazwa</label>
                    <input className="text-field" name="name" defaultValue={swimmingFacility.name} onChange={handleChange}/>
                </div>
                <div>
                    <label className="div">Adres</label>
                    <input className="text-field" type="text" name="address" defaultValue={swimmingFacility.address} onChange={handleChange}/>
                </div>
                <div>
                    <label className="div">Miasto</label>
                    <input className="text-field" type="text" name="city" defaultValue={swimmingFacility.city} onChange={handleChange}/>
                </div>
                <select name="pool_length" onChange={handleChange} value={swimmingFacility.pool_length}>
                    <option value={0} disabled>Wybierz długość basenu</option>
                    <option value='25'>25</option>
                    <option value='50'>50</option>
                </select>
                <button type="submit">Zatwierdź</button>
            </form>
        </div>
    </div>
    );
};