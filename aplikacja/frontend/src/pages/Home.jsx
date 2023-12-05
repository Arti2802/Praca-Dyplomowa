import React from "react";
import { useEffect } from "react";
import ApiURL from "../ApiURL";
import axios from "axios";
// import { UserTypeComponent } from "../components/UserTypeComponent";


export const Home = () => {
    useEffect(() => {
        axios.get(`${ApiURL}/competitions/1/`)
        .then(response => {
            console.log(response);
        })
    }, [])
    return (
        <div className="logowanie">
            <h1>Witamy!</h1>
        </div>
    );
};