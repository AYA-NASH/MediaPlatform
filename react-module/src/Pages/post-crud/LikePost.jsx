import { useEffect, useState, useContext } from "react";
import { AppContext } from "../../App";

function LikePost({ postId }) {
    const [isLiked, setIsLiked] = useState(false);
    const [likesAmount, setLikesAmount] = useState(0);
    const [users, setUsers] = useState([]);
    const [showTip, setShowTip] = useState(false);
    const { auth } = useContext(AppContext);

    useEffect(() => {
        getPostLikes();
    }, [likesAmount]);


    const getPostLikes = async () => {
        const response = await fetch(`http://localhost:8000/like/${postId}`, {
            method: 'GET',
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Get likes request failed: ${response.status} ${errorData.message}`);
        }

        const data = await response.json();
        setLikesAmount(data.likes);

        setUsers(data.users);
    }


    const handleLikeToggle = async () => {
        if (auth) {
            setIsLiked(users.includes(auth.userId));
            const method = isLiked ? 'DELETE' : 'POST';

            try {
                const response = await fetch(`http://localhost:8000/like/${postId}`, {
                    method: method,
                    headers: {
                        'Authorization': `Bearer ${auth.token}`,
                    },
                });

                const data = await response.json();

                if (response.status === 403) {

                }

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(`Like/unlike request failed: ${response.status} ${errorData.message}`);
                }

                setLikesAmount(likes => {
                    if (data.userId) return likes++;
                    likes--;
                });
                setIsLiked(!isLiked);
            } catch (error) {
                console.error("Error in like/unlike request:", error);
            }
        }
        else {
            setShowTip(true);
            setTimeout(() => setShowTip(false), 2000);
        }
    };

    return (
        <div className="LikePost">
            <i
                className="fas fa-thumbs-up"
                onClick={handleLikeToggle}
                style={{ color: isLiked ? '#007bff' : '#333', cursor: 'pointer' }}
            ></i>
            <p>Likes: {likesAmount}</p>

            {showTip && (
                <p style={tipSytle} > Log in to interact with post.</p>
            )}
        </div>
    );
}

const tipSytle = {
    display: 'inline-block',
    backgroundColor: '#f8d7da',
    color: '#721c24',
    fontSize: '0.85rem',
    padding: '5px 10px',
    borderRadius: '5px',
    marginLeft: '10px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    position: 'relative',
}

export default LikePost;
