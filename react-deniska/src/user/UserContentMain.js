import './UserContentMain.css'
function UserContentMain({category}) {


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