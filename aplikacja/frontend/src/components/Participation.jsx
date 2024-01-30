import React, { useState, useEffect } from "react";
import ApiURL from "../ApiURL";
import axios from "axios";

export const Participation = ({participation, gotChanged, set, er, error}) => {
    const [series, setSeries] = useState(0);
    const [track, setTrack] = useState(0);
    const [message, setMessage] = useState('');
    const [color, setColor] = useState('');
    useEffect(() => {
        if (gotChanged !== 1) {
            const data = {
                series_nr: series,
                track_nr: track,
            }
            if (data.series_nr <0 || data.track_nr < 0) {
                setMessage('Nie można podawać wartości ujemnych!');
                setColor('red');
            }
            if (data.series_nr === 0) {
                setMessage('Nr serii nie może być równy 0!');
                setColor('red');
            }
            console.log(data);
            axios.put(`${ApiURL}/participations/${participation.id}/`, data)
            .then(response => {
                if (response.status === 200)
                {
                    setMessage('Dodane!');
                    setColor('green');
                    error(prev => prev - 1);
                }
                console.log(er);
            })
            .catch(err => {
                if (err.response?.status === 400) {
                    setMessage(err.response.data.non_field_errors[0]);
                    setColor('red');
                    console.log(err.response);
                }
            })
            set(1);
        }
    }, [series, track, participation, gotChanged, er, error, set])
    return (
        <tr className="row">
            <td className="col-2 pt-4">{participation.competitor_id.first_name} {participation.competitor_id.last_name} </td>
            <td className="col-2">
                <label>Seria</label>
                <input type="number" min={1} pattern="[0-9]{2}" onChange={(e) => setSeries(e.target.value)}/>
            </td>
            <td className="col-2">
                <label>Tor</label>
                <input type="number" min={0} pattern="[0-9]{2}" onChange={(e) => setTrack(e.target.value)}/>
            </td>
            <td><span style={{color: color}}>{message}</span></td>
        </tr>          
    );
}