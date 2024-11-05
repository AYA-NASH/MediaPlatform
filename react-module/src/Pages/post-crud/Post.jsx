import './Post.css';
import { useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

function Post({ postData }) {
    const { title, content, creator, updatedAt, mediaUrls } = postData;
    const navigate = useNavigate();

    const viewPost = (postId) => {
        navigate(`/home/post/${postId}`);
    };

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
                <i className="fas fa-thumbs-up"></i>
                <div className="tooltip">View Post</div>
            </div>

        </div>
    )
}

export default Post;