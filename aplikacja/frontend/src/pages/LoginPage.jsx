import React from "react";
import "./style.css";
import axios from 'axios';


export const LoginPage = () => {
    const userRef = useRef();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errMsg, setErrMsg] = useState("");
    // useEffect(() => {
    //     if (session === "true") {
    //       navigate("/"); 
    //     }
    // }, [navigate]);
    const handleLogin = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${ApiURL}/auth/token/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
            })
           if (response.ok)
            {
                sessionStorage.setItem('isLogged', 'true');
                const data = await response.json();
                sessionStorage.setItem('Token', data.auth_token);
                sessionStorage.setItem('email', email);
                navigate("/test", { replace: true });
                window.location.reload(false);
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
            <div className="group-wrapper">
                <form className="group">
                    <button className="primary-button" type="submit">Zaloguj się</button>
                    <div className="input">
                        <label className="div">Hasło</label>
                        <input className="text-field" type="password"/>
                    </div>
                    <div className="input-2">
                        <label className="div">Nazwa użytkownika lub hasło</label>
                        <input className="text-field" />
                    </div>
                </form>
            </div>
        </div>
    );
};