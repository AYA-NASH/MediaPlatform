import { useState, useEffect } from "react";
import './EditProfileModal.css';
import { updateProfileFields } from "./profile-actions";

function EditProfileModal({ data, setData, onClose }) {
    const auth = JSON.parse(localStorage.getItem('auth')) || "";
    const { name, email, status } = data;

    // Initialize profileData with the current data
    const [profileData, setProfileData] = useState({ name, email, status });
    const [error, setError] = useState("");

    useEffect(() => {
        // Reset error when the modal opens
        setError("");
    }, []);

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setProfileData((prev) => ({ ...prev, [name]: value }));
        setData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const emailValue = profileData.email;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!emailRegex.test(emailValue)) {
            setError("Please enter a valid email address.");
            return;
        }

        try {
            const updatedData = await updateProfileFields(profileData, auth.token);
            if (updatedData.status === 401) {
                setError(updatedData.message); // Email already exists
                setProfileData((prev) => ({ ...prev, email: email })); // Reset email field if error
                return;
            }

            if (updatedData) {
                setProfileData(prev => ({ ...prev, ...updatedData }));
                setData(prev => ({ ...prev, ...updatedData }));
                onClose(); // Close the modal after successful update
            }
        } catch (error) {
            console.error("Failed to update profile:", error);
        }
    };

    const handleCancel = () => {
        // Reset to the original data when canceling
        setProfileData(data);
        setError(""); // Clear any errors
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="edit-profile-modal">
                <h2>Edit your Information</h2>
                <button className="close-btn" onClick={handleCancel}> × </button>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Username</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={profileData.name}
                        onChange={handleChange}
                    />

                    <label htmlFor="email">E-mail</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        value={profileData.email}
                        onChange={handleChange}
                    />
                    {error && <p className="error">{error}</p>}

                    <label htmlFor="status">Status</label>
                    <input
                        type="text"
                        id="status"
                        name="status"
                        value={profileData.status}
                        onChange={handleChange}
                    />

                    <button type="submit">Save Changes</button>
                </form>
            </div>
        </div>
    );
}

export default EditProfileModal;
