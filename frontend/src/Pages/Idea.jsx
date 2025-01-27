import { useState, useEffect } from 'react';
import IdeaPreview from "../Components/IdeaPreview";
import {useLocation} from "react-router-dom";
import "../Styles/idea.css";
import axios from 'axios'; 
import IdeaPreviewSkeleton from '../Components/IdeaPreviewSkeleton';

const Idea = () => {
    const location = useLocation();
    let ideaId = location.pathname.split('/').pop();
    const [ ideaDetails, setIdeaDetails ] = useState({});
    const [ loading, setLoading ] = useState(true);
    console.log(ideaId);

    const fetchIdea = async () => {
        await axios
         .get(`http://localhost:3000/idea/${ideaId}`)
         .then((response) => {
            setIdeaDetails(response.data);
            setLoading(false);
         })
         .catch((error) => console.log(error));
    }

    useEffect(() => {
        setTimeout(() => {
            fetchIdea();
        }, 500)
    }, [])

    return (
        <div className="idea-outer">
            <div className="idea-inner">
                {loading ? <IdeaPreviewSkeleton /> : <IdeaPreview ideaDetails={ideaDetails}/>}
            </div>
        </div>
    )
}

export default Idea;