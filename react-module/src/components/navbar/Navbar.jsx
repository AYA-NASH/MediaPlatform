import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AppContext } from '../../App';

import './Navbar.css'

function Navbar() {
    const { auth } = useContext(AppContext);
    const [state, setSate] = useState(null);
    useEffect(() => {
        if (auth) {
            setSate(true)
        }
        else {
            setSate(false)
        }
    }, [auth])

    return (
        <div className="Navbar">
            <Link to={"/"}> Home </Link>
            <Link to={"create-post"}> Create Post </Link>
            {state ?
                <Link to={"/logout"} > Logout </Link> :
                <Link to={"/login"} > Login </Link>
            }
        </div>
    )
}
export default Navbar;