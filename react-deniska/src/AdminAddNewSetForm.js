import { useEffect, useState } from "react";
import axios from "./axios";
import { useKey } from "./KeyProvider";
import "./AdminAddNewSetForm.css";
import ReadAllImagesSorted from "./ReadAllImagesSorted";

function AddNewSetForm() {
    const key = useKey();
    const [category, setCategory] = useState([]);
    const [images, setImages] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [result, setResult] = useState("")

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

    function addInputFile() {
        const inputFile = document.createElement("input");
        inputFile.type = "file";
        inputFile.className = 'add-file'
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

    function sendImg() {

        const category = document.querySelector('#categories')
        const setName = document.querySelector('#input-set')
        const imgs = document.querySelectorAll(".add-file")
        if(category.value === "--------------------") {
            setResult("vyber kateborii")
            return;
        }
        if(setName.value === "") {
            setResult( "zadej jméno skupiny")
            return;
        }
        if(imgs.length === 0) {
            setResult( "Vlož alespoň jeden obrázek")
            return;
        }
        let sizeTest = false;
        imgs.forEach(
                input => {
                    if(input.files[0].size > 1000000) {

                        sizeTest = true
                    }
                })
        if(sizeTest) {
            setResult( "Obrázek nesmí přesáhnout 1MB")
            return;
        }

        const formData = new FormData();
        formData.append( 'key', key.keyAdmin)
        formData.append( 'groupName', category.value)
        formData.append( 'setName', setName.value)

        document.querySelectorAll(".add-file")
            .forEach(
            input => {
                formData.append('img', input.files[0])
            })

        axios.post('admin/images', formData)
            .then(response => {
                if(response.status === 200) {
                    setImages([])
                    setImagePreviews([])
                    setName.value = ""
                    category.value = "--------------------"
                }
            })
    }

    return (
        <div id={"add-img-set"}>
            <div id={"select-input"}>
                <select name={"categories"} id={"categories"}>
                    {category.map((categoryMap, index) => (
                        <option key={index} value={categoryMap}>
                            {categoryMap}
                        </option>
                    ))}
                </select>
                <input id={"input-set"} type={"text"} placeholder={"Název skupiny"} />
            </div>
            <div id={"add-file"} style={{
                display: 'none'
            }}></div>
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
            {result && <p>{result}</p>}
            <div>
                <div id={"add-new-set-form-buttons"}>
                    <button onClick={addInputFile}>Přidat další obrázek</button>
                    <button onClick={sendImg}>Odeslat</button>
                </div>
            </div>
            <ReadAllImagesSorted/>
        </div>
    );
}
export default AddNewSetForm