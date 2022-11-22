/* Author: 
Inayatullah
*/
const form = document.querySelector('.form'),
    displayTodo = document.querySelector('.display-todo'),
    data = JSON.parse(localStorage.getItem('todo'));
let dataStore = data ? data : []
const todoInput = document.querySelector('.todo-input');


form.addEventListener('submit', function () {

    if (todoInput.value) {
        dataStore.push(todoInput.value);
        todoStorage(dataStore);
        checkStorage();
    }
});

function saveTodo(value) {
    const todoList = document.createElement('li');
    todoList.setAttribute('data-set','pending')
    todoList.className = "todo-list";
    todoList.innerHTML = `<div class="todo-info">${value}</div>
        <button class="control mark-done-btn">Mark as Done</button>
        <button class="control delete-btn">Delete</button>`
    displayTodo.appendChild(todoList);

    form.reset();
}

//saving on local storage
function todoStorage(input) {
    localStorage.setItem('todo', JSON.stringify(input));
}

function checkStorage() {
    if (data) {
        displayTodo.innerHTML = "";
        data.forEach(function (prevData) {
            saveTodo(prevData);
        })

        //delete todo function
        const deleteBtn = document.querySelectorAll('.delete-btn');
        deleteBtn.forEach(function (buttons, index) {
            buttons.addEventListener('click', function () {
                dataStore.splice(index, 1);
                todoStorage(dataStore);
                checkStorage();
            })
        });

        //mark as completed
        const completedBtn = document.querySelectorAll('.mark-done-btn');
        completedBtn.forEach( function(btn){
            btn.addEventListener('click', function (){
                btn.parentElement.classList.add('completed');
                btn.parentElement.setAttribute("data-set", "done");
            })
        })
    }
}
checkStorage();

//display stored todo list from localstorage

