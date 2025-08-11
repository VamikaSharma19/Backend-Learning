/* Accessing DOM Element:
// Using Id:
let ele1 = document.getElementById("heading");
console.log(ele1);

// Using Class:
let ele2 = document.getElementsByClassName("item");
console.log(ele2); 
console.log(ele2[0]); 

// Using Tag:
let ele3 = document.getElementsByTagName("p");
console.log(ele3);
console.log(ele3[0]); 

// Using querySelector & querySelectorAll:
let ele4 = document.querySelector("p");
console.log(ele4);  // Element

let ele5 = document.querySelector(".item");
console.log(ele5); // Non-Collection

let ele6 = document.querySelectorAll(".item");
console.log(ele6);  // Collection   */


/* Getting and Setting Contents:  
// Using innerText:
let data = ele4.innerText;
ele4.innerText = "Content changed using js";
console.log(data); 

// Using innerHTML:
let ul = document.getElementById("container");
let data1 = ul.innerHTML;
console.log(data1);

let data2 = ul.innerText;
console.log(data2);

// Using textContent:
let data3 = ul.textContent;
console.log(data3);

// Modifying HTML Elements:
let data4 = ul.innerHTML = `<li class = "item"> Item 4 </li> <li class = "item"> Item 5 </li>` // Replaces all content
console.log(data4);
let data5 = ul.innerHTML += `<li class = "item"> Item 4 </li> <li class = "item"> Item 5 </li>` // Add new content
console.log(data5);   */


// Attributes (getAttribute, setAttribute):
let ele7 = document.querySelector(".item");
console.dir(ele7.getAttribute("id"));
console.dir(ele7.getAttribute("class"))
ele7.setAttribute("id","js")
console.log(ele7.getAttribute("id"));
console.dir(ele7);   

// Class Manipulation (classList):
console.dir(ele7);
console.log(ele7.classList);  // Prints all classes 
console.log(ele7.classList.contains("delete"));
ele7.classList.add("delete");
console.log(ele7.classList.contains("delete"));
ele7.classList.remove("item");
console.log(ele7.classList);