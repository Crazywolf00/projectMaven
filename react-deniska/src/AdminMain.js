import { useEffect, useState } from "react";
import { SERVER_URL } from './Config';
import axios from './axios';
import './AdminMain.css';

function AdminMain() {
    const [mainIMG, setMainIMG] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('/api/main');
                setMainIMG(response.data);
                console.log(response.data)
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, []);


    return (
        <div id="header">
            <div className="image-container">
                {mainIMG.map((image, index) => (
                    <div key={index}
                         className={`image-item image-item-${image.id}`}
                         style={{
                             backgroundImage: `url(${SERVER_URL}/api/getImg/${image.id})`
                         }}>
                        <h4>{image.setName}</h4>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AdminMain;