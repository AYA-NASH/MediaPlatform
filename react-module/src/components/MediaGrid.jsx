import { useState, useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

import './MediaGrid.css';
function MediaGrid({ mediaUrls, removedItem, edit = false }) {
    const [files, setFiles] = useState(mediaUrls);

    useEffect(() => {
        setFiles(mediaUrls);
    }, [mediaUrls]);

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