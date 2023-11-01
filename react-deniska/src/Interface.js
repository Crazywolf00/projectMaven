import './Interface.css'
import BackgroundForm from "./BackgroundForm";
import ProfilePhotoForm from "./ProfilePhotoForm";
import SingForm from "./SingForm";
function Interface() {


    return (
        <div id={'interface'}>
            <BackgroundForm/>
            <ProfilePhotoForm/>
            <SingForm/>
        </div>
    )
}
export default Interface;