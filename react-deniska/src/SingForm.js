import {useKey} from "./KeyProvider";
import axios from "./axios";
import "./SignForm.css"
function SingForm() {

    const  key  = useKey();

    function changeBackground() {

        const formData = new FormData();
        const input = document.querySelector('#background');
        const file = input.files[0];
        formData.append('key', key.keyAdmin);
        formData.append('name', 'sign');
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
        <div id={'sign-form'} >
            <p>Změna podpis</p>
            <input id={'sign'}  type={"file"}/>
            <button onClick={changeBackground}>Odeslat</button>
        </div>
    )

}
export default SingForm;