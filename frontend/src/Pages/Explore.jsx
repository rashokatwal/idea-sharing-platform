import { useState } from 'react';
import Filter from "../Components/Filter";
import ListComponent from "../Components/ListComponent";
import '../Styles/explore.css';
import { ideas } from '../data/ideas'
import CardComponent from '../Components/Cardcomponent';
import { Link } from 'react-router-dom';

const Explore = () => {
    const [ viewType, setViewType ] = useState("grid");
    const handleCallback = (childData) => {
        setViewType(childData);
    };

    return (
        <div className="Explore">
            <Filter parentCallback={ handleCallback }/>
            <div className="ideas-section-outer">
                <div className={viewType === "grid" ? "ideas-section-inner card-grid" : "ideas-section-inner list-view"}>
                    {
                        ideas.map((idea) => (
                            viewType === "grid" ? <Link to={"/idea/" + idea.id} key={idea.id}><CardComponent prop={idea}/></Link> : <Link to={"/idea/" + idea.id} key={idea.id}><ListComponent prop={idea}/></Link>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Explore;