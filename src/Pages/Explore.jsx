import Filter from "../Components/Filter";
import '../Styles/explore.css';

const Explore = () => {
    return (
        <div className="Explore">
            <Filter />
            <div className="ideas-section-outer">
                <div className="ideas-section-inner">
                    <div style={{border: "solid 1px", height: "300px", width: "400px"}}></div>
                    <div style={{border: "solid 1px", height: "300px", width: "400px"}}></div>
                    <div style={{border: "solid 1px", height: "300px", width: "400px"}}></div>
                    <div style={{border: "solid 1px", height: "300px", width: "400px"}}></div>
                    <div style={{border: "solid 1px", height: "300px", width: "400px"}}></div>
                    <div style={{border: "solid 1px", height: "300px", width: "400px"}}></div>
                </div>
            </div>
        </div>
    )
}

export default Explore;