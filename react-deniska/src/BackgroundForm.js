import './BacgroundForm.css'
import axios from "./axios";
import { useKey } from './KeyProvider';
function BackgroundForm() {
    const  key  = useKey();

    function changeBackground() {

        const formData = new FormData();
        const input = document.querySelector('#background');
        const file = input.files[0];
        formData.append('key', key.keyAdmin);
        formData.append('name', 'background');
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
        <div id={'background-form'} >
            <p>Změna pozadí</p>
            <input id={'background'}  type={"file"}/>
            <button onClick={changeBackground}>Odeslat</button>
        </div>
    )

}
export default BackgroundForm