import './MineReferral.css'
function MineReferral({setShowReferral}) {

    function returnMain() {
        setShowReferral(true)
    }

    return (
        <div id={'mine-referral'}>
            <div className={'mine-ref'} id={'git-hub'}></div>
            <div className={'mine-ref'} id={'return'} onClick={returnMain}></div>
            <div className={'mine-ref'} id={'linkedin'}></div>
        </div>
    )
}
export default MineReferral