import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useContext, useState } from 'react';

import PostData from "./create-post/PostData";
import { AppContext } from '../../App';

function EditPost() {
    const location = useLocation();
    const { auth } = useContext(AppContext);
    const navigate = useNavigate();
    const post = location.state;
    const [editData, setEditData] = useState(post);

    const editPost = async () => {
        try {
            const response = await fetch(`http://localhost:8000/home/post/${post._id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${auth.token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(editData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Post request failed: ${response.status} ${errorData.message}`);
            }

            const data = await response.json();
            console.log(data);
            navigate(`/home/post/${editData._id}`);
        } catch (err) {
            console.error("Error during post request:", err);
        }
    }

    const handleEditPost = (e) => {
        e.preventDefault();
        console.log("Token:", auth);

        editPost();
    }

    return (
        <form onSubmit={handleEditPost}>
            <PostData postData={editData} setPostData={setEditData} />
            <button type="submit">Edit</button>
        </form>

    )
}

export default EditPost;