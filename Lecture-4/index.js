/* function buyProduct(product_name, cb) {
    // Performing asynchronous operation 
    setTimeout(() => {
        // When all operations are completed 
        console.log("All the I/O operations is completed and order details are written in data")
        cb();
    },0)
}

buyProduct("Iphone16", function() {
    console.log("Product is purchased")
})

let product = [
{
    name : "Samsung",
    amount : 7000,
    quantity : 10
},
{
    name : "Iphone16",
    amount : 10000,
    quantity : 0
}]; */

/* function buyProduct(product_name, cb) {
    // Performing asynchronous operation 
    let isProduct = product.filter((p) => p.name == product_name) [0];
    console.log(isProduct);
}

buyProduct("Iphone16", function() {
    console.log("Product is purchased")
}) */

let product = [
  { 
    name : "Samsung", 
    amount : 70000, 
    quantity : 10 
  },
  { 
    name : "Iphone 16", 
    amount : 100000, 
    quantity : 0 
  }];

function buyProduct(product_name, cb) {
  // Performing asynchronous operation
  let isProduct = product.filter((p) => p.name == product_name) [0];
  if (!isProduct) {
    cb("Product is not available", null);
    return;
  }
  cb(null, isProduct.amount);
}

let availableAmount = 800000;
function deductbankamt(amount, cb) {
  // Doing some transactions
  if (amount > availableAmount) {
    return cb("Bank balance is low", null)
  }
  else {
    availableAmount -= amount;
    cb(null, "Amount deducted")
  }
}

buyProduct("Iphone 16", function(err, amount) {
  if (err) return console.log(err); 
  console.log(amount);
  deductbankamt(amount, function(err, message) {
    if (err) {
      return console.log(err);
    }
    console.log(message);
  })
});

// File read using fs module
const fs = require("fs");
fs.readFile("filepath", "utf-8", function(err, data) {
  // Handles error or data
})