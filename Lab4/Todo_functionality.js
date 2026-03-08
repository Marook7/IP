class Task {
    constructor(description) {
        this.description = description;
        this.completed = false;
    }
}
    let tasks = [];

function addTask(){
    let input = document.getElementById("Input")
    let text = input.value
    if(text === "") return
    let task = new Task(text)
    tasks.push(task)
    input.value = ""
    displayTasks()
}


function displayTasks(){
    let list = document.getElementById("tasks")

    list.innerHTML = ""
    for(let i=0;i<tasks.length;i++){

        let li = document.createElement("li")
        li.innerHTML = tasks[i].description
        if(tasks[i].completed){
            li.classList.add("completed")
        }
        li.onclick = function(){
            tasks[i].completed = !tasks[i].completed
            displayTasks()
        }
        let deleteBtn = document.createElement("button")
        deleteBtn.innerHTML = "Delete"
        deleteBtn.onclick = function(e){
            e.stopPropagation()
            tasks.splice(i,1)
            displayTasks()
        }
        li.appendChild(deleteBtn)
        list.appendChild(li)
    }
}

