class Principal {
  static instance = null; 

  constructor(name) {
    if (Principal.instance) {
      throw new Error("Use getPrincipal() method to create instance");
    }
    this.name = name;
  }

  static getPrincipal(name = "Default Principal") {
    if (!Principal.instance) {
      Principal.instance = new Principal(name);
    }
    return Principal.instance;
  }

  suspendStudent(studentName) {
    console.log(`${studentName} has been suspended by ${this.name}`);
  }

  notify(message) {
    console.log(`Notification from ${this.name}: ${message}`);
  }
}

module.exports = Principal;