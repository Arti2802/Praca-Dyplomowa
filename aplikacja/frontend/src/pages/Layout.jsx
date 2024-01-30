import React from "react";
// import { useEffect } from "react";
// import ApiURL from "../ApiURL";
// import axios from "axios";
import { Outlet } from "react-router-dom";
import { UserTypeComponent } from "../components/UserTypeComponent";
import { NavItem } from "../components/NavItem";
import { LogOutButton } from "../components/LogOutButton";
import { UserInfo } from "../components/UserInfo";

export const Layout = () => {
    return(
        <>
            <nav className="navbar navbar-expand-sm navbar-dark justify-content-center my-color">
                <ul className="navbar-nav">
                    <NavItem link={'/'} label={'Strona główna'}/>
                    <NavItem link={'/zawody'} label={'Zawody'}/>
                    <NavItem link={'/zawodnicy'} label={'Zawodnicy'}/>
                    <NavItem link={'/kluby'} label={'Kluby'}/>
                    {sessionStorage.getItem('isLogged') === 'true' ?
                    <>
                        <UserInfo/>
                        <LogOutButton/>
                    </>
                    :
                    <>
                        <li className="nav-item mx-1">
                            <button style={{backgroundColor: "#4082D6", border: '1px solid white'}}><a className="nav-link" href='/logowanie'>Zaloguj się</a></button>
                        </li>
                        <li className="nav-item">
                            <button style={{backgroundColor: "#4082D6", border: '1px solid white'}}><a className="nav-link" href='/rejestracja'>Zarejestruj się</a></button>
                        </li>
                        {/* <NavItem link={'/logowanie'} label={'Zaloguj się'}/>
                        <NavItem link={'/rejestracja'} label={'Zarejestruj się'}/> */}
                    </>}
                </ul>
            </nav>
            <nav className="navbar navbar-expand-sm navbar-dark justify-content-center my-color2">
                <ul className="navbar-nav">
                    <UserTypeComponent number='1'><NavItem link={'/zgloszenia'} label={'Zgłoszenia'}/></UserTypeComponent>
                    <UserTypeComponent number='1'><NavItem link={'/obiektyPlywackie'} label={'Obiekty pływackie'}/></UserTypeComponent>
                    <UserTypeComponent number='2'><NavItem link={`/kluby/${sessionStorage.getItem('id')}/`} label={'Mój klub'}/></UserTypeComponent>
                    <UserTypeComponent number='3'><NavItem link={'/mojeZawody'} label={'Moje zawody'}/></UserTypeComponent>
                    <UserTypeComponent number='4'><NavItem link={`/zawodnicy/${sessionStorage.getItem('id')}/`} label={'Moje wyniki'}/></UserTypeComponent>
                </ul>
            </nav>
            <div className="container justify-content-md-center pt-3">
                <Outlet/>
            </div>
        </>
    )
}