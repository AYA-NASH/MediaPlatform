import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import "./Navbar.css";

function Navbar() {
    const { auth, profile } = useContext(AppContext);
    const BASE_URL = "http://localhost:8000";
    const [previewImg, setPreviewImg] = useState("/defaultProfile.png");

    useEffect(() => {
        if (profile.profilePicture) {
            setPreviewImg(`${BASE_URL}/${profile.profilePicture}`);
        } else {
            setPreviewImg("/defaultProfile.png");
        }
    }, [profile.profilePicture]);

    return (
        <div className="Navbar">
            <Link to={"/"}> Home </Link>
            {auth.token && <Link to={"create-post"}> Create Post </Link>}
            {auth.token ? (
                <div className="navbar-profile">
                    <Link to={"/logout"} className="logout">
                        Logout
                    </Link>
                    <Link to={"/user-profile"}>
                        <img
                            src={previewImg}
                            alt="Profile"
                            className="navbar-profile-img"
                        />
                        <p>{profile.name || " "}</p>
                    </Link>
                </div>
            ) : (
                <Link to={"/login"}> Login </Link>
            )}
        </div>
    );
}

export default Navbar;
