function MineReferral({setShowReferral}) {

    function returnMain() {
        setShowReferral(true)
    }

    return (
        <div id={'mine-referral'}>
            <div id={'git-hub'}></div>
            <div id={'return'} onClick={returnMain}>hi</div>
            <div id={'lintedIn'}></div>
        </div>
    )
}
export default MineReferral