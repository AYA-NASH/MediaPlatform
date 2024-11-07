import { useContext, useState } from "react";
import PostData from "./PostData";
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../../App';

function CreatePost() {
    const { auth } = useContext(AppContext);
    const navigate = useNavigate();
    const [postData, setPostData] = useState({ title: "", content: "", files: [] });

    const postRequest = async (postData) => {
        const formData = new FormData();
        formData.append('title', postData.title);
        formData.append('content', postData.content);

        // Append each file in the files array to FormData
        Array.from(postData.files).forEach(file => {
            formData.append('files', file);
        });

        try {
            const response = await fetch('http://localhost:8000/home/post', {
                method: 'POST',
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
            console.log(data);
            navigate('/');
        } catch (err) {
            console.error("Error during post request:", err);
        }
    };

    const handlePostSubmit = (e) => {
        e.preventDefault();
        postRequest(postData);
    };

    return (
        <div className="CreatePost">
            <form onSubmit={handlePostSubmit}>
                <PostData postData={postData} setPostData={setPostData} />
                <button type="submit">Create Post</button>
            </form>
        </div>
    );
}

export default CreatePost;
