import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../App";
import DeletePost from "./DeletePost";
import LikePost from "./LikePost";
import MediaGrid from "../../components/media-control/MediaGrid";
import './Post.css'
import '@fortawesome/fontawesome-free/css/all.min.css';

function PostView() {
    const { postId } = useParams();
    const [fetchedPost, setFetchedPost] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const { auth } = useContext(AppContext);

    const navigate = useNavigate();

    const fetchPost = async (postId) => {
        try {
            const response = await fetch(`http://localhost:8000/home/post/${postId}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error("Fetching post failed");
            }

            const data = await response.json();
            setFetchedPost(prev => ({ ...data.post }));
        } catch (err) {
            console.log("Error fetching post:", err);
        }
    };

    useEffect(() => {
        if (postId) {
            fetchPost(postId);
        }
    }, [postId]);

    if (!fetchedPost) {
        return <p>Loading post...</p>;
    }
    const { title, content, mediaUrls = [], creator = {}, updatedAt } = fetchedPost;
    const { email } = creator;

    const editPost = () => {
        navigate(`/edit-post/${postId}`, { state: { ...fetchedPost, mediaUrls: fetchedPost.mediaUrls || [] } });
    }

    const closeDeleteModal = () => setIsDeleteModalOpen(false);

    return (
        <div className="Post">
            <div className="post-data">
                <h1>{title}</h1>
                <p>{content}</p>
                <p>By: {email}</p>
                <p>Updated at: {updatedAt ? new Date(updatedAt).toLocaleDateString() : 'N/A'}</p>

                <MediaGrid mediaUrls={fetchedPost.mediaUrls} />

            </div>

            <div className="icon-container">
                {(fetchedPost.creator === auth.userId)
                    && <i className="fas fa-trash"
                        onClick={() => setIsDeleteModalOpen(true)}></i>}

                {(fetchedPost.creator === auth.userId)
                    && <i className="fas fa-edit" onClick={editPost}></i>}

                {isDeleteModalOpen &&
                    <DeletePost
                        postId={postId}
                        onClose={closeDeleteModal}
                    />}

                <LikePost postId={fetchedPost._id} />
            </div>
        </div>
    );
}

export default PostView;
