import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const CardSkeleton = () => {
    return (
        <div style={{textAlign: "left", border: "solid 1px #dce5ed", padding: "0 20px", borderRadius: "10px", boxShadow: "0 1px 5px rgba(0, 0, 0, 0.2)"}}>
            <SkeletonTheme baseColor='#dce5ed' highlightColor='#f0f7fc'>
                <h1><Skeleton /></h1>
                <p><Skeleton count={4}/></p>
                <h3><Skeleton width={150}/></h3><br></br>
                <p><Skeleton width={200}/></p>
                <div style={{display: "flex", alignItems: 'center', gap: "10px"}}>
                    <Skeleton width={80}/>
                    <Skeleton width={80}/>
                    <Skeleton width={80}/>
                </div>
                <div style={{display: "flex", justifyContent: 'space-between', alignItems: 'center'}}>
                    <p><Skeleton width={150}/></p>
                    <p><Skeleton width={100}/></p>
                </div>
            </SkeletonTheme>
        </div>
    )
}

export default CardSkeleton;