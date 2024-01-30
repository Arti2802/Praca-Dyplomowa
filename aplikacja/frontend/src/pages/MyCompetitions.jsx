import React, { useState, useEffect } from "react";
import ApiURL from "../ApiURL";
import axios from "axios";
import { CompetitionDetail } from "../components/CompetitionDetail";
import { ConfirmationWindow } from "../components/ConfirmationWindow";
import { AddButton } from "../components/AddButton";
import { EditButton } from "../components/EditButton";
import { DeleteButton } from "../components/DeleteButton";
import toast from "react-hot-toast";
import { Loading } from "../components/Loading";

export const MyCompetitions = () => {
    const [competitions, setCompetitions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [show, setShow] = useState(false);
    const [id, setId] = useState(null);
    useEffect(() => {
        axios.get(`${ApiURL}/organisers/${sessionStorage.getItem('id')}/competitions/`)
        .then(response => {
            console.log(response);
            setCompetitions(response.data);
            setLoading(false);
        })
        .catch(err => {
            if (!err.response) {
                toast.error(`Brak połączenia z serwerem`);
            }
        })
    }, []);
    const showDeleteModal = (id) => {
        setShow(true);
        setId(id);
      };
    const hideConfirmationModal = () => {
        setShow(false);
    };
    const handleDelete = (id) => {
        axios.delete(`${ApiURL}/competitions/${id}/`)
        .then(response => {
            console.log(response);
        })
        setShow(false);
        setCompetitions(competitions.filter((competition) => competition.id !== id));
        toast.success('Udało się usunąć zawody!');
    }
    return (
        <div className="zawody">
            <AddButton header={"Moje zawody"} link={"/dodajZawody"}/>
            <div className="div">
                <table className="table col-12">
                    {loading ? <Loading/> : (
                        <tbody>
                            {competitions.length > 0 ? (
                            competitions.map((competition) => (
                                <tr key={competition.id} className="row row-cols-auto">
                                    <td className="col-8">
                                        <CompetitionDetail key={competition.id} competition={competition} link={true}>
                                            <div className="text-wrapper-2">Status: {competition.status}</div>
                                        </CompetitionDetail>
                                    </td>
                                    <td className="col px-1 align-self-center"><EditButton link={`/edytujZawody/${competition.id}`}/></td>
                                    <td className="col px-1 align-self-center"><DeleteButton fn={() => showDeleteModal(competition.id)}/></td>
                                </tr>
                            ))) : (
                                <tr>
                                    <td><h1>Brak zawodów</h1></td>
                                </tr>
                            )}
                        </tbody>
                    )}
                </table>
            </div>
            <ConfirmationWindow showModal={show} hideModal={hideConfirmationModal} confirmModal={() => handleDelete(id)} id={id} message={`Czy na pewno chcesz usunąć te zawody?`}/>
        </div>
    );
};