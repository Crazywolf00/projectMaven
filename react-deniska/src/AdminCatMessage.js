import {useEffect, useState} from "react";
import axios from "./axios";
import {useKey} from "./KeyProvider";
import './AdminCatMessage.css'

function AdminCatMessage() {
    const key = useKey();
    const [category, setCategory] = useState([]);
    const [message, setMessage] = useState([]);
    const [response, setResponse] = useState("");


    useEffect(() => {
        const select = document.querySelector("#categories-message");
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


        axios.get('/api/messages')
            .then(response => {
                setMessage(response.data)
            })
    }, []);

    function sendMessage() {
        const type = document.querySelector('#categories-message')
        const messageToSend = document.querySelector('#category-message-textarea')
        if (type.value === "--------------------") {
            setResponse("Vyber kategorii")
            return
        }
        const formData = new FormData
        formData.append('key', key.keyAdmin)
        formData.append('type', type.value)
        formData.append('message', messageToSend.value)
        axios.post('/admin/welcome', formData)
            .then(response => {
                if (response.status === 200) {
                    const button = document.querySelector('#admin-cat-message-button')
                    messageToSend.value = "";
                    button.textContent = 'Zpráva byla uložena';
                    document.querySelector('#category-message-textarea').innerHTML = "";
                    setTimeout(() => {
                        button.textContent = 'Uložit zprávu';
                    }, 500);
                }
            })
    }

    function deleteMessage(index) {
        axios.delete(`admin/welcome/${index}?key=${key.keyAdmin}`)
            .then(response => {
                if(response.status === 200) {
                    const div = document.querySelector(`#incoming-message-${index}`)
                    div.style.display = 'none'
                }
            })
    }

    return (
        <div id={"admin-cat-message-main"}>
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
                {response && <div>{response}</div>}
                <textarea id={'category-message-textarea'} placeholder={'Přidej zprávu'}></textarea>
                <button id={'admin-cat-message-button'}
                        onClick={sendMessage}>Odeslat
                </button>
            </div>
            <div id={"incoming-messages"}>
                {message.map((incomingMessage) => (
                    <div className={'incoming-message-div'} id={`incoming-message-${incomingMessage.id}`}>
                        <div className={'incoming-message-type'} key={'a' + incomingMessage.id}>{incomingMessage.messageType}</div>
                        <hr id={'hr-message'}/>
                        <div className={'incoming-message-message'} key={'b' + incomingMessage.id}>{incomingMessage.message}</div>
                        <button id={`incoming-message-button${incomingMessage.id}-delete`}
                                className={'incoming-message-button-sed'}
                        onClick={() => deleteMessage(incomingMessage.id)}>Smazat</button>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default AdminCatMessage;