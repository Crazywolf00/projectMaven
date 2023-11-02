import { useState } from "react";
import axios from "./axios";

function CommentForm() {
    const [comment, setComment] = useState("");
    const [name, setName] = useState("");
    const [honeypot1, setHoneypot1] = useState("");
    const [honeypot2, setHoneypot2] = useState("");
    const [honeypot3, setHoneypot3] = useState("");
    const [result, setResult] = useState("");
    const handleHoneypot1Change = (e) => {
        setHoneypot1(e.target.value);
    };

    const handleHoneypot2Change = (e) => {
        setHoneypot2(e.target.value);
    };

    const handleHoneypot3Change = (e) => {
        setHoneypot3(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (honeypot1 || honeypot2 || honeypot3) {
            alert("Robot");
            return;
        }

        if(name.length === 0 || comment.length === 0) {
            name.length === 0 ? setResult("Zadejte jméno") : setResult("Zadejte komentář")
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('comment', comment)

        axios.post('/api/comment', formData)
            .then(response => {
                setComment("")
                setName("")
                console.log(response)
            })
    };

    return (
        <div>
            <input type={"text"} placeholder={'Vaše jméno'} value={name}
                   onChange={(e) => setName(e.target.value)} />
            <textarea placeholder={'Váš komentář'} value={comment}
                      onChange={(e) => setComment(e.target.value)} />
            <input
                type={"text"}
                name={"honeypot1"}
                value={honeypot1}
                onChange={handleHoneypot1Change}
                style={{ display: "none" }}
            />
            <input
                type={"text"}
                name={"honeypot2"}
                value={honeypot2}
                onChange={handleHoneypot2Change}
                style={{ display: "none" }}
            />
            <input
                type={"text"}
                name={"honeypot3"}
                value={honeypot3}
                onChange={handleHoneypot3Change}
                style={{ display: "none" }}
            />
            <button
                onClick={handleSubmit}>Odeslat</button>
            {result && <p>{result}</p>}
        </div>
    );
}

export default CommentForm;