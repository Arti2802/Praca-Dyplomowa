import React, { useState, useEffect } from "react";
import ApiURL from "../ApiURL";
import axios from "axios";
import { AddButton } from "../components/AddButton";
import { EditButton } from "../components/EditButton";
import { DeleteButton } from "../components/DeleteButton";
import { ConfirmationWindow } from "../components/ConfirmationWindow";
import { Loading } from "../components/Loading";

export const SwimmingFacilities = () => {
    const [swimmingFacilities, setSwimmingFacilities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [show, setShow] = useState(false);
    const [id, setId] = useState(null);
    //const [name, setName] = useState("");
    useEffect(() => {
        axios.get(`${ApiURL}/swimming_facilities/`)
        .then(response => {
            console.log(response);
            setSwimmingFacilities(response.data);
            setLoading(false);
        })
    }, []);
    const showDeleteModal = (id, name) => {
        setShow(true);
        setId(id);
        //setName(name);
    };
    const hideConfirmationModal = () => {
        setShow(false);
    };
    const handleDelete = (id) => {
        axios.delete(`${ApiURL}/swimming_facilities/${id}/`)
        .then(response => {
            console.log(response);
        })
        setShow(false);
        setSwimmingFacilities(swimmingFacilities.filter((swimmingFacility) => swimmingFacility.id !== id));
    }
    return (
        <div className="zawody">
            <AddButton header={"Obiekty pływackie"} link={'/dodajObiekt'}/>
            <div className="div">
                <table className="table col-12">
                    {loading ? <Loading/> : (
                        <tbody>
                            {swimmingFacilities.length > 0 ? (
                            swimmingFacilities.map((swimmingFacility) => (
                                <tr key={swimmingFacility.id} className="row row-cols-auto">
                                    <td className="col-4 align-self-center">
                                        <div className="rectangle rounded-2 px-2">
                                            <h1 className="text-wrapper">{swimmingFacility.name}</h1>
                                            <div className="div">{swimmingFacility.address}</div>
                                            <div className="text-wrapper-2">W: {swimmingFacility.city}</div>
                                            <span>Długość basenu: {swimmingFacility.pool_length} m </span>
                                        </div>
                                    </td>
                                    <td className="col px-1 align-self-center"><EditButton link={`edytujObiekt/${swimmingFacility.id}`}/></td>
                                    <td className="col px-1 align-self-center"><DeleteButton fn={() => showDeleteModal(swimmingFacility.id)}/></td>
                                </tr>
                            ))) : (
                                <tr>
                                    <td><h1>Brak obiektów pływackich</h1></td>
                                </tr>
                            )}
                        </tbody>
                    )}
                </table>
            </div>
            <ConfirmationWindow showModal={show} hideModal={hideConfirmationModal} confirmModal={() => handleDelete(id)} id={id} message={`Czy na pewno chcesz usunąć ten obiekt pływacki?`}/>
        </div>
    );
};