import { useEffect, useState } from "react";
import MediaGrid from "../../components/media-control/MediaGrid";

function PostData({ postData, setPostData, errors }) {
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
            {errors?.title && <p className="error">{errors.title}</p>}

            <label htmlFor="files">Media:</label>
            <input
                type="file"
                id="files"
                multiple
                name="files"
                accept="image/png, image/jpeg, image/jpg, video/mp4"
                onChange={handleFilesChange}
            />
            <MediaGrid
                mediaUrls={postData.mediaUrls}
                removedItem={setRemovedIdx}
                edit={true}
            />
            {errors?.mediaUrls && <p className="error">{errors.mediaUrls}</p>}
            <p className="placeholder">
                Supported files: .jpg, .png, .jpeg, .mp4
            </p>

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
