import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import ApiURL from "../ApiURL";


export const EditCompetiton = () => {
    const { pk } = useParams(); 
    const navigate = useNavigate();
    //const [errMsg, setErrMsg] = useState("");
    const [name, setName] = useState("");
    const [date_start, setDateStart] = useState("");
    const [date_stop, setDateStop] = useState("");
    // const [data, setData] = useState({
    //     name: "",
    //     date_start: "",
    //     date_stop: "",
    //     status: false,
    //     swimming_facility_id: 1,
    //     organiser_id: 1,
    //   });
    useEffect(() => {
        axios.get(`${ApiURL}/competitions/${pk}/`, {
            'Content-Type': 'application/json',
        })
        .then(response => {
            console.log(response);
            setName(response.data.name);
            setDateStart(response.data.date_start);
            setDateStop(response.data.date_stop);
        })
    }, [pk])
    // const handleChange = (e) => {
    //     const value = e.target.value;
    //     setData({
    //         ...data,
    //         [e.target.name]: value
    //     });
    // };
    // useEffect(() => {
    //     if (session === "true") {
    //       navigate("/"); 
    //     }
    // }, [navigate]);
    // const handleLogin = async(e) => {
    //     e.preventDefault();
    //     try {
    //         const Userdata = {
    //             name: data.name,
    //             date_start: data.date_start,
    //             date_stop: data.date_stop,
    //             status: false,
    //             swimming_facility_id: 1,
    //             organiser_id: 1,
    //         }
    //         console.log(Userdata);
    //         const response = await axios.post(`${ApiURL}/competitions/`, Userdata);
    //         // body: JSON.stringify({
    //         //     id_username: email,
    //         //     id_password: password
    //          // }
    //         console.log(response);
    //        if (response.status === 201)
    //         {
    //             sessionStorage.setItem('isLogged', 'true');
    //             //const data = await response.json();
    //             sessionStorage.setItem('Token', data.auth_token);
    //             sessionStorage.setItem('email', data.email);
    //             navigate("/zawody", { replace: true });
    //             alert("Udało się dodać zawody!");
    //             //window.location.reload(false);
    //         }
    //         else
    //         {
    //             setErrMsg('Błędne dane logowania');
    //         }
    //     } catch (err) {
    //         if (!err.response) {
    //             setErrMsg('Brak odpowiedzi od serwera');
    //         } else if (err.response?.status === 400){
    //             setErrMsg('Brak e-maila lub hasła');
    //         } else if (err.response?.status === 401){
    //             setErrMsg('Brak autoryzacji');
    //         } else {
    //             setErrMsg('Logowanie nie powiodło się');
    //         }
    //     }
    // }
    const handleEdit = async(e) => {
        e.preventDefault();
        try {
            const Userdata = {
                name: name,
                date_start: date_start,
                date_stop: date_stop,
                status: false,
                swimming_facility_id: 1,
                organiser_id: 1,
            }
            console.log(Userdata);
            const response = await axios.put(`${ApiURL}/competitions/1/`, Userdata);
            // body: JSON.stringify({
            //     id_username: email,
            //     id_password: password
             // }
            console.log(response);
           if (response.status === 200)
            {
                sessionStorage.setItem('isLogged', 'true');
                //const data = await response.json();
                // sessionStorage.setItem('Token', data.auth_token);
                // sessionStorage.setItem('email', data.email);
                navigate("/zawody", { replace: true });
                alert("Udało się dodać zawody!");
                //window.location.reload(false);
            }
        }
        catch {
            console.log("Hej");
        }
    }
    return (
        <div className="logowanie">
            <p>E</p>
            <div className="group-wrapper">
                <form className="group" onSubmit={handleEdit}>
                    <div>
                        <label className="div">Nazwa</label>
                        <input className="text-field" name="name" value={name} 
                        onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div>
                        <label className="div">Data rozpoczęcia</label>
                        <input className="text-field" type="datetime-local" name="date_start" value={date_start} 
                        onChange={(e) => setDateStart(e.target.value)}/>
                    </div>
                    <div>
                        <label className="div">Data zakończenia</label>
                        <input className="text-field" type="datetime-local" name="date_stop" value={date_stop}
                        onChange={(e) => setDateStop(e.target.value)}/>
                    </div>
                    <button className="primary-button" type="submit">Zatwierdź</button>
                </form>
            </div>
        </div>
    );
};