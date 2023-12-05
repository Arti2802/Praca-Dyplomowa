import React from "react";
// import { useEffect } from "react";
// import ApiURL from "../ApiURL";
// import axios from "axios";
import { Outlet } from "react-router-dom";
import { UserTypeComponent } from "../components/UserTypeComponent";

export const Layout = () => {
    return(
        <>
            <div className="logowanie">
                <a href="/">Strona główna</a>
                <a href="/zawody">Zawody</a>
                <a href="/zawodnicy">Zawodnicy</a>
                <a href="/kluby">Kluby</a>
            </div>
            <div className="usernavbar">
                <UserTypeComponent number='1' children={<a href="/zgloszenia">Zgłoszenia</a>}/>
                <UserTypeComponent number='1' children={<a href="/obiektyPlywackie">Obiekty pływackie</a>}/>
                <UserTypeComponent number='3' children={<a href="/mojeZawody">Moje zawody</a>}/>
            </div>
            <Outlet/>
        </>
    )
}