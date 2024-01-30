import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import ApiURL from "../ApiURL";
import toast from "react-hot-toast";
import { InputGroup } from "../components/InputGroup";
import { Loading } from "../components/Loading";


export const EditSwimmingFacility = () => {
    const { pk } = useParams(); 
    const navigate = useNavigate();
    //const [errMsg, setErrMsg] = useState("");
    const [swimmingFacility, setSwimmingFacility] = useState({});
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        axios.get(`${ApiURL}/swimming_facilities/${pk}/`)
        .then(response => {
            console.log(response);
            setSwimmingFacility(response.data);
            setLoading(false);
        })
    }, [pk])
    const handleChange = (e) => {
        const value = e.target.value;
        console.log(typeof(value));
        console.log(typeof(swimmingFacility.pool_length))
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
                toast.success("Udało się edytować obiekt!");
                navigate("/obiektyPlywackie");
                //window.location.reload(false);
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    return (
        <div className="logowanie">
            {loading ? <Loading/> : (
                <div className="group-wrapper">
                    <h1 style={{position: 'absolute', top: '270px', left: '610px'}}>Edytuj obiekt pływacki</h1>
                    <form className="group" onSubmit={handleEdit}>
                        <InputGroup label={"Nazwa obiektu"} name={"name"} value={swimmingFacility.name} onChange={handleChange}/>
                        <InputGroup label={"Adres"} name={"address"} value={swimmingFacility.address} onChange={handleChange}/>
                        <InputGroup label={"Miasto"} name={"city"} value={swimmingFacility.city} onChange={handleChange}/>
                        <div className="mt-3 mb-4">
                            <label htmlFor="pool_length">Długość basenu</label>
                            <select className="form-select border border-primary" name="pool_length" onChange={handleChange} defaultValue={swimmingFacility.pool_length + ''}>
                                <option value={0} disabled>Wybierz długość basenu</option>
                                <option value={25}>25</option>
                                <option value={50}>50</option>
                            </select>
                        </div>
                        <button className="btn btn-success w-100" type="submit">Zatwierdź</button>
                    </form>
                </div>
            )}
        </div>
    );
};