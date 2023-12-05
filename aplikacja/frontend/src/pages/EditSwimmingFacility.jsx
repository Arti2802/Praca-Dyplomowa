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
    const [data, setData] = useState({});
    useEffect(() => {
        axios.get(`${ApiURL}/swimming_facilities/${pk}/`)
        .then(response => {
            console.log(response);
            setSwimmingFacility(response.data);
        })
    }, [pk])
    const handleChange = (e) => {
        const value = e.target.value;
        setData({
            ...data,
            [e.target.name]: value
        });
    };
    // useEffect(() => {
    //     if (session === "true") {
    //       navigate("/"); 
    //     }
    // }, [navigate]);
    // const handleLogin = async(e) => {
    //     e.preventDefault();
    //     try {
    //         const Userdata = {
    //             name: data.name,
    //             date_start: data.date_start,
    //             date_stop: data.date_stop,
    //             status: false,
    //             swimming_facility_id: 1,
    //             organiser_id: 1,
    //         }
    //         console.log(Userdata);
    //         const response = await axios.post(`${ApiURL}/competitions/`, Userdata);
    //         // body: JSON.stringify({
    //         //     id_username: email,
    //         //     id_password: password
    //          // }
    //         console.log(response);
    //        if (response.status === 201)
    //         {
    //             sessionStorage.setItem('isLogged', 'true');
    //             //const data = await response.json();
    //             sessionStorage.setItem('Token', data.auth_token);
    //             sessionStorage.setItem('email', data.email);
    //             navigate("/zawody", { replace: true });
    //             alert("Udało się dodać zawody!");
    //             //window.location.reload(false);
    //         }
    //         else
    //         {
    //             setErrMsg('Błędne dane logowania');
    //         }
    //     } catch (err) {
    //         if (!err.response) {
    //             setErrMsg('Brak odpowiedzi od serwera');
    //         } else if (err.response?.status === 400){
    //             setErrMsg('Brak e-maila lub hasła');
    //         } else if (err.response?.status === 401){
    //             setErrMsg('Brak autoryzacji');
    //         } else {
    //             setErrMsg('Logowanie nie powiodło się');
    //         }
    //     }
    // }
    const handleEdit = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`${ApiURL}/competitions/1/`, swimmingFacility);
            // body: JSON.stringify({
            //     id_username: email,
            //     id_password: password
             // }
            console.log(response);
           if (response.status === 200)
            {
                navigate("/obiektyPlywackie", { replace: true });
                alert("Udało się edytować obiekt!");
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
                    <input className="text-field" name="name" value={swimmingFacility.name} onChange={handleChange}/>
                </div>
                <div>
                    <label className="div">Adres</label>
                    <input className="text-field" type="text" name="address" value={swimmingFacility.address} onChange={handleChange}/>
                </div>
                <div>
                    <label className="div">Miasto</label>
                    <input className="text-field" type="text" name="city" value={swimmingFacility.city} onChange={handleChange}/>
                </div>
                <select name="pool_length" onChange={handleChange} defaultValue={swimmingFacility.pool_length}>
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