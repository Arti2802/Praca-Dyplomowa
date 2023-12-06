import { useEffect, useState } from "react"
import { Competition } from "../components/Competition";
import axios from "axios";
import ApiURL from "../ApiURL";

export const Applications = () => {
    const [applications, setApplications] = useState([]);
    // const [application, setApplication] = useState({});
    useEffect(() => {
        axios.get(`${ApiURL}/competitions/?status=do+weryfikacji`)
    .then(response => {
        console.log(response);
        setApplications(response.data);
    })
    }, [])
    const handleStatus = (id, accept) => {
        const status = accept ? 'zaakceptowane' : 'odrzucone';
        console.log(status);
        const data = {
            status: status
        }
        axios.put(`${ApiURL}/competitions/${id}/`, data)
        .then(response => {
            console.log(response);
        })
    }
    return (
        <div>
            <h1>Zgłoszenia</h1>
            <ul>
                {applications.length > 0 ? (
                    applications.map((application) => (
                        <div key={application.id}>
                            <Competition key={application.id} competition={application}/>
                            <button onClick={() => handleStatus(application.id, true)}>Zatwierdź</button>
                            <button onClick={() => handleStatus(application.id, false)}>Odrzuć</button>
                        </div>
                    ))
                ) : (
                    <h1>Brak zgłoszeń</h1>
                )}
            </ul>
        </div>
    )
}