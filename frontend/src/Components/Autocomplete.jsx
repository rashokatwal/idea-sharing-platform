import React, { useState } from 'react';
import '../Styles/autocomplete.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 

const Autocomplete = ({ suggestions, placeholder, value, onChange, outline }) => {
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [inputValue, setInputValue] = useState(value);
  // const [typingTimeout, setTypingTimeout] = useState(null);

  const handleChange = (event) => {
    const inputValue = event.target.value;
    setInputValue(inputValue);
    onChange(inputValue);

    // Filter suggestions based on input value
    const filteredSuggestions = suggestions.filter(suggestion =>
      suggestion.toLowerCase().includes(inputValue.toLowerCase())
    );
    
    if (inputValue.length == 0) {
        setFilteredSuggestions([]);

    }
    else {
        setFilteredSuggestions(filteredSuggestions);
    }
  };

  const handleSelect = (value) => {
    setInputValue(value);
    onChange(value);
    setFilteredSuggestions([]);
  };

  return (
    <div className="autocomplete-container">
      <input
        className="autocomplete-input"
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder={placeholder}
        style={{outline: outline}}
      />
      <ul className="autocomplete-suggestions">
        {filteredSuggestions.map((suggestion, index) => (
          <li key={index} className="autocomplete-suggestion" onClick={() => handleSelect(suggestion)}>
            {suggestion}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Autocomplete;