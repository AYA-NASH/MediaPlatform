import { useContext, useEffect, useState } from "react";
import ProfilePicture from "./ProfilePicture";
import EditProfileModal from './EditProfileModal';
import PostList from "./PostList";
import '@fortawesome/fontawesome-free/css/all.min.css';

import './Profile.css';
import { fetchUserLikedPosts, fetchUserPosts } from "./profile-actions";
import DeleteAccountModal from "./DeleteAccountModal";

function Profile({ profile, setProfile }) {
    const [profileData, setProfileData] = useState(profile);
    const [showPosts, setShowPosts] = useState(false);
    const [showActivities, setShowActivities] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

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
        setProfile(profileData);
    }, [profileData, setProfile]);

    const openEditModal = () => {
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
    };

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
    }
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
                            <PostList
                                fetchPosts={fetchUserPosts}
                                renderPost={(post) => (
                                    <>
                                        <strong>{post.title}</strong>
                                        <span> - {formatDate(post.createdAt)}</span>
                                    </>
                                )} />
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
                            <PostList
                                fetchPosts={fetchUserLikedPosts}
                                renderPost={(likedPost) => (
                                    <>
                                        <strong>{likedPost.title}</strong>
                                        <span> - @{likedPost.creator?.name}</span>
                                        <span> - {formatDate(likedPost.createdAt)}</span>
                                    </>
                                )} />

                        )}

                    </div>

                    <button className="delete-btn" onClick={() => setIsDeleteModalOpen(true)}>
                        Delete Account
                    </button>

                    {isDeleteModalOpen && (
                        <DeleteAccountModal
                            onClose={closeDeleteModal}
                            setProfile={setProfile}
                        />
                    )}
                </>
            ) : (
                <p>Loading profile...</p>
            )
            }
        </div >
    );
}
export default Profile;