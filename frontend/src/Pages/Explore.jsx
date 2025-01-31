import { useState, useEffect, useCallback } from 'react';
import Filter from "../Components/Filter";
import ListComponent from "../Components/ListComponent";
import '../Styles/explore.css';
import CardComponent from '../Components/CardComponent';
import { Link } from 'react-router-dom';
// import axios from 'axios';
import IdeasSkeleton from '../Components/IdeasSkeleton';
import api from '../Helpers/api';
// import { throttleFunction } from '../Helpers/throttleUtil';

const Explore = () => {
    const [ loading, setLoading ] = useState(true);
    const [ viewType, setViewType ] = useState("grid");
    const [ filterCategory, setFilterCategory ] = useState("");
    const [ filterTimePeriod, setTimePeriod ] = useState("");
    const [ filterStatus, setFilterStatus ] = useState("");
    const [ filterSortBy, setFilterSortBy ] = useState("");
    const [ typingStatus, setTypingStatus ] = useState("");
    let errorCode = null;

    const handleCallback = (childData) => {
        switch(childData.changedProperty) {
            case "view":
                setViewType(childData.value);
                break;
            case "category":
                setTypingStatus(childData.typingStatus);
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
        await api
            .get(`/ideas?category=${filterCategory}&timePeriod=${filterTimePeriod}&status=${filterStatus}&time=${filterSortBy}`)
            .then((response) => {
                setIdeas(response.data);
                setLoading(false);
                console.log("fetched")
            })
            .catch((error) => {
                setLoading(false);
                errorCode = error.code;
            });
    }

    // const throttledFetchIdeas = useCallback(
    //     throttleFunction(() => {
    //         setLoading(true);
    //         setTimeout(() => {
    //             fetchIdeas();
    //         }, 2000)
    //     }, 2000),
    //     [] // Ensures the throttle function doesn't get recreated on re-renders
    // );
    
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            fetchIdeas();
        }, 1000)
    }, [filterTimePeriod, filterStatus, filterSortBy])

    useEffect(() => {
        if(typingStatus == "started") {
            setLoading(true);
        }
        if(typingStatus == "stopped") {
            fetchIdeas();
        }
    }, [typingStatus])

    return (
        <div className="Explore">
            <Filter parentCallback={ handleCallback }/>
            <div className="ideas-section-outer">
                <div className={viewType === "grid" ? "ideas-section-inner card-grid" : "ideas-section-inner list-view"}>
                    {
                        loading ? Array.from({ length: 9 }).map((_, index) => (
                            <IdeasSkeleton key={index} viewType={viewType}/>
                          )) 
                          : ideas.length > 0 ? ideas.map((idea) => (
                                viewType === "grid" ? <Link to={"/idea/" + idea._id} key={idea._id}><CardComponent idea={idea}/></Link> : <Link to={"/idea/" + idea._id} key={idea._id}><ListComponent idea={idea}/></Link>
                            ))
                            : <div className="exception">
                                    <img src="./src/Assets/broken-lightbulb.png"/>
                                    <h3>No sparks here!</h3><span>Try searching something else.</span>
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Explore;