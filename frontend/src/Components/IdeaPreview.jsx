import { useState } from 'react';
import "../Styles/ideapreview.css";
import parse from 'html-react-parser';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { categoryColors } from "../Constants/FilterElements";

const IdeaPreview = ({ ideaDetails }) => {
    const [ isLiked, setIsLiked ] = useState(false);
    const [ isSaved, setIsSaved ] = useState(false);

    const handleLike = () => {
        setIsLiked(!isLiked);
        isLiked ? ideaDetails.likes-- : ideaDetails.likes++;
    }

    const handleSave = () => {
        setIsSaved(!isSaved);
    }

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
                    <span key={index} className="tag">"{tag.toUpperCase()}"</span>
                ))}
            </div>
            <h5 className="author">By <span className="author-name" style={{cursor: "pointer"}}>{ideaDetails.author}</span></h5>
            <p className="idea-preview-date-time">
                {ideaDetails.updatedDate != "" && ideaDetails.updatedTime != "" ? ideaDetails.updatedDate + ", " + ideaDetails.updatedTime : ""}
            </p>
            <div className="extra-features">
                <div className="like-comment-share">
                    <span className="likes" style={{cursor: "pointer"}}><FontAwesomeIcon icon={(isLiked ? "fa-solid" : "fa-regular") + " fa-heart"} onClick={handleLike}/> {ideaDetails.likes}</span>
                    <span className="comments" style={{cursor: "pointer"}}><FontAwesomeIcon icon="fa-regular fa-comment" /> {ideaDetails.comments}</span>
                    <span className="share" style={{cursor: "pointer"}}><FontAwesomeIcon icon="fa-regular fa-share-from-square" /> </span>
                </div>
                <div className="collab-save">
                    <span className="collaborate" style={{cursor: "pointer"}}><FontAwesomeIcon icon="fa-regular fa-handshake" /> Collab</span>
                    <span className="save" style={{cursor: "pointer", marginLeft: "15px"}} onClick={handleSave}><FontAwesomeIcon icon={(isSaved ? "fa-solid" : "fa-regular") + " fa-bookmark"} /> {isSaved ? "Unsave" : "Save"}</span>
                </div>
            </div>
        </div>
    )
}

export default IdeaPreview;