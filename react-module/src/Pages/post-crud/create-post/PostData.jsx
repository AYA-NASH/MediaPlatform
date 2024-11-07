import MediaUpload from "./MediaUpload";

function PostData({ postData, setPostData }) {

    const handleChange = (e) => {
        setPostData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleFilesChange = (files) => {

        setPostData(prev => ({
            ...prev,
            files: Array.from(files)
        }));
    };


    return (
        <div className="PostData">

            <label htmlFor="title">Title</label>
            <input
                type="text"
                id="title"
                name="title"
                value={postData.title}
                onChange={handleChange}
            />

            <MediaUpload mediaUrls={postData.mediaUrls} setSelectedFiles={handleFilesChange} />

            <label htmlFor="content">Content</label>
            <textarea
                id="content"
                name="content"
                value={postData.content}
                onChange={handleChange}
            />

        </div>
    );
}

export default PostData;
