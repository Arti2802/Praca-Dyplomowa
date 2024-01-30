import { RegisterButton } from "./RegisterButton"
import { UserTypeComponent } from "./UserTypeComponent";

export const Competition = ({competition, fn, children}) => {
    const link = `/zawody/${competition.id}`;
    // const [sf, setSf] = useState([]);
    // useEffect(() => {
    //     axios.get(`${ApiURL}/swimming_facilities/${competition.swimming_facility_id}/`)
    //     .then((response) => {
    //         console.log(response);
    //         setSf(response.data);
    //     })
    // }, [competition])
    const changeDate = (date) => {
        return date.substring(8, 10) + '-' + date.substring(5, 7) + '-' + date.substring(0, 4) + ' ' + date.substring(11, 16);
    }
    return (
        <a href={link} className="list-group-item list-group-item-action">
            <div className="mt-4 rounded-2 rectangle">
                <h2>{competition.name}</h2>
                <p className="text-wrapper">{changeDate(competition.date_start)} - {changeDate(competition.date_stop)}</p>
                <div className="text-wrapper-3">W: {competition.swimming_facility_id && competition.swimming_facility_id.name} {competition.swimming_facility_id && competition.swimming_facility_id.city}</div>
                {children}
                <UserTypeComponent number='2' children={<RegisterButton link="zglosZawodnikow" id={competition.id} name="Zgłoś zawodników"/>}/>             
            </div>
        </a>
    )
}