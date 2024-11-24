import { useState, useContext, useEffect } from "react";
import "./ProfilePicture.css";
import { updateProfilePicture } from './profile-actions';
import { AppContext } from '../../App';

function ProfilePicture({ picture, updateProfilePic }) {
    const { auth } = useContext(AppContext);

    const BASE_URL = "http://localhost:8000";

    const [previewImg, setPreviewImg] = useState(picture ? `${BASE_URL}/${picture}` : "defaultProfile.png")
    const [error, setError] = useState("");

    useEffect(() => {
        setPreviewImg(`${BASE_URL}/${picture}`)
    }, [picture]);

    const uploadPicture = async (evt) => {
        const file = evt.target.files[0];

        if (file) {
            // const previewUrl = URL.createObjectURL(file);

            // setPreviewImg(previewUrl);
            try {
                const data = await updateProfilePicture(file, auth.token);
                if (data) {
                    updateProfilePic((prev) => ({
                        ...prev,
                        profilePicture: data,
                    }));
                }
            } catch (err) {
                setError("Failed to update profile picture. Please try again.");
                setPreviewImg(`${BASE_URL}/${picture}`);
            }
        }
    };

    return (
        <div className="profile-picture">
            <img
                src={previewImg}
                alt="User"
                className="profile-picture-img"
                onError={() => setPreviewImg("defaultProfile.png")}
            />
            <label htmlFor="upload-input" className="edit-prof-icon">
                <i className="fas fa-edit"></i>
            </label>
            <input
                id="upload-input"
                type="file"
                style={{ display: "none" }}
                accept="image/*"
                onChange={uploadPicture}
            />
            {error && <p className="error-message">{error}</p>}
        </div>
    );
}

export default ProfilePicture;
