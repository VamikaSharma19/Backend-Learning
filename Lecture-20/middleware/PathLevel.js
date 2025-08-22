function m3(req, res, next) {
    console.log("Running middleware 3");
    next();
}

function m4(req, res, next) {
    console.log("Running middleware 4");
    next();
}

module.exports.m3 = m3;
module.exports.m4 = m4;