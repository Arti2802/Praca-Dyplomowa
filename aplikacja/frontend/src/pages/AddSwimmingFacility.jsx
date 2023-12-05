import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import ApiURL from "../ApiURL";


export const AddSwimmingFacility = () => {
    const navigate = useNavigate();
    const [errMsg, setErrMsg] = useState("");
    const [data, setData] = useState({});
    
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
    const handleLogin = async(e) => {
        e.preventDefault();
        try {
            const Userdata = {
                name: data.name,
                address: data.address,
                city: data.city,
                pool_length: data.pool_length
            }
            console.log(Userdata);
            const response = await axios.post(`${ApiURL}/swimming_facilities/`, Userdata);
            // body: JSON.stringify({
            //     id_username: email,
            //     id_password: password
             // }
            console.log(response);
           if (response.status === 201)
            {
                console.log(response);
                navigate("/obiektyPlywackie");
                alert("Udało się dodać obiekt pływacki!");
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
                        <input className="text-field" name="name" onChange={handleChange}/>
                    </div>
                    <div>
                        <label className="div">Data rozpoczęcia</label>
                        <input className="text-field" type="text" name="address" onChange={handleChange}/>
                    </div>
                    <div>
                        <label className="div">Data zakończenia</label>
                        <input className="text-field" type="text" name="city" onChange={handleChange}/>
                    </div>
                    <select name="pool_length" onChange={handleChange} defaultValue={0}>
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