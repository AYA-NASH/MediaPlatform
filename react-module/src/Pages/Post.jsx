import './Post.css';
import { Link } from 'react-router-dom';

import '@fortawesome/fontawesome-free/css/all.min.css';

function Post({ postData }) {
    const { title, content, creator, updatedAt, mediaUrls } = postData;

    const fetchPost = async (postId) => {
        try {
            const response = await fetch(`http://localhost:8000/home/post/${postId}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (!response) {
                throw new Error("Fetching post failed");
            }
            const post = response.json();
            console.log(post)
        }
        catch (err) {
            console.log(err);
        }
    }
    const viewPost = (postId) => {
        console.log("Post ID", postId);
        fetchPost(postId)
    }
    return (
        <div className="Post">
            <div className='post-data'>
                <p>{creator.email}</p>
                <p>{new Date(updatedAt).toLocaleDateString()}</p>
                <h1>{title}</h1>

                {mediaUrls.length > 0 && (
                    <img src={`http://localhost:8000/${mediaUrls[0]}`} />
                )}
            </div>
            <div className="icon-container">
                <i className="fas fa-eye" onClick={() => viewPost(postData._id)}></i>
                <div className="tooltip">View Post</div>
            </div>

        </div>
    )
}

export default Post;