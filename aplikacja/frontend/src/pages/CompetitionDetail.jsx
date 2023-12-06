import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ApiURL from "../ApiURL";
import axios from "axios";
import { RegisterButton } from "../components/RegisterButton";
import { UserTypeComponent } from "../components/UserTypeComponent";

export const CompetitionDetail = () => {
    const { pk } = useParams();
    const [competition, setCompetition] = useState([]);
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
    const handleDownload = (link, competition_type, desc) => {
        const filename = `${desc}_${competition_type.length}_m_styl_${competition_type.style}_${competition.name}.pdf`
        axios({
            url: `${ApiURL}/${link}_list/${competition_type.id}/`, 
            method: 'GET',
            responseType: 'blob', 
        })
        .then(response =>  {
            console.log(response);
            const href = URL.createObjectURL(response.data);

            const link = document.createElement('a');
            link.href = href;
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();

            document.body.removeChild(link);
            URL.revokeObjectURL(href);
        })
    }
    return (
        <div className="rectangle">
            <p className="text-wrapper">{competition.date_start} - {competition.date_stop}</p>
            <div className="div">{competition.name}</div>
            <div className="text-wrapper-2">Status: {competition.status}</div>
            <div className="text-wrapper-3">{competition.swimming_facility_id}</div>
            <h2>Dostępne konkurencje:</h2>
            <ul>
                {competitionTypes.length > 0 ? (
                    competitionTypes.map((competitionType) => (
                        <li key={competitionType.id}>
                            <p>{competitionType.length} m styl {competitionType.style}</p>
                            <UserTypeComponent number='3' children={<RegisterButton link="wprowadzWyniki" id={competitionType.id} name="Wprowadź wyniki"/>}/>
                            <button onClick={() => handleDownload('participations', competitionType, 'lista_zawodników')}>Pobierz listę zawodników</button>
                            <button onClick={() => handleDownload('results', competitionType, 'wyniki')}>Pobierz wyniki</button>
                        </li>
                    ))) : (
                        <h1>Brak konkurencji</h1>
                    )}
            </ul>
        </div>
    )
}