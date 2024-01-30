export const LogOutButton = () => {
    const handleLogout = () => {
        sessionStorage.setItem('isLogged', 'false'); 
        sessionStorage.setItem('usertype', '0');
        sessionStorage.setItem('id', '0');
    }
    return (
        <li className="nav-item">
            <button  style={{backgroundColor: "#4082D6", border: '1px solid white'}} onClick={handleLogout}><a className="nav-link" href='/'>Wyloguj się</a></button>
         </li>
    )
}