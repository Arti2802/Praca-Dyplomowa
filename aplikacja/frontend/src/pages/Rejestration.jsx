import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import ApiURL from "../ApiURL";


export const Rejestration = () => {
    const navigate = useNavigate();
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [data, setData] = useState({});
    //const [members, setMembers] = useState([]);
    
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
    const handleReg = async(e) => {
        e.preventDefault();
        try {
            const Userdata = {
                username: data.username,
                email: data.email,
                password: data.password,
            }
            const type = data.usertype;
            console.log(Userdata);
            const response = await axios.post(`${ApiURL}/${type}/`, Userdata);
            // body: JSON.stringify({
            //     id_username: email,
            //     id_password: password
            // })
            console.log(response);
           if (response.status === 201) 
            {
                const data = await response.data;
                console.log(data);
                alert('Udało się zarejestrować! Teraz możesz się zalogować!')
                navigate('/logowanie', { replace: true });
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
            console.log(err);
        }
    }
return (
    <div className="rejestracja">
        {errMsg}
        <div className="div">
            <form className="overlap-group" onSubmit={handleReg}>
                <div className="group">
                    <div className="input">
                        <label htmlFor="username">Nazwa użytkownika</label>
                        <input className="email" type="text" name="username" value={data.username} onChange={handleChange}/>
                        <div className="text-field" />
                    </div>
                    <div className="input-2">
                        <label htmlFor="email">Email</label>
                        <input className="email" type="email" name="email" value={data.email} onChange={handleChange}/>
                        <div className="text-field" />
                    </div>
                    <div className="input-3">
                        <label htmlFor="password">Hasło</label>
                        <input className="email" type="password" name="password" value={data.password} onChange={handleChange}/>
                        <div className="text-field" />
                    </div>
                    <button className="primary-button">
                        <div className="text-wrapper-2">Zarejestruj się</div>
                    </button>
                    <div className="text-wrapper-3">Jestem</div>
                </div>
                <div className="radio-with-label">
                    <input className="radio" type="radio" name="usertype" value="clubs" onChange={handleChange}/>
                    <div className="text-wrapper-4">Klubem</div>
                </div>
                <div className="radio-with-label-2">
                    <input className="radio-2" type="radio" name="usertype" value="organisers" onChange={handleChange}/>
                    <div className="text-wrapper-4">Organizatorem</div>
                </div>
            </form>
            <a href="/logowanie" className="p">Masz już konto? Zaloguj się</a>
        </div>
    </div>
);
};