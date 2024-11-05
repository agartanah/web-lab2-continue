import { useAppContext } from "../contexts/Context";
import React, { useRef, useEffect } from 'react';
import { 
    setTaskToLocalStorage
} from "../data/localStorage";

export default function EditModal() {
    const { editModal, currTask, currOperation, setCurrOperation, backdrop } = useAppContext();

    const inputTitle = useRef(null);
    const inputDescription = useRef(null);
    const buttonCancel = useRef(null);
    const buttonSave = useRef(null);
    const editModalContent = useRef(null);
    const inputContainer = useRef(null);

    useEffect(() => {
        if (currOperation == 'edit') {
            editModal.current.showModal();
            editModal.current.addEventListener('mousedown', onClickBackdrop);
            
            backdrop.current.classList.add('backdrop-open');
        
            inputTitle.current.value = currTask.title.current.textContent;
            inputDescription.current.value = currTask.description.current.textContent;
        
            buttonCancel.current.addEventListener('click', onClickCancel, { once: true });
            buttonSave.current.addEventListener('click', onClickSave);

            return () => {
                buttonCancel.current.removeEventListener('click', onClickCancel);
                buttonSave.current.removeEventListener('click', onClickSave);

                editModal.current.removeEventListener('mousedown', onClickBackdrop);

                backdrop.current.classList.remove('backdrop-open');
                inputTitle.current.classList.remove('error-value');
            };
        }
    }, [currOperation]);

    function onClickBackdrop(event) {
        if (event.target == editModal.current && 
            (event.target != editModalContent.current &&
            event.target != inputTitle.current &&
            event.target != inputDescription.current)) {
            editModal.current.close();
            
            setCurrOperation('');
        }
    }
    
    function onClickSave() {
        const title = inputTitle.current.value;
        const description = inputDescription.current.value;

        if (title == '') {
            inputTitle.current.classList.add('error-value');
    
            return;
        }
        inputTitle.current.classList.remove('error-value');
    
        currTask.title.current.textContent = title;
        currTask.description.current.textContent = description;
    
        setTaskToLocalStorage(currTask.id, title, description);
    
        editModal.current.close();

        setCurrOperation('');
    }
    
    function onClickCancel() {
        editModal.current.close();

        setCurrOperation('');
    }

    return (
        <dialog class="edit-modal" open="" ref={ editModal }>
            <div class="edit-modal-content" ref={ editModalContent }>
                <div class="input-container" ref={ inputContainer }>
                    <input type="text" placeholder="Title..." class="input-task" ref={ inputTitle }/>
                    <textarea placeholder="Description..." class="input-task input-description" ref={ inputDescription }></textarea>
                </div>
                <div class="edit-modal-buttons-container">
                    <button class="text-buttons" ref={ buttonCancel }>Cancel</button>
                    <button class="text-buttons" ref={ buttonSave }>Save</button>
                </div>
            </div>
        </dialog>
    );
}