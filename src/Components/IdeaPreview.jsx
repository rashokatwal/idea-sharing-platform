import "../Styles/ideapreview.css";

const IdeaPreview = ({ ideaDetails }) => {
    return (
        <div className="idea-preview">
            <h2 className="idea-preview-title">{ideaDetails.title}</h2>
            <p className="idea-preview-description">{ideaDetails.description}</p>
            <div className="idea-preview-summary">
                {ideaDetails.summary}
            </div>
            <p className="category" style={{backgroundColor: "lightcoral", cursor: "pointer"}}>{ideaDetails.category}</p>
            <div className="tags">
                {ideaDetails.tags.map((tag, index) => (
                    <span key={index} className="tag">{tag}</span>
                ))}
            </div>
            <p className="idea-preview-date-time">
                {ideaDetails.date + ", " + ideaDetails.time}
            </p>
            <h5 className="author">By <span className="author-name" style={{cursor: "pointer"}}>{ideaDetails.author}</span></h5>
        </div>
    )
}

export default IdeaPreview;