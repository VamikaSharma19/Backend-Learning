let todos = [
    {
        id : 12,
        title : "Complete assignment"
    },
    {
        id : 123,
        title : "Cook food"
    }
]

let todocontainer = document.querySelector(".todocontainer")

function addTodo(todo) {
    let li = document.createElement("li");
    li.innerHTML = `<div>
                <input type = "checkbox" name = "" id = "">
                <h2> ${todo.title} </h2>
                <div>
                    <button> ❌ </button>
                    <button> ✏️ </button>
                </div>
            </div> <br>`
    todocontainer.appendChild(li);
}

function showAllTodos(todos) {
    todos.forEach(todo => {
        addTodo(todo);
    })
}
showAllTodos(todos);