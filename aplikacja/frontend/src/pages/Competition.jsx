import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ApiURL from "../ApiURL";
import axios from "axios";
import { RegisterButton } from "../components/RegisterButton";
import { UserTypeComponent } from "../components/UserTypeComponent";
import { CompetitionTypeDetail } from "../components/CompetitionTypeDetail";
import { PersonalElement } from "../components/PersonalElement";
import { EditButton } from "../components/EditButton";

export const Competition = () => {
    const { pk } = useParams();
    const [competition, setCompetition] = useState({});
    const [competitionTypes, setCompetitionTypes] = useState([]);
    useEffect(() => {
        axios.get(`${ApiURL}/competitions/${pk}/`)
        .then(response => {
            console.log(response);
            setCompetition(response.data);
        })
    }, [pk])
    console.log(competition);
    useEffect(() => {
        axios.get(`${ApiURL}/competitions/${pk}/competition_types/`)
        .then(response => {
            console.log(response);
            setCompetitionTypes(response.data);
        })
    }, [pk])
    return (
        <div className="col-12 rectangle">
            <p className="text-wrapper">{competition.date_start} - {competition.date_stop}</p>
            <div className="div">{competition.name}</div>
            {/* <div className="text-wrapper-2">Status: {competition.status}</div> */}
            <div className="text-wrapper-3">{competition.swimming_facility_id ? competition.swimming_facility_id.name + ' ' + competition.swimming_facility_id.city : null}</div>
            <div className="row row-cols-auto">
                <h2 className="col">Dostępne konkurencje:</h2>
                <div className="col align-self-center">
                    <PersonalElement id={competition.organiser_id}><EditButton link={`${pk}/zmienKonkurencje`}/></PersonalElement>
                </div>
            </div>
            <ul>
                {competitionTypes.length > 0 ? (
                    competitionTypes.map((competitionType) => (
                        <li key={competitionType.id} className="row row-cols-auto">
                            <div className="col-3">
                                <CompetitionTypeDetail competitionType={competitionType}/>
                            </div>
                            <div className="col-8 align-self-start">
                                <PersonalElement id={competition.organiser_id}><UserTypeComponent number='3'><RegisterButton link="/wprowadzWyniki" id={competitionType.id} name="Wprowadź wyniki"/></UserTypeComponent></PersonalElement>
                                <PersonalElement id={competition.organiser_id}><UserTypeComponent number='3'><RegisterButton link="/ustawSerieOrazTory" id={competitionType.id} name="Ustaw serie oraz tory"/></UserTypeComponent></PersonalElement>
                                <RegisterButton link={`${pk}/listaStartowa`} id={competitionType.id} name="Lista zawodników"/>
                                <RegisterButton link={`${pk}/wyniki`} id={competitionType.id} name="Wyniki"/>
                            </div> 
                        </li>
                    ))) : (
                        <h1>Brak konkurencji</h1>
                    )}
            </ul>
            {console.log(competition.organiser_id)}
            {console.log(sessionStorage.getItem('id'))}
        </div>
    )
}