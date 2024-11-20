import { useContext, useEffect } from "react";
import { AppContext } from '../../App';
import { useNavigate } from "react-router-dom";


function Logout({ setAuth, setProfile }) {
    const { auth } = useContext(AppContext);
    const navigate = useNavigate();
    useEffect(() => {
        localStorage.removeItem('auth')
        localStorage.removeItem('profile')
        setAuth("")
        setProfile({})
        navigate('/')
    }, [])
    return <h1>Logout</h1>
}
export default Logout;