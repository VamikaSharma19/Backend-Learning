let box = document.querySelector(".box");
let genbtn = document.querySelector(".btn");
let stopbtn = document.querySelector(".stop-btn");

let colors = ["red", "black", "green", "blue", "orange", "brown", "yellow", "purple", "pink", "grey"]
let intervalId = null;

// Function to select a random color from the colors array 
function randomcolor() {
    let index = Math.floor(Math.random()*10)
    let color = colors[index];
    return color;
}

genbtn.addEventListener("click", function() {
    /* If we want to change the color of box only when we click on generate button. 
    let color = randomcolor()
    box.style.background = color; */

    // If we want to change color of box after every set of given time without clicking on generate button again. 
    intervalId = setInterval(() => {
    let color = randomcolor()
    box.style.background = color;
    },500)
})

// To stop color changing and keep the last color displayed
stopbtn.addEventListener("click", function() {
    if(intervalId) {
    clearInterval(intervalId)
    }
})