import axios from "./axios";
import {useEffect, useState} from "react";

function AdminComments({setSelect}) {

    const [comments, setComments] = useState([]);

    function close() {
        setSelect(false);
    }

    useEffect(() => {
        axios.get('/api/comments')
            .then(response => {
                setComments(response.data);
            });
    }, []);

    function changeAllowStatus(id,allow) {
        const allowDiv = document.querySelector(`#allow-${id}`)
        if(allow) {
            allowDiv.style.backgroundColor = 'lime'
        } else {
            allowDiv.style.backgroundColor = 'Tomato'
        }

    }

    return (
        <div>
            <div>
                <ul>
                    {comments.map(comment => (
                        <div key={comment.id}>
                            <h5>j: {comment.name}</h5>
                            <p id={'review'}>k: {comment.review}</p>
                            <p id={'answer'}>a: {comment.answer}</p>
                            <div>
                                <div id={`allow-${comment.id}`} onClick={() => changeAllowStatus(comment.id,comment.allow)}>{comment.allow ? 'ano' : 'ne'}</div>
                                <div id={'delete'}>Smazat</div>
                            </div>
                        </div>
                    ))}
                </ul>
            </div>
            <button onClick={close}>zavřít</button>
        </div>
    )
}

export default AdminComments