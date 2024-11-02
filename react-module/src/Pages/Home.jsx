import { useEffect, useState } from "react";
import Post from "./Post";
function Home() {
    const [postsList, setPostsList] = useState([]);

    const fetchPosts = async () => {
        try {
            const response = await fetch(`http://localhost:8000/home`, {
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

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <div className="Home">
            {postsList.map((post, index) => {
                return <Post key={index} postData={post} />
            })}
        </div>
    )
}

export default Home;