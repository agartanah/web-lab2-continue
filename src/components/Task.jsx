import { useRef } from "react";
import "../styles/main.css"
import { useAppContext } from "../contexts/Context";

export default function Task({ title, description, id, openTask, setOpenTask }) {
    const { setCurrTask, setCurrOperation } = useAppContext();

    const pTitle = useRef(null);
    const pDescription = useRef(null);
    
    return (
        <div class="task-container">
            <div class="task" onClick={() => {
                if (openTask == id) {
                    setOpenTask('');

                    return;
                }

                setOpenTask(id)
            }}>
                <div class="task-text">
                    <p class="task-title" ref={ pTitle }>{ title }</p>
                    <p class="task-description" ref={ pDescription }>{ description }</p>
                </div>
                <div class="dell-task-button-container">
                    <button class="dell-button" onClick={ (event) => {
                        event.stopPropagation();

                        setCurrTask({ id: id, title: title, description: description });
                        setCurrOperation('del');
                    }}>
                    </button>
                </div>
            </div>
            { openTask == id &&
                <div class="task-buttons-container">
                    <button class="share-button" onClick={ () => {
                        setCurrTask({ id: id, title: pTitle, description: pDescription })
                        setCurrOperation('share');
                    }}></button>
                    <button class="info-button" onClick={ () => {
                        if (pTitle.current.classList.contains('task-title-extend')) {
                            pTitle.current.classList.remove('task-title-extend');
                        } else {
                            pTitle.current.classList.add('task-title-extend');
                        }
                    
                        if (pDescription.current.classList.contains('task-description-extend')) {
                            pDescription.current.classList.remove('task-description-extend');
                        } else {
                            pDescription.current.classList.add('task-description-extend');
                        }
                    }}></button>
                    <button class="edit-button" onClick={ () => {
                        setCurrTask({ id: id, title: pTitle, description: pDescription })
                        setCurrOperation('edit');
                    }}></button>
                </div>
            }
        </div>
    );
}