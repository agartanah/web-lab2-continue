import { useAppContext } from "../contexts/TaskManagerContext";
import React, { useRef, useEffect } from 'react';
import { 
    deleteTaskFromLocalStorage
} from "../data/localStorage";

export default function DeleteModal() {
    const { delModal, openTask, setOpenTask, currTask, currOperation, setCurrOperation, setListTasks, setIndex } = useAppContext();
    const delModalContent = useRef(null);

    useEffect(() => {
        if (currOperation == 'del') {   
            delModal.current.showModal();
        }
    }, [currOperation])

    function onClickBackdrop(event) {
        if (event.target == delModal.current &&
            event.target != delModalContent.current) {
            delModal.current.close();
            
            setCurrOperation('');
        }
    }

    function onClickYes() {
        delModal.current.close();

        setIndex(prevIndex => prevIndex - 1);
        
        if (openTask == currTask.id) {
            setOpenTask('');
        }

        setListTasks(deleteTaskFromLocalStorage(currTask.id));
        
        setCurrOperation('');
    }

    function onClickNo() {
        delModal.current.close();

        setCurrOperation('');
    }

    return (
        <dialog class="modal-window" open="" ref={ delModal } onMouseDown={ onClickBackdrop }>
            <div class="modal-content-container" ref={ delModalContent }>
                <div class="modal-decoration">
                </div>
                <div class="modal-text-container">
                    <p class="modal-text">Delete this task?</p>
                </div>
                <div class="modal-buttons-container">
                    <button class="text-buttons" onClick={ onClickYes }>Да</button>
                    <button class="text-buttons re-bg" onClick={ onClickNo }>Нет</button>
                </div>
            </div>
        </dialog>
    );
}
