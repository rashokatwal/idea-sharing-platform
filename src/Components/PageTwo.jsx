import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const PageTwo = (props) => {
    let summary = props.summary;
    let modules = props.modules;
    let handlesummary = props.handlesummary;
    let tags = props.tags;
    let newTag = props.newTag;
    let addTag = props.addTag;
    let removeTag = props.removeTag;
    
    return (
        <div className="page-two">
            <div className="header-section">
                <h1 className="header-title" style={{marginTop: "0", color: "var(--accent-color)"}}>
                    Add More Details
                </h1>
                <p className="header-subtitle" style={{lineHeight: "25px"}}>
                    Expand on your idea with a detailed summary and relevant tags to refine its focus.
                </p>
            </div>

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
        </div>
    )
}

export default PageTwo;