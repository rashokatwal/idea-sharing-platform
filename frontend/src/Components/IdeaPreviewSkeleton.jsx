import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const IdeaPreviewSkeleton = () => {
    return (
        <div style={{textAlign: "left", border: "solid 1px #dce5ed", padding: "0 30px", borderRadius: "10px", boxShadow: "0 1px 5px rgba(0, 0, 0, 0.2)"}}>
            <SkeletonTheme baseColor='#dce5ed' highlightColor='#f0f7fc'>
                {/* author-details */}
                <p>
                    <Skeleton width={40} height={40} circle={true} inline={true} style={{marginRight: "10px"}}/>
                    <Skeleton width={"20%"} inline={true} height={40}/><br /><br />
                </p>
                {/* idea title */}
                <h1><Skeleton width={"50%"}/></h1>
                {/* idea description */}
                <p><Skeleton /></p>
                {/* idea summary */}
                <h3>
                    <Skeleton count={4} />
                </h3>
                <h3>
                    <Skeleton count={4} />
                </h3>
                {/* idea category */}
                <h2><Skeleton width={"30%"}/></h2>
                {/* idea tags */}
                <h3><Skeleton count={3} inline={true} width={100} style={{marginRight: "10px"}}/></h3><br />
                {/* likes comments collab save */}
                <p style={{display: "flex", justifyContent: "space-between"}}>
                    <Skeleton width={200} />
                    <Skeleton width={200} />
                </p>
            </SkeletonTheme>
        </div>
    )
}

export default IdeaPreviewSkeleton;