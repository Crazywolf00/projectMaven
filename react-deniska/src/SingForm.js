import {useKey} from "./KeyProvider";
import axios from "./axios";
import "./SignForm.css"

function SingForm() {
    const key = useKey();

    function changeSign() {

        const formData = new FormData();
        const input = document.querySelector('#signInput');
        const file = input.files[0];
        formData.append('key', key.keyAdmin);
        formData.append('name', 'sign');
        formData.append('index', 100);
        formData.append('inputMainImg', file)

        axios.post('/admin/mainImg', formData)
            .then(response => {
                if (response.status === 200) {
                    input.value = '';
                }
            })
            .catch(error => {
                console.error(error);
            });
    }

    return (
        <div id={'sign-form'}>
            <p>Změna podpisu</p>
            <input id={'signInput'} type={"file"}/>
            <button onClick={changeSign}>Odeslat</button>
        </div>
    )

}

export default SingForm;