import {useEffect, useState} from "react";
import axios from "./axios";
import {SERVER_URL} from "./config";
import './ReadAllImagesSorted.css'
import Modal from "./Modal";
import {useKey} from "./KeyProvider";

function ReadAllImagesSorted() {
    const key = useKey();
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

    function deleteImg(id, event) {
        event.stopPropagation();
        const imgToDelete = document.querySelector(`#id-${id}`)
        axios.delete(`admin/deleteImg/${id}`)
            .then(response => {
                if (response.status === 200) {
                    imgToDelete.style.display = 'none'
                }
            })
    }

    function deleteSet(categoryName, setName) {
        const set = document.querySelector(`#setName-${setName}`)
        axios.delete(`/admin/deleteSet?key=${key.keyAdmin}&categoryName=${categoryName}&setName=${setName}`)
            .then(response => {
                if (response.status === 200) {
                    set.style.display = 'none'
                }
            })
    }

    return <div id={'read-all-img-sort'}>
        {incomeImages.map((category, categoryIndex) => (
            <div className={'category-category'}
                 key={categoryIndex}>
                <h1>{category.category}</h1>

                {category.sorteImageList.map((set, setIndex) => (
                    <div className={set.setName}
                         key={setIndex}
                         id={`setName-${set.setName}`}>
                        <div className={'set-name'}>
                            <div className={'delete-set-img'}
                                 onClick={() => deleteSet(category.category, set.setName)}>smazat set
                            </div>
                            <h2> {set.setName}</h2>
                        </div>
                        <div className={'set-name-style'}>
                            {set.images.map((img, imgIndex) => (

                                <div
                                    className="img-sorted"
                                    id={`id-${img.id}`}
                                    key={imgIndex}
                                    style={{
                                        backgroundImage: `url(${SERVER_URL}/api/getImg/${img.id})`,
                                    }}
                                    onClick={() => openModal(`${SERVER_URL}/api/getImg/${img.id}`)}>
                                    <div className={'delete-one-img'}
                                         onClick={(event) => (deleteImg(img.id, event))}>smazat
                                    </div>
                                </div>

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