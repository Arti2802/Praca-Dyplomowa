import { Navigate } from "react-router-dom";

export const ProtectedPage = ({children}) => {
    const loggedIn = sessionStorage.getItem('isLogged');
    if (loggedIn !== 'true') {
        return <Navigate to='/logowanie'/>;
    }
    return children;
}