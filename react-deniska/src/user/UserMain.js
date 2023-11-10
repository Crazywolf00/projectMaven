import {SERVER_URL} from "../config";
import UserHeader from "./UserHeader";
import PhotoSign from "../PhotoSign";
import UserWelcomeMessage from "./UserWelcomeMessage";
import ReferralLinks from "./ReferralLinks";


function UserMain() {
    return (
        <body id="body" style={{
            backgroundImage: `url(${SERVER_URL}/api/background?name=background)`,
            backgroundSize: '2000px 3000px',
            minHeight: '955px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
        <div>
            <UserHeader/>
            <div style={{
                marginTop: '-150px'
            }}>
                <PhotoSign/>
                <UserWelcomeMessage/>
            </div>
            <div style={{
                marginTop: '-20px',
                padding: '0px 150px'
            }}>
                <ReferralLinks/>
            </div>

        </div>
        </body>
    )
}

export default UserMain;