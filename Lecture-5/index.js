let users = [
    {
        id : 1,
        name : "Vamika",
        age : 19
    },
    {
        id : 2,
        name : "Ragni",
        age : 20
    }
]

/* By default, this isAllowed() function runs synchronously.
Problem: This approach works for small datasets, but for larger datasets or external sources (like APIs or databases).
Synchronous execution can block the main thread or cause performance issues. */

/* function isAllowed(id) {
    let user = users.filter ((u) => {
        return u.id == id
    })[0]
    console.log(user);
    if (!user) {
        return console.log("No user found");
    } if (user.age < 18) {
        return console.log("Not eligible to vote");
    } return console.log("Eligible to vote");
}
isAllowed(1); */

/* For larger datasets or external sources, we need asynchronous execution.
For this, we use promises to handle asynchronous data properly. */

function isAllowed(id) {
    return new Promise ((resolve, reject) => {
         let user = users.filter ((u) => {
        return u.id == id
    })[0]
    console.log(user);
    if (!user) {
        return reject("No user found");
    } if (user.age < 18) {
        return reject("Not eligible to vote");
    } return resolve("Eligible to vote");
    })
}
isAllowed(1).then((data) => {
    console.log(data);
})
.catch((err) => {
    console.log(err);
})