import axios from "./axios";
import {useEffect, useState} from "react";

function AdminComments({ setSelect }) {

    const [comments, setComments] = useState([]);
    function close() {
        setSelect(false);
    }

    useEffect(() => {
        axios.get('/api/comments')
            .then(response => {
                setComments(response.data);
                console.log(response)
            });
    }, []);

    function close() {
        setSelect(false);
    }


    return (
        <div>
            <div>
                <ul>
                    {comments.map(comment => (
                        <div key={comment.id}>
                            <p>j: {comment.name}</p>
                            <p>k: {comment.review}</p>
                            <p>a: {comment.answer}</p>
                            <p>p: {comment.allow ? "Ano" : "Ne"}</p>
                        </div>
                    ))}
                </ul>
            </div>
            <button onClick={close}>zavřít</button>
        </div>
    )
}
export default AdminComments