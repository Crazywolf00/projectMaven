import React, {useEffect, useState} from "react";
import axios from "../axios";
import {SERVER_URL} from "../config";
import './UserHeader.css'

function UserHeader({setCategory}) {

    const [mainIMG, setMainIMG] = useState([]);
    const marginTopValues = [30, 50, 70, 30, 70, 50, 70, 30, 50, 30, 70, 50, 30, 70, 50]

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('/admin/main');
                setMainIMG(response.data);
            } catch (err) {
                console.log(err);
            }
        }

        fetchData();
    }, []);

    function ChoseCategory(category) {
        setCategory(category)
    }

    return (
        <div id="header">
            <div className="image-container">
                {mainIMG.map((image, index) => (
                    <div key={index}
                         className={`image-item-user ${image.setName}`}
                         onClick={() => ChoseCategory(image.setName)}
                         style={{
                             backgroundImage: `url(${SERVER_URL}/api/getImg/${image.id})`,
                             margin: `${marginTopValues[index]}px 5px`,
                             zIndex: '1'
                         }}>
                        <h4>
                            {image.setName.split(' ').map((word, wordIndex) => (
                                <React.Fragment key={wordIndex}>
                                    {word}
                                    {wordIndex < image.setName.split(' ').length - 1 && <br/>}
                                </React.Fragment>
                            ))}
                        </h4>
                    </div>
                ))}
            </div>
        </div>
    )

}
export default UserHeader