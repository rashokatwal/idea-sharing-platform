import React, { useState } from "react";
import Autocomplete from '../Components/Autocomplete';
import { categories } from '../Constants/FilterElements'
import '../Styles/ideaeditor.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const IdeaEditor = () => {

    const [ summary, setSummary ] = useState("");

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

    const handleChange = (value) => {
        setSummary(value);
    };

    return(
        <div className="idea-editor-outer">
            <div className="idea-editor-inner">
                <div className="header-section">
                    <h2 className="header-title">
                        Share Your Idea
                    </h2>
                    <p className="header-subtitle">
                        Summarize your idea and expand it with details to inspire others!
                    </p>
                </div>

                <form action="" className="idea-form">
                    <p>Title</p>
                    <input type="text" className="idea-title" placeholder="Give your idea a captivating title"/>
                    <p>Category</p>
                    <Autocomplete suggestions={ categories } placeholder={"Select a category"}/>
                    <p>Description</p>
                    <textarea className="idea-description" placeholder="Summarize your idea in a few sentences..."/>
                    <span>(Max 150 words)</span>
                    <p>Summary</p>
                    <ReactQuill theme="snow" modules={modules} value={summary} onChange={setSummary} className="idea-summary" />
                    <p>Tags</p>
                    <input type="text" className="idea-tags"/>
                    <div className="tags">

                    </div>
                    <div className="idea-buttons">
                        <button type="submit" className="post-button primary-button">Post Idea</button>
                        <button type="submit" className="save-as-draft-button primary-button">Save as Draft</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
        

export default IdeaEditor;