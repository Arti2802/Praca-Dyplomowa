import React, { useState, useEffect } from "react";
import ApiURL from "../ApiURL";
import axios from "axios";
// import { Result } from "../components/Result";
import { useNavigate, useParams } from "react-router-dom";
import InputMask from "react-input-mask";
import toast from "react-hot-toast";
import { Loading } from "../components/Loading";


export const EnterResults = () => {
    const { pk } = useParams();
    const navigate = useNavigate();
    const [competitionType, setCompetitionType] = useState({});
    const [participations, setParticipations] = useState([]);
    const [loading, setLoading] = useState(true);
    //const [loading2, setLoading2] = useState(true);
    useEffect(() => {
        axios.get(`${ApiURL}/competition_types/${pk}/`)
        .then(response => {
            console.log(response);
            setCompetitionType(response.data);
            setLoading(false);
        })
        axios.get(`${ApiURL}/competition_types/${pk}/participations/`)
        .then(response => {
            console.log(response);
            setParticipations(response.data);
            //setLoading2(false);
        })
    }, [pk])
    const setResult = (e, index) => {
        const newParticipations = [...participations];
        participations[index].result = e.target.value;
        setParticipations(newParticipations);
    }
    const setDisqualification = (e, index) => {
        console.log(e.target.checked);
        const newParticipations = [...participations];
        participations[index].disqualification = e.target.checked;
        setParticipations(newParticipations);
    }
    const handleResults = () => {
        for (let i=0; i<participations.length; i++) {
            const data = {
                result: participations[i].disqualification ? null : participations[i].result,
                disqualification: participations[i].disqualification
            }
            console.log(data);
            axios.put(`${ApiURL}/participations/${participations[i].id}/`, data)
            .then(response => {
                console.log(response);
                axios.put(`${ApiURL}/put_places/${pk}/`)
            })
            .catch(err => {
                if (err.response.status === 400) {
                    toast.error(`Błędny czas dla zawodnika ${participations.competitor_id.first_name} ${participations.competitor_id.last_name}`);
                }
            })
        }
        // axios.put(`${ApiURL}/put_places/${pk}/`)
        // .then(response => {
        //     navigate(`/zawody/${competitionType.competition_id.id}`);
        //     toast.success('Udało się wprowadzić wyniki!');
        // })
        // .catch(err => {
        //     if (err.response.status === 500) {
        //         toast.error(`Błąd serwera`);
        //     }
        // })
        navigate(`/zawody/${competitionType.competition_id.id}`);
        toast.success('Udało się wprowadzić wyniki!');
    
        // Promise.all(updateResultsPromises)
        //     .then(() => {
        //         // Jeśli wszystkie zapytania do aktualizacji wyników zakończą się sukcesem,
        //         // wykonaj zapytanie do endpointu `axios.put(`${ApiURL}/put_places/${pk}/`);`
        //         return axios.put(`${ApiURL}/put_places/${pk}/`);
        //     })
        //     .then(() => {
        //         navigate(`/zawody/${competitionType.competition_id.id}`);
        //         toast.success('Udało się wprowadzić wyniki!');
        //     })
        //     .catch(err => {
        //         if (err.response.status === 500) {
        //             toast.error(`Błąd serwera`);
        //         }
        //     });
    }
    return (
        <div className="zawodnik">
            {loading ? <Loading/> : <h1> {competitionType.length} m styl {competitionType.style} {competitionType.gender ? 'mężczyzn' : 'kobiet'} </h1>}
                <form onSubmit={handleResults}>
                    <ul>
                        {participations.length > 0 ? (
                        participations.map((participation, index) => (
                            <li key={participation.id}>
                                <p>{participation.competitor_id.first_name} {participation.competitor_id.last_name}</p>
                                <InputMask mask="99:99:99.99" name="result" pattern="[0-1]{1}[0-9]{1}:[0-5]{1}[0-9]{1}:[0-5]{1}[0-9]{1}.[0-9]{2}" value={participation.result || "00:__:__.__"} disabled={participation.disqualification} onChange={(e) => setResult(e, index)}/>
                                <label>Dyskwalifikacja</label>
                                <input type="checkbox" name="disqualification" value={participation.disqualification} checked={participation.disqualification} onChange={(e) => setDisqualification(e, index)}/>
                            </li>
                        ))) : (
                        <h1>Brak wyników</h1>
                        )}
                    </ul>
                    <button className="btn btn-success" type="submit">Zatwierdź</button>
                </form>
        </div>
    );
};