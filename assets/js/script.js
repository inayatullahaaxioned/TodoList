/* Author: 
Inayatullah
*/
const form = document.querySelector('.form'),
    displayTodo = document.querySelector('.display-todo'),
    data = JSON.parse(localStorage.getItem('todo')),
    statusData = JSON.parse(localStorage.getItem('status'));
let statusTodo = statusData ? statusData : [];
let dataStore = data ? data : []
const todoInput = document.querySelector('.todo-input');


form.addEventListener('submit', function () {

    if (todoInput.value) {
        dataStore.push(todoInput.value);
        statusTodo.push(false);
        todoStorage(dataStore, statusTodo);
        checkStorage();
    }
});

function saveTodo(value) {
    const todoList = document.createElement('li');
    todoList.setAttribute('data-set', 'pending')
    todoList.className = "todo-list";
    todoList.innerHTML = `<div class="todo-info">${value}</div>
        <button class="control mark-done-btn">Mark as Done</button>
        <button class="control delete-btn">Delete</button>`
    displayTodo.appendChild(todoList);

    form.reset();
}

//saving on local storage
function todoStorage(input, status) {
    localStorage.setItem('todo', JSON.stringify(input));
    localStorage.setItem('status', JSON.stringify(status));
}

function checkStorage() {
    if (data && statusTodo) {
        displayTodo.innerHTML = "";
        data.forEach(function (prevData) {
            saveTodo(prevData);
        });

        //delete todo function
        const deleteBtn = document.querySelectorAll('.delete-btn');
        deleteBtn.forEach(function (buttons, index) {
            buttons.addEventListener('click', function () {
                dataStore.splice(index, 1);
                statusTodo.splice(index, 1);
                todoStorage(dataStore, statusTodo);
                checkStorage();
            })
        });

        //mark as completed
        const completedBtn = document.querySelectorAll('.mark-done-btn');
        completedBtn.forEach(function (btn, index) {
            btn.addEventListener('click', function () {
                btn.parentElement.classList.toggle('completed');
                btn.parentElement.setAttribute("data-set", "done");
                if (statusData[index] == false) {
                    statusTodo[index] = true;
                } else {
                    statusTodo[index] = false;
                }
                localStorage.setItem('status', JSON.stringify(statusTodo));
            })
        })
    }
}
//display stored todo list from localstorage
checkStorage();

let filter = document.querySelector('select');
let lists = document.querySelectorAll('.todo-list');

checkActive();
function checkActive() {
    for (let i = 0; i < statusTodo.length; i++) {
        let statusActive = statusTodo[i] == true ? "done" : "pending";
        lists[i].setAttribute('data-set', statusActive);
    }
}

lists.forEach(function (list) {
    if (list.classList.contains('completed')) {
        list.classList.add('show');
    }
    if (list.getAttribute('data-set') == "done") {
        list.classList.add('completed');
    }
})

filter.addEventListener('change', function () {
    value = this.value;
    lists.forEach(function (list) {
        let doneTodo = list.getAttribute('data-set');
        if (this.value == doneTodo || this.value == "all") {
            list.classList.remove('hide');
            list.classList.add('show');
            console.log(list);
        } else {
            list.classList.remove('show');
            list.classList.add('hide');
        }
    })
})
