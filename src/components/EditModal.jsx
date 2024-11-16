import { useAppContext } from "../contexts/TaskManagerContext";
import React, { useState, useRef, useEffect } from 'react';
import { 
    setTaskToLocalStorage
} from "../data/localStorage";

export default function EditModal() {
    const { editModal, currTask, currOperation, setCurrOperation } = useAppContext();

    const inputTitle = useRef(null);
    const inputDescription = useRef(null);
    const editModalContent = useRef(null);

    const [ isError, setIsError ] = useState(false);
    const [ titleValue, setTitleValue ] = useState('Title...');
    const [ descriptionValue, setDescriptionValue ] = useState('Description...');

    useEffect(() => {
        if (currOperation == 'edit') {
            editModal.current.showModal();
            
            setTitleValue(currTask.title.current.textContent);
            setDescriptionValue(currTask.description.current.textContent);
        }
    }, [currOperation]);

    function onClickBackdrop(event) {
        if (event.target == editModal.current && 
            (event.target != editModalContent.current &&
            event.target != inputTitle.current &&
            event.target != inputDescription.current)) {
            editModal.current.close();
            
            setIsError(false);
            setCurrOperation('');
        }
    }
    
    function onClickSave() {
        if (titleValue == '') {
            setIsError(true);
    
            return;
        }

        setIsError(false);
    
        currTask.title.current.textContent = titleValue;
        currTask.description.current.textContent = descriptionValue;
    
        setTaskToLocalStorage(currTask.id, titleValue, descriptionValue);
    
        editModal.current.close();

        setCurrOperation('');
    }
    
    function onClickCancel() {
        editModal.current.close();

        setIsError(false);
        setCurrOperation('');
    }

    return (
        <dialog className="edit-modal" open="" ref={ editModal } onMouseDown={ onClickBackdrop }>
            <div className="edit-modal-content" ref={ editModalContent }>
                <div className="input-container">
                    <input type="text"
                        className={ isError ? "input-task error-value" : "input-task" }
                        ref={ inputTitle }
                        value={ titleValue }
                        onChange={ (event) => {
                            setTitleValue(event.target.value);
                        } }
                    />
                    <textarea className="input-task input-description"
                        ref={ inputDescription }
                        value={ descriptionValue }
                        onChange={ (event) => {
                            setDescriptionValue(event.target.value);
                        } }
                    />
                </div>
                <div className="edit-modal-buttons-container">
                    <button className="text-buttons" onClick={ onClickCancel }>Cancel</button>
                    <button className="text-buttons" onClick={ onClickSave }>Save</button>
                </div>
            </div>
        </dialog>
    );
}