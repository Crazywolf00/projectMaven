import {useEffect, useState} from "react";
import axios from "./axios";
import {SERVER_URL} from "./config";
import './ReadAllImagesSorted.css'
import Modal from "./Modal";

function ReadAllImagesSorted() {

    const [incomeImages, setIncomeImages] = useState([])
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedImageUrl, setSelectedImageUrl] = useState('');
    const openModal = (imageUrl) => {
        setSelectedImageUrl(imageUrl);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };
    useEffect(() => {
        axios.get('api/sortedImg')
            .then(response => setIncomeImages(response.data))
    }, [])

    return <div id={'read-all-img-sort'}>
        {incomeImages.map((category, categoryIndex) => (
            <div className={'category-category'}
                 key={categoryIndex}>
                <h1>{category.category}</h1>

                {category.sorteImageList.map((set, setIndex) => (
                    <div className={set.setName}
                         key={setIndex}>
                        <div className={'set-name'}>
                            <h2> {set.setName}</h2>
                        </div>
                        <div className={'set-name-style'}>
                            {set.images.map((img, imgIndex) => (

                                <div
                                    className="img-sorted"
                                    key={imgIndex}
                                    style={{
                                        backgroundImage: `url(${SERVER_URL}/api/getImg/${img.id})`,
                                    }}
                                    onClick={() => openModal(`${SERVER_URL}/api/getImg/${img.id}`)}
                                ></div>

                            ))}
                        </div>


                    </div>

                ))}
                

            </div>
        ))}
        <Modal show={modalOpen} onClose={closeModal} imageUrl={selectedImageUrl}/>
    </div>
}

export default ReadAllImagesSorted