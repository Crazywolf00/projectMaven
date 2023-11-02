import { useState } from "react";

function CommentForm() {
    const [comment, setComment] = useState("");
    const [name, setName] = useState("");
    const [honeypot1, setHoneypot1] = useState(""); // První honeypot
    const [honeypot2, setHoneypot2] = useState(""); // Druhý honeypot
    const [honeypot3, setHoneypot3] = useState(""); // Třetí honeypot
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
            alert("Prosím, nevyplňujte skrytá pole.");
            return;
        }


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
            <button onClick={handleSubmit}>Odeslat</button>
        </div>
    );
}

export default CommentForm;