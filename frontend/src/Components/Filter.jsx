import Autocomplete from './Autocomplete';
import Dropdown from './Dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { categories, status, sortBy } from '../Constants/FilterElements';
import '../Styles/filter.css';

const Filter = ({ parentCallback }) => {

    const onTrigger = (changedData) => {
        parentCallback(changedData);
    }

    const handleCategory = (value) => {
        parentCallback({changedProperty: "category", value: value});
    }

    const handlePopularity = (value) => {
        parentCallback({changedProperty: "popularity", value: value});
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
                <Dropdown placeholder={ "Popularity" } suggestions={ [""] } onChange={handlePopularity}/>
                <Dropdown placeholder={ "Status" } suggestions={ status } onChange={handleStatus}/>
                <Dropdown placeholder={ "Sort By" } suggestions={ sortBy } onChange={handleSort}/>
                <div className="view-type">
                    <FontAwesomeIcon icon="fa-solid fa-grip" size='lg' onClick={() => onTrigger({changedProperty: "view", value: "grid"})}/>
                    <FontAwesomeIcon icon="fa-solid fa-list-ul" size='lg' onClick={() => onTrigger({changedProperty: "view", value: "list"})}/>
                </div>
            </div>
        </div>
    )
}

export default Filter;