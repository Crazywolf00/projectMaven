import {useEffect, useState} from "react";
import axios from "./axios";
import {useKey} from "./KeyProvider"
import './AdminAddNewSetForm.css'

function AddNewSetForm() {

    const key = useKey();
    const [category, setCategory] = useState([]);

    useEffect(() => {
        const select = document.querySelector('#categories')
        select.innerHTML = "";
        axios.get(`/admin/allCategory?key=${key.keyAdmin}`)
            .then(response => {
                setCategory(response.data)
            })

    }, []);

    function addInputFile() {
        const main = document.querySelector('#add-file')
        const inputFile = document.createElement("input")
        inputFile.type = 'file';
        main.appendChild(inputFile)
    }

    return <div id={'add-img-set'}>
        <div id={'select-input'}>
            <select name="categories" id="categories">
                {category.map((categoryMap, index) => (
                    <option key={index} value={categoryMap}>{categoryMap}</option>
                ))}
            </select>
            <input id={'input-set'} type={"text"} placeholder={'Název skupiny'}/>
        </div>
        <div id={"add-file"}>
            <input type={"file"}/>
        </div>
        <div>
            <div id={'add-new-set-form-buttons'}>
                <button onClick={addInputFile}>Přidat další obrázek</button>
                <button>Odeslat</button>
            </div>
        </div>
    </div>
}

export default AddNewSetForm