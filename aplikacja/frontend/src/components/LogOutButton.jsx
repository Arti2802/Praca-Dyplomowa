export const LogOutButton = () => {
    const handleLogout = () => {
        sessionStorage.setItem('isLogged', 'false'); 
        sessionStorage.setItem('usertype', '0');
        sessionStorage.setItem('id', '0');
    }
    return (
        <li className="nav-item">
            <button onClick={handleLogout}><a className="nav-link" href='/logowanie'>Wyloguj się</a></button>
         </li>
    )
}