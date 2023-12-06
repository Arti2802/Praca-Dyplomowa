import React from "react";
// import { useEffect } from "react";
// import ApiURL from "../ApiURL";
// import axios from "axios";
import { Outlet } from "react-router-dom";
import { UserTypeComponent } from "../components/UserTypeComponent";
import { NavItem } from "../components/NavItem";

export const Layout = () => {
    return(
        <>
            <nav className="navbar navbar-expand-sm bg-light justify-content-center">
                <ul className="navbar-nav">
                    <NavItem link={'/'} label={'Strona główna'}/>
                    <NavItem link={'/zawody'} label={'Zawody'}/>
                    <NavItem link={'/zawodnicy'} label={'Zawodnicy'}/>
                    <NavItem link={'/kluby'} label={'Kluby'}/>
                    {sessionStorage.getItem('isLogged') === 'true' ?
                    <li className="nav-item">
                        <button onClick={() => {sessionStorage.setItem('isLogged', 'false'); sessionStorage.setItem('usertype', '0');}}><a className="nav-link" href='/logowanie'>Wyloguj się</a></button>
                    </li>
                    :
                    <NavItem link={'/logowanie'} label={'Zaloguj się'}/>}
                </ul>
            </nav>
            <nav className="navbar navbar-expand-sm bg-light justify-content-center">
                <ul className="navbar-nav">
                    <UserTypeComponent number='1' children={<NavItem link={'/zgloszenia'} label={'Zgłoszenia'}/>}/>
                    <UserTypeComponent number='1' children={<NavItem link={'/obiektyPlywackie'} label={'Obiekty pływackie'}/>}/>
                    <UserTypeComponent number='3' children={<NavItem link={'/mojeZawody'} label={'Moje zawody'}/>}/>
                </ul>
            </nav>
            <Outlet/>
        </>
    )
}