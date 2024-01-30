import React, { useState, useEffect } from "react";
import ApiURL from "../ApiURL";
import axios from "axios";
import { useParams } from "react-router-dom";

export const SetSeriesAndTracks = () => {
    const { pk } = useParams();
    const [competitors, setCompetitors] = useState([]);
    useEffect(() => {
        axios.get(`${ApiURL}/competition_types/${pk}/participations/`)
        .then(response => {
            console.log(response);
            setCompetitors(response.data);
        })
    }, [pk]);
    return (
        <div className="zawody">
            <h1>Moje zawody</h1>
            <div className="div">
                <ul>
                    {competitors.length > 0 ? (
                    competitors.map((competitor) => (
                        <li key={competitor.id}>
                            <form>
                                <label>Seria</label>
                                <input type="number"/>
                                <label>Tor</label>
                                <input type="number"/>
                            </form>
                        </li>
                    ))) : (
                        <h1>Jeszcze nikt się nie zgłosił</h1>
                    )}
                </ul>
            </div>
        </div>
    );
}