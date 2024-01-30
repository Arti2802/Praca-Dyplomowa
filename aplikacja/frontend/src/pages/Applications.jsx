import { useEffect, useState } from "react"
import { CompetitionDetail } from "../components/CompetitionDetail";
import axios from "axios";
import ApiURL from "../ApiURL";
import { FcCheckmark } from "react-icons/fc";
import { FcCancel } from "react-icons/fc";
import { ConfirmationWindow } from "../components/ConfirmationWindow";
import toast from "react-hot-toast";
import { Loading } from "../components/Loading";

export const Applications = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [show, setShow] = useState(false);
    const [id, setId] = useState(null);
    const [status, setStatus] = useState(false);
    useEffect(() => {
        axios.get(`${ApiURL}/competitions/?status=do+weryfikacji`)
    .then(response => {
        console.log(response);
        setApplications(response.data);
        setLoading(false);
    })
    .catch(err => {
        if (!err.response) {
            toast.error(`Brak połączenia z serwerem`);
        }
    })
    }, [])
    const showDeleteModal = (id, accept) => {
        setShow(true);
        setId(id);
        setStatus(accept);
    };
    const hideConfirmationModal = () => {
        setShow(false);
    };
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
        toast.success('Zgłoszenie zostało ' + status + ' !');
        setShow(false);
        setApplications(applications.filter((application) => application.id !== id));
    }
    return (
        <div>
            <h1>Zgłoszenia</h1>
            <table className="table col-12">
                {loading ? <Loading/> : (
                    <tbody>
                        {applications.length > 0 ? (
                            applications.map((application) => (
                                <tr key={application.id} className="row row-cols-auto">
                                    <td className="col-8"><CompetitionDetail key={application.id} competition={application} link={true}/></td>
                                    <td className="col px-1 align-self-center"><button className="icon" onClick={() => showDeleteModal(application.id, true)}><FcCheckmark className="edit"/></button></td>
                                    <td className="col px-1 align-self-center"><button className="icon" onClick={() => showDeleteModal(application.id, false)}><FcCancel className="edit"/></button></td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td><h1>Brak zgłoszeń</h1></td>
                            </tr>
                        )}
                    </tbody>
                )}
            </table>
            <ConfirmationWindow showModal={show} hideModal={hideConfirmationModal} confirmModal={() => handleStatus(id, status)} id={id}  message={`Czy na pewno chcesz ${status ? 'zaakceptować' : 'odrzucić'} te zgłoszenie?`} title={'Potwierdzenie zmiany statusu'} button={status ? 'Akceptuj' : 'Odrzuć'}/>
        </div>
    )
}