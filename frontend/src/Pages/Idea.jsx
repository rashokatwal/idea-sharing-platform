import { useState, useEffect } from 'react';
import IdeaPreview from "../Components/IdeaPreview";
// import {ideas} from "../data/ideas";
import {useLocation} from "react-router-dom";
import "../Styles/idea.css";
import axios from 'axios'; 

const Idea = () => {
    const location = useLocation();
    let ideaId = location.pathname.split('/').pop();
    const [ ideaDetails, setIdeaDetails ] = useState({});

    const fetchIdea = async () => {
        await axios
         .get(`http://localhost:3000/idea/${ideaId}`)
         .then((response) => {
            // console.log(response.data);
            setIdeaDetails(response.data);
         })
         .catch((error) => console.log(error));
    }

    useEffect(() => {
        fetchIdea();
    }, [])

    return (
        <div className="idea-outer">
            <div className="idea-inner">
                {ideaDetails._id && <IdeaPreview ideaDetails={ideaDetails}/>}
            </div>
        </div>
    )
}

export default Idea;