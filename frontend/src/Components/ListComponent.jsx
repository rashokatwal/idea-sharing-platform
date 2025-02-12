import '../Styles/lists.css';
import { categoryColors } from '../Helpers/constants';

const ListComponent = ({ idea }) => {
    return (
        <div className="list-container" style={{border: "solid 2px " + categoryColors[idea.category] + "90"}}>
            <div className="title-posted-date">
                <h4 className="list-title">{idea.title}</h4>
                <p className="posted-date">{idea.datePosted}</p>
            </div>
            <p className="list-description">{idea.description}</p>
            <h5 className="author" style={{margin: "0"}}>By <span className="author-name">{idea.author}</span></h5>
            <div className="category-tags">
                <p className="category" style={{backgroundColor: categoryColors[idea.category], marginBottom: "0"}}>{idea.category}</p>
                <div className="tags" style={{flexGrow: "1"}}>
                    {idea.tags.map((tag, index) => (
                        <span key={index} className="tag">"{tag}"</span>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ListComponent;