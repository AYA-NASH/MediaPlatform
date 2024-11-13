import { useEffect, useState } from "react";
import MediaGrid from "../../components/MediaGrid";

function PostData({ postData, setPostData }) {
    const [removedIdx, setRemovedIdx] = useState(null);

    const handleChange = (e) => {
        setPostData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleFilesChange = (e) => {
        const filesArray = Array.from(e.target.files);
        setPostData((prev) => ({
            ...prev,
            mediaUrls: [...prev.mediaUrls, ...filesArray]
        }));
    };

    useEffect(() => {
        if (removedIdx !== null) {
            setPostData((prev) => {
                const updatedMediaUrls = prev.mediaUrls.filter((_, i) => i !== removedIdx);
                return {
                    ...prev,
                    mediaUrls: updatedMediaUrls
                };
            });
            setRemovedIdx(null);
        }
    }, [removedIdx]);

    console.log("Current Media: ", postData.mediaUrls)
    const mediaObjects = postData.mediaUrls.length > 0 ? postData.mediaUrls.map((file) => {
        if (typeof file === "string") {
            return {
                path: `http://localhost:8000/${file}`,
                type: file.match(/\.(jpg|jpeg|png|gif)$/i) ? "image" : "video"
            };
        } else {
            const name = file.name;
            return {
                path: URL.createObjectURL(file),
                type: name.match(/\.(jpg|jpeg|png|gif)$/) ? "image" : "video",
            };
        }
    }) : [];

    console.log("mediaObjects : ", mediaObjects)

    return (
        <div className="PostData">
            <label htmlFor="title">Title:</label>
            <input
                type="text"
                id="title"
                name="title"
                value={postData.title}
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

            {postData.mediaUrls.length > 0 && (
                <MediaGrid
                    mediaUrls={mediaObjects}
                    removedItem={setRemovedIdx}
                    edit={true}
                />
            )}

            <label htmlFor="content">Content:</label>
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
