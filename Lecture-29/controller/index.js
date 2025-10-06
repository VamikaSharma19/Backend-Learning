const { PrismaClient } = require('../generated/prisma')
const prisma = new PrismaClient()

module.exports.addUser = async(req, res) => {
    let { name, email, password } = req.body;
    let newUser = await prisma.user.create ({
        data : {
            name : name,
            email : email,
            password : password
        }
    })
    res.json ({
        success : true,
        message : "User added successfully",
        data : newUser
    })
}

module.exports.getUsers = async(req, res) => {
    let Users = await prisma.user.findMany ({
        include : {
            tweet : true
        }
    })
    if(!Users) {
        return res.json ({
            success : false,
            message : "No Users Exists"
        })
    }
    return res.json ({
        success : true,
        message : "Users fetched Successfully!!",
        data : Users
    })
}

module.exports.getUser = async(req, res) => {
    const { id } = req.params
    const user = await prisma.user.findUnique ({
        where : {
            id : Number(id)
        },
        include : {
            tweet : true
        }
    })
    if(!user) {
        return res.json ({
            success : false,
            message : "User not found "
        })
    }
    return res.json ({
        success : true,
        message : "User fetched successfully",
        data : user
    })
}

module.exports.deleteUser = async(req, res) => {
    const { id } = req.params
    const user = await prisma.user.findUnique ({
        where : {
            id : Number(id)
        }
    })
    if(!user) {
        return res.json ({
            success : false,
            message : "User not found "
        })
    }
    await prisma.user.delete ({
        where : {
            id : Number(id)
        }
    })
    return res.json ({
        success : true,
        message : "Data Deleted Successfully"
    })
}

module.exports.updateUser = async(req, res) => {
    const { id } = req.params
    let { ...updateData } = req.body;
    const user = await prisma.user.findUnique ({
        where : {
            id : Number(id)
        },
        include : {
            tweet : true
        }
    })
    if(!user) {
        return res.json ({
            success : false,
            message : "User not found "
        })
    }
    let update = await prisma.user.update ({
        where : {
            id : Number(id)
        },
        data : updateData
    })
    return res.json ({
        success : true,
        message : "Data Updated Successfully",
        data : update
    })
}

module.exports.addTweet = async(req, res) => {
    let { content, userId } = req.body;
    let addTweet = await prisma.tweet.create ({
        data : {
            content : content,
            userId : userId
        }
    })
    res.json ({
        success : true,
        message : "Tweet added successfully",
        data : addTweet
    })
}

module.exports.findTweet = async(req, res) => {
    let { userId } = req.params;
    let tweet = await prisma.tweet.findMany ({
        where : {
            userId : Number(userId)
        },
        include : {
            user : true
        }
    })
    if(tweet.length === 0) {
        return res.json ({
            success : false,
            message : "No tweets exists",
        })
    }
    res.json ({
        success : true,
        message : "Tweets fetched successfully",
        data : tweet
    })
}

module.exports.updateTweet = async(req, res) => {
    let { tweetId, userId, content } = req.body;
    let tweet = await prisma.tweet.findUnique ({
        where : {
            id : Number(tweetId)
        }
    })
    if(!tweet) {
        return res.json ({
            success : false,
            message : "Tweet doesn't exist"
        })
    }
    if(tweet.userId != Number(userId)) {
        return res.json ({
            success : false,
            message : "User can't update"
        })
    }
    await prisma.tweet.update ({
        where : {
            id : Number(tweetId)
        },
        data : {
            content : content
        }
    })
    return res.json ({
        success : true,
        message : "Tweet Updated successfully!!"
    })
}

module.exports.deleteTweet = async(req, res) => {
    let { tweetId, userId } = req.body;
    let tweet = await prisma.tweet.findUnique ({
        where : {
            id : Number(tweetId)
        }
    })
    if(!tweet) {
        return res.json ({
            success : false,
            message : "Tweet doesn't exist"
        })
    }
    if(tweet.userId != Number(userId)) {
        return res.json ({
            success : false,
            message : "User can't update"
        })
    }
    await prisma.tweet.delete ({
        where : {
            id : Number(tweetId)
        }
    })
    return res.json ({
        success : true,
        message : "Tweet deleted successfully!!!"
    })
}