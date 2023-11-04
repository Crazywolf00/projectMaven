import { useEffect, useState } from "react";
import axios from "./axios";
import { useKey } from "./KeyProvider";
import "./AdminAddNewSetForm.css";

function AddNewSetForm() {
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
    }, []);

    function addInputFile() {
        const inputFile = document.createElement("input");
        inputFile.type = "file";
        inputFile.addEventListener("change", handleFileInputChange);
        const main = document.querySelector("#add-file");
        main.appendChild(inputFile);
        inputFile.click();
    }

    function handleFileInputChange(e) {
        const file = e.target.files[0];

        if (file) {
            setImages([...images, file]);
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreviews([...imagePreviews, e.target.result]);
            };
            reader.readAsDataURL(file);
        }
    }

    return (
        <div id="add-img-set">
            <div id="select-input">
                <select name="categories" id="categories">
                    {category.map((categoryMap, index) => (
                        <option key={index} value={categoryMap}>
                            {categoryMap}
                        </option>
                    ))}
                </select>
                <input id="input-set" type="text" placeholder="Název skupiny" />
            </div>
            <div id="add-file"></div>
            <div id={'miniature-file'}>
            {images.map((image, index) => (
                <div key={index}>
                    {imagePreviews[index] && (
                        <img
                            id={'set-img-input'}
                            src={imagePreviews[index]}
                            alt="Náhled obrázku"
                            style={{ width: "auto", height: "90px" }}
                        />
                    )}
                </div>
            ))}
            </div>
            <div>
                <div id="add-new-set-form-buttons">
                    <button onClick={addInputFile}>Přidat další obrázek</button>
                    <button>Odeslat</button>
                </div>
            </div>
        </div>
    );
}
export default AddNewSetForm