import '../Styles/cards.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { categoryColors } from '../Helpers/constants';
import { dateTimeConverter } from '../Helpers/dateUtil';
import { Link } from 'react-router-dom';

const CardComponent = ({ idea }) => {
    return (
        <div className="card-container" style={{border: "solid 2px " + categoryColors[idea.category] + "90"}}>
            <h4 className="card-title" style={{flexGrow: "1"}}>{idea.title}</h4>
            <p className="card-description" style={{flexGrow: "2"}}>{idea.description}</p>
            <h5 className="author" style={{flexGrow: "1"}}>By <Link to={`/profile/${idea.author?.username}`} className="author-name">{idea.author?.fullName}</Link></h5>
            <p className="category" style={{flexGrow: "1", backgroundColor: categoryColors[idea.category]}}>{idea.category}</p>
            <div className="tags" style={{flexGrow: "1"}}>
                {idea.tags.map((tag, index) => (
                    <span key={index} className="tag">"{tag}"</span>
                ))}
            </div>
            <div className="extra-details" style={{flexGrow: "1"}}>
                <div className="likes-comments">
                    <span className="likes"><FontAwesomeIcon icon="fa-regular fa-heart"/> {idea.likes}</span>
                    <span className="comments"><FontAwesomeIcon icon="fa-regular fa-comment" /> {idea.comments}</span>
                </div>
                <span className="posted-date">{dateTimeConverter(idea.postedOn).date}</span>
            </div>
        </div>
    )
}

export default CardComponent;