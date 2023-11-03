import axios from "./axios";
import {useEffect, useState} from "react";
import {useKey} from "./KeyProvider";

function AdminComments({setSelect}) {
    const key = useKey();
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

    function changeAllowStatus(id) {
        const allowDiv = document.querySelector(`#allow-${id}`)
        if (allowDiv.textContent === 'Povolen') {
            allowDiv.style.backgroundColor = 'Tomato'
            allowDiv.textContent = 'Zakázán'
        } else {
            allowDiv.style.backgroundColor = 'lime'
            allowDiv.textContent = 'Povolen'
        }

        axios.patch(`/admin/allow/${id}?key=${key.keyAdmin}`)
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
                                <div id={`allow-${comment.id}`}
                                     style={{
                                         backgroundColor: comment.allow ? 'lime' : 'Tomato'
                                     }}
                                     onClick={() => changeAllowStatus(comment.id)}>{comment.allow ? 'Povolen' : 'Zakázán'}</div>
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