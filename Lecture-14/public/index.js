let userContainer = document.querySelector(".user-container")
let registerForm = document.querySelector(".register");
console.log(registerForm);
let nameInput = document.querySelector(".name");
let userNameInput = document.querySelector(".username");
console.log(userContainer);

function getUsersData(URL) {
    fetch(URL)
    .then((res) => {
        console.log(res)
        return res.json()
    })
    .then((data) => {
        console.log(data)
        data.forEach((user) => {
            display(user)
        });
    })
    .catch((err) => {
        console.log(err)
    })
}

function display(user) {
    let li = document.createElement("li");
    li.innerHTML = `<li class = "user-item" style = "display: flex;">
        <div class = "user-info">
            <h2> ${user.name} </h2>
            <p> ${user.username} </p>
        </div>
        <div class = "user-btn">
         <button class = "user-delete"> ❌ </button>
         <button class = "user-edit"> ✏️ </button>    
        </div>
    </li>`
    userContainer.appendChild(li)
}
getUsersData("http://localhost:3004/users");

function addUser(name, username, URL) {
    let data = {
        name : name,
        username : username
    }
    fetch(URL, {
        method : "POST",
        headers: {
            "content-type" : "application/json"
        },
        body : JSON.stringify(data)
    })
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        console.log(data);
        if(data.success) {
            alert("User register successfully")
            nameInput.value = "";
            userNameInput.value = "";
        } else {
            alert(data.error);
            nameInput.value = "";
            userNameInput.value = "";
        }
    })
}

registerForm.addEventListener("submit", function(e) {
    e.preventDefault();
    let name = nameInput.value;
    let username = userNameInput.value;
    addUser(name, username, "http://localhost:3004/adduser")
})