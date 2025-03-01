import { useState, useEffect, useRef } from 'react';
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
    const [ ideas, setIdeas ] = useState([]);
    const [ viewType, setViewType ] = useState("grid");
    const [ filterCategory, setFilterCategory ] = useState("");
    const [ filterTimePeriod, setTimePeriod ] = useState("");
    const [ filterStatus, setFilterStatus ] = useState("");
    const [ filterSortBy, setFilterSortBy ] = useState("");
    const [ typingStatus, setTypingStatus ] = useState("");
    const [ page, setPage ] = useState(0);    
    const divRef = useRef(null);
    const [isBottom, setIsBottom] = useState(false);
    const [allFilesFetched, setAllFilesFetched] = useState(false);
    // const bottomRef = useRef(null);
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

    const fetchIdeas = async (fetchType, newPage) => {
        await api
            .get(`/ideas?category=${filterCategory}&timePeriod=${filterTimePeriod}&status=${filterStatus}&time=${filterSortBy}&page=${newPage}`)
            .then((response) => {
                const fetchedIdeas = response.data.ideas;
                if(fetchType === "normal") {
                    setIdeas(fetchedIdeas);
                } else {
                    const updatedIdeas = ideas.concat(fetchedIdeas);
                    setIdeas(updatedIdeas);
                }
                console.log("fetched");
                console.log(response.data);
                setAllFilesFetched(response.data.allFilesFetched);
                setLoading(false);
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
        const handleScroll = () => {
            if (!divRef.current) return;

            const rect = divRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            if (rect.bottom <= windowHeight && !isBottom) {
                setIsBottom(true);
                setPage(prevPage => {
                    const newPage = prevPage + 1;
                    setTimeout(() => {
                        fetchIdeas("scroll", newPage).finally(() => {
                            setIsBottom(false);
                        });
                    }, 1000)
                    return newPage; // Ensure the state is updated
                });
            }
            if (allFilesFetched) {
                window.removeEventListener("scroll", handleScroll);
            }
        };

        if (!loading) {
            window.addEventListener("scroll", handleScroll);
        }
        return () => window.removeEventListener("scroll", handleScroll);
    }, [fetchIdeas, isBottom, allFilesFetched]);
    
    useEffect(() => {
        setLoading(true);
        setAllFilesFetched(false);
        setPage(0);
        setTimeout(() => {
            fetchIdeas("normal", 0);
        }, 1000)
    }, [filterTimePeriod, filterStatus, filterSortBy])

    useEffect(() => {
        if(typingStatus == "started") {
            setLoading(true);
            setAllFilesFetched(false);
            setPage(0);
        }
        if(typingStatus == "stopped") {
            fetchIdeas("normal", 0);
        }
    }, [typingStatus])

    return (
        <div className="Explore">
            <Filter parentCallback={ handleCallback }/>
            <div className="ideas-section-outer">
                <div className={viewType === "grid" ? "ideas-section-inner card-grid" : "ideas-section-inner list-view"} ref={divRef}>
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
                    {isBottom && !allFilesFetched && ideas.length > 0 && Array.from({ length: 3 }).map((_, index) => (
                            <IdeasSkeleton key={index} viewType={viewType}/>
                          )) }
                    {/* <span ref={bottomRef} style={{ height: "0px", width: "0px"}}></span> */}
                </div>
            </div>
        </div>
    )
}

export default Explore;