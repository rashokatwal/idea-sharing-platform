import { useState } from 'react';
import Filter from "../Components/Filter";
import ListComponent from "../Components/ListComponent";
import '../Styles/explore.css';
import { ideas } from '../data/ideas'
import CardComponent from '../Components/Cardcomponent';

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
                            viewType === "grid" ? <CardComponent prop={idea} key={idea.id}/> : <ListComponent prop={idea} key={idea.id}/>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Explore;