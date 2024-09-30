import { useState } from "react";

function MediaUpload() {
    const [mediaFiles, setMediaFiles] = useState([]);
    const [previews, setPreviews] = useState([]);
    const [status, setStatus] = useState('');

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        let formData = new FormData();

        mediaFiles.forEach((file) => {
            formData.append('files', file);
        })

        const response = await fetch('http://localhost:8000/home/post', {
            method: 'POST',
            body: formData,
        });

        if (response) setStatus(response.statusText)
    }

    const handleFileChange = (evt) => {
        const selectedFiles = Array.from(evt.target.files);
        setMediaFiles(selectedFiles);

        const previewsArray = selectedFiles.map((file) => {
            return {
                type: file.type.startsWith('image') ? 'image' : 'video',
                url: URL.createObjectURL(file)
            }
        });

        setPreviews(previewsArray);
    };

    return (
        <div className="MediaUpload">
            <h1>Upload to Server</h1>

            <div>
                {previews.length > 0 && previews.map((preview, index) => (
                    <div key={index}>
                        {preview.type === 'image' ?
                            (
                                <img
                                    src={preview.url}
                                    alt={`preview-${index}`}
                                    width='100'
                                    height='100' />
                            ) :
                            (
                                <video width="200" height="150" controls>
                                    <source src={preview.url} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            )}
                    </div>

                ))}
            </div>

            <hr />
            <form onSubmit={handleSubmit}>
                <input type="file"
                    name="files"
                    multiple
                    onChange={handleFileChange}>
                </input>
                <button type="submit">Submit</button>
            </form>
            {status && <h4>{status}</h4>}
        </div>
    )

}

export default MediaUpload;