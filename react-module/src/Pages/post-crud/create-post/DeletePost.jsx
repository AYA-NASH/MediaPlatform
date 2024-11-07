import { useContext } from 'react';
import { AppContext } from '../../../App.jsx';
import { useNavigate } from 'react-router-dom';
import './DeletePost.css';

function DeletePost({ postId, onClose }) {
    const navigate = useNavigate();
    const { auth } = useContext(AppContext);

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:8000/home/post/${postId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${auth.token}`,
                },
            });

            if (!response.ok) throw new Error('Failed to delete post');

            navigate('/');
        } catch (err) {
            console.error("Error deleting post:", err);
        }
        onClose();
    };

    const deletPost = () => {
        handleDelete();
    }
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <p>Are you sure you want to delete this post?</p>
                <button onClick={deletPost}>Delete</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
}

export default DeletePost;
