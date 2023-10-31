import {SERVER_URL} from "./config";
import AdminHeader from "./AdminHeader";
function AdminMain() {


    return (
        <body id="body" style={{
            backgroundImage: `url(${SERVER_URL}/api/background?name=background)`,
            backgroundSize: '2000px 2000px;',
            minHeight: '868px'
        }}>

        <AdminHeader/>
        </body>
    )

}
export default AdminMain;