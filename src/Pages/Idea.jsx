import IdeaPreview from "../Components/IdeaPreview";
import {ideas} from "../data/ideas";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {useLocation} from "react-router-dom";
import "../Styles/idea.css";

const Idea = () => {
    const location = useLocation();
    let ideaId = Number(location.pathname.split('/').pop());
    let ideaDetails = ideas.filter((idea) => idea.id == ideaId)[0];

    return (
        <div className="idea-outer">
            <div className="idea-inner">
                <IdeaPreview ideaDetails={ideaDetails}/>
            </div>
        </div>
    )
}

export default Idea;