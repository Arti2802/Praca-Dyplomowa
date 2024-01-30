import React, { useState, useEffect } from "react";
import ApiURL from "../ApiURL";
import axios from "axios";
import { CompetitionDetail } from "../components/CompetitionDetail";
import toast from "react-hot-toast";
import { Loading } from "../components/Loading";

export const Competitions = () => {
    const [competitions, setCompetitions] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        axios.get(`${ApiURL}/competitions/?status=zaakceptowane`)
        .then(response => {
            console.log(response);
            setCompetitions(response.data);
            setLoading(false);
        })
        .catch(err => {
            if (!err.response) {
                toast.error(`Brak połączenia z serwerem`);
            }
        })
    }, []);
    return (
        <div className="zawody">
            <h1>Zawody</h1>
            <div className="div grid gap-0 row-gap-3">
                <ul>
                    {loading ? (
                        <Loading/>
                    ) : (
                        competitions.length > 0 ? (
                        competitions.map((competition) => (
                            <li key={competition.id} className="col-8">
                                <CompetitionDetail competition={competition} link={true}>
                                </CompetitionDetail>
                            </li>
                        ))) : (
                            <h1>Brak zawodów</h1>
                        )
                    )}
                </ul>
            </div>
        </div>
    );
};