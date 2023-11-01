import './BacgroundForm.css'
import axios from "./axios";
import { useKey } from './KeyProvider';
function BackgroundForm() {
    const  key  = useKey();

    function changeBackground() {

        const formData = new FormData();
        const input = document.querySelector('input');
        const file = input.files[0];
        console.log(key)
        formData.append('key', key.keyAdmin);
        formData.append('backgroundImg', file)

        axios.post('/admin/background',formData)
            .then(response => {
                console.log(response.status)
                input.value = '';
            })
            .catch(error => {
                console.error(error);
            });
    }

    return(
        <div id={'background-form'} >
            <p>Změna pozadí</p>
            <input type={"file"}/>
            <button onClick={changeBackground}>Odeslat</button>
        </div>
    )

}
export default BackgroundForm