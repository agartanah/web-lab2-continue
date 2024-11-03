export default function FormTask() {
    return (
        <>
            <div class="input-container">
                <input type="text" class="input-task" placeholder="Title..."/>
                <input type="text" class="input-task" placeholder="About..."/>
            </div>
            <div class="add-task-button-container">
                <button type="submit" id="add-button" class="add-button">
                </button>
            </div>
        </>
    );
}