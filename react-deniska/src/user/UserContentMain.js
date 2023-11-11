import './UserContentMain.css'
import {useEffect} from "react";

function UserContentMain({category}) {

    useEffect(() => {

        console.log(category);
    }, [category]);

    return (
        <div>
            {category === "" ? <div></div> : (
                <div id="user-content-main">
                    {category}
                </div>
            )}
        </div>
    );
}
export default UserContentMain