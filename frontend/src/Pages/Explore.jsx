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
    const [ filterCategory, setFilterCategory ] = useState("");
    const [ filterTimePeriod, setTimePeriod ] = useState("");
    const [ filterStatus, setFilterStatus ] = useState("");
    const [ filterSortBy, setFilterSortBy ] = useState("");

    const handleCallback = (childData) => {
        switch(childData.changedProperty) {
            case "view":
                setViewType(childData.value);
                break;
            case "category":
                setFilterCategory(childData.value);
                break;
            case "timePeriod":
                setTimePeriod(childData.value);
                break;
            case "status":
                setFilterStatus(childData.value);
                break;
            case "sortBy":
                setFilterSortBy(childData.value);
                break;
        }
    };
    const [ ideas, setIdeas ] = useState([]);

    const fetchIdeas = async () => {
        await axios
            .get(`http://localhost:3000/ideas?popularity=${filterTimePeriod}&status=${filterStatus}&time=${filterSortBy}`)
            .then((response) => {
                setIdeas(response.data);
                setLoading(false);
                console.log("fetched")
            })
            .catch((error) => console.log(error));
    }
    
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            fetchIdeas();
        }, 2000)
    }, [filterTimePeriod, filterStatus, filterSortBy])

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