import React, { useEffect, useState } from "react";
import '../Styles/ideaeditor.css';
import 'react-quill-new/dist/quill.snow.css';
import PageOne from "../Components/PageOne";
import PageTwo from "../Components/PageTwo";
import PageThree from "../Components/PageThree";
import { useLocation } from 'react-router-dom';

const IdeaEditor = () => {
    const location = useLocation();
    let page = Number(location.pathname.split('/').pop()) || 1;
    useEffect(() => {
        page = Number(location.pathname.split('/').pop());
    })

    const [ ideaDetails, setIdeaDetails ] = useState({
        title: "",
        description: "",
        category: "",
        summary: "",
        tags: [],
        author: "Jon Doe",
        status: "Draft",
        likes: 0,
        comments: 0,
        reads: 0,
        lastUpdatedOn: "",
        postedOn: ""
    })

    // const setDateTime = () => {
    //     const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    //     let date = new Date();
    //     let hour = date.getHours();
    //     setIdeaDetails({...ideaDetails, updatedDate: `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`, updatedTime: `${String(hour > 12 || hour == 0 ? Math.abs(hour - 12) : hour).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')} ${hour > 12 ? "PM" : "AM"}` });
    // }

    // useEffect(() => {
    //     setDateTime();
    // }, [location.pathname])  

    return(
        <div className="idea-editor-outer">
            <div className="idea-editor-inner">
                <div className="idea-form">
                    {page === 1 && <PageOne ideaDetails={ideaDetails} setIdeaDetails={setIdeaDetails}/>}
                    {page === 2 && <PageTwo ideaDetails={ideaDetails} setIdeaDetails={setIdeaDetails}/>}
                    {page === 3 && <PageThree ideaDetails={ideaDetails} setIdeaDetails={setIdeaDetails}/>}
                </div>
            </div>
        </div>
    )
}
        

export default IdeaEditor;