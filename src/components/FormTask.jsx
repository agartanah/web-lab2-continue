import "../styles/main.css"
import { 
    setTaskToLocalStorage
} from "../data/localStorage";
import { useRef } from "react";
import { useAppContext } from "../contexts/Context";

export default function FormTask() {
    const { setListTasks, setIndex } = useAppContext();

    const inputTitle = useRef(null);
    const inputDescription = useRef(null);

    const addClick = () => {
        let title = inputTitle.current.value;
        let description = inputDescription.current.value;

        if (title == '') {
            inputTitle.current.className += ' error-value';

            return;
        } else {
            inputTitle.current.className = 'input-task';
        }

        if (description == '') {
            description = 'Нет описания';
        }

        setIndex(prevIndex => {
            let newIndex = prevIndex + 1;
            console.log(newIndex);

            setTaskToLocalStorage(newIndex, title, description);
            setListTasks(prevTasks => [
                { 
                    id: newIndex, 
                    title: title, 
                    description: description 
                },
                ...prevTasks
            ]);

            inputTitle.current.value = '';
            inputDescription.current.value = '';

            return newIndex;
        });
    }

    return (
        <div id="form-task-container" class="form-task-container">
            <div class="input-container">
                <input type="text" class="input-task" placeholder="Title..." ref={ inputTitle }/>
                <input type="text" class="input-task" placeholder="About..." ref={ inputDescription }/>
            </div>
            <div class="add-task-button-container">
                <button type="submit" id="add-button" class="add-button" onClick={ addClick }>
                </button>
            </div>
        </div>
    );
}