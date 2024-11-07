import { useEffect, useState } from "react";


export default function MediaUpload({ mediaUrls, setSelectedFiles }) {
    const [previews, setPreviews] = useState([]);

    useEffect(() => {
        if (mediaUrls) {
            const urlPreviews = mediaUrls.map(url => {
                const fileType = url.endsWith(".mp4") ? "video/mp4" : "image/jpeg"; // Adjust type logic as needed
                return {
                    url: `http://localhost:8000/${url}`, // Adjust base URL as needed
                    type: fileType,
                };
            });

            // Set initial previews to both URL-based previews and file previews
            setPreviews(prev => [...urlPreviews, ...prev]);
        }


    }, [])

    const onFileChange = (e) => {
        const files = e.target.files;
        const newPreviews = Array.from(files).map(file => ({
            url: URL.createObjectURL(file),
            type: file.type,
        }));

        setSelectedFiles(files);
        setPreviews(newPreviews);
    };

    return (
        <div>
            <input
                type="file"
                multiple
                onChange={onFileChange}
            />
            <div className="preview-container">
                {previews.map((preview, index) => {
                    const { url, type } = preview;
                    return type.startsWith('image/') ? (
                        // return preview.endsWith('.jpg') ? (
                        <img key={index} src={url} alt={`preview-${index}`} style={{ maxWidth: "200px", margin: "10px" }} />
                    ) : (
                        <video key={index} controls style={{ maxWidth: "200px", margin: "10px" }}>
                            <source src={url} type={type} />
                            Your browser does not support the video tag.
                        </video>
                    );
                })}
            </div>
        </div>
    );
}

