const { PrismaClient } = require('./generated/prisma');
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
            userId : Number(userId)
        }
    })
    return tweets;
}
/* getUserTweet(1)
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
    if(tweetid!=Number(userId)) {
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
.then((data) => {
    console.log(data);
}) */

/* In the deleteUser function below, when we try to delete a user by passing their userId, 
the deletion will only work if that user has no tweets. 
This is because the "userId" acts as a foreign key in the Tweet table, 
and the database restricts deleting a user who still has related tweets.

If we want to delete a user even if they have tweets, we have two options:
1. Remove the foreign key constraint in the schema and make the tweet relation optional.
2. Or, set the relation to cascade on delete by adding 'onDelete : Cascade' in the Prisma schema under Tweet model’s reference. */
async function deleteUser(id) {
    let deleteUser = await prisma.user.delete ({
        where : {
            id : Number(id)
        }
    })
    return deleteUser
}
/* deleteUser("3")  // Vanshika's Id - Because it does not have any tweets
.then((data) => {
    console.log(data);
}) */

async function userData() {
    let data = await prisma.user.findMany ({
        select : {
            name : true,
            email : true,
            tweet : {  
                select : {
                    content : true
                }
            }
        }
    })
    return data
}
/* userData()
.then((data) => {
// Using JSON.stringify to format the output for better readability. If we log 'data' directly, it will print [object Object].
    console.log(JSON.stringify(data, null, 2));
}) */