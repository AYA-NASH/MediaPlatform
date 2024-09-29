import { useState } from "react";

function ImageUpload() {
    const [images, setImages] = useState([]);
    const [previews, setPreviews] = useState([]);
    const [status, setStatus] = useState('');

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        let formData = new FormData();

        images.forEach(img => {
            formData.append('files', img);
        })

        const response = await fetch('http://localhost:8000/home/post', {
            method: 'POST',
            body: formData,
        });

        if (response) setStatus(response.statusText)
    }

    const handleFileChange = (evt) => {
        const selectedFiles = Array.from(evt.target.files);
        setImages(selectedFiles);

        const previewsArray = selectedFiles.map((file) => URL.createObjectURL(file));
        setPreviews(previewsArray);
    };

    return (
        <div className="ImageUpload">
            <h1>Upload to Server</h1>

            <div>
                {previews.length > 0 && previews.map((preview, index) => (
                    <img
                        key={index}
                        src={preview}
                        alt={`preview-${index}`}
                        width='100'
                        height='100'
                    />
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

export default ImageUpload;