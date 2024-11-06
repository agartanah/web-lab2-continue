function setTaskToLocalStorage(taskId, taskTitle, taskDescription) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    const newTask = {
        id: taskId,
        title: taskTitle,
        description: taskDescription
    };

    tasks.push(newTask);

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

    return array;
}

function deleteTaskFromLocalStorage(taskId) {
    if (localStorage.getItem("tasks").length) {
        localStorage.setItem("tasks", JSON.stringify(JSON.parse(localStorage.getItem("tasks")).filter((task) => task.id !== taskId)))
    }

    return readLocalStorage();
}

function hasKey(key) {
    return localStorage.getItem(key) !== null;
}

export { setTaskToLocalStorage, readLocalStorage, deleteTaskFromLocalStorage, hasKey };