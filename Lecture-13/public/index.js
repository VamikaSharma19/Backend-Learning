let userContainer = document.querySelector(".user-container");

function getUsersData(URL) {
    fetch(URL)  // The endpoint we want to call
    .then((res) => {  // Handles Response
        console.log(res)
        return res.json()
    })
    .then((data) => {  // Handles Data
        console.log(data)
        data.forEach((user) => {
            display(user)
        });
    })
    .catch((err) => {  // Handles Error
        console.log(err)
    })
}

function display(user) {
    let li = document.createElement("li");
    li.innerHTML = `<li class = "user-item" style = "display: flex;">
        <div class = "user-info">
            <h2> ${user.id} </h2>
            <h2> ${user.name} </h2>
            <p> ${user.username} </p>
            <p> ${user.role} </p>
        </div>
        <div class = "user-btn">
         <button class = "user-delete"> ❌ </button>
         <button class = "user-edit"> ✏️ </button>    
        </div>
    </li>`
    userContainer.appendChild(li)
}
getUsersData('http://localhost:3002/users');