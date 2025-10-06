const {PrismaClient} = require('./generated/prisma');
const prisma = new PrismaClient(); 

async function addUser(email, name, password) {
    await prisma.user.create ({
        data : {    // This "data" is key
            email : email,
            name : name,
            password : password
        }
    })  
}
/* addUser("vanshika25@gmail.com", "Vanshika", "123")
.then(() => {
    console.log("User Added Successfully");
}) */

async function getAllUser() {
    let allUser = await prisma.user.findMany();
    console.log(allUser);
}
/* getAllUser().
then((data) => {
    console.log(data);
}) */

async function getUserbyId(id) {
    const user = await prisma.user.findUnique ({
         where : {
             id : id,
         }
    })
    return user;
}
/* getUserbyId(1)
.then((data) => {
    console.log(data);
}) */

async function updateUser(id, data) {
    const updatedUser = await prisma.user.update ({
        where : {
            id : id
        },
        data : data
    })
    return updatedUser; 
}
/* updateUser(1, {
    email : "vamikaUpdated@gmail.com",
    name : "Vamika Sharma",
    password : "1234"
})
.then((data) => {
    console.log(data);
    console.log("User updated successfully");
}) */

async function deleteUserbyId(id) {
    const deletedUser = await prisma.user.delete ({
        where : {
            id : id
        }
    })
    return deletedUser;
}
/* deleteUserbyId(4)   // Vanshika's Id
.then((data) => {
    console.log(data);
    console.log("User deleted");
})
.catch((error) => {
    console.log(error);
}) */