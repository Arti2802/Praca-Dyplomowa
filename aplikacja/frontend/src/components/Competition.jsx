import { useEffect, useState } from "react";
import { RegisterButton } from "./RegisterButton"
import ApiURL from "../ApiURL";
import axios from "axios";
import { UserTypeComponent } from "./UserTypeComponent";

export const Competition = ({competition, fn, children}) => {
    const link = `/zawody/${competition.id}`;
    const [sf, setSf] = useState([]);
    useEffect(() => {
        axios.get(`${ApiURL}/swimming_facilities/${competition.swimming_facility_id}/`)
        .then((response) => {
            console.log(response);
            setSf(response.data);
        })
    }, [competition])
    return (
        <li key={competition.id}>
            <div className="rectangle">
                <p className="text-wrapper">{competition.date_start} - {competition.date_stop}</p>
                <div className="div">{competition.name}</div>
                <div className="text-wrapper-3">W: {sf.name}</div>
                {children}
                <UserTypeComponent number='2' children={<RegisterButton link="zglosZawodnikow" id={competition.id} name="Zgłoś zawodników"/>}/>
                <a href={link}><button>Szczegóły</button></a>
            </div>
        </li>
    )
}