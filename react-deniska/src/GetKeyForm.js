import {useState} from "react";
import "./GetKEyForm.css"
import axios from "./axios";
import { useKey } from './KeyProvider';

function GetKeyForm({setKey}) {
    const [password, setPassword] = useState("");
    const [result, setResult] = useState(null);
    const { keyAdmin, setKeyAdmin } = useKey();

    function handleKeyPress(e) {
        if (e.key === "Enter") {
            getKey();
        }
    }

    function getKey() {
        axios.get(`/admin/password?inputPassword=${password}`)
            .then((response) => {
                if (response.status === 200) {
                    setKey(true);
                    return response.data;
                } else {
                    throw new Error("Nesprávné heslo");
                }
            })
            .then((body) => {
                setKey(body)
                console.log(body)
                setKeyAdmin(body)
            })
            .catch(() => {
                setPassword("")
                setResult('Špatné heslo');
            })
    }


    return (
        <div id={"getKeyFormDiv"}>
            <input
                type="password"
                placeholder="Zadej heslo"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyPress}
            />
            <button onClick={getKey}>Odeslat</button>
            <p>{result}</p>
        </div>
    );
}

export default GetKeyForm;