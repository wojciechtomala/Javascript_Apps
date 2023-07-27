const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const todoCard = document.getElementById("todo-card");

form.addEventListener("submit", (e)=>{
    e.preventDefault();
    const value = input.value;
    if(!value) return;
    
    const newTask = document.createElement("p");
    
    newTask.classList.add("task");
    newTask.setAttribute("draggable", "true");
    newTask.innerText = value;

    newTask.addEventListener("dragstart",() =>{
        newTask.classList.add("is-dragging");
    });
    newTask.addEventListener("dragend",()=>{
        newTask.classList.remove("is-dragging");
    });

    todoCard.appendChild(newTask);
    input.value = "";
});