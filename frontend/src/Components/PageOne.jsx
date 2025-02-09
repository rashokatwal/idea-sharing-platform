import React, { useState } from "react";
import Autocomplete from '../Components/Autocomplete';
import { categories } from '../Helpers/FilterElements';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ScrollToTop from "./ScrollToTop";
import { useLoadingBar } from '../Hooks/useLoadingBar';
// import { useNavigate } from 'react-router-dom';
import api from "../Helpers/api";

const PageOne = ({ changePages }) => {
    const loadingBarRef = useLoadingBar();
    // const navigate = useNavigate();
    const sessionIdea = JSON.parse(sessionStorage.getItem("sessionIdea")) || null;
    // const [ ideaDetails, setIdeaDetails ] = useState(sessionIdea || {title: "", category: "", description: ""});
    const [titleChars, setTitleChars] = useState({
        value: sessionIdea ? sessionIdea.title : "",
        valid: sessionIdea ? sessionIdea.title.trim().length > 0 : false,
        outline: "none",
    });
    const [ categoryChars, setCategoryChars ] = useState({
        value: sessionIdea ? sessionIdea.category : "", 
        valid: sessionIdea ? sessionIdea.category.trim().length > 0 && categories.includes(sessionIdea.category) : false, 
        outline: "none"
    });
    const [ descriptionChars, setDescriptionChars ] = useState({
        value: sessionIdea ? sessionIdea.description : "",
        valid: sessionIdea ? sessionIdea.description.trim().length > 0 : false, 
        outline: "none"
    });
    const [ valid, setValid ] = useState(titleChars.valid && categoryChars.valid && descriptionChars.valid);

    const handletitle = (value) => {
        // const updatedDetails = { ...ideaDetails, title: value };
        // setIdeaDetails(updatedDetails);
        const isTitleValid = value.trim().length > 0;
        setTitleChars({
            value: value,
            valid: isTitleValid,
            outline: isTitleValid ? "none" : "red solid 2px",
        });

        const isValid = isTitleValid && categoryChars.valid && descriptionChars.valid;
        setValid(isValid);
    };

    const handlecategory = (value) => {
        // const updatedDetails = { ...ideaDetails, category: value };
        // setIdeaDetails(updatedDetails);
        const isCategoryValid = (value.trim().length > 0) && categories.includes(value);
        setCategoryChars({
            value: value,
            valid: isCategoryValid,
            outline: isCategoryValid ? "none" : "red solid 2px",
        });

        const isValid = titleChars.valid && isCategoryValid && descriptionChars.valid;
        setValid(isValid);
    };

    const handleDescription = (value) => {
        // const updatedDetails = { ...ideaDetails, description: value };
        // setIdeaDetails(updatedDetails);
        const isDescriptionValid = value.trim().length > 0;
        setDescriptionChars({
            value: value,
            valid: isDescriptionValid,
            outline: isDescriptionValid ? "none" : "red solid 2px",
        });

        const isValid = titleChars.valid && categoryChars.valid && isDescriptionValid;
        setValid(isValid);
    };

    const checkForChanges = () => {
        return titleChars.value == sessionIdea.title && categoryChars.value == sessionIdea.category && descriptionChars.value == sessionIdea.description ? false : true;
    }

    const validate = async() => {
        const isTitleValid = titleChars.value.trim().length > 0;
        const isCategoryValid = (categoryChars.value.trim().length > 0) && categories.includes(categoryChars.value);
        const isDescriptionValid = descriptionChars.value.trim().length > 0;

        setTitleChars({...titleChars, valid: isTitleValid, outline: isTitleValid ? "none" : "red solid 2px" });
        setCategoryChars({...categoryChars, valid: isCategoryValid, outline: isCategoryValid ? "none" : "red solid 2px" });
        setDescriptionChars({...descriptionChars, valid: isDescriptionValid, outline: isDescriptionValid ? "none" : "red solid 2px" });
        setValid(isTitleValid && isCategoryValid && isDescriptionValid);
        valid ? await saveData() : null;
    }

    const saveData = async() => {
        loadingBarRef.current.continuousStart();
        if(sessionIdea == null) {
            await api.post('/idea',
                { title: titleChars.value, category: categoryChars.value, description: descriptionChars.value, author: "Jon Doe" }
            )
            .then((response) => {
                let ideaDetails = response.data;
                ideaDetails.title = titleChars.value;
                ideaDetails.category = categoryChars.value;
                ideaDetails.description = descriptionChars.value;
                sessionStorage.setItem("sessionIdea", JSON.stringify(ideaDetails));
                // navigate('/ideaeditor/p/2');
                changePages(2);
                loadingBarRef.current.complete();
            })
            .catch((error) => console.log(error));
        } 
        else {
            if(checkForChanges()) {
                await api.patch(`/idea/${sessionIdea._id}`,
                    { title: titleChars.value, category: categoryChars.value, description: descriptionChars.value, author: "Jon Doe" }
                )
                .then((response) => {
                    let ideaDetails = response.data;
                    ideaDetails.title = titleChars.value;
                    ideaDetails.category = categoryChars.value;
                    ideaDetails.description = descriptionChars.value;
                    sessionStorage.setItem("sessionIdea", JSON.stringify(ideaDetails));
                    // navigate('/ideaeditor/p/2');
                    changePages(2);
                    loadingBarRef.current.complete();
                })
                .catch((error) => console.log(error))
            }
            else{
                // navigate('/ideaeditor/p/2');
                // loadingBarRef.current.continuousStart();
                changePages(2);
                setTimeout(() =>{
                    loadingBarRef.current.complete();
                }, 500)
            }
        }
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
            <input type="text" className="idea-title" value={titleChars.value} style={{outline: titleChars.outline}} placeholder="Give your idea a captivating title" onChange={(e) => handletitle(e.target.value)}/>
            <p className="labels">Category</p>
            <Autocomplete suggestions={ categories } placeholder={"Select a category"} outline={ categoryChars.outline } value={categoryChars.value} className="idea-category" onChange={handlecategory}/>
            <p className="labels">Description</p>
            <textarea style={{outline: descriptionChars.outline}} className="idea-description" value={descriptionChars.value} placeholder="Summarize your idea in a few sentences..." onChange={(e) => handleDescription(e.target.value)}/>
            <div className="next-prev-buttons">
                <button className="primary-button" onClick={validate}>Continue <FontAwesomeIcon icon="fa-solid fa-arrow-right"/></button>
            </div>
        </div>
    )
}

export default PageOne;