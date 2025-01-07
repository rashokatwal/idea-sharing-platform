import Autocomplete from '../Components/Autocomplete';
import { categories } from '../Constants/FilterElements'

const PageOne = () => {
    return (
        <div className="page-one">
            <div className="header-section">
                <h1 className="header-title" style={{marginTop: "0", color: "var(--accent-color)"}}>
                    Define Your Idea
                </h1>
                <p className="header-subtitle" style={{lineHeight: "25px"}}>
                    Give your idea a name, choose a category, and craft a concise description to set the stage.
                </p>
            </div>

            <p>Title</p>
            <input type="text" className="idea-title" placeholder="Give your idea a captivating title"/>
            <p>Category</p>
            <Autocomplete suggestions={ categories } placeholder={"Select a category"} className="idea-category"/>
            <p>Description</p>
            <textarea className="idea-description" placeholder="Summarize your idea in a few sentences..."/>
            <span>(Max 50 words)</span>
        </div>
    )
}

export default PageOne;