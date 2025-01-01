import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown } from '@fortawesome/free-solid-svg-icons';

const Dropdown = ({ suggestions, placeholder }) => {
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const handleSelect = (value) => {
        setInputValue(value);
        // setTimeout(() =>setFilteredSuggestions([]), 1000);
        setFilteredSuggestions([]);
    };
    
    return(
        <div style={{position: "relative"}}>
            <div className="dropdown-container" onClick={() => setFilteredSuggestions(suggestions)}>
                <input
                 className="dropdown-input"
                 type="text"
                 value={inputValue}
                 placeholder={placeholder}
                 readOnly="true"
                />
                <FontAwesomeIcon icon={faSortDown} />
            </div>
            <ul className="dropdown-list">
                {filteredSuggestions.map((suggestion, index) => (
                <li key={index} className="dropdown-item" onClick={() => handleSelect(suggestion)}>
                    {suggestion}
                </li>
                ))}
            </ul>
        </div>
    )
}

export default Dropdown;