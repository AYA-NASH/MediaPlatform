import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useContext, useState } from 'react';

import PostData from "./PostData";
import { AppContext } from '../../App';
import { validateTitle, validateMedia } from './post-validations';
import './PostForm.css';
function EditPost() {
    const location = useLocation();
    const { auth } = useContext(AppContext);
    const navigate = useNavigate();
    const post = location.state;
    const [editData, setEditData] = useState(post);
    const [errors, setErrors] = useState({ titleErrors: [], contentErrors: [], mediaErrors: [] });


    const editPost = async (updatedPostData) => {
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

        try {
            const response = await fetch(`http://localhost:8000/home/post/${updatedPostData._id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${auth.token}`,
                },
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                setServerMessage(data.message || "An error occurred during Edit Post.");
                return;
            }

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

        const newErrors = {};

        const titleError = validateTitle(updatedPostData.title);
        const mediaErrors = validateMedia(
            { paths: updatedPostData.paths, mediaUrls: updatedPostData.mediaUrls },
            true
        );

        if (titleError) newErrors.title = titleError;
        if (mediaErrors) newErrors.mediaUrls = mediaErrors;

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        editPost(updatedPostData);
    };


    return (
        <form onSubmit={handleEditPost} className='EditPost'>
            <PostData postData={editData} setPostData={setEditData} errors={errors} />
            <button type="submit">Edit</button>
        </form>

    )
}

export default EditPost;