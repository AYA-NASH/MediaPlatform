import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useContext, useState } from 'react';

import PostData from "./PostData";
import { AppContext } from '../../App';
import './PostForm.css';
function EditPost() {
    const location = useLocation();
    const { auth } = useContext(AppContext);
    const navigate = useNavigate();
    const post = location.state;
    const [editData, setEditData] = useState(post);

    const editPost = async (updatedPostData) => {
        console.log(updatedPostData);
        const formData = new FormData();
        formData.append('title', updatedPostData.title);
        formData.append('content', updatedPostData.content);

        if (updatedPostData.mediaUrls && updatedPostData.mediaUrls.length > 0) {
            updatedPostData.mediaUrls.forEach(file => {
                formData.append('mediaUrls', file);
            });
        }

        if (updatedPostData.paths) {
            formData.append('paths', JSON.stringify(updatedPostData.paths));
        }


        for (var pair of formData.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }

        try {
            const response = await fetch(`http://localhost:8000/home/post/${updatedPostData._id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${auth.token}`,
                },
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Post request failed: ${response.status} ${errorData.message}`);
            }

            const data = await response.json();
            setEditData(data.post);

            navigate(`/home/post/${data.post._id}`);

        } catch (err) {
            console.error("Error during post request:", err);
        }
    };

    const handleEditPost = (e) => {
        e.preventDefault();

        const paths = [];
        const newMedia = [];

        editData.mediaUrls.forEach(url => {
            if (typeof url === 'string') {
                paths.push(url);
            } else {
                newMedia.push(url);
            }
        });


        const updatedPostData = {
            ...editData,
            paths: paths,
            mediaUrls: newMedia
        };

        editPost(updatedPostData);
    };


    return (
        <form onSubmit={handleEditPost} className='EditPost'>
            <PostData postData={editData} setPostData={setEditData} />
            <button type="submit">Edit</button>
        </form>

    )
}

export default EditPost;