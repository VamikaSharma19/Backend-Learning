let product = [
  { 
    name : "Samsung", 
    amount : 70000, 
    quantity : 10 
  },
  { 
    name : "Iphone 16", 
    amount : 100000, 
    quantity : 10 
  }];

let availableAmount = 800000;

function buyProduct(product_name) {
  return new Promise((resolve, reject) => {
    let foundProduct = product.find((p) => p.name === product_name);
    if (!foundProduct) {
      reject("Product is not available");
    } else {
      resolve(foundProduct.amount);
    }
  });
}

function deductbankamt(amount) {
  return new Promise((resolve, reject) => {
    if (amount > availableAmount) {
      reject("Bank balance is low");
    } else {
      availableAmount -= amount;
      resolve("Amount deducted");
    }
  });
}

/* Example of Synchronous Execution
  console.log("Start");
  let a = 10;
  let b = 15;
  let c = a + b;
  function sum(a,b) {
    return a+b;
  }
  let result = sum(5,4);
  console.log(result); */

/* Calling functions with Promise chaining so that we can make their execution synchronous
buyProduct("Iphone 16")
  .then((amount) => {
    console.log("Product price: ", amount);
    return deductbankamt(amount);
  })
  .then((message) => {
    console.log(message);
    console.log("Remaining bank amount: ", availableAmount);
  })
  .catch((err) => {
    console.log("Error: ", err);
  }); */

async function domytask() {
  try {
  let amount = await buyProduct("Iphone 16");
  let message = await deductbankamt(amount);
  console.log(message);
  }
  catch(error) {
    console.log(error)
  }
}
console.log(domytask());