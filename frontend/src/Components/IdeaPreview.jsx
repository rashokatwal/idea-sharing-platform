import { useState, useEffect } from 'react';
import "../Styles/ideapreview.css";
import parse from 'html-react-parser';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { categoryColors } from "../Helpers/constants";
import { dateTimeConverter } from '../Helpers/dateUtil';
import api from '../Helpers/api';
import { useAuthContext } from '../Hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';

const IdeaPreview = ({ ideaDetails, previewType, isIdeaLiked }) => {
    const {user} = useAuthContext();
    const [ isLiked, setIsLiked ] = useState(isIdeaLiked);
    const [ isSaved, setIsSaved ] = useState(false);
    const lastUpdatedDateTime = ideaDetails ? dateTimeConverter(ideaDetails.updatedAt) : null;
    const postedDateTime = ideaDetails ? dateTimeConverter(ideaDetails.postedOn) : null;
    const navigate = useNavigate();

    useEffect(() => {
        if(previewType == "user") {
            updateReads();
        }
    }, [])

    const handleLike = async () => {
        user ? await api
            .patch(`/likeIdea`,
                { "userId": user?._id, "ideaId": ideaDetails._id },
            )
            .then((response) => {
                console.log(response);
                setIsLiked(!isLiked);
                isLiked ? ideaDetails.likes-- : ideaDetails.likes++;
            })
            .catch((error) => {
                console.log(error);
            })
            : navigate('/signin');
    }

    const updateReads = async () => {
        await api
           .patch(`/idea/${ideaDetails._id}`,
                { "reads" : ideaDetails.reads + 1 },
            )
           .then((response) => {
                // console.log(response.data)
            })
           .catch((error) => console.log(error));
    }

    const handleSave = () => {
        setIsSaved(!isSaved);
    }

    return (
        <div className="idea-preview">
            <div className="author-details">
                <img className="author-avatar" src='/src/Assets/default_user.png' />
                <div className="author-header">
                    <span className="author-name">
                        {ideaDetails?.author}
                    </span>
                    <p className="idea-preview-date-time">
                        {ideaDetails ? postedDateTime.date + ", " + postedDateTime.time : ""}
                    </p>
                </div>
            </div>
            <div className="idea-preview-details">
                <h2 className="idea-preview-title">{ideaDetails?.title}</h2>
                <p className="idea-preview-description">{ideaDetails?.description}</p>
                <div className="idea-preview-summary">
                    {ideaDetails ? parse(ideaDetails.summary) : ""}
                </div>
                <p className="category" style={{backgroundColor: ideaDetails ? categoryColors[ideaDetails?.category] : "white", cursor: "pointer"}}>{ideaDetails?.category}</p>
                <div className="tags">
                    {ideaDetails?.tags.map((tag, index) => (
                        <span key={index} className="tag">"{tag.toUpperCase()}"</span>
                    ))}
                </div>
                <br />
                <p className="idea-preview-date-time">
                    {ideaDetails ? "Last Update (" + lastUpdatedDateTime.date + ", " + lastUpdatedDateTime.time + ")" : ""}
                </p>
            </div>
            <div className="extra-features">
                <div className="like-comment-share">
                    <span className="likes" style={{cursor: "pointer"}}><FontAwesomeIcon icon={(isLiked ? "fa-solid" : "fa-regular") + " fa-heart"} className={isLiked ? "liked-button-animation" : ""} onClick={() => previewType == "user" ? handleLike() : null}/> {ideaDetails?.likes}</span>
                    <span className="comments" style={{cursor: "pointer"}}><FontAwesomeIcon icon="fa-regular fa-comment" /> {ideaDetails?.comments}</span>
                    <span className="share" style={{cursor: "pointer"}}><FontAwesomeIcon icon="fa-regular fa-share-from-square" /> </span>
                </div>
                <div className="collab-save">
                    <span className="collaborate" style={{cursor: "pointer"}}><FontAwesomeIcon icon="fa-regular fa-handshake" /> Collab</span>
                    <span className="save" style={{cursor: "pointer", marginLeft: "15px"}} onClick={() => previewType == "user" ? handleSave : null}><FontAwesomeIcon icon={(isSaved ? "fa-solid" : "fa-regular") + " fa-bookmark"} /> {isSaved ? "Unsave" : "Save"}</span>
                </div>
            </div>
        </div>
    )
}

export default IdeaPreview;