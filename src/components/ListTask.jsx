import Task from "./Task";
import "../styles/main.css"
import { useAppContext } from "../contexts/Context";

export default function ListTask() {
    const { listTasks, openTask, setOpenTask } = useAppContext();

    return (
        <div id="list-task-container" class="list-task-container">
            { listTasks.length == 0 && 
                <img src="/src/images/no-tasks.svg" alt="" class="no-tasks"></img>
            }

            {
                listTasks.map((elem) => (
                    <Task 
                        title={ elem.title } 
                        description={ elem.description }
                        id={ elem.id } 
                        openTask={ openTask }
                        setOpenTask={ setOpenTask }
                        key={ elem.id }>
                    </Task>
                ))
            }
        </div>
    );
}