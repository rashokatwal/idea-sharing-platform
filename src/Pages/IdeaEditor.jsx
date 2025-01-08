import React, { useState } from "react";
// import Autocomplete from '../Components/Autocomplete';
// import { categories } from '../Constants/FilterElements'
import '../Styles/ideaeditor.css';
// import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
// import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
// import { faXmark } from '@fortawesome/free-solid-svg-icons';
import PageOne from "../Components/PageOne";
import PageTwo from "../Components/PageTwo";
import PageThree from "../Components/PageThree";

const IdeaEditor = () => {

    const [page, setPage] = useState(1);

    const [ ideaDetails, setIdeasDetails ] = useState({
        title: "",
        category: "",
        description: "",
        summary: "",
        tags: [],
    })

    const nextPage = () => setPage((prev) => prev + 1);
    const prevPage = () => setPage((prev) => prev - 1);   

    return(
        <div className="idea-editor-outer">
            <div className="idea-editor-inner">
                <div className="idea-form">
                    {page === 1 && <PageOne ideaDetails={ideaDetails} setIdeasDetails={setIdeasDetails} nextPage={nextPage}/>}
                    {page === 2 && <PageTwo ideaDetails={ideaDetails} setIdeasDetails={setIdeasDetails} nextPage={nextPage} prevPage={prevPage}/>}
                    {page === 3 && <PageThree ideaDetails={ideaDetails} setIdeasDetails={setIdeasDetails} prevPage={prevPage}/>}
                </div>
            </div>
        </div>
    )
}
        

export default IdeaEditor;