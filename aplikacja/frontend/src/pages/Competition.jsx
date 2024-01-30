import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ApiURL from "../ApiURL";
import axios from "axios";
import { RegisterButton } from "../components/RegisterButton";
import { UserTypeComponent } from "../components/UserTypeComponent";
import { CompetitionTypeDetail } from "../components/CompetitionTypeDetail";
import { PersonalElement } from "../components/PersonalElement";
import { EditButton } from "../components/EditButton";
import { CompetitionDetail } from "../components/CompetitionDetail";
import toast from "react-hot-toast";
import { Loading } from "../components/Loading";
//import { format } from "date-fns";

export const Competition = () => {
    const { pk } = useParams();
    const [competition, setCompetition] = useState({});
    const [competitionTypes, setCompetitionTypes] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [loading2, setLoading2] = useState(true);
    useEffect(() => {
        axios.get(`${ApiURL}/competitions/${pk}/`)
        .then(response => {
            console.log(response);
            setCompetition(response.data);
            setLoading(false);
        })
        .catch(err => {
            if (err.response.status === 404) {
                navigate('/');
                toast.error('Te zawody nie istnieją lub zostały usunięte!');
            }
        })
    }, [pk, navigate])
    console.log(competition);
    useEffect(() => {
        axios.get(`${ApiURL}/competitions/${pk}/competition_types/`)
        .then(response => {
            console.log(response);
            setCompetitionTypes(response.data);
            setLoading2(false);
        })
    }, [pk])
    //const today = format(new Date(), 'yyyy-MM-ddTHH:mm:ss');
    return (
        <div className="col-10 rectangle">
            {loading ? <Loading/> : 
            <CompetitionDetail competition={competition}></CompetitionDetail>}
            <div className="row row-cols-auto">
                <h2 className="col">Dostępne konkurencje:</h2>
                <div className="col align-self-center">
                    <PersonalElement id={competition.organiser_id}><EditButton link={`${pk}/zmienKonkurencje`}/></PersonalElement>
                </div>
            </div>
                {loading2 ? (
                    <Loading/>
                ) : (
                    <ul>
                    {competitionTypes.length > 0 ? (
                        competitionTypes.map((competitionType) => (
                            <li key={competitionType.id} className="row row-cols-auto">
                                <div className="col-3">
                                    <CompetitionTypeDetail competitionType={competitionType} link={false}/>
                                </div>
                                <div className="col-8 align-self-start">
                                    <PersonalElement id={competition.organiser_id}><UserTypeComponent number='3'><RegisterButton link="/wprowadzWyniki" id={competitionType.id} name="Wprowadź wyniki"/></UserTypeComponent></PersonalElement>
                                    <PersonalElement id={competition.organiser_id}><UserTypeComponent number='3'><RegisterButton link="/ustawSerieOrazTory" id={competitionType.id} name="Ustaw serie oraz tory"/></UserTypeComponent></PersonalElement>
                                    <RegisterButton link={`${pk}/listaStartowa`} id={competitionType.id} name="Lista zawodników"/>
                                    {/* {today > competition.date_start ?  */}
                                    <RegisterButton link={`${pk}/wyniki`} id={competitionType.id} name="Wyniki"/> 
                                     {/* : null}  */}
                                </div>
                            </li>
                    
                        ))) : (
                            <h1>Brak konkurencji</h1>
                        )}
                    </ul>
                )}
        </div>
    )
}