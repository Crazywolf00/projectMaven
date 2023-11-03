import axios from "./axios";
import {useEffect, useState} from "react";
import {useKey} from "./KeyProvider";
import './AdminCooments.css'
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

        axios.patch(`/admin/allow/${id}?key=${key.keyAdmin}`)
            .then(response => {
                if (response.status === 200) {
                    if (allowDiv.textContent === 'Povolen') {
                        allowDiv.style.backgroundColor = 'Tomato'
                        allowDiv.textContent = 'Zakázán'
                    } else {
                        allowDiv.style.backgroundColor = 'lime'
                        allowDiv.textContent = 'Povolen'
                    }
                }
            })
    }

    function deleteComment(id) {
        const allowDiv = document.querySelector(`#main-comment-div-${id}`)

        axios.delete(`/admin/comment/${id}?key=${key.keyAdmin}`)
            .then(response => {
                if (response.status === 200) {
                    allowDiv.textContent = "";
                    allowDiv.style.display = 'none';
                }
            })
    }

    function sendAnswer(id) {

    }

    return (
        <div>
            <div>
                <ul>
                    {comments.map(comment => (
                        <div id={`main-comment-div-${comment.id}`}
                            className={'main-comment-div'}
                            key={comment.id}>

                            <div id={'name-comment'}>
                                <p id={'name'}>{comment.name}</p>
                                <p id={'time'}>{comment.timestamp}</p>
                            </div>
                            <div id={'review-answer-comment'}>
                            <p id={'review'}>{comment.review}</p>
                                <p id={'answer'}
                                   style={{
                                       display: comment.answer.length > 0 ? "inline" : "none"
                                   }}>{comment.answer.length > 0 ? comment.answer : 'k'}</p>
                            </div>
                            <textarea id={'answer-textarea'} placeholder={'Reakce'}></textarea>
                            <div id={'buttons-comment'}>
                                <div className={'button-comme'} id={`allow-${comment.id}`}
                                     style={{
                                         backgroundColor: comment.allow ? 'lime' : 'Tomato'
                                     }}
                                     onClick={() => changeAllowStatus(comment.id)}>{comment.allow ? 'Povolen' : 'Zakázán'}</div>

                                <div className={'button-comme'} id={'answer-button'}
                                     style={{
                                         backgroundColor: 'DeepSkyBlue'
                                     }}
                                     onClick={() => sendAnswer(comment.id)}>Odeslat reakci</div>

                                <div className={'button-comme'} id={'delete'}
                                     style={{
                                         backgroundColor: 'Tomato'
                                     }}
                                     onClick={() => deleteComment(comment.id)}>Smazat</div>
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