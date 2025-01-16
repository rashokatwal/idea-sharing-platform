import "../Styles/ideapreview.css";
import parse from 'html-react-parser';
import { categoryColors } from "../Constants/FilterElements";

const IdeaPreview = ({ ideaDetails }) => {
    console.log(ideaDetails)
    return (
        <div className="idea-preview" style={{border: "solid 1px " + categoryColors[ideaDetails.category]}}>
            <h2 className="idea-preview-title">{ideaDetails.title}</h2>
            <p className="idea-preview-description">{ideaDetails.description}</p>
            <div className="idea-preview-summary">
                {parse(ideaDetails.summary)}
            </div>
            <p className="category" style={{backgroundColor: categoryColors[ideaDetails.category], cursor: "pointer"}}>{ideaDetails.category}</p>
            <div className="tags">
                {ideaDetails.tags.map((tag, index) => (
                    <span key={index} className="tag">{tag}</span>
                ))}
            </div>
            <p className="idea-preview-date-time">
                {ideaDetails.updatedDate != "" && ideaDetails.updatedTime != "" ? ideaDetails.updatedDate + ", " + ideaDetails.updatedTime : ""}
            </p>
            <h5 className="author">By <span className="author-name" style={{cursor: "pointer"}}>{ideaDetails.author}</span></h5>
        </div>
    )
}

export default IdeaPreview;