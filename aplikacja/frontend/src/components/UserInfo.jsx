import { useEffect, useState } from "react";

export const UserInfo = () => {
    const [usertype, setUsertype] = useState('');
    useEffect(() => {
        const type = sessionStorage.getItem('usertype');
        if (type === '1')
            setUsertype('Administrator');
        else if (type === '2')
            setUsertype('Klub');
        else if (type === '3')
            setUsertype('Organizator');
        else
            setUsertype('Zawodnik');
    }, [])
    return (
        <li className="nav-item text-center ms-4 me-2">
            <span className="text-center navbar-text py-0">{sessionStorage.getItem('username')}</span><br/>
            <b><span className="navbar-text py-0">{usertype}</span></b>
         </li>
    )
} 