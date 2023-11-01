import {SERVER_URL} from "./config";
import './PhotoSign.css'
function PhotoSign() {


    return (

        <div id={'photoSign'}>
            <div id={'photo'} style={{
                backgroundImage: `url(${SERVER_URL}/api/background?name=profilePhoto)`
            }}></div>
            <div id={'sign'} style={{
                backgroundImage: `url(${SERVER_URL}/api/background?name=sign)`
            }}></div>
        </div>
    )
}

export default PhotoSign