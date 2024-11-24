import { useContext, useState } from "react";
import PostData from "./PostData";
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../App';
import { validateTitle, validateMedia } from './post-validations';

import './PostForm.css';

function CreatePost() {
    const { auth } = useContext(AppContext);
    const navigate = useNavigate();
    const [postData, setPostData] = useState({ title: "", content: "", mediaUrls: [] });
    const [errors, setErrors] = useState({ titleErrors: [], contentErrors: [], mediaErrors: [] });
    const [serverMessage, setServerMessage] = useState('');


    const postRequest = async (postData) => {
        const formData = new FormData();
        formData.append('title', postData.title);
        formData.append('content', postData.content);

        Array.from(postData.mediaUrls).forEach(file => {
            formData.append('mediaUrls', file);
        });

        try {
            const response = await fetch('http://localhost:8000/home/post', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${auth.token}`,
                },
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                setServerMessage(data.message || "An error occurred during Post Creation.");
                return;
            }

            navigate('/');
        } catch (err) {
            console.error("Error during post request:", err);
        }
    };

    const handlePostSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};
        const titleError = validateTitle(postData.title);
        const mediaErrors = validateMedia(postData.mediaUrls);

        if (titleError) newErrors.title = titleError;
        if (mediaErrors) newErrors.mediaUrls = mediaErrors;

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            console.log("Errors: ", newErrors);
            return;
        }

        postRequest(postData);
    };

    return (
        <div className="CreatePost">
            {serverMessage && <p className="form-error">{serverMessage}</p>}
            <form onSubmit={handlePostSubmit}>
                <PostData postData={postData} setPostData={setPostData} errors={errors} />
                <button type="submit">Create Post</button>
            </form>
        </div>
    );
}

export default CreatePost;
