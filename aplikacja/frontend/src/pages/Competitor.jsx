import React, { useEffect, useState } from "react";
import ApiURL from "../ApiURL";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { Loading } from "../components/Loading";

export const Competitor = () => {
    const navigate = useNavigate();
    const { pk } = useParams();
    const [competitor, setCompetitor] = useState({});
    const [participations, setParticipations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loading2, setLoading2] = useState(true);
    useEffect(() => {
        axios.get(`${ApiURL}/competitors/${pk}`)
        .then(response => {
            console.log(response);
            setCompetitor(response.data);
            setLoading(false);
        })
        .catch(err => {
            if (err.response.status === 404) {
                navigate('/');
                toast.error('Ten zawodnik nie istnieje lub został usunięty!');
            }
        })
        axios.get(`${ApiURL}/competitors/${pk}/participations/`)
        .then(response => {
            console.log(response);
            setParticipations(response.data);
            setLoading2(false);
        })
    }, [pk, navigate])
    const changeDate = (date) => {
        return date && (date.substring(8, 10) + '-' + date.substring(5, 7) + '-' + date.substring(0, 4));
    }
    return (
        <div className="zawodnik">
            <div className="div-2">
                {loading ? <Loading/> : (
                    <div className="label">
                        <h1>{competitor.first_name} {competitor.last_name}</h1>
                        <p className="p-e-m-czyzna-data">
                            <span className="text-wrapper">
                                Płeć: {competitor.gender ? 'Mężczyzna' : 'Kobieta'}
                                <br />
                                Data urodzenia: {changeDate(competitor.date_of_birth)}
                                <br />
                                Klub: {competitor.club_id && competitor.club_id.username}
                                <br />
                                {/* Kategoria: młodzik
                                <br /> */}
                            </span>
                            <span className="span">
                                <br />
                            </span>
                        </p>
                    </div>
                )}
                <h2>Wyniki</h2>
                <table className="text-center table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Miejsce</th>
                            <th>Czas</th>
                            <th>Długość</th>
                            <th>Styl</th>
                            <th>Zawody</th>
                            <th>Data</th>
                         </tr>
                    </thead>
                    <tbody>
                        {loading2 ? <Loading/> : (
                            participations.length > 0 ? (
                                participations.map((participation) => (
                                    <tr key={participation.id}>
                                        {participation.disqualification ? (
                                            <td colSpan={2}>Dyskwalifikacja</td>
                                        ) : (
                                            <>
                                                <td>{participation.place}</td>
                                                <td>{participation.result.substring(0, 11)}</td>
                                            </>
                                        )}
                                        <td>{participation.competition_type_id.length}</td>
                                        <td>{participation.competition_type_id.style}</td>
                                        <td>{participation.competition_type_id.competition_id.name}</td>
                                        <td>{changeDate(participation.competition_type_id.competition_id.date_start)}</td>
                                    </tr>
                                ))) : (
                                    <tr>
                                        <td colSpan={6}><h3>Zawodnik nie startował jeszcze w żadnych zawodach</h3></td>
                                    </tr>
                                )
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};