import { useEffect, useRef } from "react";
import "../styles/main.css"
import { useAppContext } from "../contexts/Context";
import { 
    shift
} from "../data/localStorage";

export default function Task({ title, description, id, openTask, setOpenTask, position, setPosition, draggedTask, setDraggedTask, currDraggedTask, setCurrDraggedTask }) {
    const { setCurrTask, setCurrOperation, setListTasks, listTasks } = useAppContext();

    const pTitle = useRef(null);
    const pDescription = useRef(null);

    const task = useRef(null);

    useEffect(() => {
        if (currDraggedTask == id) {
            task.current.style.transform = `translate(${position.x}px, ${position.y}px)`;
        } else {
            const newTaskId = currDraggedTask - Math.round(position.y / 78);

            if (newTaskId != draggedTask) {
                let draggedIdUp = draggedTask, draggedIdDown = draggedTask - 1;

                if (position.y < 0) {
                    draggedIdUp = draggedTask + 1;
                    draggedIdDown = draggedTask;
                }

                if (newTaskId == draggedTask - 1 && id == draggedIdDown) {
                    setDraggedTask(draggedTask - 1);

                    task.current.style.transition = 'transform 0.3s ease';
                    const y = Number(task.current.style.transform.match(/translate\(([-\d.]+)px, ([-\d.]+)px\)/)[2]);

                    task.current.style.transform = `translate(${0}px, ${
                        y || y == 0 ? y - 78 : -78
                    }px)`;
                }
    
                if (newTaskId == draggedTask + 1 && id == draggedIdUp) {
                    setDraggedTask(draggedTask + 1);

                    task.current.style.transition = 'transform 0.3s ease';
                    const y = Number(task.current.style.transform.match(/translate\(([-\d.]+)px, ([-\d.]+)px\)/)[2]);

                    task.current.style.transform = `translate(${0}px, ${
                        y || y == 0 ? y + 78 : 78
                    }px)`;
                }
            }
        }
    }, [position]);

    useEffect(() => {
        if (draggedTask == 0) {
            task.current.style.transform = `translate(${0}px, ${0}px)`;
            task.current.style.transition = '';
            task.current.style.position = 'static';
            task.current.style.zIndex = 0;
        }
    }, [draggedTask])

    const handleMouseDown = (event) => {
        setIsDragging(true);
        setDraggedTask(id);
        setCurrDraggedTask(id);
        setPosition({x: 0, y: 0});

        pTitle.current.classList.remove('task-title-extend');
        pDescription.current.classList.remove('task-description-extend');

        task.current.style.transition = '';
        task.current.style.position = 'relative';
        task.current.style.zIndex = 1;
    };

    const handleMouseMove = (event) => {
        if (currDraggedTask != id) return;

        setOpenTask(0);

        setPosition((prevPosition) => {    
            return { x: position.x, y: prevPosition.y + event.movementY };
        });
    };

    const handleMouseUp = () => {
        if (currDraggedTask != id) {
            return;
        }

        if (draggedTask == id) {
            setPosition({ x: 0, y: 0 });
            setCurrDraggedTask(0);
            setDraggedTask(0);
            setIsDragging(false);

            return;
        }

        const array = shift(id, draggedTask, listTasks);

        setCurrDraggedTask(0);
        setDraggedTask(0);
        setIsDragging(false);
        setListTasks(array);
        setOpenTask(id);
    };
    
    return (
        <div class="task-container" 
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            ref={ task }>
            <div class="task" onClick={ (event) => {
                event.stopPropagation();
                
                if (openTask == id) {
                    setOpenTask(0);

                    return;
                }
                
                setOpenTask(id);
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
                    <button class="share-button" onClick={ (event) => {
                        event.stopPropagation();

                        setCurrTask({ id: id, title: pTitle, description: pDescription })
                        setCurrOperation('share');
                    }}></button>
                    <button class="info-button" onClick={ (event) => {
                        event.stopPropagation();

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
                    <button class="edit-button" onClick={ (event) => {
                        event.stopPropagation();

                        setCurrTask({ id: id, title: pTitle, description: pDescription })
                        setCurrOperation('edit');
                    }}></button>
                </div>
            }
        </div>
    );
}