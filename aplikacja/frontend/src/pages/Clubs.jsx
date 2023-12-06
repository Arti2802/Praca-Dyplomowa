import React, { useState } from "react";
//import { Rectangle } from "./Rectangle";
import { useEffect } from "react";
import ApiURL from "../ApiURL";
import axios from "axios";

export const Clubs = () => {
    const [clubs, setClubs] = useState([]);
    useEffect(() => {
        axios.get(`${ApiURL}/clubs/`, {
                'Content-Type': 'application/json',
        })
        .then(response => {
            console.log(response);
            setClubs(response.data);
        })
    }, [])
    return (
        <div className="kluby">
            <div className="div">
                <div className="text-wrapper-2">Kluby</div>
                <ul>
                    {clubs.length > 0 ? (
                        clubs.map((club) => (
                            <li key={club.id}>
                                <div className="rectangle">
                                    <a href={`/kluby/${club.id}`}><div className="text-wrapper">{club.username}</div></a>
                                </div>
                            </li>
                        ))
                    ) : null}
                </ul>
            </div>
        </div>
    );
};