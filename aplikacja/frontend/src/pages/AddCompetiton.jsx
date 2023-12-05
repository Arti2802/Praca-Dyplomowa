import React from "react";
import "./style.css";
import { useState,useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import ApiURL from "../ApiURL";


export const AddCompetiton = () => {
    const userRef = useRef();
    const navigate = useNavigate();
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [data, setData] = useState({
        style: "",
        length: "",
        competition_id: 0
      });
    
    const handleChange = (e) => {
        const value = e.target.value;
        setData({
            ...data,
            [e.target.name]: value
        });
    };
    // useEffect(() => {
    //     if (session === "true") {
    //       navigate("/"); 
    //     }
    // }, [navigate]);
    const handleLogin = async(e) => {
        e.preventDefault();
        try {
            const Userdata = {
                username: data.email,
                password: data.password,
            }
            console.log(Userdata);
            const response = await axios.post(`${ApiURL}/authtoken/token/login`, Userdata);
            // body: JSON.stringify({
            //     id_username: email,
            //     id_password: password
             // }
            console.log(response);
           if (response.status === 200)
            {
                sessionStorage.setItem('isLogged', 'true');
                //const data = await response.json();
                sessionStorage.setItem('Token', data.auth_token);
                sessionStorage.setItem('email', data.email);
                navigate("/test", { replace: true });
                //window.location.reload(false);
            }
            else
            {
                setErrMsg('Błędne dane logowania');
            }
        } catch (err) {
            if (!err.response) {
                setErrMsg('Brak odpowiedzi od serwera');
            } else if (err.response?.status === 400){
                setErrMsg('Brak e-maila lub hasła');
            } else if (err.response?.status === 401){
                setErrMsg('Brak autoryzacji');
            } else {
                setErrMsg('Logowanie nie powiodło się');
            }
        }
    }
    return (
        <div className="logowanie">
            <p>{errMsg}</p>
            <div className="group-wrapper">
                <form className="group" onSubmit={handleLogin}>
                    <div className="input-2">
                        <label className="div">Nazwa użytkownika lub hasło</label>
                        <input className="text-field" name="email" onChange={handleChange} value={data.email} ref={userRef}/>
                    </div>
                    <div className="input">
                        <label className="div">Hasło</label>
                        <input className="text-field" type="password" name="password" value={data.password} onChange={handleChange}/>
                    </div>
                    <button className="primary-button" type="submit">Zaloguj się</button>
                </form>
            </div>
        </div>
    );
};