import { useEffect, useState, useContext } from "react";
import { AppContext } from "../../App";
import './LikePost.css';

function LikePost({ postId, setLikeUsers, setShowUsers }) {
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
        setLikeUsers(data.users);
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
            <p onClick={() => setShowUsers(prev => !prev)}>Likes: {likesAmount}</p>

            {showTip && (
                <p className="tip-style" > Log in to interact with post.</p>
            )}
        </div>
    );
}


export default LikePost;
