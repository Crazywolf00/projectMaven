import {SERVER_URL} from "../config";
import UserHeader from "./UserHeader";


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

                </div>
        </body>
    )
}
export default UserMain;