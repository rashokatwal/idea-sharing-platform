import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const IdeaPreviewSkeleton = () => {
    return (
        <div style={{textAlign: "left", border: "solid 1px #dce5ed", padding: "0 20px", borderRadius: "10px", boxShadow: "0 1px 5px rgba(0, 0, 0, 0.2)"}}>
            <SkeletonTheme baseColor='#dce5ed' highlightColor='#f0f7fc'>
                <h1><Skeleton width={"50%"}/></h1>
                <p><Skeleton /></p>
                <h3>
                    <Skeleton count={4} />
                </h3>
                <h3>
                    <Skeleton count={4} />
                </h3>
                <h2><Skeleton width={"30%"}/></h2>
                <h3><Skeleton count={3} inline={true} width={100} style={{marginRight: "10px"}}/></h3>
                <p><Skeleton width={"15%"}/></p>
                <p><Skeleton width={"20%"}/></p>
                <p style={{display: "flex", justifyContent: "space-between"}}>
                    <Skeleton width={200} />
                    <Skeleton width={200} />
                </p>
            </SkeletonTheme>
        </div>
    )
}

export default IdeaPreviewSkeleton;