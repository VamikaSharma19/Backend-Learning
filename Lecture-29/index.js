const {PrismaClient} = require('./generated/prisma');
const prisma = new PrismaClient();

async function addUser(name, email, password) {
    let User = await prisma.user.create ({
        data : {
            name : name,
            email : email,
            password : password
        }
    })
    return User;
}
/* addUser("Vanshika", "vanshika25@gmail.com", "123")
.then((data) => {
    console.log(data);
}) */

async function addTweet(content, userId) {
    await prisma.tweet.create ({
        data : {
            content : content,
            userId : userId
        }
    })
}
/* addTweet("Vanshika's Tweet", 3)
.then(() => {
    console.log("Tweet is created");
}) */

async function getUserTweet(userId) {
    let tweets = await prisma.tweet.findMany ({
        where : {
/* Here we have converted the incoming userId (commonly received as a string from headers or URLs) to a integer because -
Database expects an integer value. This prevents type-mismatch issues when Prisma builds the query. */
            userId : Number(userId) 
        }
    })
    return tweets;
}
/* getUserTweet(3)
.then((data) => {
    console.log(data);
}) */

async function updateTweet (tweetid, userId, updatedContent) {
    let tweet = await prisma.tweet.findUnique ({
        where : {
            id : Number(tweetid),
        }
    })
    if(!tweet) {
        return "Tweet doesn't exist"
    }
    if(tweet.userId!=Number(userId)) {
        return "User cannot update this tweet"
    }
    await prisma.tweet.update ({
        where : {
            id : Number(tweetid),
        },
        data : {
            content : updatedContent
        }
    })
}
/* updateTweet("1", "1", "Vamika's Updated Tweet")
.then(() => {
    console.log("Tweet is updated")
}) */

async function deleteTweet(tweetid, userId) {
    let tweet = await prisma.tweet.findUnique ({
        where : {
            id : Number(tweetid)
        }
    })
    if(!tweet) {
        return "Tweet doesn't exist to delete"
    }
    if(tweetid!=Number(userId)){
        return "You are not allowed to delete this tweet"
    }
    let deletedTweet = await prisma.tweet.delete ({
        where : {
            id : Number(tweetid)
        }
    })
return deletedTweet
}
/* deleteTweet("3", "3")  // Vanshika's Tweet
.then(() => {
    console.log("Tweet Deleted");
}) */

/* By Using Controllers - 
const express = require('express');
const app = express()

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const {addUser, getUsers, getUser, updateUser, deleteUser} = require("./Controller/index.js")
const {addTweet, findTweet, updateTweet, deleteTweet}=require("./Controller/index.js")

app.post('/addUser', addUser);
app.get('/getUsers', getUsers);
app.get('/getUser/:id', getUser);
app.put("/updateUser/:id", updateUser);
app.delete("/deleteUser/:id", deleteUser);
app.post('/addTweet', addTweet);
app.get("/findTweet/:userId", findTweet);
app.put("/updateTweet", updateTweet);
app.delete("/deleteTweet", deleteTweet);

app.listen(3013, () => {
    console.log("Server started")
})  */