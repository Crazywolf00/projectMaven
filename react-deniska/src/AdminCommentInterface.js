import {useState} from "react";
import AdminComments from "./AdminComments";

function AdminCommentInterface() {

    const [select, setSelect] = useState(false);

    function change() {
        setSelect(true);
    }

    return (
        <div>
            <button onClick={change}>Komentáře</button>
            {select ? <AdminComments setSelect={setSelect}/> : <div></div>}
        </div>
    )

}

export default AdminCommentInterface