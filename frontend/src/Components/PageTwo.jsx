import React, { useState, useEffect } from "react";
import ReactQuill from 'react-quill-new';
// import 'react-quill-new/dist/quill.snow.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ScrollToTop from "./ScrollToTop";
import { useNavigate } from 'react-router-dom';
import { useLoadingBar } from '../Contexts/LoadingBarContext';
import axios from "axios";

const PageTwo = ({ ideaDetails, setIdeaDetails }) => {
    const navigate = useNavigate();
    const loadingBarRef = useLoadingBar();
    const sessionIdea = sessionStorage.getItem("sessionIdea");
    const { summary, tags } = ideaDetails;
    const [ summaryChars, setSummaryChars ] = useState({valid: ideaDetails.summary.trim().length > 0, outline: "none"});
    const [ valid, setValid ] = useState(summaryChars.valid);
    const [ newTag, setNewTag ] = useState("");

    useEffect(() => {
        if (!sessionIdea) {
            navigate(-1);
        }
        console.log(sessionIdea);
    }, [sessionIdea, navigate]);

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'font': [] }],
            ['bold', 'italic', 'underline', 'strike'],    
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'script': 'sub'}, { 'script': 'super' }],
            [{ 'align': [] }],
            [{ 'color': [] }, { 'background': [] }], 
            ['link', 'image', 'video', 'formula'],
          ]
    };

    const handlesummary = (value) => {
        const updatedDetails = { ...ideaDetails, summary: value };
        setIdeaDetails(updatedDetails);
        const isSummaryValid = value.replace(/<[^>]*>/g, '').trim().length > 0;
        setSummaryChars({
            valid: isSummaryValid,
            outline: isSummaryValid ? "none" : "red solid 2px",
        });
        setValid(isSummaryValid);
    };

    const addTag = () => {
        let tmpTags = new Set(ideaDetails.tags);
        if (!tmpTags.has(newTag)) {
            setIdeaDetails( {...ideaDetails, tags: [...ideaDetails.tags, newTag]} );
            setNewTag("");
        }
    }

    const removeTag = (index) => {
        setIdeaDetails({...ideaDetails, tags: [
            ...ideaDetails.tags.slice(0, index),
            ...ideaDetails.tags.slice(index + 1)
          ]}); 
    }

    const validate = async () => {
        const isSummaryValid = ideaDetails.summary.trim().length > 0;

        setSummaryChars({ valid: isSummaryValid, outline: isSummaryValid ? "none" : "red solid 2px" });
        setValid(isSummaryValid);
        valid ? await updateData() : null;
    }

    const updateData = async () => {
        loadingBarRef.current.continuousStart();
        await axios.patch(`http://localhost:3000/idea/${sessionIdea._id}`,
            {"summary": summary, "tags": tags}
        )
        .then((response) => {
            navigate('/ideaeditor/p/3');
            loadingBarRef.current.complete();
        })
        .catch((error) => console.log(error));
    }

    const prevPage = () => {
        navigate(-1);
    }
    
    return (
        <div className="page-two">
            <ScrollToTop />
            <div className="header-section">
                <h1 className="header-title" style={{marginTop: "0", color: "var(--accent-color)"}}>
                    Add More Details
                </h1>
                <p className="header-subtitle" style={{lineHeight: "25px"}}>
                    Expand on your idea with a detailed summary and relevant tags to refine its focus.
                </p>
            </div>

            <p className="labels">Summary</p>
            <ReactQuill modules={modules} value={ideaDetails.summary} onChange={handlesummary} className="idea-summary" style={{outline: summaryChars.outline}}/>
            <p className="labels">Tags</p>
            <div className="tags-input">
                <input type="text" value={newTag} className="idea-tags" placeholder="e.g., AI, Healthcare, Sustainability" style={{flexGrow: 3}} onChange={(e) => {setNewTag(e.target.value)}} onKeyDown={(e)=> e.key == 'Enter' ? addTag() : ''}/>
                <div className="tags" style={{flexGrow: 3}}>
                {ideaDetails.tags.map((tag, index) => (
                    <span key={index} className="tag" style={{fontWeight: "600"}}>"{tag.toUpperCase()}"<span style={{marginLeft: "10px", cursor: "pointer"}} onClick={() => {removeTag(index)}}><FontAwesomeIcon icon="fa-solid fa-xmark" /></span></span>
                ))}
                </div>
                <div className="primary-button add-tags-button" style={{flexGrow: 1}} onClick={addTag}><FontAwesomeIcon icon="fa-solid fa-plus" /></div>
            </div>
            <div className="next-prev-buttons">
                <button className="primary-button" onClick={prevPage}><FontAwesomeIcon icon="fa-solid fa-arrow-left" /> Go Back</button>
                <button className="primary-button" onClick={validate}>Continue <FontAwesomeIcon icon="fa-solid fa-arrow-right" /></button>            
            </div>
        </div>
    )
}

export default PageTwo;