import { useState } from 'react';
import "../Styles/ideapreview.css";
import parse from 'html-react-parser';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { categoryColors } from "../Constants/FilterElements";

const IdeaPreview = ({ ideaDetails }) => {
    const [ likeIcon, setLikeIcon ] = useState("fa-regular fa-heart");

    const handleLike = () => {
        setLikeIcon(likeIcon === "fa-regular fa-heart"? "fa-solid fa-heart" : "fa-regular fa-heart");
        if(likeIcon === "fa-regular fa-heart") {
            setLikeIcon("fa-solid fa-heart");
            ideaDetails.likes++;
        }
        else {
            setLikeIcon("fa-regular fa-heart");
            ideaDetails.likes--;
        }
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
                    <span className="likes" style={{cursor: "pointer"}}><FontAwesomeIcon icon={likeIcon} onClick={handleLike}/> {ideaDetails.likes}</span>
                    <span className="comments" style={{cursor: "pointer"}}><FontAwesomeIcon icon="fa-regular fa-comment" /> {ideaDetails.comments}</span>
                    <span className="share" style={{cursor: "pointer"}}><FontAwesomeIcon icon="fa-regular fa-share-from-square" /> </span>
                </div>
                <div className="collab-save">
                    <span className="collaborate" style={{cursor: "pointer"}}><FontAwesomeIcon icon="fa-regular fa-handshake" /> Collab</span>
                    <span className="save" style={{cursor: "pointer", marginLeft: "15px"}}><FontAwesomeIcon icon="fa-regular fa-bookmark" /> Save</span>
                </div>
            </div>
        </div>
    )
}

export default IdeaPreview;