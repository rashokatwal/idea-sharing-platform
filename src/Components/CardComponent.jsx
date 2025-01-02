import '../Styles/cards.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-solid-svg-icons';

const CardComponent = (prop) => {
    const idea = prop.prop;
    return (
        <div className="card-container">
            <h4 className="card-title">{idea.title}</h4>
            <p className="card-description">{idea.description}</p>
            <h5 className="author">By {idea.author}</h5>
            <p className="category">{idea.category}</p>
            <div className="tags">
                {idea.tags.map((tag, index) => (
                    <span key={index} className="tag">{tag}</span>
                ))}
            </div>
            <div className="extra-details">
                <div className="likes-comments">
                    <span className="likes"><FontAwesomeIcon icon={faThumbsUp} /> {idea.likes}</span>
                    <span className="comments"><FontAwesomeIcon icon={faComment} /> {idea.comments}</span>
                </div>
                <span className="posted-date">{idea.datePosted}</span>
            </div>
        </div>
    )
}

export default CardComponent;