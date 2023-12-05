import React, { useState, useEffect } from "react";
//import { Rectangle } from "./Rectangle";
import ApiURL from "../ApiURL";
import axios from "axios";

export const SwimmingFacilities = () => {
    const [swimmingFacilities, setSwimmingFacilities] = useState([]);
    useEffect(() => {
        axios.get(`${ApiURL}/swimming_facilities/`)
        .then(response => {
            console.log(response);
            setSwimmingFacilities(response.data);
        })
    }, []);
    const handleDelete = (id) => {
        axios.delete(`${ApiURL}/swimmingFacilities/${id}/`)
        .then(response => {
            console.log(response);
        })
    }
    return (
        <div className="zawody">
            <h1>Obiekty pływackie</h1>
            <a href="/dodajObiekt"><button>Dodaj obiekt pływacki</button></a>
            <div className="div">
                <ul>
                    {swimmingFacilities.length > 0 ? (
                    swimmingFacilities.map((swimmingFacility) => (
                        <li key={swimmingFacility.id}>
                            <div className="rectangle">
                                <p className="text-wrapper">{swimmingFacility.name}</p>
                                <div className="div">{swimmingFacility.address}</div>
                                <div className="text-wrapper-2">W: {swimmingFacility.city}</div>
                                <a href={`/edytujObiekt/${swimmingFacility.id}`}><button>Edytuj</button></a>
                                <button onClick={() => handleDelete(swimmingFacility.id)}>Usuń</button>
                            </div>
                        </li>
                    ))) : (
                        <h1>Brak zawodów</h1>
                    )}
                </ul>
            </div>
        </div>
    );
};