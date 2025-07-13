let p = new Promise((resolve, reject) => {
    resolve("Promise Completed")
})
console.log(p);

p.then((data) => {
    console.log(data);
})
.catch((err) => {
    console.log(err);
})

let product = [{
    name : "Samsung",
    amount : 70000,
    quantity : 10
},
{
    name : "Iphone16",
    amount : 100000,
    quantity : 0
}]

function buyProduct(product_name) {
    return new Promise((resolve, reject) => {
    let isProduct = product.filter((p) => p.name == product_name) [0];
    if (!isProduct) {
        reject("Product is not available")
    } else {
        resolve(isProduct.amount);
    }
    })
}

buyProduct("Iphone16")
    .then((amount) => {
        console.log("Product price is: ", amount);
    }) 
    .catch((err) => {
        console.log("Error: ", err);
    });