import {useEffect, useState} from "react";
import axios from "./axios";
import {useKey} from "./KeyProvider"
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

    return <div id={'add-img-set'}>
        <select name="categories" id="categories">
            {category.map((categoryMap, index) => (
                <option key={index} value={categoryMap}>{categoryMap}</option>
            ))}
        </select>
            <input type={"file"}/>
    </div>


}
export default AddNewSetForm