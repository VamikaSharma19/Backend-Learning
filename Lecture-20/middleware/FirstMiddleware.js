function m1(req, res, next) {
    console.log("Running middleware 1");
    req.userId = "4";
    // After a return statement, nothing else will execute in a function.
    return next();
    // console.log("After next 1 will run");
}

function m2(req, res, next) {
    console.log("Running middleware 2");
    console.log(req.userId);
    req.isAdmin = true;
    return next();
    // console.log("After next 2 will run");
}

// We should not export modules together here, instead we should export them separately. 
module.exports.m1 = m1;
module.exports.m2 = m2;