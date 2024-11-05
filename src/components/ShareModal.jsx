import { useAppContext } from "../contexts/Context";
import React, { useRef, useEffect } from 'react';

export default function ShareModal() {
    const { shareModal, currTask, currOperation, setCurrOperation, backdrop } = useAppContext();

    const buttonCopy = useRef(null);
    const buttonVk = useRef(null);
    const buttonTelegram = useRef(null);
    const buttonWhatsup = useRef(null);
    const buttonFacebook = useRef(null);
    const shareModalContent = useRef(null);

    useEffect(() => {
        if (currOperation == 'share') {
            shareModal.current.showModal();
            shareModal.current.addEventListener('click', onClickBackdrop);
            
            backdrop.current.classList.add('backdrop-open');
        
            buttonCopy.current.addEventListener('click', onClickCopy, { once: true });
            buttonVk.current.addEventListener('click', onClickVk, { once: true });
            buttonTelegram.current.addEventListener('click', onClickTelegram, { once: true });
            buttonWhatsup.current.addEventListener('click', onClickWhatsup, { once: true });
            buttonFacebook.current.addEventListener('click', onClickFacebook, { once: true });
    
            return () => {
                buttonCopy.current.removeEventListener('click', onClickCopy);
                buttonVk.current.removeEventListener('click', onClickVk);
                buttonTelegram.current.removeEventListener('click', onClickTelegram);
                buttonWhatsup.current.removeEventListener('click', onClickWhatsup);
                buttonFacebook.current.removeEventListener('click', onClickFacebook);

                shareModal.current.removeEventListener('click', onClickBackdrop);

                backdrop.current.classList.remove('backdrop-open');
            };
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
        shareModal.current.removeEventListener('click', onClickBackdrop);
    
        backdrop.current.classList.remove('backdrop-open'); 

        setCurrOperation('');
    }
    
    function onClickVk(event) {
        event.stopPropagation();
            
        // код для поделиться в вк
        
        shareModal.current.close(); 
        shareModal.current.removeEventListener('click', onClickBackdrop);
    
        backdrop.current.classList.remove('backdrop-open'); 

        setCurrOperation('');
    }
    
    function onClickTelegram(event) {
        event.stopPropagation();
            
        // код для поделиться в телеграме
    
        shareModal.current.close(); 
        shareModal.current.removeEventListener('click', onClickBackdrop);
    
        backdrop.current.classList.remove('backdrop-open'); 

        setCurrOperation('');
    }

    function onClickWhatsup(event) {
        event.stopPropagation();
            
        // код для поделиться в ватс апе
    
        shareModal.current.close(); 
        shareModal.current.removeEventListener('click', onClickBackdrop);
    
        backdrop.current.classList.remove('backdrop-open'); 

        setCurrOperation('');
    }
    
    function onClickFacebook(event) {
        event.stopPropagation();
            
        // код для поделиться в фэйсбуке
    
        shareModal.current.close(); 
        shareModal.current.removeEventListener('click', onClickBackdrop);
    
        backdrop.current.classList.remove('backdrop-open'); 
    
        setCurrOperation('');
    }

    return (
        <dialog class="share-modal" open="" ref={ shareModal }>
            <div class="share-modal-content" ref={ shareModalContent }>
                <button class="copy-button" ref={ buttonCopy }></button>
                <button class="vk-button" ref={ buttonVk }></button>
                <button class="telegram-button" ref={ buttonTelegram }></button>
                <button class="whatsup-button" ref={ buttonWhatsup }></button>
                <button class="facebook-button" ref={ buttonFacebook }></button>
            </div>
        </dialog>
    );
}