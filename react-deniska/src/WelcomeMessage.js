import './WelcomeMessage.css'
import {useEffect, useState} from "react";
import axios from "./axios";
import {useKey} from "./KeyProvider";
function WelcomeMessage() {
    const key = useKey();

    const [message, setMessage] = useState("")

    useEffect(() => {
        axios.get('/api/welcome?type=welcomeMessage')
            .then(response => {
                setMessage(response.data.message)
                const messageArea = document.querySelector('#welcome-message-textarea')
                messageArea.textContent = response.data.message
            })
    }, [])

    function sendMessage() {
        const formData = new FormData
        formData.append('key', key.keyAdmin)
        formData.append('type', 'welcomeMessage')
        formData.append('message', message)
        axios.post('/admin/welcome', formData)
            .then(response => {
                if(response.status === 200) {
                    const button = document.querySelector('#welcome-message-button')
                    button.textContent = 'Zpráva byla uložena';
                    setTimeout(() => {
                        button.textContent = 'Uložit zprávu';
                    }, 500);
                }
            })
    }

    return <div id={'welcome-message'}>
        <textarea id={'welcome-message-textarea'}
        onChange={e => {
            e.preventDefault()
            setMessage(e.target.value)
        }}></textarea>
        <button id={'welcome-message-button'}
        onClick={sendMessage}>Uložit zprávu</button>
    </div>

}
export default WelcomeMessage