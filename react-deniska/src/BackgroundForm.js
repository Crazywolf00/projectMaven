import './BacgroundForm.css'
import axios from "./axios";
function BackgroundForm() {


    function changeBacground() {
        axios.get('/admin/background',{
            method: "POST"
        })
    }

    return(
        <div id={'background-form'} onClick={changeBacground}>
            <p>Změna pozadí</p>
            <input type={"file"}/>
            <button>Odeslat</button>
        </div>
    )

}
export default BackgroundForm