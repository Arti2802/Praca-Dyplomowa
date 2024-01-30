import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";

export const ProtectedPage = ({children}) => {
    const loggedIn = sessionStorage.getItem('isLogged');
    if (loggedIn !== 'true') {
        toast.error('Najpierw musisz się zalogować!');
        return <Navigate to='/logowanie'/>;
    }
    return children;
}