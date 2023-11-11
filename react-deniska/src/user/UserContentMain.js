import './UserContentMain.css'
import {useEffect, useState} from "react";
import axios from "../axios";
import {SERVER_URL} from "../config";

function UserContentMain({category}) {

    const [message, setMessage] = useState("");
    const [content, setContent] = useState([]);

    useEffect(() => {
        setMessage("")
        setContent([])
        if (category.length > 0) {
            axios.get(`/api/content?category=${category}`)
                .then(response => response.data)
                .then(data => {
                    setMessage(data.welcomeMessage.message)
                    setContent(data.sorteImageList)
                })
        } else {

        }

    }, [category]);

    return (
        <div>
            {category === "" ? <div></div> : (
                <div id="user-content-main">
                    <div id={'user-category-topic'}>{category}</div>
                    {message && <div id={'user-message-welcome'}>{message}</div>}
                    {content && content.map((oneContent, contentIndex) => (
                        <div key={contentIndex} id={'user-content-welcome'}>
                            <div>{oneContent.setName}</div>
                            {oneContent.images.map((img, imgIndex) => (
                                <div style={{
                                    display: 'inline-flex'
                                }}>
                                    <div key={imgIndex} className={'user-img-show'} style={{
                                        backgroundImage: `url(${SERVER_URL}/api/getImg/${img.id})`,
                                    }}></div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default UserContentMain