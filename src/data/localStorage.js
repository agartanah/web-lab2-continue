function setTaskToLocalStorage(taskId, taskTitle, taskDescription) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    
    if (hasKey(taskId)) {
        tasks.forEach((item) => {
            if (item.id == taskId) {
                item.title = taskTitle;
                item.description = taskDescription;
            }
        });
    } else {
        const newTask = {
            id: taskId,
            title: taskTitle,
            description: taskDescription
        };

        tasks.push(newTask);
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function readLocalStorage() {
    let array = [];

    if (localStorage.getItem("tasks") && localStorage.getItem("tasks").length) {
        JSON.parse(localStorage.getItem("tasks")).forEach((task) => {
            array.push({id: task.id, title: task.title, description: task.description})
        })
    } else {
        return
    }

    array.sort((a, b) => a.id - b.id); // сортировка элементов к порядку их добавления
    array.reverse();

    return array || [];
}

function deleteTaskFromLocalStorage(taskId) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    const taskIndex = tasks.findIndex(task => task.id === taskId);

    if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);

        for (let i = taskIndex; i < tasks.length; i++) {
            tasks[i].id -= 1;
        }

        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    return tasks.reverse();
}

function shift(id, newId, listTasks) {
    let array = [...listTasks];
    array.reverse();

    if (!array.length) {
        return;
    }

    let subArray;

    if (id > newId) {
        subArray = array.slice(newId - 1, id);

        subArray = [subArray[subArray.length - 1], ...subArray];
        subArray.splice(subArray.length - 1, 1);

        for (let index = 0; index < subArray.length; ++index) {
            subArray[index].id = index + newId;
        }

        array.splice(newId - 1, id - newId + 1, ...subArray);
    }

    if (id < newId) {
        subArray = array.slice(id - 1, newId);

        subArray = [...subArray, subArray[0]];
        subArray.splice(0, 1);

        for (let index = 0; index < subArray.length; ++index) {
            subArray[index].id = index + id;
        }

        array.splice(id - 1, newId - id + 1, ...subArray);
    }

    array.forEach((item) => {
        setTaskToLocalStorage(item.id, item.title, item.description);
    });

    return array.reverse();
}

function hasKey(key) {
    let array = JSON.parse(localStorage.getItem('tasks'));
    let isHas = false;

    if (!array || array.length === 0) return isHas;

    JSON.parse(localStorage.getItem('tasks')).forEach((item) => {

        if (key == item.id) {
            isHas = true;
            
            return;
        }
    });

    return isHas;
}

function printArray(arr) {
    console.log(JSON.stringify(arr));
}

export { setTaskToLocalStorage, readLocalStorage, deleteTaskFromLocalStorage, hasKey, shift };