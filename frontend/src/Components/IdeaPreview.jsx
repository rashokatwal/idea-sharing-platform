import { useState, useEffect, useRef } from 'react';
import "../Styles/ideapreview.css";
import parse from 'html-react-parser';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { categoryColors } from "../Helpers/constants";
import { dateTimeConverter } from '../Helpers/dateUtil';
import api from '../Helpers/api';
import { useAuthContext } from '../Hooks/useAuthContext';
import { Link, useNavigate } from 'react-router-dom';
import Popup from 'reactjs-popup';
import authUserRequest from '../Helpers/authRequestHandler';
import Skeleton from 'react-loading-skeleton';
import toast from 'react-hot-toast';
const IdeaPreview = ({ ideaDetails, previewType, isIdeaLiked, isIdeaSaved, setIdeaDetails }) => {
    const {user} = useAuthContext();
    const [ isLiked, setIsLiked ] = useState(null);
    const [ isSaved, setIsSaved ] = useState(null);
    const lastUpdatedDateTime = ideaDetails ? dateTimeConverter(ideaDetails.updatedAt) : null;
    const postedDateTime = ideaDetails ? dateTimeConverter(ideaDetails.postedOn) : null;
    const navigate = useNavigate();

    useEffect(() => {
        if(previewType == "user") {
            updateReads();
            setIsLiked(isIdeaLiked);
            setIsSaved(isIdeaSaved);
        }
    }, [])

    const handleLike = async () => {
        user ? await authUserRequest
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

    const handleSave = async () => {
        const saveIdeaPromise = authUserRequest.patch(`/saveIdea`,
                { "userId": user?._id, "ideaId": ideaDetails._id },
            )
        toast.promise(saveIdeaPromise, {
            loading: isSaved ? "Unsaving Idea..." : "Saving Idea...",
            success: isSaved ? "Idea unsaved successfully!" : "Idea saved successfully!",
            error: isSaved ? "Couldn't unsave idea" : "Couldn't save idea",
        });
        // user ? await authUserRequest
        //     .patch(`/saveIdea`,
        //         { "userId": user?._id, "ideaId": ideaDetails._id },
        //     )
        //     .then((response) => {
        //         console.log(response);
        //         setIsSaved(!isSaved);
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     })
        //     : navigate('/signin');

        try {
            user ? await saveIdeaPromise : navigate('/signin');
            // console.log(response);
            setIsSaved(!isSaved);
        }
        catch (err) {
            console.log(err);
        }
    }

    const updateReads = async () => {
        await authUserRequest
           .patch(`/idea/${ideaDetails._id}`,
                { "reads" : ideaDetails.reads + 1 },
            )
           .then((response) => {
            })
           .catch((error) => console.log(error));
    }

    // const handleSave = () => {
    //     setIsSaved(!isSaved);
    // }

    return (
        <div className="idea-preview">
            <div className="author-details">
                <img className="author-avatar" src={ideaDetails?.author.profileImage} />
                <div className="author-header">
                    <Link to={`/profile/${ideaDetails?.author.username}`} className="author-name">
                        {ideaDetails?.author.fullName}
                    </Link>
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
                    <span className="comments" style={{cursor: "pointer"}}>{previewType == "user" ? <Comments user={user} ideaDetails={ideaDetails} setIdeaDetails={setIdeaDetails} navigate={navigate} /> : <FontAwesomeIcon icon="fa-regular fa-comment" />} {ideaDetails?.comments}</span>
                    <span className="share" style={{cursor: "pointer"}}><FontAwesomeIcon icon="fa-regular fa-share-from-square" /> </span>
                </div>
                <div className="collab-save">
                    <span className="collaborate" style={{cursor: "pointer"}}><FontAwesomeIcon icon="fa-regular fa-handshake" /> Collab</span>
                    <div className="save" style={{cursor: "pointer", marginLeft: "15px", color: isSaved ? "var(--accent-color)" : null, transition: "0.2s"}} onClick={() => previewType == "user" ? handleSave() : null}><FontAwesomeIcon icon={(isSaved ? "fa-solid" : "fa-regular") + " fa-bookmark"} className={isSaved ? "save-button-animation" : ""} /> {isSaved ? "Saved" : "Save"}</div>
                </div>
            </div>
        </div>
    )
}

const Comments = ({ user, ideaDetails, setIdeaDetails, navigate }) => {
    const [comments, setComments] = useState([]); // Default to empty array
    const [loading, setLoading] = useState(true);
    const [comment, setComment] = useState("");
    const [editedComment, setEditedComment] = useState(""); // Default to empty array
    const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
    const [editableCommentIndex, setEditableCommentIndex] = useState(null);
    const dropdownRefs = useRef([]);
    const commentRefs = useRef([]);

    // Fetch comments from API
    useEffect(() => {
        const fetchComments = async () => {
            if (user) {
                try {
                    const response = await api.get(`/comments/${ideaDetails._id}`);
                    setComments(response.data.comments);
                    console.log(response.data.comments);
                    setLoading(false);
                } catch (error) {
                    console.log(error);
                }
            } else {
                navigate("/signin");
            }
        };

        setTimeout(() => {
            fetchComments();
        }, 5000)
    }, [user, ideaDetails._id, navigate]);

    const handleCommentPost = async (close) => {
        const addCommentPromise = authUserRequest.post("/comment", {
            ideaId: ideaDetails._id,
            comment,
            username: user?.username,
            userFullName: user?.fullname,
            userProfileImage: user?.profileImage,
        });
    
        toast.promise(addCommentPromise, {
            loading: "Adding comment...",
            success: "Comment added successfully!",
            error: "Couldn't add comment",
        });
    
        try {
            const response = await addCommentPromise;
            const addedComment = response.data.comment;
    
            setComments([...comments, addedComment]);
            setIdeaDetails({ ...ideaDetails, comments: comments.length + 1 });
    
            setComment(""); // Clear input field
            close(); // Close modal
        } catch (error) {
            console.error(error); // Log error for debugging
        }
    };

    const updateComment = async (id) => {
        const editCommentPromise = authUserRequest.patch("/comment", 
            { commentId: id, comment: editedComment },
        );

        await toast.promise(editCommentPromise, {
            loading: "Updating comment...",
            success: "Comment updated successfully!",
            error: "Couldn't update comment",
        })
        try {
            const response = await editCommentPromise;

            setComments((prevComments) =>
                prevComments.map((comment) =>
                    comment._id === id ? { ...comment, comment: editedComment } : comment
                )
            );
            setEditedComment("");
            setEditableCommentIndex(null);
            setOpenDropdownIndex(null);
        } catch (error) {
            console.log(error);
        }
    }

    const deleteComment = async (id) => {
        const deleteCommentPromise = authUserRequest.delete("/comment", {
            data: { commentId: id, ideaId: ideaDetails._id },
        });

        toast.promise(deleteCommentPromise, {
            loading: "Deleting comment...",
            success: "Comment deleted successfully!",
            error: "Couldn't delete comment"
        })

        try {
            await deleteCommentPromise;

            const updatedComments = comments.filter((comment) => comment._id !== id);
            setComments(updatedComments);
            setIdeaDetails({ ...ideaDetails, comments: updatedComments.length });
            setOpenDropdownIndex(null);
        } catch (error) {
            console.log(error);
        }
    };

    const editComment = async (index) => {
        setEditableCommentIndex(index);
        setOpenDropdownIndex(null);
    }
    // Handle dropdown toggle
    const toggleDropdown = (index) => {
        setOpenDropdownIndex(openDropdownIndex === index ? null : index);
    };

    const toggleEditableComment = (index) => {
        setEditableCommentIndex(editableCommentIndex === index ? null : index);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRefs.current[openDropdownIndex] && !dropdownRefs.current[openDropdownIndex].contains(event.target)) {
                setOpenDropdownIndex(null);
            }
            if (commentRefs.current[editableCommentIndex] && !commentRefs.current[editableCommentIndex].contains(event.target)) {
                if (event.target.closest(".primary-button")) {
                    return;
                }

                commentRefs.current[editableCommentIndex].innerHTML = comments[editableCommentIndex].comment;
                setEditableCommentIndex(null);  
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [openDropdownIndex, editableCommentIndex]);

    return (
        <Popup
            trigger={<FontAwesomeIcon icon="fa-regular fa-comment" />}
            modal
            contentStyle={{ animation: "fadeIn 0.2s ease-in-out"}}
        >
            {(close) => (
                <div>
                    <h3 className="header" style={{textAlign: "center"}}>Comments</h3>
                    <div className="comments-section" style={{ display: comments.length > 0 ? "block" : "flex" }}>
                        {!loading ?
                            comments.length > 0 ? 
                                comments.map((comment, index) => (
                                    <div className="comment" key={comment._id}>
                                        <div style={{ display: "flex", alignItems: "start", gap: "10px" }}>
                                            <img src={comment.userProfileImage} alt="Profile" height="35px" width="35px" />
                                            <div style={{ width: "100%" }}>
                                                <Link to={`/profile/${comment.username}`} className="user-fullname">
                                                    {comment.userFullName}
                                                </Link>
                                                <p className="comment-date-time">
                                                    {dateTimeConverter(comment.createdAt).date + ", " + dateTimeConverter(comment.createdAt).time}
                                                </p>
                                            </div>
                                        </div>
                                        <div className={`comment-content ${editableCommentIndex === index ? "editable-comment" : null}`} ref={(el) => (commentRefs.current[index] = el)} contentEditable={editableCommentIndex === index} dangerouslySetInnerHTML={{ __html: comment.comment }} onInput={e => setEditedComment(e.currentTarget.textContent)}></div>
                                        <button className='primary-button' style={{display: editableCommentIndex === index ? "block" : "none"}} disabled={!editedComment || editedComment == comment.comment} onClick={() => updateComment(comment._id)}>Save</button>
                                        {comment.username === user.username && (
                                            <div className="comment-options">
                                                <FontAwesomeIcon
                                                    icon="fa-solid fa-ellipsis"
                                                    size="lg"
                                                    onClick={() => toggleDropdown(index)}
                                                />
                                                <div
                                                    className="dropdown"
                                                    ref={(el) => (dropdownRefs.current[index] = el)}
                                                    style={{ display: openDropdownIndex === index ? "block" : "none" }}
                                                >
                                                    <ul className="dropdown-list">
                                                        <li className="dropdown-item" onClick={() => editComment(index)}>Edit</li>
                                                        <li className="dropdown-item delete" onClick={() => deleteComment(comment._id)}>
                                                            Delete
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))
                            : 
                                <h3 style={{ fontFamily: "var(--accent-font)" }}>No Comments</h3>
                            
                            :
                                Array.from({ length: 10 }).map((_, index) => (
                                    <div className="comment" style={{width: "90%"}} key={index}>
                                        <div style={{ display: "flex", alignItems: "start", gap: "10px" }}>
                                            <Skeleton width={"35px"} height={"35px"} style={{ borderRadius: "50%" }} />
                                            <div style={{ width: "100%" }}>
                                                <Skeleton width={"100px"} />
                                                <Skeleton width={"100px"} />
                                            </div>
                                        </div>
                                        <div style={{width: "100%"}}><Skeleton width={"100%"} count={2} /></div>
                                    </div>
                                ))
                        }
                    </div>
                    <div className="input-comment">
                        <img src={user?.profileImage || "../src/Assets/default_user.png"} alt="Profile" style={{height: "35px", minWidth: "35px"}} />
                        <input
                            type="text"
                            value={comment}
                            placeholder="Write a comment..."
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <button
                            className="primary-button"
                            style={{ border: "none", padding: "8px" }}
                            disabled={!comment}
                            onClick={() => handleCommentPost(close)}
                        >
                            <FontAwesomeIcon icon="fa-solid fa-paper-plane" size="lg" />
                        </button>
                    </div>
                </div>
            )}
        </Popup>
    );
};

export default IdeaPreview;