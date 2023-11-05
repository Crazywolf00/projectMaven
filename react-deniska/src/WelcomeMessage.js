import './WelcomeMessage.css'
import {useEffect, useState} from "react";
function WelcomeMessage() {

    const [message, setMessage] = useState()

    useEffect(() => {

    })

    return <div id={'welcome-message'}>
        <textarea id={'welcome-message-textarea'}></textarea>
        <button id={'welcome-message-button'}>Uložit zprávu</button>
    </div>

}
export default WelcomeMessage