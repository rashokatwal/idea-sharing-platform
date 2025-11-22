import { useState } from 'react';
import Autocomplete from './Autocomplete';
import Dropdown from './Dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { categories, status, timePeriod, sortBy } from '../Helpers/constants';
import '../Styles/filter.css';

const Filter = ({ parentCallback }) => {
    const [typingTimeout, setTypingTimeout] = useState(null);
    const [ viewType, setViewType ] = useState("grid");

    const onTrigger = (changedData) => {
        parentCallback(changedData);
    }

    const handleCategory = (value) => {
        const handleStartTyping = () => {
            parentCallback({changedProperty: "category", value: value, typingStatus: "started"});
        };
    
        const handleStopTyping = () => {
            parentCallback({changedProperty: "category", value: value, typingStatus: "stopped"});
        };
        if (!typingTimeout) {
            handleStartTyping();
        }
    
        // Clear the previous timeout
        if (typingTimeout) {
            clearTimeout(typingTimeout);
        }
    
        // Set a new timeout to detect when the user stops typing
        const timeout = setTimeout(() => {
            handleStopTyping();
            setTypingTimeout(null); // Reset the timeout after stop typing fires
        }, 1000); // Adjust delay as needed (e.g., 1000ms =  1 second)
    
        setTypingTimeout(timeout);
    }

    const handleTimePeriod = (value) => {
        parentCallback({changedProperty: "timePeriod", value: value});
    }

    const handleStatus = (value) => {
        parentCallback({changedProperty: "status", value: value});
    }

    const handleSort = (value) => {
        parentCallback({changedProperty: "sortBy", value: value});
    }

    return (
        <div className="filter-outer">
            <div className="filter-inner">
                <Autocomplete suggestions={ categories } placeholder={ "Categories" } onChange={handleCategory} value={""}/>
                <Dropdown placeholder={ "Status" } suggestions={ status } onChange={handleStatus} clearButton={true}/>
                <Dropdown placeholder={ "Time Period" } suggestions={ timePeriod } onChange={handleTimePeriod} clearButton={true}/>
                <Dropdown placeholder={ "Sort By" } suggestions={ sortBy } onChange={handleSort} clearButton={true}/>
                <div className="view-type">
                    <FontAwesomeIcon icon="fa-solid fa-grip" size='lg' style={{transition: "0.2s", color: viewType == "grid" ? "var(--accent-color)" : "var(--text-color)"}} onClick={() => {onTrigger({changedProperty: "view", value: "grid"}); setViewType("grid")}}/>
                    <FontAwesomeIcon icon="fa-solid fa-list-ul" size='lg' style={{transition: "0.2s", color: viewType == "list" ? "var(--accent-color)" : "var(--text-color)"}} onClick={() => {onTrigger({changedProperty: "view", value: "list"}); setViewType("list")}}/>
                </div>
            </div>
        </div>
    )
}

export default Filter;
