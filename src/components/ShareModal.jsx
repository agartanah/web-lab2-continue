import { useAppContext } from "../contexts/TaskManagerContext";
import React, { useRef, useEffect } from 'react';

export default function ShareModal() {
    const { shareModal, currTask, currOperation, setCurrOperation } = useAppContext();

    const shareModalContent = useRef(null);

    useEffect(() => {
        if (currOperation == 'share') {
            shareModal.current.showModal();
        }
    }, [currOperation]);

    function onClickBackdrop(event) {
        if (event.target != shareModalContent.current) {
            shareModal.current.close();
            
            setCurrOperation('');
        }
    }

    function onClickCopy(event) {
        event.stopPropagation();
    
        navigator.clipboard.writeText(
            `Title: ${ currTask.title.current.textContent }
            Description: ${ currTask.description.current.textContent }`
        );
    
        shareModal.current.close();

        setCurrOperation('');
    }
    
    function onClickVk(event) {
        event.stopPropagation();
            
        // код для поделиться в вк
        
        shareModal.current.close();

        setCurrOperation('');
    }
    
    function onClickTelegram(event) {
        event.stopPropagation();
            
        // код для поделиться в телеграме
    
        shareModal.current.close();

        setCurrOperation('');
    }

    function onClickWhatsup(event) {
        event.stopPropagation();
            
        // код для поделиться в ватс апе
    
        shareModal.current.close();

        setCurrOperation('');
    }
    
    function onClickFacebook(event) {
        event.stopPropagation();
            
        // код для поделиться в фэйсбуке
    
        shareModal.current.close();
    
        setCurrOperation('');
    }

    return (
        <dialog className="share-modal" open="" ref={ shareModal } onMouseDown={ onClickBackdrop }>
            <div className="share-modal-content" ref={ shareModalContent }>
                <button className="copy-button" onClick={ onClickCopy }></button>
                <button className="vk-button" onClick={ onClickVk }></button>
                <button className="telegram-button" onClick={ onClickTelegram }></button>
                <button className="whatsup-button" onClick={ onClickWhatsup }></button>
                <button className="facebook-button" onClick={ onClickFacebook }></button>
            </div>
        </dialog>
    );
}