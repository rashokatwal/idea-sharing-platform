import { useState, useEffect } from 'react';
import "../Styles/ideapreview.css";
import parse from 'html-react-parser';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { categoryColors } from "../Helpers/FilterElements";
import { dateTimeConverter } from '../Helpers/dateUtils';
import axios from 'axios';

const IdeaPreview = ({ ideaDetails }) => {
    const [ isLiked, setIsLiked ] = useState(false);
    const [ isSaved, setIsSaved ] = useState(false);
    const lastUpdatedDateTime = dateTimeConverter(ideaDetails.lastUpdatedOn);
    const postedDateTime = dateTimeConverter(ideaDetails.postedOn);

    const updateLike = async () => {
        await axios
            .patch(`http://localhost:3000/idea/${ideaDetails._id}`,
                { "likes" : ideaDetails.likes },
            )
            .then((response) => {
                // console.log(response.data)
            })
            .catch((error) => console.log(error));
    }

    const updateReads = async () => {
        await axios
           .patch(`http://localhost:3000/idea/${ideaDetails._id}`,
                { "reads" : ideaDetails.reads + 1 },
            )
           .then((response) => {
                // console.log(response.data)
            })
           .catch((error) => console.log(error));
    }

    const handleLike = async () => {
        setIsLiked(!isLiked);
        isLiked ? ideaDetails.likes-- : ideaDetails.likes++;
        await updateLike();
    }

    const handleSave = () => {
        setIsSaved(!isSaved);
    }

    useEffect(() => {
        updateReads();
    }, [])

    return (
        <div className="idea-preview">
            <div className="author-details">
                <img className="author-avatar" src='/src/Assets/default_user.png' />
                <div className="author-header">
                    <span className="author-name">
                        {ideaDetails.author}
                    </span>
                    <p className="idea-preview-date-time">
                        {ideaDetails.postedOn != "" ? postedDateTime.date + ", " + postedDateTime.time : ""}
                    </p>
                </div>
            </div>
            <div className="idea-preview-details">
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
                <br />
                <p className="idea-preview-date-time">
                    {ideaDetails.lastUpdatedOn != "" ? "Last Update (" + lastUpdatedDateTime.date + ", " + lastUpdatedDateTime.time + ")" : ""}
                </p>
            </div>
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