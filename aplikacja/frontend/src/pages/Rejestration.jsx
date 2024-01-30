import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import ApiURL from "../ApiURL";
import toast from "react-hot-toast";
import { InputGroup } from "../components/InputGroup";
import { Loading } from "../components/Loading";


export const Rejestration = () => {
    const navigate = useNavigate();
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
    const handleReg = async(e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const Userdata = {
                username: data.username,
                email: data.email,
                password: data.password,
            }
            const type = data.usertype;
            console.log(Userdata);
            const response = await axios.post(`${ApiURL}/${type}/`, Userdata);
            console.log(response);
           if (response.status === 201) 
            {
                const data = await response.data;
                console.log(data);
                toast.success(
                    'Udało się zarejestrować! Teraz możesz się zalogować!',
                    {
                        duration: 5000,
                    }
                )
                navigate('/logowanie', { replace: true });
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
                toast.error('Brak e-maila lub hasła');
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
    <div className="rejestracja">
        <div className="div">
            <form className="overlap-group" onSubmit={handleReg}>
                <div className="group">
                    <InputGroup label={"Nazwa użytkownika"} name={"username"} value={data.username} onChange={handleChange}/>
                    <InputGroup label={"Email"} name={"email"} type={"email"} value={data.email} onChange={handleChange}/>
                    <InputGroup label={"Hasło"} name={"password"} type={"password"} value={data.password} onChange={handleChange}/>
                    <div className="mb-3">Jestem</div>
                    <div className="mb-3">
                        <div className="form-check">
                            <input className="form-check-input border border-primary" type="radio" name="usertype" value="clubs" onChange={handleChange}/>
                            <div>Klubem</div>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input border border-primary" type="radio" name="usertype" value="organisers" onChange={handleChange}/>
                            <div >Organizatorem</div>
                        </div>
                    </div>
                    <div><button className="btn btn-primary w-100 mb-3">{loading ? <Loading color={'#fff'} size={'24px'}/> : 'Zarejestruj się'}</button></div>
                    <div className="text-center"><a href="/logowanie">Masz już konto? Zaloguj się</a></div>
                </div>
            </form>
        </div>
    </div>
);
};