import React, { useState, useEffect } from "react";
import axios from "axios";
import ApiURL from "../ApiURL";
import { CompetitorElement } from "../components/CompetitorElement";
import toast from "react-hot-toast";
import { Loading } from "../components/Loading";

export const Competitors = () => {
    const [competitors, setCompetitors] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        axios.get(`${ApiURL}/competitors/`, {
                'Content-Type': 'application/json',
        })
        .then(response => {
            console.log(response);
            setCompetitors(response.data);
            setLoading(false);
        })
        .catch(err => {
            if (!err.response) {
                toast.error(`Brak połączenia z serwerem`);
            }
        })
    }, [])
    return (
        <div className="zawodnicy">
            <h1>Zawodnicy</h1>
            <ul>
                {loading ? (
                    <Loading/>
                ) : (
                    competitors.length > 0 ? (
                        competitors.map((competitor) => (
                            <li key={competitor.id}>
                                <CompetitorElement competitor={competitor}/>
                            </li>
                        ))) : (
                            <h1>Brak zawodników</h1>
                    )
                )}
            </ul>
        </div>
    );
};