import React, { useState } from "react";
import Autocomplete from '../Components/Autocomplete';
import { categories } from '../Constants/FilterElements';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ScrollToTop from "./ScrollToTop";
import { useLoadingBar } from '../Contexts/LoadingBarContext';
import { useNavigate } from 'react-router-dom';

const PageOne = ({ ideaDetails, setIdeaDetails }) => {
    const loadingBarRef = useLoadingBar();
    const navigate = useNavigate();
    const [ titleChars, setTitleChars ] = useState({valid: ideaDetails.title.trim().length > 0, outline: "none"});
    const [ categoryChars, setCategoryChars ] = useState({valid: ideaDetails.category.trim().length > 0 && categories.includes(ideaDetails.category), outline: "none"});
    const [ descriptionChars, setDescriptionChars ] = useState({valid: ideaDetails.description.trim().length > 0, outline: "none"});
    const [ valid, setValid ] = useState(titleChars.valid && categoryChars.valid && descriptionChars.valid);

    const handletitle = (value) => {
        const updatedDetails = { ...ideaDetails, title: value };
        setIdeaDetails(updatedDetails);
        const isTitleValid = value.trim().length > 0;
        setTitleChars({
            valid: isTitleValid,
            outline: isTitleValid ? "none" : "red solid 2px",
        });

        const isValid = isTitleValid && categoryChars.valid && descriptionChars.valid;
        setValid(isValid);
    };

    const handlecategory = (value) => {
        const updatedDetails = { ...ideaDetails, category: value };
        setIdeaDetails(updatedDetails);
        const isCategoryValid = (value.trim().length > 0) && categories.includes(value);
        setCategoryChars({
            valid: isCategoryValid,
            outline: isCategoryValid ? "none" : "red solid 2px",
        });

        const isValid = titleChars.valid && isCategoryValid && descriptionChars.valid;
        setValid(isValid);
    };

    const handleDescription = (value) => {
        const updatedDetails = { ...ideaDetails, description: value };
        setIdeaDetails(updatedDetails);
        const isDescriptionValid = value.trim().length > 0;
        setDescriptionChars({
            valid: isDescriptionValid,
            outline: isDescriptionValid ? "none" : "red solid 2px",
        });

        const isValid = titleChars.valid && categoryChars.valid && isDescriptionValid;
        setValid(isValid);
    };

    const validate = async() => {
        const isTitleValid = ideaDetails.title.trim().length > 0;
        const isCategoryValid = (ideaDetails.category.trim().length > 0) && categories.includes(ideaDetails.category);
        const isDescriptionValid = ideaDetails.description.trim().length > 0;

        setTitleChars({ valid: isTitleValid, outline: isTitleValid ? "none" : "red solid 2px" });
        setCategoryChars({ valid: isCategoryValid, outline: isCategoryValid ? "none" : "red solid 2px" });
        setDescriptionChars({ valid: isDescriptionValid, outline: isDescriptionValid ? "none" : "red solid 2px" });
        setValid(isTitleValid && isCategoryValid && isDescriptionValid);
        if (valid) {
            await saveData();
        }
    }

    const saveData = async() => {

        loadingBarRef.current.continuousStart();
        setTimeout(() => {
            loadingBarRef.current.complete();
            // setIdeaDetails({ title: "", category: "", description: "" });
            console.log("Idea saved successfully!");
            navigate("/ideaeditor/p/2");
        }, 5000);
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
            <input type="text" className="idea-title" value={ideaDetails.title} style={{outline: titleChars.outline}} placeholder="Give your idea a captivating title" onChange={(e) => handletitle(e.target.value)}/>
            <p className="labels">Category</p>
            <Autocomplete suggestions={ categories } placeholder={"Select a category"} outline={ categoryChars.outline } value={ideaDetails.category} className="idea-category" onChange={handlecategory}/>
            <p className="labels">Description</p>
            <textarea style={{outline: descriptionChars.outline}} className="idea-description" value={ideaDetails.description} placeholder="Summarize your idea in a few sentences..." onChange={(e) => handleDescription(e.target.value)}/>
            <div className="next-prev-buttons">
                <button className="primary-button" onClick={validate}>Continue <FontAwesomeIcon icon="fa-solid fa-arrow-right"/></button>
            </div>
        </div>
    )
}

export default PageOne;