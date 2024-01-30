import { UserTypeComponent } from "./UserTypeComponent";
import { RegisterButton } from "./RegisterButton";
import { format } from "date-fns";

export const CompetitionDetail = ({competition, children, link}) => {
    const changeDate = (date) => {
        return date && (date.substring(8, 10) + '-' + date.substring(5, 7) + '-' + date.substring(0, 4) + ' ' + date.substring(11, 16));
    }
    const today = format(new Date(), 'yyyy-MM-ddTHH:mm:ss');
    const Content = () => {
        return (
            <div className="mt-4 rounded-2 rectangle">
                    <h2>{competition.name}</h2>
                    <p className="text-wrapper">{changeDate(competition.date_start)} - {changeDate(competition.date_stop)}</p>
                    <div className="text-wrapper-3">W: {competition.swimming_facility_id && competition.swimming_facility_id.name} {competition.swimming_facility_id && competition.swimming_facility_id.city}</div>
                    {children}
                    {today < competition.date_start ? (
                        <UserTypeComponent number='2'><RegisterButton link="/zglosZawodnikow" id={competition.id} name="Zgłoś zawodników"/></UserTypeComponent> 
                    ) : null}        
            </div>
        )
    }
    return (
        link ? (
            <a href={`/zawody/${competition.id}`} className="list-group-item list-group-item-action">
                <Content/>
            </a>
        ) : <Content/>
    )
}