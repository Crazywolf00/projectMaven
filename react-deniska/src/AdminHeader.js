import { useEffect, useState } from "react";
import React from 'react';
import { SERVER_URL } from './config';
import axios from './axios';
import './AdminHeader.css';

function AdminHeader() {
    const [mainIMG, setMainIMG] = useState([]);
    const marginTopValues = [30, 50, 70, 30, 70, 50, 70, 30, 50, 30]

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('/api/main');
                setMainIMG(response.data);
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
                             backgroundImage: `url(${SERVER_URL}/api/getImg/${image.id})`,
                             margin: `${marginTopValues[index]}px 5px`,
                             zIndex: '1'
                         }}>
                        <h4>
                            {image.setName.split(' ').map((word, wordIndex) => (
                                <React.Fragment key={wordIndex}>
                                    {word}
                                    {wordIndex < image.setName.split(' ').length - 1 && <br />}
                                </React.Fragment>
                            ))}
                        </h4>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AdminHeader;