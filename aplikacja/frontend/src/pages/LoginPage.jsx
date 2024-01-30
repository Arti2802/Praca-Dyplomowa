import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import ApiURL from "../ApiURL";
import toast from "react-hot-toast";
import { InputGroup } from "../components/InputGroup";
import { Loading } from "../components/Loading";


export const LoginPage = () => {
    //const userRef = useRef();
    const navigate = useNavigate();
    //const [errMsg, setErrMsg] = useState("");
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (sessionStorage.getItem('isLogged') === "true") {
          navigate("/"); 
        }
    }, [navigate]);
    const handleChange = (e) => {
        const value = e.target.value;
        setData({
            ...data,
            [e.target.name]: value
        });
    };
    const handleLogin = async(e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const Userdata = {
                username: data.username,
                password: data.password,
            }
            console.log(Userdata);
            const response = await axios.post(`${ApiURL}/login/`, Userdata);
            console.log(response);
           if (response.status === 200) 
            {
                sessionStorage.setItem('isLogged', 'true');
                const data = await response.data;
                console.log(data);
                sessionStorage.setItem('Token', data.auth_token);
                sessionStorage.setItem('id', data.id);
                sessionStorage.setItem('username', Userdata.username);
                const response_type = await axios.get(`${ApiURL}/user_type/${data.id}/`);
                sessionStorage.setItem('usertype', response_type.data.type);
                navigate('/', { replace: true });
                //window.location.reload(false);
            }
            else
            {
                toast.error('Błędne dane logowania');
            }
        } catch (err) {
            if (!err.response) {
                toast.error('Brak odpowiedzi od serwera');
            } else if (err.response?.status === 400){
                toast.error('Błedne dane logowania');
            } else if (err.response?.status === 401){
                toast.error('Brak autoryzacji');
            } else {
                toast.error('Logowanie nie powiodło się');
            }
            console.log(err);
            setLoading(false);
        }
    }
    return (
        <div className="logowanie">
            <main className="group-wrapper">
                <form className="group" onSubmit={handleLogin}>
                    {/* <div className="mb-3">
                        <label htmlFor="email" className="form-label">Nazwa użytkownika lub email</label>
                        <input className="form-control" name="email" onChange={handleChange} value={data.email} ref={userRef}/>
                    </div> */}
                    <InputGroup label={"Nazwa użytkownika"} name={"username"} value={data.username} onChange={handleChange}/>
                    <InputGroup label={"Hasło"} type={"password"} name={"password"} value={data.password} onChange={handleChange}/> 
                    <div className="mb-3">
                    <button className="btn btn-primary w-100" type="submit">{loading ? <Loading color={'#fff'} size={'24px'}/> : 'Zaloguj się'}</button>
                    </div>
                    <div className="text-center"><a href="/rejestracja">Nie masz konta? Zarejestruj się</a></div>
                </form>
            </main>
        </div>
    );
};