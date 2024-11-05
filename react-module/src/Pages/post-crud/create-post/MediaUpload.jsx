import { useState } from "react";


export default function MediaUpload({ setSelectedFiles }) {
    const [previews, setPreviews] = useState([]);

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

