import {useKey} from "./KeyProvider";
import axios from "./axios";
import './ProfilePhotoForm.css'

function ProfilePhotoForm() {

    const  key  = useKey();
    function changeProfilePhoto() {

        const formData = new FormData();
        const input = document.querySelector('#profile-photo');
        const file = input.files[0];
        formData.append('key', key.keyAdmin);
        formData.append('name', 'profilePhoto');
        formData.append('inputMainImg', file)

        axios.post('/admin/mainImg',formData)
            .then(response => {
                if(response.status === 200) {
                    input.value = '';
                }
            })
            .catch(error => {
                console.error(error);
            });
    }


    return(
        <div id={'profile-photo-form'} >
            <p>Změna profilové fotky</p>
            <input id={'profile-photo'} type={"file"}/>
            <button onClick={changeProfilePhoto}>Odeslat</button>
        </div>
    )
}
export default ProfilePhotoForm