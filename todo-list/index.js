window.onload = function () {
    let task = document.querySelector(".add-task input")
    let add_task = document.querySelector(".add-task .plus")
    let task_container = document.querySelector(".tasks-content")
    let tasks_count = document.querySelector(".tasks-count span")
    let tasks_completed = document.querySelector(".tasks-completed span")

    task.focus();
    add_task.onclick = function () {
        if (task.value !== "" ) {
            let exists = false
            let all_values = document.querySelectorAll(".task-box")
            all_values.forEach(element => {
                if (task.value === element.innerText.split("\n")[0] && !exists) {
                    exists = true
                }
            });
            if (exists) {
                window.alert("this exists")
                task.value = ""
            } else {
                calculate_all_tasks()
                let no_task = document.querySelector(".no-tasks-messages")
                if (document.body.contains(document.querySelector(".no-tasks-messages"))) {
                    no_task.remove()
                }
                let value = document.createElement("span")
                let text = document.createTextNode(task.value.trim())
                let delete_value = document.createElement("span")
                value.className = "task-box"
                delete_value.className = "delete"
                delete_value.appendChild(document.createTextNode("+"))
                value.appendChild(text)
                value.append(delete_value)
                task_container.appendChild(value)
                task.value = ""
            }
        }
    }

    document.addEventListener("click" , function (element) {
        if (element.target.className === "delete") {
            element.target.parentNode.remove()
            create_no_tasks()
            remove_task()
            if (element.target.parentNode.classList.contains("finished")) {
                tasks_completed.innerHTML = parseInt(tasks_completed.innerHTML) - 1
            }
        }
        if (element.target.classList.contains("task-box")) {
            element.target.classList.toggle("finished")
        }
    })

    function create_no_tasks() {
        if(document.querySelectorAll(".no-tasks-messages").length === 0) {
            let _no_task = document.createElement("span")
            _no_task.appendChild(document.createTextNode("no tasks to show"))
            _no_task.className = "no-tasks-messages"
            let _all = document.querySelectorAll(".task-box")
            if (_all.length === 0) {
                task_container.appendChild(_no_task)
            }
        }
    }

    function calculate_all_tasks() {
        tasks_count.innerHTML = parseInt(tasks_count.innerHTML) +1
    }

    function remove_task() {
        tasks_count.innerHTML = parseInt(tasks_count.innerHTML) -1
    }

    document.addEventListener("click" , function(element) {
        if (element.target.classList.contains("task-box")) {
            if (element.target.classList.contains("finished")) {
                tasks_completed.innerHTML = parseInt(tasks_completed.innerHTML) + 1
            }else {
                tasks_completed.innerHTML = parseInt(tasks_completed.innerHTML) - 1
            }
        }
    })
}
