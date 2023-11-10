import {useEffect, useState} from "react";
import axios from "../axios";
import './UserWelcomeMessage.css'

function UserWelcomeMessage() {

    const [message, setMessage] = useState("")

    useEffect(() => {
        axios.get('/api/welcome?type=welcomeMessage')
            .then(response => {
                setMessage(response.data.message)

            })
    }, [])

    return (
        <div id={'welcome-message-user'}>
            {message}
        </div>
    )
}

export default UserWelcomeMessage