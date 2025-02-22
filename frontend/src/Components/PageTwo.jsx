import React, { useState, useEffect } from "react";
import ReactQuill from 'react-quill-new';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ScrollToTop from "./ScrollToTop";
import { useLoadingBar } from '../Hooks/useLoadingBar';
import api from "../Helpers/api";

const PageTwo = ({ changePages }) => {
    // const navigate = useNavigate();
    const loadingBarRef = useLoadingBar();
    const sessionIdea = JSON.parse(sessionStorage.getItem("sessionIdea")) || null;
    // const { summary, tags } = ideaDetails;
    const [ summaryChars, setSummaryChars ] = useState({
        value: sessionIdea ? sessionIdea.summary : "",
        // valid: sessionIdea ? sessionIdea.summary.trim().length > 0 : false, 
        outline: "none"
    });
    const [ tags, setTags ] = useState(sessionIdea ? sessionIdea.tags : []);
    // const [ valid, setValid ] = useState(summaryChars.valid);
    const [ newTag, setNewTag ] = useState("");

    // useEffect(() => {
    //     if (!sessionIdea) {
    //         navigate(-1);
    //     }
    //     // console.log(sessionIdea);
    // }, [sessionIdea, navigate]);

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
        // const updatedDetails = { ...ideaDetails, summary: value };
        // setIdeaDetails(updatedDetails);
        const isSummaryValid = value.replace(/<[^>]*>/g, '').trim().length > 0;
        setSummaryChars({
            value: value,
            // valid: isSummaryValid,
            outline: isSummaryValid ? "none" : "red solid 2px",
        });
    };

    const addTag = () => {
        let tmpTags = new Set(tags);
        if (!tmpTags.has(newTag)) {
            setTags( [...tags, newTag] );
            setNewTag("");
        }
    }

    const removeTag = (index) => {
        setTags([
            ...tags.slice(0, index),
            ...tags.slice(index + 1)
          ]); 
    }

    const validate = async () => {
        const isSummaryValid = summaryChars.value.trim().length > 0;
        // console.log("validated")
        setSummaryChars({...summaryChars, outline: isSummaryValid ? "none" : "red solid 2px" });
        // setValid(isSummaryValid);
        isSummaryValid ? await updateData() : null;
    }

    const checkForChanges = () => {
        // console.log(tags == sessionIdea.tags);
        return summaryChars.value == sessionIdea.summary && JSON.stringify(tags) == JSON.stringify(sessionIdea.tags) ? false : true;
    }

    const updateData = async () => {
        // console.log('updateData called')
        loadingBarRef.current.continuousStart();
        if(sessionIdea == null || checkForChanges()) {
            await api.patch(`/idea/${sessionIdea._id}`,
                {"summary": summaryChars.value, "tags": tags}
            )
            .then((response) => {
                let ideaDetails = response.data;
                ideaDetails.summary = summaryChars.value;
                ideaDetails.tags = tags;
                sessionStorage.setItem("sessionIdea", JSON.stringify(ideaDetails));
                // navigate('/ideaeditor/p/3');
                changePages(3);
                loadingBarRef.current.complete();
            })
            .catch((error) => console.log(error));
        }
        else {
            // navigate('/ideaeditor/p/3');
            changePages(3);
            setTimeout(() =>{
                loadingBarRef.current.complete();
            }, 500)
        }
    }

    const prevPage = () => {
        // navigate(-1);
        loadingBarRef.current.continuousStart();
        changePages(1);
        setTimeout(() =>{
            loadingBarRef.current.complete();
        }, 500)
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
            <ReactQuill modules={modules} value={summaryChars.value} onChange={handlesummary} className="idea-summary" style={{outline: summaryChars.outline}}/>
            <p className="labels">Tags</p>
            <div className="tags-input">
                <input type="text" value={newTag} className="idea-tags" placeholder="e.g., AI, Healthcare, Sustainability" style={{flexGrow: 3}} onChange={(e) => {setNewTag(e.target.value)}} onKeyDown={(e)=> e.key == 'Enter' ? addTag() : ''}/>
                <div className="tags" style={{flexGrow: 3}}>
                {tags.map((tag, index) => (
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