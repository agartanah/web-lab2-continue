function setTaskToLocalStorage(taskId, taskTitle, taskDescription) {
    localStorage.setItem(taskId, JSON.stringify({
        title: taskTitle,
        description: taskDescription
    }));
}

function readLocalStorage() {
    let array = [];

    for (let index = 0; index < localStorage.length; ++index) {
        const key = localStorage.key(index);
        let { title, description } = JSON.parse(localStorage.getItem(key));

        array[index] = { id: Number(key), title: title, description: description };
    }

    array.sort((a, b) => a.id - b.id);
    array.reverse();

    return array || [];
}

function deleteTaskFromLocalStorage(taskId) {
    localStorage.removeItem(taskId);

    if (taskId != localStorage.length + 1) {
        while(hasKey(taskId + 1)) {
            localStorage.setItem(taskId, localStorage.getItem(taskId + 1));
            localStorage.removeItem(taskId + 1);

            ++taskId;
        }
    }

    return readLocalStorage();
}

function shift(id, newId, listTasks) {
    let array = JSON.parse(JSON.stringify(listTasks));
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
    return localStorage.getItem(key) !== null;
}

function printArray(arr) {
    console.log(JSON.stringify(arr));
}

export { setTaskToLocalStorage, readLocalStorage, deleteTaskFromLocalStorage, hasKey, shift };