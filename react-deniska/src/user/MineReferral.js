import './MineReferral.css'

function MineReferral({setShowReferral}) {

    function returnMain() {
        setShowReferral(true)
    }

    function goToGithub() {
        window.open('https://github.com/Crazywolf00', '_blank')
    }

    function goToLinkedin() {
        window.open('https://www.linkedin.com/in/václav-vlček-96924b287', '_blank')
    }


    return (
        <div>
            <div id={'mine-referral'}>
                <div className={'mine-ref'} id={'git-hub'} onClick={goToGithub}></div>
                <div className={'mine-ref'} id={'return'} onClick={returnMain}></div>
                <div className={'mine-ref'} id={'linkedin'} onClick={goToLinkedin}></div>
            </div>
            <div id={'info-referral'}>
                <div id={'more-info-referral'}>
                    <div>SEE MORE</div>
                    <div> ▼</div>
                </div>
                <div>info</div>
            </div>
        </div>
    )
}

export default MineReferral