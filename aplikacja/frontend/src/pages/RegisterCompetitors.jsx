import React, { useState, useEffect } from "react";
import ApiURL from "../ApiURL";
import axios from "axios";
import { CompetitionTypeElement } from "../components/CompetitionTypeElement";
import { useParams, useNavigate } from "react-router-dom";
import { Loading } from "../components/Loading";


export const RegisterCompetitors = () => {
    const navigate = useNavigate();
    const { pk } = useParams();
    const [competitors, setCompetitors] = useState([]);
    const [competitionTypes, setCompetitionTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isTrigerred, setIsTrigerred] = useState(1);
    const [results, setResults] = useState(0);
    const [competitorsList, setCompetitorsList] = useState([]);
    const handleChildData = (childData) => {
        setCompetitorsList([...competitorsList, childData]);
        console.log(childData);
    };
    const regCompetitors = () => {
        setIsTrigerred((prev) => prev + 1);
    }
    useEffect(() => {
        if (isTrigerred > 1) {
            navigate(`/zawody/${pk}`);
        }
    }, [pk, navigate, isTrigerred]);
    useEffect(() => {
        axios.get(`${ApiURL}/clubs/${sessionStorage.getItem('id')}/competitors/`)
        .then(response => {
            console.log(response);
            setCompetitors(response.data);
        })
        axios.get(`${ApiURL}/competitions/${pk}/competition_types/`)
        .then(response => {
            console.log(response);
            setCompetitionTypes(response.data);
            setLoading(false);
        })
    }, [pk, isTrigerred])
    return (
        <div className="zawodnik container">
            <div className="row row-cols-4 mb-5">
                {loading ? <Loading/> : (
                    competitionTypes.length > 0 ? (
                    competitionTypes.map((competitionType) => (
                        <CompetitionTypeElement key={competitionType.id} competitionType={competitionType} competitors={competitors} onDataGet={handleChildData} gotChanged={isTrigerred} set={setIsTrigerred} results={results} setResults={setResults}/>
                    ))) : (
                    <h1>Brak konkurencji</h1>
                    )
                )}
            </div>
            <button type="button" className="btn btn-success btn-lg position-absolute start-50" onClick={regCompetitors}>Zatwierdź</button>
        </div>
    );
};