import { useState, useEffect } from 'react';
import Filter from "../Components/Filter";
import ListComponent from "../Components/ListComponent";
import '../Styles/explore.css';
import CardComponent from '../Components/CardComponent';
import { Link } from 'react-router-dom';
import axios from 'axios';
import IdeasSkeleton from '../Components/IdeasSkeleton';

const Explore = () => {
    const [ loading, setLoading ] = useState(true);
    const [ viewType, setViewType ] = useState("grid");
    const handleCallback = (childData) => {
        setViewType(childData);
    };
    const [ ideas, setIdeas ] = useState([]);

    const fetchIdeas = async () => {
        await axios
            .get("http://localhost:3000/ideas")
            .then((response) => {
                setIdeas(response.data);
                setLoading(false);
            })
            .catch((error) => console.log(error));
    }
    
    useEffect(() => {
        setTimeout(() => {
            fetchIdeas();
        }, 2000)
    }, [])

    return (
        <div className="Explore">
            <Filter parentCallback={ handleCallback }/>
            <div className="ideas-section-outer">
                <div className={viewType === "grid" ? "ideas-section-inner card-grid" : "ideas-section-inner list-view"}>
                    {
                        loading ? Array.from({ length: 9 }).map((_, index) => (
                            <IdeasSkeleton key={index} viewType={viewType}/>
                          )) 
                          : ideas.map((idea) => (
                            viewType === "grid" ? <Link to={"/idea/" + idea._id} key={idea._id}><CardComponent idea={idea}/></Link> : <Link to={"/idea/" + idea._id} key={idea._id}><ListComponent idea={idea}/></Link>
                        ))
                    }

                </div>
            </div>
        </div>
    )
}

export default Explore;