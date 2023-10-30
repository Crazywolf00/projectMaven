import {useEffect, useState} from "react";
import axios from './axios';
import './AdminMain.css'

function AdminMain() {

    const [mainIMG, setMainIMG] = useState([])

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('/api/main');
                console.log(response)
                setMainIMG(response.data);
                await getSpecificImage(2)
            } catch (err) {
                console.log(err);
            }
        }

        fetchData().then(r => {
            console.log(r)});
    }, []);

    async function getSpecificImage(id) {
        try {
            const response = await axios.get(`/api/getImg/51`);
            const imageUrl = response.data;
            const block = document.querySelector('.image-item');
            block.style.backgroundImage = `url(${imageUrl})`;
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div id="header">
            <div className="image-container">
                {mainIMG.map((image, index) => (
                    <div key={index} className="image-item">
                        <img src={image.url} alt={image.name}/>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default AdminMain