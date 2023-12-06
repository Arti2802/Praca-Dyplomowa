import React, { useState, useEffect } from "react";
import ApiURL from "../ApiURL";
import axios from "axios";
import { CompetitionTypeElement } from "../components/CompetitionTypeElement";
import { useParams } from "react-router-dom";


export const RegisterCompetitors = () => {
    // const navigate = useNavigate();
    const { pk } = useParams();
    const [competitors, setCompetitors] = useState([]);
    const [competitionTypes, setCompetitionTypes] = useState([]);
    const [isTrigerred, setIsTrigerred] = useState(1);
    const [competitorsList, setCompetitorsList] = useState([]);
    const handleChildData = (childData) => {
        setCompetitorsList([...competitorsList, childData]);
        console.log(childData);
    };
    useEffect(() => {
        axios.get(`${ApiURL}/clubs/2/competitors/`)
        .then(response => {
            console.log(response);
            setCompetitors(response.data);
        })
        axios.get(`${ApiURL}/competitions/${pk}/competition_types/`)
        .then(response => {
            console.log(response);
            setCompetitionTypes(response.data);
        })
    }, [pk])
    return (
        <div className="zawodnik">
            <ul>
                {competitionTypes.length > 0 ? (
                competitionTypes.map((competitionType) => (
                    <CompetitionTypeElement key={competitionType.id} competitionType={competitionType} competitors={competitors} onDataGet={handleChildData} gotChanged={isTrigerred} set={setIsTrigerred}/>
                ))) : (
                <h1>Brak konkurencji</h1>
                )}
            </ul>
        </div>
    );
};