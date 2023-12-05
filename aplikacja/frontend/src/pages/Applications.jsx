import { useEffect, useState } from "react"
import { Competition } from "../components/Competition";

export const Applications = () => {
    const [applications, setApplications] = useState([]);
    useEffect(() => {
        axios.get(`${ApiURL}/competitions/?status=do+weryfikacji`)
    .then(response => {
        console.log(response);
        setApplications(response.data);
    })
    }, [])
    return (
        <div>
            <h1>Zgłoszenia</h1>
            <ul>
                {applications.length > 0 ? (
                    applications.map((application) => (
                        <Competition key={application.id} competition={application}/>
                    ))
                ) : (
                    <h1>Brak zgłoszeń</h1>
                )}
            </ul>
        </div>
    )
}