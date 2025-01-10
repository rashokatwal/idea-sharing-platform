import '../Styles/cards.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faComment } from '@fortawesome/free-solid-svg-icons';
import { categoryColors } from '../Constants/FilterElements';

const CardComponent = (prop) => {
    const idea = prop.prop;
    return (
        <div className="card-container" style={{border: "solid 1px " + categoryColors[idea.category]}}>
            <h4 className="card-title" style={{flexGrow: "1"}}>{idea.title}</h4>
            <p className="card-description" style={{flexGrow: "2"}}>{idea.description}</p>
            <h5 className="author" style={{flexGrow: "1"}}>By <span className="author-name">{idea.author}</span></h5>
            <p className="category" style={{flexGrow: "1", backgroundColor: categoryColors[idea.category]}}>{idea.category}</p>
            <div className="tags" style={{flexGrow: "1"}}>
                {idea.tags.map((tag, index) => (
                    <span key={index} className="tag">{tag}</span>
                ))}
            </div>
            <div className="extra-details" style={{flexGrow: "1"}}>
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