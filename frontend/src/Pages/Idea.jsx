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
        console.log("fetching")
        await api
         .get(`/idea/${ideaId}`)
         .then((response) => {
            setIdeaDetails(response.data);
            // console.log("fetched");
            console.log(ideaDetails);
            // console.log(userStatus.isAuthenticated);
         })
         .catch((error) => console.log(error));
    }

    const checkIsLiked = async () => {
        await api
         .get(`/likedPosts/${user.username}`)
         .then((response) => {
            setIsLiked(response.data.includes(ideaId));
         })
         .catch((error) => console.log(error));
    }

    useEffect(() => {
        setUser(userStatus.user); // Update user state
    }, [userStatus.user]);
    
    useEffect(() => {
        const fetchData = async () => {
            await fetchIdea();
    
            if (userStatus.isAuthenticated == false) {
                setLoading(false); // Stop loading if user is not logged in
                return;
            }
    
            if (!user) return; // Ensure user is available
    
            await checkIsLiked();
            setLoading(false);
        };
    
        fetchData();
    }, [userStatus.isAuthenticated, user]); // Depend on authentication & user
    

    // useEffect(() => {
    //     const fetchData = async () => {
    //         await fetchIdea();
    
    //         if (!userStatus.isAuthenticated) {
    //             setLoading(false); // Stop loading if user is not logged in
    //             return;
    //         }
    
    //         await checkIsLiked();
    //         setLoading(false); // Stop loading after checking likes
    //     };
    
    //     fetchData();
    // }, [userStatus.isAuthenticated]);

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
                {loading ? <IdeaPreviewSkeleton /> : <IdeaPreview ideaDetails={ideaDetails} setIdeaDetails={setIdeaDetails} previewType={"user"} isIdeaLiked={isLiked}/>}
            </div>
        </div>
    )
}

export default Idea;