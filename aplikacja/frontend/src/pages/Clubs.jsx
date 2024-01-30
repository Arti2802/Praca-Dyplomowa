import React, { useState } from "react";
import { useEffect } from "react";
import ApiURL from "../ApiURL";
import axios from "axios";
import toast from "react-hot-toast";
import { Loading } from "../components/Loading";


export const Clubs = () => {
    const [clubs, setClubs] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        axios.get(`${ApiURL}/clubs/`)
        .then(response => {
            console.log(response);
            setClubs(response.data);
            setLoading(false);
        })
        .catch(err => {
            if (!err.response) {
                toast.error(`Brak połączenia z serwerem`);
            }
        })
    }, [])
    return (
        <div className="kluby">
            <div className="div">
                <h1>Kluby</h1>
                <div className="container text-center px-4">
                    <div className="row row-cols-3 gx-6 row-gap-3">
                        {loading ? (
                            <Loading/>
                        ) : (
                            clubs.length > 0 ? (
                                clubs.map((club) => (
                                    <div key={club.id} className="col">
                                        <a href={`/kluby/${club.id}`} className="list-group-item list-group-item-action">
                                            <div className="text-center rounded-2 rectangle">
                                                <h2 className="p-5">{club.username}</h2>
                                            </div>
                                        </a>
                                    </div>
                                ))
                            ) : (
                                <h1>Brak klubów</h1>
                            )  
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};