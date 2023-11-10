import {SERVER_URL} from "./config";
import AdminHeader from "./AdminHeader";
import Interface from "./Interface";
import GetKeyForm from "./GetKeyForm";
import {useState} from "react";
import {KeyProvider} from './KeyProvider';
import PhotoSign from "./PhotoSign";
import AdminComCatInterface from "./AdminComCatInterface";
import CommentForm from "./CommentForm";
import WelcomeMessage from "./WelcomeMessage";

function AdminMain() {

    const [showGetKeyForm, setShowGetKeyForm] = useState(false);

    const setKey = (key) => {
        setShowGetKeyForm(key);
    }


    return (
        <body id="body" style={{
            backgroundImage: `url(${SERVER_URL}/api/background?name=background)`,
            backgroundSize: '2000px 3000px',
            minHeight: '955px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
        <KeyProvider>
            {showGetKeyForm ? (
                <div>
                    <AdminHeader/>
                    <PhotoSign/>
                    <WelcomeMessage/>
                    <Interface/>
                    <AdminComCatInterface/>
                </div>
            ) : (
                <GetKeyForm setKey={setKey}/>
            )}
        </KeyProvider>
        </body>
    )

}

export default AdminMain;