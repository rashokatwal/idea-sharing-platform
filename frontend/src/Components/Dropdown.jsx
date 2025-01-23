import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../Styles/dropdown.css';

const Dropdown = ({ suggestions, placeholder, onChange }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const dropdownRef = useRef(null);

    const handleSelect = (value) => {
        setInputValue(value);
        onChange(value);
        setFilteredSuggestions([]);
        setIsDropdownOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setFilteredSuggestions([]);
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    
    return(
        <div ref={dropdownRef} style={{position: "relative"}}>
            <div className="dropdown-container" onClick={() => {
                isDropdownOpen ? setFilteredSuggestions([]) : setFilteredSuggestions(suggestions);
                setIsDropdownOpen(!isDropdownOpen);
            }}>
                <input
                 className="dropdown-input"
                 type="text"
                 value={inputValue}
                 placeholder={placeholder}
                 readOnly= { true }
                />
                <FontAwesomeIcon icon="fa-solid fa-sort-down" style={{marginBottom: "3px"}}/>
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