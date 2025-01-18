// import { useState } from 'react';
import Autocomplete from './Autocomplete';
import Dropdown from './Dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { categories, popularity, status, time } from '../Constants/FilterElements';
import '../Styles/filter.css';

const Filter = ({ parentCallback }) => {

    const onTrigger = (type) => {
        parentCallback(type);
    }

    return (
        <div className="filter-outer">
            <div className="filter-inner">
                <Autocomplete suggestions={ categories } placeholder={ "Categories" }/>
                <Dropdown placeholder={ "Popularity" } suggestions={ popularity }/>
                <Dropdown placeholder={ "Status" } suggestions={ status }/>
                <Dropdown placeholder={ "Time" } suggestions={ time }/>
                <div className="view-type">
                    <FontAwesomeIcon icon="fa-solid fa-grip" size='lg' onClick={() => onTrigger("grid")}/>
                    <FontAwesomeIcon icon="fa-solid fa-list-ul" size='lg' onClick={() => onTrigger("list")}/>
                </div>
            </div>
        </div>
    )
}

export default Filter;