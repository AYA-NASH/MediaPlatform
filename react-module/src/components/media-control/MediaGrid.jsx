import { useState, useEffect, useMemo } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

import './MediaGrid.css';

function MediaGrid({ mediaUrls, removedItem, edit = false }) {
    const mediaObjects = useMemo(() => {
        return mediaUrls.length > 0 ? mediaUrls.map((file) => {
            if (typeof file === "string") {
                return {
                    path: `http://localhost:8000/${file}`,
                    type: file.match(/\.(jpg|jpeg|png)$/i) ? "image" : "video"
                };
            } else {
                const name = file.name;
                return {
                    path: URL.createObjectURL(file),
                    type: name.match(/\.(jpg|jpeg|png)$/) ? "image" : "video",
                };
            }
        }) : [];
    }, [mediaUrls]);

    const [files, setFiles] = useState(mediaObjects);

    useEffect(() => {
        setFiles(mediaObjects);
    }, [mediaObjects]);

    const deleteFile = (idx) => {
        removedItem(idx);
        setFiles(prevFiles => prevFiles.filter((_, i) => i !== idx));
    };
    return (
        <div className="MediaGrid">
            {files.map((urlObj, index) => (
                urlObj.type === 'image' ? (
                    <div key={index}>
                        <img src={urlObj.path} alt={`preview-${index}`} />
                        {edit && (
                            <i
                                className="cancel-icon fas fa-times"
                                onClick={() => deleteFile(index)}
                            ></i>
                        )}
                    </div>
                ) : (
                    <div key={index}>
                        <video controls>
                            <source src={urlObj.path} />
                            Your browser does not support the video tag.
                        </video>
                        {edit && (
                            <i
                                className="cancel-icon fas fa-times"
                                onClick={() => deleteFile(index)}
                            ></i>
                        )}
                    </div>
                )
            ))}
        </div>
    );
}

export default MediaGrid;