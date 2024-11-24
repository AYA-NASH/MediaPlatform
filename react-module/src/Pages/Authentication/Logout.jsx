import { useContext, useEffect } from "react";
import { AppContext } from '../../App';
import { useNavigate } from "react-router-dom";

export function useLogout() {
    const { setAuth, setProfile } = useContext(AppContext);
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('auth');
        localStorage.removeItem('profile');
        setAuth("");
        setProfile({});
        navigate('/');
    };

    return logout;
}

function Logout() {
    const logout = useLogout();

    useEffect(() => {
        logout();
    }, []);

    return <h1>Logging out...</h1>;
}

export default Logout;