import React from "react";
import { useEffect } from "react";
import ApiURL from "../ApiURL";
import axios from "axios";
import toast from "react-hot-toast";


export const Home = () => {
    useEffect(() => {
        axios.get(`${ApiURL}/competitions/1/`)
        .then(response => {
            console.log(response);
        })
        .catch(err => {
            if (!err.response) {
                toast.error(`Brak połączenia z serwerem`);
            }
        })
    }, [])
    return (
        <div className="logowanie">
            <h1>Witamy!</h1>
        </div>
    );
};