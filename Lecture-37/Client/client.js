const Principal = require("../Principal/principal");

function suspend(studentName) {
  let principal = Principal.getPrincipal("Vamika");
  principal.suspendStudent(studentName);
}

function notify() {
  let principal = Principal.getPrincipal();
  principal.notify("School will remain closed");
}