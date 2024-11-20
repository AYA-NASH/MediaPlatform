import { useState, useEffect } from "react";
import './PostList.css'; // Ensure styling matches the new design

function PostList({ fetchPosts, renderPost, title }) {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const getPosts = async (pageNum = 1) => {
        setLoading(true);
        setError("");

        try {
            const auth = JSON.parse(localStorage.getItem("auth"));
            const data = await fetchPosts(auth.token, pageNum);

            setPosts(data.items);
            setCurrentPage(data.currentPage);
            setTotalPages(data.totalPages);
        } catch (error) {
            setError("Failed to fetch posts. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getPosts(currentPage);
    }, [currentPage]);

    return (
        <div className="post-list-container">
            <h3>{title}</h3>
            {loading && <p>Loading...</p>}
            {error && <p className="error">{error}</p>}

            {posts.length === 0 && !loading && <p className="empty-message">No posts to display.</p>}

            <div className="post-list">
                {posts.map((post, idx) => (
                    <div key={idx} className="post-item">
                        {renderPost(post)}
                    </div>
                ))}
            </div>

            <div className="pagination-controls">
                <span
                    className={`arrow left ${currentPage === 1 ? "disabled" : ""}`}
                    onClick={() => currentPage > 1 && setCurrentPage((prev) => prev - 1)}
                >
                    ←
                </span>
                <span className="page-info">{currentPage} / {totalPages}</span>
                <span
                    className={`arrow right ${currentPage === totalPages ? "disabled" : ""}`}
                    onClick={() => currentPage < totalPages && setCurrentPage((prev) => prev + 1)}
                >
                    →
                </span>
            </div>
        </div>
    );
}

export default PostList;
