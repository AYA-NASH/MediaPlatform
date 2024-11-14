import { useEffect, useState, useContext } from "react";
import { AppContext } from "../../App";

function LikePost({ userId, postId }) {
    const [isLiked, setIsLiked] = useState(false);
    const [likesAmount, setLikesAmount] = useState(0);
    const { auth } = useContext(AppContext);


    useEffect(() => {
        getPostLikes();
    }, []);


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

        // Check if the current user is in the list of users who liked this post
        setIsLiked(data.users.includes(userId));
    }


    const handleLikeToggle = async () => {
        const method = isLiked ? 'DELETE' : 'POST';

        try {
            const response = await fetch(`http://localhost:8000/like/${postId}`, {
                method: method,
                headers: {
                    'Authorization': `Bearer ${auth.token}`,
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Like/unlike request failed: ${response.status} ${errorData.message}`);
            }

            const data = await response.json();
            setLikesAmount(data.totalLikes);
            setIsLiked(!isLiked);
        } catch (error) {
            console.error("Error in like/unlike request:", error);
        }
    };

    return (
        <div class="LikePost">
            <i
                className="fas fa-thumbs-up"
                onClick={handleLikeToggle}
                style={{ color: isLiked ? '#007bff' : '#333', cursor: 'pointer' }}
            ></i>
            <p>Likes: {likesAmount}</p>
        </div>
    );
}

export default LikePost;
