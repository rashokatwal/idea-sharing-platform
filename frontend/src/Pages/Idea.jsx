import { useState, useEffect } from 'react';
import IdeaPreview from "../Components/IdeaPreview";
import {useLocation} from "react-router-dom";
import "../Styles/idea.css";
// import axios from 'axios'; 
import IdeaPreviewSkeleton from '../Components/IdeaPreviewSkeleton';
import api from '../Helpers/api';
import { useAuthContext } from '../Hooks/useAuthContext';

const Idea = () => {
    const location = useLocation();
    const userStatus = useAuthContext();
    const [ user, setUser ] = useState(null);
    let ideaId = location.pathname.split('/').pop();
    const [ ideaDetails, setIdeaDetails ] = useState({});
    const [ loading, setLoading ] = useState(true);
    const [ isLiked, setIsLiked ] = useState(null);

    const fetchIdea = async () => {
        await api
         .get(`/idea/${ideaId}`)
         .then((response) => {
            setIdeaDetails(response.data);
            !userStatus.isAuthenticated && setLoading(false);
         })
         .catch((error) => console.log(error));
    }

    const checkIsLiked = async () => {
        await api
         .get(`/likedPosts/${user.username}`)
         .then((response) => {
            setIsLiked(response.data.includes(ideaId));
            setLoading(false);
         })
         .catch((error) => console.log(error));
    }

    useEffect(() => {
        setUser(userStatus.user);
    }, [userStatus.user]); // Ensure user is updated properly
    
    useEffect(() => {
        const fetchData = async () => {
            await fetchIdea();
            if (!user || !userStatus.isAuthenticated) return; // Wait for user to be available
            await checkIsLiked();
        };
    
        fetchData();
    }, [user]); 

    // useEffect(() => {
    //     setUser(userStatus.user);
    //     setTimeout(async () => {
    //         await fetchIdea();
    //         // if(user?) {
    //         await checkIsLiked();
    //         // }
    //     }, 500)
    // }, [])

    return (
        <div className="idea-outer">
            <div className="idea-inner">
                {loading ? <IdeaPreviewSkeleton /> : <IdeaPreview ideaDetails={ideaDetails} previewType={"user"} isIdeaLiked={isLiked}/>}
            </div>
        </div>
    )
}

export default Idea;