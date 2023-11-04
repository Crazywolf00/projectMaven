import {useState} from "react";
import AdminComments from "./AdminComments";
import './AdminCommentInterface.css'

function AdminCommentInterface() {

    const [category, setCategory] = useState(false);
    const [comments, setComments] = useState(false);

    function changeComment() {
        setComments(!comments);
    }


    return (
        <div id={'comment-interface'}>
            <div>
                <button onClick={changeComment}>Komentáře</button>
                <button onClick={changeComment}>Katalog</button>
            </div>
            {comments ? <AdminComments/> : <div></div>}
            {comments ? <button onClick={changeComment}>Zavřít</button> : <div></div>}


        </div>
    )

}

export default AdminCommentInterface