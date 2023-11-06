import {useState} from "react";
import AdminComments from "./AdminComments";
import './AdminComCatInterface.css'
import AdminCategory from "./AdminCategoryInterface.js";
import AdminCatMessage from "./AdminCatMessage";


function AdminComCatInterface() {

    const [category, setCategory] = useState(false);
    const [comments, setComments] = useState(false);
    const [message, setMessage] = useState(false);
    function changeMessage() {
        setMessage(!message);
        if(category){
            setCategory(!category);
        }
        if(comments) {
            setComments(!comments)
        }
    }

    function changeComment() {
        setComments(!comments);
        if(message){
            setMessage(!message);
        }
        if(category){
            setCategory(!category);
        }
    }

    function changeCategory() {
        setCategory(!category);
        if(comments) {
            setComments(!comments)
        }
        if(message){
            setMessage(!message);
        }
    }

    return (
        <div id={'comment-interface'}>
            <div>
                <button onClick={changeComment}>Komentáře</button>
                <button onClick={changeCategory}>Kategorie obrázky</button>
                <button onClick={changeMessage}>Kategorie zpráva</button>
            </div>
            {comments ? <AdminComments/> : <div></div>}
            {comments ? <button onClick={changeComment}>Zavřít</button> : <div></div>}

            {category ? <AdminCategory/> : <div></div>}
            {category ? <button onClick={changeCategory}>Zavřít</button> : <div></div>}

            {message ? <AdminCatMessage/> : <div></div>}
            {message ? <button onClick={changeMessage}>Zavřít</button> : <div></div>}

        </div>
    )
}

export default AdminComCatInterface