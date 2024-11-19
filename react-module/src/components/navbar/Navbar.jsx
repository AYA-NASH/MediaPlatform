import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AppContext } from '../../App';

import './Navbar.css'

function Navbar() {
    const auth = JSON.parse(localStorage.getItem('auth')) || "";
    const profile = JSON.parse(localStorage.getItem('profile')) || {};

    const BASE_URL = "http://localhost:8000";
    const [previewImg, setPreviewImg] = useState(`${BASE_URL}/${profile.profilePicture}` || "/defaultProfile.png")
    const [state, setSate] = useState(null);

    useEffect(() => {
        if (auth) {
            setSate(true)
        }
        else {
            setSate(false)
        }
    }, [auth])

    useEffect(() => {
        setPreviewImg(`${BASE_URL}/${profile.profilePicture}`)
    }, [profile.profilePicture])

    return (
        <div className="Navbar">
            <Link to={"/"}> Home </Link>
            <Link to={"create-post"}> Create Post </Link>
            {state ?
                <div className="navbar-profile">
                    <Link to={"/logout"} className="logout">Logout</Link>
                    <Link to={"/user-profile"}>
                        <img
                            src={previewImg}
                            alt="Profile"
                            className="navbar-profile-img"
                        />
                        <p>{profile.name || " "}</p>
                    </Link>
                </div> :
                <Link to={"/login"}> Login </Link>
            }
        </div>
    )

}
export default Navbar;