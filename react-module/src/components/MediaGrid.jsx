import { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

import './MediaGrid.css';
function MediaGrid({ mediaUrls, removedItem, edit = false }) {
    const [files, setFiles] = useState(mediaUrls);
    console.log("Files: ", files)

    const deleteFile = (idx) => {
        removedItem(idx);
        setFiles(prevFiles => prevFiles.filter((_, i) => i !== idx));
    };

    return (
        <div className="MediaGrid">
            {files.map((urlObj, index) => {
                return (urlObj.type === 'image') ? (

                    <>
                        <img key={index} src={urlObj.path} alt={`preview-${index}`} />
                        {edit && <i
                            className="cancel-icon fas fa-times"
                            onClick={() => deleteFile(index)} // Remove file at this index
                        ></i>}
                    </>
                ) : (
                    <>
                        <video key={index} controls >
                            <source src={urlObj.path} />
                            Your browser does not support the video tag.
                        </video>
                        {edit && <button onClick={() => deleteFile(index)}>cancel</button>}
                    </>

                );
            })}


        </div>
    )
}

export default MediaGrid;