import { useContext, useState } from "react";
import PostData from "./PostData";
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../App';
import { validateTitle, validateMedia } from './post-validations';
import Message from "../../components/messages/Message";
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
                setServerMessage("Something wnt wrong, please try again");
                throw new Error("SignUp Failed", "Error Messge: ", data.message);
            }

            navigate('/');
        } catch (err) {
            console.error("Error during post request:", err);
        }
    };

    const handlePostSubmit = (e) => {
        e.preventDefault();
        // validations checks:
        const newErrors = {};
        const titleError = validateTitle(postData.title);
        const mediaErrors = validateMedia(postData.mediaUrls);

        if (titleError) newErrors.title = titleError;
        if (mediaErrors) newErrors.mediaUrls = mediaErrors;

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        postRequest(postData);
    };

    return (
        <div className="CreatePost">
            <form onSubmit={handlePostSubmit}>
                <PostData postData={postData} setPostData={setPostData} errors={errors} />
                <button type="submit">Create Post</button>
                {serverMessage && <Message text={serverMessage} styleClass={'error'} />}
            </form>
        </div>
    );
}

export default CreatePost;
