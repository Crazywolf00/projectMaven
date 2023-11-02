import {useEffect, useState} from "react";
import React from 'react';
import {SERVER_URL} from './config';
import axios from './axios';
import './AdminHeader.css';
import {useKey} from "./KeyProvider";

function AdminHeader() {
    const [mainIMG, setMainIMG] = useState([]);
    const marginTopValues = [30, 50, 70, 30, 70, 50, 70, 30, 50, 30]
    const key = useKey();

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('/admin/main');
                setMainIMG(response.data);
            } catch (err) {
                console.log(err);
            }
        }

        fetchData();
    }, []);


    function update(index) {
        const formData = new FormData();
        const inputFile = document.querySelector(`#file-${index}`);
        const inputText = document.querySelector(`#text-${index}`);
        const file = inputFile.files[0];
        console.log(inputFile)
        console.log(inputText)
        console.log(file)

        formData.append('key', key.keyAdmin);
        formData.append('name', inputText.value);
        formData.append('index', index);
        formData.append('inputMainImg', file)

        axios.post('/admin/mainImg', formData)
            .then(response => {
                console.log(response)
            })

    }


    return (
        <div id="header">
            <div className="image-container">
                {mainIMG.map((image, index) => (
                    <div key={index}
                         className={`image-item image-item-${image.id}`}
                         style={{
                             backgroundImage: `url(${SERVER_URL}/api/getImg/${image.id})`,
                             margin: `${marginTopValues[index]}px 5px`,
                             zIndex: '1'
                         }}>
                        <h4>
                            {image.setName.split(' ').map((word, wordIndex) => (
                                <React.Fragment key={wordIndex}>
                                    {word}
                                    {wordIndex < image.setName.split(' ').length - 1 && <br/>}
                                </React.Fragment>
                            ))}
                        </h4>
                        <div id={'main-img-form'}>
                            <input id={`text-${index}`} className={'setName'} type={"text"} placeholder={"Název"}/>
                            <input id={`file-${index}`} className={'setName'} type={"file"}/>
                            <button
                                id={'header-button-add-main'}
                                className={'setName'}
                                onClick={() => update(index)}>Odeslat</button>
                            <button id={'header-button-del-main'} className={'setName'}>Smazat</button>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    )
}

export default AdminHeader;