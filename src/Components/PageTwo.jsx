import React, { useState } from "react";
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import ScrollToTop from "./ScrollToTop";

const PageTwo = ({ ideaDetails, setIdeasDetails, nextPage, prevPage }) => {

    const [ newTag, setNewTag ] = useState("");

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'font': [] }],
            ['bold', 'italic', 'underline', 'strike'],    
            [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
            [{ 'script': 'sub'}, { 'script': 'super' }],
            [{ 'align': [] }],
            ['link', 'image', 'video', 'formula'],
          ]
    };

    const handlesummary = (value) => {
        setIdeasDetails({...ideaDetails, summary: value });
    };

    const addTag = () => {
        let tmpTags = new Set(ideaDetails.tags);
        if (!tmpTags.has(newTag)) {
            setIdeasDetails( {...ideaDetails, tags: [...ideaDetails.tags, newTag]} );
            setNewTag("");
        }
    }

    const removeTag = (index) => {
        setIdeasDetails({...ideaDetails, tags: [
            ...ideaDetails.tags.slice(0, index),
            ...ideaDetails.tags.slice(index + 1)
          ]}); 
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

            <p>Summary</p>
            <ReactQuill theme="snow" modules={modules} value={ideaDetails.summary} onChange={handlesummary} className="idea-summary" />
            <p>Tags</p>
            <div className="tags-input">
                <input type="text" value={newTag} className="idea-tags" placeholder="e.g., AI, Healthcare, Sustainability" style={{flexGrow: 3}} onChange={(e) => {setNewTag(e.target.value)}}/>
                <div className="tags" style={{flexGrow: 3}}>
                {ideaDetails.tags.map((tag, index) => (
                    <span key={index} className="tag">{tag}<span style={{marginLeft: "10px", cursor: "pointer"}} onClick={() => {removeTag(index)}}><FontAwesomeIcon icon={faXmark} /></span></span>
                ))}
                </div>
                <div className="primary-button add-tags-button" style={{flexGrow: 1}} onClick={addTag}><FontAwesomeIcon icon={faPlus} /></div>
            </div>
            <div className="next-prev-buttons">
                <button className="primary-button" onClick={() => prevPage(1)}><FontAwesomeIcon icon={faArrowLeft} /> Go Back</button>
                <button className="primary-button" onClick={() => nextPage(2)}>Continue <FontAwesomeIcon icon={faArrowRight} /></button>            
            </div>
        </div>
    )
}

export default PageTwo;