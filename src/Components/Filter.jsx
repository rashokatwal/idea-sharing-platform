import Autocomplete from './Autocomplete';
import '../Styles/filter.css';

const Filter = () => {
    return (
        <div className="filter-outer">
            <div className="filter-inner">
                <Autocomplete suggestions={ ["Technology", "Design"] } />
                <Autocomplete suggestions={ ["Technology", "Design"] } />
                <Autocomplete suggestions={ ["Technology", "Design"] } />
                <Autocomplete suggestions={ ["Technology", "Design"] } />
            </div>
        </div>
    )
}

export default Filter;