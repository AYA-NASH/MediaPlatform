import { useContext, useEffect, useState } from "react";
import ProfilePicture from "./ProfilePicture";
import EditProfileModal from './EditProfileModal'
import '@fortawesome/fontawesome-free/css/all.min.css';

import './Profile.css';

function Profile({ profile, setProfile }) {
    const [profileData, setProfileData] = useState(profile);
    const [showPosts, setShowPosts] = useState(false);
    const [showActivities, setShowActivities] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    };

    useEffect(() => {
        localStorage.setItem('profile', JSON.stringify(profileData));
        setProfile(prev => {
            return {
                ...prev,
                profileData
            }
        });
    }, [profileData, setProfile]);

    const openEditModal = () => {
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
    };


    return (
        <div className="Profile">
            {profileData ? (
                <>
                    <div className="profile-header">
                        <ProfilePicture
                            picture={profileData.profilePicture}
                            updateProfilePic={setProfileData}
                        />
                        <div className="user-info">
                            <h2>{profileData.name}</h2>
                            <p className="status">"{profileData.status}"</p>
                        </div>
                    </div>
                    <div className="profile-info">
                        <h3>Information</h3>
                        <p><strong>Email:</strong> {profileData.email}</p>
                        <p><strong>Member Since:</strong> {formatDate(profileData.createdAt)}</p>

                        <div className="edit-icon" onClick={openEditModal}>
                            <i className="fas fa-edit"></i>
                        </div>

                        {isEditModalOpen && (
                            <EditProfileModal
                                data={profileData}
                                setData={setProfileData}
                                onClose={closeEditModal}
                            />
                        )}
                    </div>

                    <div className="profile-section">
                        <button
                            className="toggle-btn"
                            onClick={() => setShowPosts(!showPosts)}
                        >
                            {showPosts ? "Hide Your Posts" : "See Your Posts"}
                        </button>

                        {showPosts && (
                            <div className="post-list">
                                {profileData.posts.map((p, i) => (
                                    <div key={i} className="post-item">
                                        <strong>{p.title}</strong>
                                        <span> - {formatDate(p.createdAt)}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="profile-section">
                        <button
                            className="toggle-btn"
                            onClick={() => setShowActivities(!showActivities)}
                        >
                            {showActivities ? "Hide Liked Posts" : "Show Liked Posts"}
                        </button>

                        {showActivities && (
                            <div className="post-list">
                                {profileData.likedPosts.map((p, i) => (
                                    <div key={i} className="post-item">
                                        <strong>{p.postId?.title}</strong>
                                        <span> - @ {p.user?.name}</span>
                                        <span> - {formatDate(p?.createdAt)}</span>
                                    </div>
                                ))}
                            </div>
                        )}

                    </div>
                </>
            ) : (
                <p>Loading profile...</p>
            )}
        </div>
    );
}
export default Profile;