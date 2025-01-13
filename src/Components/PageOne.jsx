import React, { useState } from "react";
import Autocomplete from '../Components/Autocomplete';
import { categories } from '../Constants/FilterElements';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import ScrollToTop from "./ScrollToTop";
import { Link } from "react-router-dom";

const PageOne = ({ ideaDetails, setIdeaDetails }) => {
    const [ titleChars, setTitleChars ] = useState({valid: false, outline: "none"});
    const [ categoryChars, setCategoryChars ] = useState({valid: false, outline: "none"});
    const [ descriptionChars, setDescriptionChars ] = useState({valid: false, outline: "none"});
    const [ valid, setValid ] = useState(false);

    const handletitle = (value) => {
        setIdeaDetails({...ideaDetails, title: value });
        ideaDetails.title.length > 0 ? setTitleChars({valid: true, outline: "none"}) : setTitleChars({valid: false, outline: "red solid 2px"});
        setValid(titleChars.valid && categoryChars.valid && descriptionChars.valid);
    };

    const handlecategory = (value) => {
        setIdeaDetails({...ideaDetails, category: value });
        ideaDetails.category.length > 0 ? setCategoryChars({valid: true, outline: "none"}) : setCategoryChars({valid: false, outline: "red solid 2px"});
    };

    const handleDescription = (value) => {
        setIdeaDetails({...ideaDetails, description: value });
        ideaDetails.description.length > 0 ? setDescriptionChars({valid: true, outline: "none"}) : setDescriptionChars({valid: false, outline: "red solid 2px"});
    };

    const validate = () => {
        ideaDetails.title.length > 0 ? setTitleChars({valid: true, outline: "none"}) : setTitleChars({valid: false, outline: "red solid 2px"});
        ideaDetails.category.length > 0 ? setCategoryChars({valid: true, outline: "none"}) : setCategoryChars({valid: false, outline: "red solid 2px"});
        ideaDetails.description.length > 0 ? setDescriptionChars({valid: true, outline: "none"}) : setDescriptionChars({valid: false, outline: "red solid 2px"});
        setValid(titleChars.valid && categoryChars.valid && descriptionChars.valid);
    }

    return (
        <div className="page-one">
            <ScrollToTop />
            <div className="header-section">
                <h1 className="header-title" style={{marginTop: "0", color: "var(--accent-color)"}}>
                    Define Your Idea
                </h1>
                <p className="header-subtitle" style={{lineHeight: "25px"}}>
                    Give your idea a name, choose a category, and craft a concise description to set the stage.
                </p>
            </div>

            <p className="labels">Title</p>
            <input type="text" className="idea-title" style={{outline: titleChars.outline}} placeholder="Give your idea a captivating title" onChange={(e) => handletitle(e.target.value)}/>
            <p className="labels">Category</p>
            <Autocomplete suggestions={ categories } placeholder={"Select a category"} outline={ categoryChars.outline } value={ideaDetails.category} className="idea-category" onChange={handlecategory}/>
            <p className="labels">Description</p>
            <textarea style={{outline: descriptionChars.outline}} className="idea-description" placeholder="Summarize your idea in a few sentences..." onChange={(e) => handleDescription(e.target.value)}/>
            {/* <span>(Max 50 words)</span> */}
            <div className="next-prev-buttons">
                <Link to={valid ? "/ideaeditor/p/2" : ""} className="primary-button" onClick={validate}>Continue <FontAwesomeIcon icon={faArrowRight}/></Link>
            </div>
        </div>
    )
}

export default PageOne;