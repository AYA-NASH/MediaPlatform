import MediaGrid from "../../../components/MediaGrid";
function PostData({ postData, setPostData }) {
    const handleChange = (e) => {
        setPostData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleFilesChange = (e) => {
        const filesArray = Array.from(e.target.files);
        setPostData((prev) => ({
            ...prev,
            mediaUrls: filesArray
        }));
    };

    const { title, content, mediaUrls } = postData;

    const mediaObjects = mediaUrls.length > 0 ? mediaUrls.map((file) => {
        if (typeof file === "string") {
            return {
                path: `http://localhost:8000/${file}`,
                type: file.match(/\.(jpg|jpeg|png|gif)$/i) ? "image" : "video"
            };
        }
        else {
            const name = file.name;
            return {
                path: URL.createObjectURL(file),
                type: name.match(/\.(jpg|jpeg|png)$/) ? "image" : "video",
            };
        }

    }) : [];

    return (
        <div className="PostData">

            <label htmlFor="title">Title:</label>
            <input
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={handleChange}
            />

            <label htmlFor="files">Media:</label>
            <input
                type="file"
                id="files"
                multiple
                name="files"
                onChange={handleFilesChange}
            />

            {mediaUrls.length > 0 && <MediaGrid mediaUrls={mediaObjects} />}

            <label htmlFor="content">Content:</label>
            <textarea
                id="content"
                name="content"
                value={content}
                onChange={handleChange}
            />

        </div>
    );
}

export default PostData;
