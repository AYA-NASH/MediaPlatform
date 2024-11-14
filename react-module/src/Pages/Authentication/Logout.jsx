import { useContext, useEffect } from "react";
import { AppContext } from '../../App';
import { useNavigate } from "react-router-dom";


function Logout({ setAuth }) {
    const { auth } = useContext(AppContext);
    const navigate = useNavigate();
    useEffect(() => {
        localStorage.removeItem('auth')
        const emptyAuth = { toke: '', userId: '' }
        setAuth(null)
        navigate('/')
    }, [])
    return <h1>Logout</h1>
}
export default Logout;