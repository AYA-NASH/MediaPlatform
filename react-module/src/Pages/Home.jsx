import { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';

import Post from "./post-crud/Post";
import './Home.css';

function Home() {
    const [postsList, setPostsList] = useState([]);
    const location = useLocation();
    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        if (location.state && location.state.message) {
            setMessage(location.state.message);
            setShowMessage(true);

            navigate(location.pathname, { replace: true, state: null });

            setTimeout(() => {
                setShowMessage(false);
            }, 3000);
        }
        fetchPosts();

    }, [location.state]);


    const fetchPosts = async () => {
        try {
            const response = await fetch("http://localhost:8000/home", {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error('Failed to Fetch Data');
            }

            const data = await response.json();
            setPostsList(data.posts);

        } catch (error) {
            console.error('Error:', error);
        }
    }



    return (
        <div className="Home">
            {showMessage && (
                <div className="notification">
                    <p>{message}</p>
                </div>
            )}

            {postsList.map((post, index) => {
                return <Post key={index} postData={post} />
            })}
        </div>
    )
}

export default Home;