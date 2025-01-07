import React, { useState } from "react";
import Autocomplete from '../Components/Autocomplete';
import { categories } from '../Constants/FilterElements'
import '../Styles/ideaeditor.css';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const IdeaEditor = () => {

    const [ summary, setSummary ] = useState("");
    const [ tags, setTags ] = useState([]);
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
        setSummary(value);
    };

    const addTag = () => {
        let tmpTags = new Set(tags);
        if (!tmpTags.has(newTag)) {
            setTags(oldTags => [...oldTags, newTag] );
            setNewTag("");
        }
    }

    const removeTag = (index) => {
        setTags([
            ...tags.slice(0, index),
            ...tags.slice(index + 1)
          ]);
    }

    return(
        <div className="idea-editor-outer">
            <div className="idea-editor-inner">

                <div className="header-section">
                    <h1 className="header-title" style={{marginTop: "0", color: "var(--accent-color)"}}>
                        Define Your Idea
                    </h1>
                    <p className="header-subtitle" style={{lineHeight: "25px"}}>
                        Give your idea a name, choose a category, and craft a concise description to set the stage.
                    </p>
                </div>

                <form action="" className="idea-form">
                    <p>Title</p>
                    <input type="text" className="idea-title" placeholder="Give your idea a captivating title"/>
                    <p>Category</p>
                    <Autocomplete suggestions={ categories } placeholder={"Select a category"} className="idea-category"/>
                    <p>Description</p>
                    <textarea className="idea-description" placeholder="Summarize your idea in a few sentences..."/>
                    <span>(Max 50 words)</span>
                    <p>Summary</p>
                    <ReactQuill theme="snow" modules={modules} value={summary} onChange={setSummary} className="idea-summary" />
                    <p>Tags</p>
                    <div className="tags-input">
                        <input type="text" value={newTag} className="idea-tags" placeholder="e.g., AI, Healthcare, Sustainability" style={{flexGrow: 3}} onChange={(e) => {setNewTag(e.target.value)}}/>
                        <div className="tags" style={{flexGrow: 3}}>
                        {tags.map((tag, index) => (
                            <span key={index} className="tag">{tag}<span style={{marginLeft: "10px", cursor: "pointer"}} onClick={() => {removeTag(index)}}><FontAwesomeIcon icon={faXmark} /></span></span>
                        ))}
                        </div>
                        <div className="primary-button" style={{flexGrow: 1}} onClick={addTag}>Add</div>
                    </div>
                    <div className="idea-buttons">
                        <button type="submit" className="post-button primary-button"><FontAwesomeIcon icon={faPaperPlane} style={{marginRight: "10px"}}/>  Post Idea</button>
                        <button type="submit" className="save-as-draft-button primary-button"><FontAwesomeIcon icon={faFloppyDisk} style={{marginRight: "10px"}}/>  Save Draft</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
        

export default IdeaEditor;