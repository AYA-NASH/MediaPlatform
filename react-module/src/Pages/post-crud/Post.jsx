import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import LikePost from './LikePost';
import './Post.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function Post({ postData }) {
    const { title, creator, createdAt, updatedAt, mediaUrls } = postData;
    const [likeUsers, setLikeUsers] = useState([]);
    const [showUsers, setShowUsers] = useState(false);

    const navigate = useNavigate();

    const viewPost = (postId) => {
        navigate(`/home/post/${postId}`);
    };

    function timeAgo(date) {
        const seconds = Math.floor((new Date() - new Date(date)) / 1000);

        const intervals = [
            { label: "year", seconds: 31536000 },
            { label: "month", seconds: 2592000 },
            { label: "week", seconds: 604800 },
            { label: "day", seconds: 86400 },
            { label: "hour", seconds: 3600 },
            { label: "minute", seconds: 60 },
            { label: "second", seconds: 1 }
        ];

        for (const interval of intervals) {
            const count = Math.floor(seconds / interval.seconds);
            if (count > 0) {
                return `${count} ${interval.label}${count !== 1 ? "s" : ""} ago`;
            }
        }
        return "just now";
    }

    return (
        <div className="Post">
            <div className='post-content'>
                <div className='post-data'>
                    <h1>{title}</h1>
                    <p>by @{creator ? creator.name : "unKnown"} | {timeAgo(updatedAt || createdAt)}</p>

                    {mediaUrls.length > 0 && (
                        <img src={`http://localhost:8000/${mediaUrls[0]}`} />
                    )}
                </div>

                <div className="icon-container">
                    <LikePost postId={postData._id} setShowUsers={setShowUsers} setLikeUsers={setLikeUsers} />

                    <i className="fas fa-expand"
                        onClick={() => viewPost(postData._id)}></i>
                    <div className="tooltip" >View Post</div>
                </div>
            </div>

            {showUsers &&
                <div className={`users-list ${showUsers ? 'visible' : ''}`}>
                    <h4>Users who liked this post:</h4>
                    {likeUsers.map((user, index) => (
                        <div key={index} className="userItem">{user}</div>
                    ))}
                </div>
            }

        </div>
    )
}

export default Post;