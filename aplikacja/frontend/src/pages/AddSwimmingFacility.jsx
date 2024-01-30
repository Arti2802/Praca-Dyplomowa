import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import ApiURL from "../ApiURL";
import toast from "react-hot-toast";
import { InputGroup } from "../components/InputGroup";


export const AddSwimmingFacility = () => {
    const navigate = useNavigate();
    //const [errMsg, setErrMsg] = useState("");
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
            console.log(response);
           if (response.status === 201)
            {
                console.log(response);
                navigate("/obiektyPlywackie");
                toast.success("Udało się dodać obiekt pływacki!");
            }
            else
            {
                toast.error('Błędne dane');
            }
        } catch (err) {
            if (!err.response) {
                toast.error('Brak odpowiedzi od serwera');
            } else if (err.response?.status === 400){
                toast.error('Nie wszystkie pola są wypełnione');
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
                <h1 style={{position: 'absolute', top: '270px', left: '610px'}}>Dodaj obiekt pływacki</h1>
                <form className="group" onSubmit={handleLogin}>
                    <InputGroup label={"Nazwa obiektu"} name={"name"} value={data.name} onChange={handleChange}/>
                    <InputGroup label={"Adres"} name={"address"} value={data.address} onChange={handleChange}/>
                    <InputGroup label={"Miasto"} name={"city"} value={data.city} onChange={handleChange}/>
                    <div className="mt-3 mb-4">
                        <label htmlFor="pool_length">Długość basenu</label>
                        <select className="form-select border border-primary" name="pool_length" onChange={handleChange} defaultValue={0}>
                            <option value={0} disabled>Wybierz długość basenu</option>
                            <option value='25'>25</option>
                            <option value='50'>50</option>
                        </select>
                    </div>
                    <button className="btn btn-success w-100" type="submit">Zatwierdź</button>
                </form>
            </div>
        </div>
    );
};