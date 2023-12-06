import React from "react";
import { useEffect } from "react";
import ApiURL from "../ApiURL";
import axios from "axios";
import { useParams } from "react-router-dom";

export const Competitor = () => {
    const { pk } = useParams();
    useEffect(() => {
        axios.get(`${ApiURL}/competitors/${pk}`, {
            'Content-Type': 'application/json',
        })
        .then(response => {
            console.log(response);
        })
        axios.get(`${ApiURL}/competitors/${pk}/participations/`, {
            'Content-Type': 'application/json',
        })
        .then(response => {
            console.log(response);
        })
    }, [pk])
    return (
        <div className="zawodnik">
            <div className="div-2">
                <div className="label">
                    <p className="p-e-m-czyzna-data">
                        <span className="text-wrapper">
                            Płeć: Mężczyzna
                            <br />
                            Data urodzenia: 28.02.2001
                            <br />
                            Klub: MTP Kormoran
                            <br />
                            Kategoria: młodzik
                            <br />
                        </span>
                        <span className="span">
                            <br />
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};