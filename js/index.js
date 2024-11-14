const form = document.querySelector("#form");
const input = document.querySelector("#input");
const block = document.querySelector("#block");
const btn = document.querySelector("#btn");

function veledet(input) {
    if (input.value.length < 4) {
        alert('Todo eng kamida 4 ta so‘zdan iborat bo‘lsin');
        input.focus();
        return false;
    }
    return true;
}

function creatCard(data) {
    const todoItem = document.createElement("div");
    todoItem.className = "block";
    todoItem.style.width = "300px";
    todoItem.style.border = "1px solid black";
    todoItem.style.borderRadius = "15px";
    todoItem.style.display = "flex";
    todoItem.style.justifyContent = "space-between";
    todoItem.style.alignItems = "center";
    todoItem.style.padding = "15px";
    todoItem.style.marginBottom = "20px";

    const todoText = document.createElement("p");
    todoText.textContent = data.name;

    const deleteButton = document.createElement("img");
    deleteButton.src = "https://img.icons8.com/ios-glyphs/30/000000/trash.png";
    deleteButton.alt = "Trash Icon";
    deleteButton.height = 25;
    deleteButton.style.cursor = "pointer";

    deleteButton.addEventListener("click", function () {
        block.removeChild(todoItem);

        let todos = getData();
        todos = todos.filter(todo => todo.id !== data.id);
        localStorage.setItem("todos", JSON.stringify(todos));
    });

    todoItem.appendChild(todoText);
    todoItem.appendChild(deleteButton);
    block.appendChild(todoItem);
}

function getData() {
    let data = [];
    if (localStorage.getItem("todos")) {
        data = JSON.parse(localStorage.getItem("todos"));
    }
    return data;
}

btn && btn.addEventListener("click", function (event) {
    event.preventDefault();

    const isValed = veledet(input);
    if (!isValed) {
        return;
    }

    const todo = {
        id: Date.now(),
        name: input.value
    };

    creatCard(todo);
    input.value = "";

    let todos = getData();
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
});

document.addEventListener("DOMContentLoaded", function () {
    let todos = getData();

    todos.forEach(todo => {
        creatCard(todo);
    });
});

