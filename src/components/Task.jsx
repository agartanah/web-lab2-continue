import { useEffect, useRef, useState } from "react";
import "../styles/main.css"
import { useAppContext } from "../contexts/Context";

export default function Task({ title, description, id, openTask, setOpenTask, position, setPosition, draggedTask, setDraggedTask, currDraggedTask, setCurrDraggedTask }) {
    const { setCurrTask, setCurrOperation, setListTasks } = useAppContext();

    const pTitle = useRef(null);
    const pDescription = useRef(null);

    const task = useRef(null);
    const [ isDragging, setIsDragging ] = useState(false);

    useEffect(() => {
        if (isDragging) {
            task.current.style.transform = `translate(${position.x}px, ${position.y}px)`;
            console.log("Y: " + position.y);
        } else {
            const newTaskId = currDraggedTask - (position.y / 78 >= 0 ? Math.floor(position.y / 78) : Math.ceil(position.y / 78));
            
            console.log('TASKID: ' + newTaskId);

            if (newTaskId != draggedTask) {
                console.log('ZASHEL');
                console.log(draggedTask - 1);
                console.log(draggedTask + 1);
                if (newTaskId == draggedTask - 1 && id == draggedTask - 1) {
                    setDraggedTask(draggedTask - 1);
                    console.log("-");

                    console.log("NEWTASKID: " + newTaskId);
                    console.log("DRAGGEDTASK: " + draggedTask);
                    console.log("ID: " + id);

                    const y = currentTransform.match(/translate\(([-\d.]+)px, ([-\d.]+)px\)/)[2];

                    console.log(y);

                    task.current.style.transform = `translate(${0}px, ${
                        y ? y + 78 : 78
                    }px)`;
                }
    
                if (newTaskId == draggedTask + 1 && id == draggedTask + 1) {
                    setDraggedTask(draggedTask + 1);
                    console.log("-");

                    console.log("NEWTASKID: " + newTaskId);
                    console.log("DRAGGEDTASK: " + draggedTask);
                    console.log("ID: " + id);

                    const y = currentTransform.match(/translate\(([-\d.]+)px, ([-\d.]+)px\)/)[2];

                    console.log(y);

                    task.current.style.transform = `translate(${0}px, ${
                        y ? y - 78 : -78
                    }px)`;
                }
            }
        }
    }, [position]);

    useEffect(() => {
        if (draggedTask == 0) {
            task.current.style.transform = `translate(${0}px, ${0}px)`;
            task.current.style.position = 'static';
            task.current.style.zIndex = 0;
        }
    }, [draggedTask])

    const handleMouseDown = (event) => {
        setIsDragging(true);
        setDraggedTask(id);
        setCurrDraggedTask(id)

        task.current.style.position = 'relative';
        task.current.style.zIndex = 1;

        console.log(isDragging);
        console.log(draggedTask);
        console.log(position);

        console.log('DOWN');
        // task.current.style.zIndex = 2;
        // const currentTransform = task.current.style.transform;
        // const match = currentTransform.match(/translate\(([-\d.]+)px, ([-\d.]+)px\)/);

        // setPosition(match ? parseFloat(match[2]) : 0);

        // console.log("START: " + match[2]);
    };

    const handleMouseMove = (event) => {
        if (!isDragging) return;

        setOpenTask('');
        // console.log("HEIGHT: " + task.current.offsetHeight);

        if (Number(position.y + event.movementY) >= task.current.offsetHeight) {
            // setListTasks((prevListTask) => {
            //     prevListTask.reverse();
                
            //     const temp = prevListTask[id - 1];
            //     console.log("ID: " + Number(id - 1) + " " + Number(id - 2));
            //     prevListTask[id - 1] = prevListTask[id - 2];
            //     prevListTask[id - 2] = temp;

            //     prevListTask[id - 1].id = id - 1;
            //     prevListTask[id - 2].id = id;
                
            //     console.log(prevListTask[id - 1].id);
            //     console.log(prevListTask[id - 2].id);

            //     prevListTask.reverse();

            //     prevListTask.forEach(element => {
            //         console.log(element.id);
            //     });

            //     return prevListTask;
            // });

            // setPosition({ x: 0, y: 0 });

            // return;
        } else if (Number(position.y + event.movementY) <= task.current.offsetHeight) {
            // setListTasks((prevListTask) => {
            //     prevListTask.reverse();
                
            //     const temp = prevListTask[id + 1];
            //     console.log("ID: " + Number(id + 1) + " " + Number(id + 2));
            //     prevListTask[id + 1] = prevListTask[id + 2];
            //     prevListTask[id + 2] = temp;

            //     prevListTask[id + 1].id = id + 1;
            //     prevListTask[id + 2].id = id;
                
            //     console.log(prevListTask[id + 1].id);
            //     console.log(prevListTask[id + 2].id);

            //     prevListTask.reverse();

            //     prevListTask.forEach(element => {
            //         console.log(element.id);
            //     });

            //     return prevListTask;
            // });

            // setPosition({ x: 0, y: 0 });

            // return;
        }

        setPosition((prevPosition) => { 
            // console.log("MOVE: " + Number(prevPosition.y + event.movementY));

            return { x: position.x, y: prevPosition.y + event.movementY };
        });
    };

    const handleMouseUp = () => {
        if (draggedTask == id) {
            setPosition({ x: 0, y: 0 });
            setDraggedTask(0);
            setIsDragging(false);
            console.log("RAVNI");
            return;
        }
        
        setIsDragging(false);
        // setListTasks(prevListTasks => {
        //     if () {

            
        // });

        setPosition({ x: 0, y: 0 });
    };
    
    return (
        <div class="task-container" 
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            ref={ task }>
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