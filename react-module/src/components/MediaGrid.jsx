import './MediaGrid.css';
function MediaGrid({ mediaUrls }) {
    return (
        <div className="MediaGrid">
            {mediaUrls.map((urlObj, index) => {
                return (urlObj.type === 'image') ? (

                    <img key={index} src={urlObj.path} alt={`preview-${index}`} />
                ) : (
                    <video key={index} controls >
                        <source src={urlObj.path} />
                        Your browser does not support the video tag.
                    </video>
                );
            })}
        </div>
    )
}

export default MediaGrid;