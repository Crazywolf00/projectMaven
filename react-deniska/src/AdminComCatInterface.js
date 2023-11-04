import {useState} from "react";
import AdminComments from "./AdminComments";
import './AdminComCatInterface.css'
import AdminCategory from "./AdminCategoryInterface.js";



function AdminComCatInterface() {

    const [category, setCategory] = useState(false);
    const [comments, setComments] = useState(false);

    function changeComment() {
        setComments(!comments);
        if(category){
            setCategory(!category);
        }
    }

    function changeCategory() {
        setCategory(!category);
        if(comments){
            setComments(!comments);
        }
    }


    return (
        <div id={'comment-interface'}>
            <div>
                <button onClick={changeComment}>Komentáře</button>
                <button onClick={changeCategory}>Kategorie</button>
            </div>
            {comments ? <AdminComments/> : <div></div>}
            {comments ? <button onClick={changeComment}>Zavřít</button> : <div></div>}

            {category ? <AdminCategory/> : <div></div>}
            {category ? <button onClick={changeCategory}>Zavřít</button> : <div></div>}

        </div>
    )

}

export default AdminComCatInterface