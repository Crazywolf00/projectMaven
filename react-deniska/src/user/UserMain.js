import {SERVER_URL} from "../config";
import UserHeader from "./UserHeader";
import PhotoSign from "../PhotoSign";
import UserWelcomeMessage from "./UserWelcomeMessage";
import ReferralLinks from "./ReferralLinks";
import MineReferral from "./MineReferral"
import {useState} from "react";
import UserContentMain from "./UserContentMain";


function UserMain() {
    const [showReferral, setShowReferral] = useState(true)
    const [category, setCategory] = useState("")

    return (
        <body
            id="body"
            style={{
                backgroundImage: `url(${SERVER_URL}/api/background?name=background)`,
                backgroundSize: '2000px 3000px',
                minHeight: '955px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
        <div>
            {showReferral ? (
                <>
                    <UserHeader setCategory={setCategory}/>
                    <div style={{marginTop: '-150px'}}>
                        <PhotoSign/>
                        <UserWelcomeMessage/>
                    </div>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <UserContentMain category={category}/>
                    </div>
                    <div style={{marginTop: '-20px', padding: '0px 150px'}}>
                        <ReferralLinks setShowReferral={setShowReferral} setCategory={setCategory}/>
                    </div>
                    <div style={{
                        height: '100px'
                    }}/>
                </>
            ) : (
                <MineReferral setShowReferral={setShowReferral}/>
            )}
        </div>
        </body>
    )
}

export default UserMain;