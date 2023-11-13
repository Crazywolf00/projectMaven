import './UserContentMain.css'
import {useEffect, useState} from "react";
import axios from "../axios";
import {SERVER_URL} from "../config";
import Modal from "../Modal";

function UserContentMain({category}) {

    const [message, setMessage] = useState("");
    const [content, setContent] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedImageUrl, setSelectedImageUrl] = useState('');

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

    const closeModal = () => {
        setModalOpen(false);
    };

    const openModal = (imageUrl) => {
        setSelectedImageUrl(imageUrl);
        setModalOpen(true);
    };

    return (
        <div>
            {category === "" ? <div></div> : (
                <div id="user-content-main">
                    <div id={'user-category-topic'}>{category}</div>
                    {message && <div id={'user-message-welcome'}>{message}</div>}
                    {content && content.map((oneContent, contentIndex) => (
                        <>
                            <div id={'set-name-user'}>{oneContent.setName}</div>
                            <div key={contentIndex} id={'user-content-welcome'}>
                                {oneContent.images.map((img, imgIndex) => (
                                    <div id={'user-content-welcome-imgs'} style={{
                                        display: 'inline-flex'
                                    }}>
                                        <div id={'img-container'}
                                             onClick={() => openModal(`${SERVER_URL}/api/getImg/${img.id}`)}>
                                        <div key={imgIndex} className={'user-img-show'} style={{
                                            backgroundImage: `url(${SERVER_URL}/api/getImg/${img.id})`,
                                        }}
                                        ></div></div>
                                    </div>
                                ))}
                            </div>
                        </>
                    ))}
                </div>
            )}
            <Modal show={modalOpen} onClose={closeModal} imageUrl={selectedImageUrl}/>
        </div>
    );
}

export default UserContentMain