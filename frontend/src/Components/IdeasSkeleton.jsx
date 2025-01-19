import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { categories, categoryColors } from '../Constants/FilterElements'

const IdeasSkeleton = ({ viewType }) => {
    let properties = viewType === "grid" ? {
            titleWidth: "100%",
            descriptionCount: 4,
            authorWidth: 150,
            categoryWidth: 200,
            tagsWidth: 80,
            likesDateDisplay: "flex",
        } 
        : {
            titleWidth: "30%",
            descriptionCount: 1,
            authorWidth: "15%",
            categoryWidth: "20%",
            tagsWidth: "10%",
            likesDateDisplay: "none"
        }
    return (
        <div style={{textAlign: "left", border: "solid 1px #dce5ed", padding: "0 20px", borderRadius: "10px", boxShadow: "0 1px 5px rgba(0, 0, 0, 0.2)"}}>
            <SkeletonTheme baseColor='#dce5ed' highlightColor='#f0f7fc'>
                <h1><Skeleton width={properties.titleWidth}/></h1>
                <p><Skeleton count={properties.descriptionCount}/></p>
                <h3><Skeleton width={properties.authorWidth}/></h3>
                {viewType === "grid" ? <br /> : null}
                <Skeleton width={properties.categoryWidth} style={{margin: "0 15px 20px 0"}} inline={true} />
                <Skeleton width={properties.tagsWidth} count={3} inline={true} style={{marginRight: "10px"}}/>
                <div style={{display: properties.likesDateDisplay, justifyContent: 'space-between', alignItems: 'center', marginTop: '15px'}}>
                    <p><Skeleton width={120}/></p>
                    <p><Skeleton width={90}/></p>
                </div>
            </SkeletonTheme>
        </div>
    )
}

export default IdeasSkeleton;