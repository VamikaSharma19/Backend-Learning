// Signup Feature
let signupForm = document.querySelector("#signup-form");
let signupEmail = document.querySelector("#signup-email");
let signupUsername = document.querySelector("#signup-username");
let signupPassword = document.querySelector("#signup-password");

signupForm.addEventListener("submit", async function(e) {
    console.log("Error checking");
    e.preventDefault();
    let emailValue = signupEmail.value;
    let usernameValue = signupUsername.value;
    let passwordValue = signupPassword.value;
    let response = await fetch("/users", {
        method: "POST",
        body: JSON.stringify({email:emailValue, username:usernameValue, password:passwordValue}),
        headers: {
            "content-type": "application/json"
        }
    })
    let data = await response.json();
    console.log(data);
    if(data.success) {
/* Here we have written data.data.username because:
The first data is the entire response object from the server.
Inside that object, there is another key called data which holds the saved user details.  */
    alert("Signup success" + " " + data.data.username); 
    signupForm.reset();
    }
});

// Login Feature
let loginForm = document.querySelector("#login-form");
let loginEmail = document.querySelector("#login-email");
let loginPassword = document.querySelector("#login-password");

loginForm.addEventListener("submit", async function(e) {
    e.preventDefault();
    let emailValue = loginEmail.value;
    let passwordValue = loginPassword.value;
    let response = await fetch("/users/login", {
        method: "POST",
        body: JSON.stringify({email:emailValue, password:passwordValue}),
        headers: {
            "content-type": "application/json"
        }
    })
    let data = await response.json();
    console.log(data);
    if (data.success) {
    let token = data.token;
    localStorage.setItem("token", token);
    localStorage.setItem("userId", data.userId); 
    alert("Login successful");
    loginForm.reset();
}
})