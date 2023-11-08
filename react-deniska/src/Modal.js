import React, { useState } from 'react';
import './Modal.css'
const Modal = ({ show, onClose, imageUrl }) => {
    return (
        <div className={`modal ${show ? 'active' : ''}`} onClick={onClose}>
            <div className="modal-content">
                <img src={imageUrl} alt="Full-size Image" />
            </div>
        </div>
    );
};

export default Modal;