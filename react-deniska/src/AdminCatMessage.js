import {useEffect, useState} from "react";
import axios from "./axios";
import {useKey} from "./KeyProvider";
import './AdminCatMessage.css'

function AdminCatMessage() {
    const key = useKey();
    const [category, setCategory] = useState([]);
    const [images, setImages] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);


    useEffect(() => {
        const select = document.querySelector("#categories");
        select.innerHTML = "";
        axios.get(`/admin/allCategory?key=${key.keyAdmin}`).then((response) => {
            setCategory(response.data);
        });

        const categoriesWithEmptyOption = ["--------------------", ...category];

        categoriesWithEmptyOption.forEach((categoryMap, index) => {
            const option = document.createElement("option");
            option.value = categoryMap;
            option.textContent = categoryMap;
            select.appendChild(option);
        });
    }, []);






    return (
        <div id={"add-message"}>
            <div id={"select-input-message"}>
                <select name={"categories"} id={"categories-message"}>
                    {category.map((categoryMap, index) => (
                        <option key={index} value={categoryMap}>
                            {categoryMap}
                        </option>
                    ))}
                </select>
            </div>
            <textarea id={'category-message-textarea'} placeholder={'Přidej zprávu'}></textarea>

        </div>
    );
}

export default AdminCatMessage;