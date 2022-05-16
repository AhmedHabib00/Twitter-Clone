const express = require('express');
var router = express.Router();

const userSchema = require('../User/userSchema')
const User = require('../User/userSchema');
const tweetSchema = require('../Tweets/tweetsSchema');
const { ObjectId, Admin } = require('mongodb');
const auth = require('../middleware/auth');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {createBlockNotification} = require('../Notifications/notifications')

// Test || Token || - TO-DELETE
router.get('/gToken/:id',async(req,res)=>{
    userInfo = await userSchema.findById(req.params.id);
    const token = jwt.sign({
        _id: req.params.id,
        email: userInfo.email,
        role: userInfo.role
    },process.env.JWT_SECRET_KEY ,{expiresIn :'1d'});

    res.send(token);
});


// GET: admins/ -> Retrieve all admins
router.get('/', auth, async (req, res) => {
    
    if (req.user.role != "Admin") {
        return res.status(403).send("Access denied");
    }

    
    let { page, size } = req.query;

    // If the page is not applied in query.
    if (!page) {
        // Make the Default value one.
        page = 1;
    }  
    if (!size) {
        size = 10;
    }

    //  We have to make it integer because query parameter passed is string
    const limit = parseInt(size);
    adminsData = await userSchema.find({"role":"Admin"},'_id name username email role').limit(limit).skip(size*(page-1)).sort('createdAt');
    
    return res.status(200).send({
        page,
        size,
        Info: adminsData
    });
});



// GET: admins/users/ -> Retrieve all users
router.get('/users', auth, async (req, res, next) =>{
    
    if (req.user.role != "Admin") {
        return res.status(403).send("Access denied");
    }

    // Get query variables
    let { page, size, search, state } = req.query;

    // If the page is not entered in query.
    if (!page) {
        // Make the Default value 1.
        page = 1;
    }
    // If the size is not entered in query.
    if (!size) {
        // Make the Default value 10.
        size = 10;
    }
    //  Make it integer because query parameter -> string
    const limit = parseInt(size);

    // If the search is not entered in query. 
    if(!search){
        // Make the Default value empty string.
        search = "";
    }

    let banned = Boolean(false);
    switch (state) {
        case "Banned":
            banned = true;
            break;

        default:
            banned =  { $ne: true };
            break;
    }

    usersData = await userSchema.aggregate([
        { $match: {
            "role":"User",
            "banned": banned,
            "username": {$regex:  ".*"+search+".*", $options:"si"} 
        }},
        { $project: { 
            "_id": 0,
            "id": "$_id", 
            "name": {$ifNull: ["$name", ""]},
             "username": {$ifNull: ["$username", ""]},
             "description": {$ifNull: ["$description", ""]}, 
             "profilePic": 1,
             "banned": {$ifNull: ["$banned", false]},
             "role": 1
        }},
        { '$facet'    : {
            data: [ { $skip: size*(page-1) }, { $limit: limit } ] // add projection here wish you re-shape the docs
        } }
    ]
    ).sort('createdAt');
        
    // Count no. of users
    countUsers = await userSchema.count({
        "role":"User",
        "banned": banned, 
        "username": {$regex:  ".*"+search+".*", $options:"i"}
    });
    
    noOfpages = parseInt(Math.ceil(countUsers/size));

    return res.status(200).send({
        "count": countUsers,
        "length": noOfpages,
        Info: usersData
    });
});


// GET: admins/statistics/noUsers -> Retrive no. of users
router.get('/statistics/noUsers', auth, async (req, res) =>{
    if (req.user.role != "Admin") {
        return res.status(403).send("Access denied");
    }

    // noUsers
    let noUsers = await userSchema.count({"role":"User"});

    return res.status(200).send({
        "noUsers": {
            "title": "No. of users",
            "interval": "all time",
            "count": noUsers
        }
    });
});

// GET: admins/statistics/noBanned -> Retrive no. of banned users
router.get('/statistics/noBanned', auth, async (req, res) =>{
    if (req.user.role != "Admin") {
        return res.status(403).send("Access denied");
    }

    // noBanned
    let noBanned = await userSchema.count({"role":"User", "banned": true});

    return res.status(200).send({        
        "noBanned": {
            "title": "No. of banned users",
            "interval": "all time",
            "count": noBanned
        }
    });
});

// GET: admins/statistics/ratioTweets -> Retrive ratio of tweets no. between curr. and prev. month
router.get('/statistics/ratioTweets', auth, async (req, res) =>{
    if (req.user.role != "Admin") {
        return res.status(403).send("Access denied");
    }

    const month = ["Jan","Feb","Mar","Apr","May","June","Jul","Aug","Sep","Oct","Nov","Dec"];

    // Get current date
    const currDate = new Date();
    let thisMonth = currDate.getMonth();
    let thisYear = currDate.getFullYear();

    // ratioTweets
    let thisMonthTweets = await tweetSchema.count({ "createdAt" : {$gte : new Date(thisYear, thisMonth, 1)} });
    let prevMonthTweets = await tweetSchema.count({ "createdAt" : {$gte : new Date(thisYear, thisMonth-1, 1) , $lte : new Date(thisYear, thisMonth, 1)} });
    // Corner Case : if prevMonthtweets = 0, then ratio = infinity !!
    let ratio = 0;
    if (prevMonthTweets != 0) {
        ratio = Number((thisMonthTweets - prevMonthTweets) / prevMonthTweets * 100);
        ratio = parseInt(Math.abs(ratio));
        
    }

    let TweetsStatus = String()
    if (ratio >= 0) {
        TweetsStatus="increased";
    } else {
        TweetsStatus="decreased";
    }
    let ratioTweets = [TweetsStatus, month[thisMonth] + " " + thisYear, ratio + "%"];


    return res.status(200).send({
        "ratioTweets": {
            "title": "Tweets " + ratioTweets[0] + " by",
            "interval": ratioTweets[1],
            "count": ratioTweets[2]
        }
    });
});

// GET: admins/statistics/noTweets -> Retrive no. of tweets for each month
router.get('/statistics/noTweets', auth, async (req, res) =>{
    if (req.user.role != "Admin") {
        return res.status(403).send("Access denied");
    }

    // Get current date
    const currDate = new Date();
    let thisYear = currDate.getFullYear();
    
    // noTweets
    let noTweets = Array()
    for (let index = 0; index < 12; index++) {
        let monthTweets = await tweetSchema.count({ "createdAt" : {$gte : new Date(thisYear, index, 1) , $lte : new Date(thisYear, index+1, 1)} });
        noTweets.push(monthTweets)
    }

    return res.status(200).send({
        "noTweets": {
            "title": "Number of tweets",
            "stats": [
                {
                "name": "Jan",
                "count": noTweets[0]
                },
                {
                "name": "Feb",
                "count": noTweets[1]
                },
                {
                "name": "Mar",
                "count": noTweets[2]
                },
                {
                "name": "Apr",
                "count": noTweets[3]
                },
                {
                "name": "May",
                "count": noTweets[4]
                },
                {
                "name": "June",
                "count": noTweets[5]
                },
                {
                "name": "Jul",
                "count": noTweets[6]
                },
                {
                "name": "Aug",
                "count": noTweets[7]
                },
                {
                "name": "Sep",
                "count": noTweets[8]
                },
                {
                "name": "Oct",
                "count": noTweets[9]
                },
                {
                "name": "Nov",
                "count": noTweets[10]
                },
                {
                "name": "Dec",
                "count": noTweets[11]
                }
            ]
        }
    });
});

// GET: admins/statistics/noJoined -> Retrive no. of users joined for each month
router.get('/statistics/noJoined', auth, async (req, res) =>{
    if (req.user.role != "Admin") {
        return res.status(403).send("Access denied");
    }

    // Get current date
    const currDate = new Date();
    let thisYear = currDate.getFullYear();

    // noJoined
    let noJoined = Array()
    for (let index = 0; index < 12; index++) {
        let monthUsers = await userSchema.count({"role":"User", "createdAt" : {$gte : new Date(thisYear, index, 1) , $lte : new Date(thisYear, index+1, 1)}});
        noJoined.push(monthUsers);
    }

    return res.status(200).send({
        "noJoined": {
            "title": "No. of joined users",
            "stats": [
                {
                "name": "Jan",
                "count": noJoined[0]
                },
                {
                "name": "Feb",
                "count": noJoined[1]
                },
                {
                "name": "Mar",
                "count": noJoined[2]
                },
                {
                "name": "Apr",
                "count": noJoined[3]
                },
                {
                "name": "May",
                "count": noJoined[4]
                },
                {
                "name": "June",
                "count": noJoined[5]
                },
                {
                "name": "Jul",
                "count": noJoined[6]
                },
                {
                "name": "Aug",
                "count": noJoined[7]
                },
                {
                "name": "Sep",
                "count": noJoined[8]
                },
                {
                "name": "Oct",
                "count": noJoined[9]
                },
                {
                "name": "Nov",
                "count": noJoined[10]
                },
                {
                "name": "Dec",
                "count": noJoined[11]
                }
            ]
        }
        
    });
});

// GET: admins/statistics/noAgeUsers -> Retrive no. of users age intervals
router.get('/statistics/noAgeUsers', auth, async (req, res) =>{
    if (req.user.role != "Admin") {
        return res.status(403).send("Access denied");
    }

    // noAgeUsers
    noAgeUsers = Array();
    noAgeUsers.push(await rangeAgesCalculator(0, 15,  userSchema));
    noAgeUsers.push(await rangeAgesCalculator(15, 20, userSchema));
    noAgeUsers.push(await rangeAgesCalculator(20, 30, userSchema));
    noAgeUsers.push(await rangeAgesCalculator(30, 40, userSchema));
    noAgeUsers.push(await rangeAgesCalculator(40, 50, userSchema));
    noAgeUsers.push(await rangeAgesCalculator(50, 99999,userSchema));
    
    let All = await rangeAgesCalculator(0, 0, userSchema);
    let sumOfAll = noAgeUsers.reduce((a, b) => a + b, 0);
    let left = All - sumOfAll;
    noAgeUsers.push(left);

    return res.status(200).send({
            "noAgeUsers": {
                "title": "Age of users",
                "stats": [
                    {
                    "name": "<15",
                    "count": noAgeUsers[0]
                    },
                    {
                    "name": "15-20",
                    "count": noAgeUsers[1]
                    },
                    {
                    "name": "20-30",
                    "count": noAgeUsers[2]
                    },
                    {
                    "name": "30-40",
                    "count": noAgeUsers[3]
                    },
                    {
                    "name": "40-50",
                    "count": noAgeUsers[4]
                    },
                    {
                    "name": "50>",
                    "count": noAgeUsers[5]
                    },
                    {
                    "name": "Unknown",
                    "count": noAgeUsers[6]
                    }
                ]
            }
    });
});

// GET: admins/statistics/noMostFollowed -> Retrive most users has followers
router.get('/statistics/noMostFollowed', auth, async (req, res) =>{
    if (req.user.role != "Admin") {
        return res.status(403).send("Access denied");
    }

    // noMostFollowed
    let noMostFollowed = await userSchema.aggregate([
        {$match: {"role":"User"}},
        {$unwind:"$followers"},
        {$group: {_id:'$username', "count": {$sum: 1}}},
        {$project: {_id: 0, "username":'$_id', "count":'$count'}}
    ]).sort({"count" : -1}).limit(5);

    zeroFollowersUser = await userSchema.find({"followers": [],"role": "User"},"username").limit(5-noMostFollowed.length);
    for (let i = noMostFollowed.length; i < 5; i++) {
        if (zeroFollowersUser[5-i-1]) {
            noMostFollowed.push({
                "username": zeroFollowersUser[5-i-1].username,
                "count": 0
            })
        }
    }

    return res.status(200).send({
        "noMostFollowed": {
            "title": "Most followed users",
            "stats": noMostFollowed
        }
    });
});

// GET: admins/statistics/ -> Retrive all statistics data about users and tweets
router.get('/statistics/', auth, async (req, res) =>{
    
    if (req.user.role != "Admin") {
        return res.status(403).send("Access denied");
    }

    // Get current date
    const month = ["Jan","Feb","Mar","Apr","May","June","Jul","Aug","Sep","Oct","Nov","Dec"];

    const currDate = new Date();
    let thisMonth = currDate.getMonth();
    let thisYear = currDate.getFullYear();

    // Parameters:

    // noUsers
    let noUsers = await userSchema.count({"role":"User"});
    
    // noBanned
    let noBanned = await userSchema.count({"role":"User", "banned": true});

    // ratioTweets
    let thisMonthTweets = await tweetSchema.count({ "createdAt" : {$gte : new Date(thisYear, thisMonth, 1)} });
    let prevMonthTweets = await tweetSchema.count({ "createdAt" : {$gte : new Date(thisYear, thisMonth-1, 1) , $lte : new Date(thisYear, thisMonth, 1)} });
    // Corner Case : if prevMonthtweets = 0, then ratio = infinity !!
    let ratio = 0;
    if (prevMonthTweets != 0) {
        ratio = Number((thisMonthTweets - prevMonthTweets) / prevMonthTweets * 100);
    }

    let TweetsStatus = String()
    if (ratio >= 0) {
        TweetsStatus="increased";
    } else {
        TweetsStatus="decreased";
    }
    let ratioTweets = [TweetsStatus, month[thisMonth] + " " + thisYear, ratio+"%"];

    // noTweets
    let noTweets = Array()
    for (let index = 0; index < 12; index++) {
        let monthTweets = await tweetSchema.count({ "createdAt" : {$gte : new Date(thisYear, index, 1) , $lte : new Date(thisYear, index+1, 1)} });
        noTweets.push(monthTweets)
    }

    // noJoined
    let noJoined = Array()
    for (let index = 0; index < 12; index++) {
        let monthUsers = await userSchema.count({"role":"User", "createdAt" : {$gte : new Date(thisYear, index, 1) , $lte : new Date(thisYear, index+1, 1)}});
        noJoined.push(monthUsers);
    }

    // noAgeUsers
    noAgeUsers = Array();
    noAgeUsers.push(await rangeAgesCalculator(0, 15,  userSchema));
    noAgeUsers.push(await rangeAgesCalculator(15, 20, userSchema));
    noAgeUsers.push(await rangeAgesCalculator(20, 30, userSchema));
    noAgeUsers.push(await rangeAgesCalculator(30, 40, userSchema));
    noAgeUsers.push(await rangeAgesCalculator(40, 50, userSchema));
    noAgeUsers.push(await rangeAgesCalculator(50, 99999,userSchema));

    let All = await rangeAgesCalculator(0, 0, userSchema);
    let sumOfAll = noAgeUsers.reduce((a, b) => a + b, 0);
    let left = All - sumOfAll;
    noAgeUsers.push(left);

    // noMostFollowed
    let noMostFollowed = await userSchema.aggregate([
        {$match: {"role":"User"}},
        {$unwind:"$followers"},
        {$group: {_id:'$username', "count": {$sum: 1}}},
        {$project: {_id: 0, "username":'$_id', "count":'$count'}}
    ]).sort({"count" : -1}).limit(5);

    zeroFollowersUser = await userSchema.find({"followers": [],"role": "User"},"username").limit(5-noMostFollowed.length);
    for (let i = noMostFollowed.length; i < 5; i++) {
        if (zeroFollowersUser[5-i-1]) {
            noMostFollowed.push({
                "username": zeroFollowersUser[5-i-1].username,
                "count": 0
            })
        }
    }
    // Get statistics data
    statistics = await getStatisticsDate(noUsers, noBanned, ratioTweets, noTweets, noJoined, noAgeUsers, noMostFollowed);
    return res.status(200).send(statistics);
});

// Function to get all statistics data
async function getStatisticsDate(noUsers=0, noBanned=0, ratioTweets=["all time","20%"], noTweets=[0,0,0,0,0,0,0,0,0,0,0,0], noJoined=[0,0,0,0,0,0,0,0,0,0,0,0], noAgeUsers=[0,0,0,0,0,0], noMostFollowed=[{"name":"undifinedUser","count":0}]) {   
    let statisticsData = {
        "statData":
        {
            "noUsers": {
                "title": "No. of users",
                "interval": "all time",
                "count": noUsers
            },
            "noBanned": {
                "title": "No. of banned users",
                "interval": "all time",
                "count": noBanned
            },
            "ratioTweets": {
                "title": "Tweets " + ratioTweets[0] + " by",
                "interval": ratioTweets[1],
                "count": ratioTweets[2]
            },
            "noTweets": {
                "title": "Number of tweets",
                "stats": [
                    {
                    "name": "Jan",
                    "count": noTweets[0]
                    },
                    {
                    "name": "Feb",
                    "count": noTweets[1]
                    },
                    {
                    "name": "Mar",
                    "count": noTweets[2]
                    },
                    {
                    "name": "Apr",
                    "count": noTweets[3]
                    },
                    {
                    "name": "May",
                    "count": noTweets[4]
                    },
                    {
                    "name": "June",
                    "count": noTweets[5]
                    },
                    {
                    "name": "Jul",
                    "count": noTweets[6]
                    },
                    {
                    "name": "Aug",
                    "count": noTweets[7]
                    },
                    {
                    "name": "Sep",
                    "count": noTweets[8]
                    },
                    {
                    "name": "Oct",
                    "count": noTweets[9]
                    },
                    {
                    "name": "Nov",
                    "count": noTweets[10]
                    },
                    {
                    "name": "Dec",
                    "count": noTweets[11]
                    }
            ]
            },
            "noJoined": {
                "title": "No. of joined users",
                "stats": [
                    {
                    "name": "Jan",
                    "count": noJoined[0]
                    },
                    {
                    "name": "Feb",
                    "count": noJoined[1]
                    },
                    {
                    "name": "Mar",
                    "count": noJoined[2]
                    },
                    {
                    "name": "Apr",
                    "count": noJoined[3]
                    },
                    {
                    "name": "May",
                    "count": noJoined[4]
                    },
                    {
                    "name": "June",
                    "count": noJoined[5]
                    },
                    {
                    "name": "Jul",
                    "count": noJoined[6]
                    },
                    {
                    "name": "Aug",
                    "count": noJoined[7]
                    },
                    {
                    "name": "Sep",
                    "count": noJoined[8]
                    },
                    {
                    "name": "Oct",
                    "count": noJoined[9]
                    },
                    {
                    "name": "Nov",
                    "count": noJoined[10]
                    },
                    {
                    "name": "Dec",
                    "count": noJoined[11]
                    }
            ]
            },
            "noAgeUsers": {
                "title": "Age of users",
                "stats": [
                    {
                    "name": "<15",
                    "count": noAgeUsers[0]
                    },
                    {
                    "name": "15-20",
                    "count": noAgeUsers[1]
                    },
                    {
                    "name": "20-30",
                    "count": noAgeUsers[2]
                    },
                    {
                    "name": "30-40",
                    "count": noAgeUsers[3]
                    },
                    {
                    "name": "40-50",
                    "count": noAgeUsers[4]
                    },
                    {
                    "name": "50>",
                    "count": noAgeUsers[5]
                    },
                    {
                    "name": "Unknown",
                    "count": noAgeUsers[6]
                    }
                ]
            },
            "noMostFollowed": {
                "title": "Most followed users",
                "stats": noMostFollowed
            }
        }
    }
    return statisticsData
}

// Calculate age given date
async function rangeAgesCalculator(minRangeAge=0, maxRangeAge=0, Schema) {    
    const currDate = new Date();
    let noRangeAge = 0; 
    if (minRangeAge==0 && maxRangeAge==0) {
        noRangeAge = await Schema.count({"role":"User"});
    }else{
        var minbirthDateYear = currDate.getFullYear() - minRangeAge;
        var maxbirthDateYear = currDate.getFullYear() - maxRangeAge;
        noRangeAge = await Schema.count({"role":"User" ,"birthdate" : {$gte : new Date(maxbirthDateYear, 1, 1) , $lte : new Date(minbirthDateYear, 1, 1)} });
    }

    return noRangeAge;
}  



// POST: admins/:id/banning/:target_user_id/ -> Ban a user by admin
router.post('/:id/banning/:target_user_id', auth, async (req, res) =>{
    
    if (req.user.role != "Admin" || req.user._id != req.params.id) {
        return res.status(403).send("Access denied");
    }

    // Get start_date and end_date
    const start_date = new Date();
    const end_date =  new Date(req.body.end_date);

    if (!req.body.end_date || end_date <= start_date) {
        return res.status(500).send("Invalid Date");
    }
    
    const bannedUser = await userSchema.findById(req.params.target_user_id);
    const bannedBy = await userSchema.findById(req.params.id);

    if (!bannedUser || bannedUser.role == "Admin") {
        return res.status(500).send("Not Authorized User id.");
    }
    if (!bannedBy || bannedBy.role == "User") {
        return res.status(500).send("Not Authorized Admin id.");
    }

    const diffTime = Math.abs(end_date - start_date);
    const durationInDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

    // banned user contents
    bannedUser.banned = true;
    bannedUser.bannedBy = ObjectId(req.params.id);
    bannedUser.bannedStartDate = start_date;
    bannedUser.bannedEndDate = end_date;
    bannedUser.save();

    let statusNotif = await createBlockNotification(req.params.target_user_id, req.params.id, durationInDays);
    
    if (!statusNotif) {
        return res.status(500).send({
            "reason": "Error in notification."
        })
    }

    return res.status(200).send({
        "Ban": true,
        "bannedUser": ObjectId(req.params.target_user_id),
        "bannedBy": ObjectId(req.params.id),
        "bannedStartDate": start_date,
        "bannedEndDate": end_date
    });
});



// DELETE: admins/:id/banning/:target_user_id/ -> unBan a user by admin
router.delete('/:id/banning/:target_user_id', auth, async (req, res) =>{

    if (req.user.role != "Admin" || req.user._id != req.params.id) {
        return res.status(403).send("Access denied");
    }

    const bannedUser = await userSchema.findById(req.params.target_user_id);
    const bannedBy = await userSchema.findById(req.params.id);

    if (!bannedUser || bannedUser.role == "Admin") {
        return res.status(500).send("Not Authorized User.");
    }

    if (!bannedBy || bannedBy.role == "User") {
        return res.status(500).send("Not Authorized User.");
    }

    // Update banned user contents
    await userSchema.updateOne({"_id": req.params.target_user_id},
    {
        "banned": false,
        "bannedEndDate": new Date(),
        $unset: {"bannedBy": ""}
    });

    return res.status(200).send({
        "Ban": false,
    });
    
});



// POST: admins/:id/adding/ -> Add a new admin
router.post('/:id/adding', auth, async (req, res) =>{
    
    if (req.user.role != "Admin" || req.user._id != req.params.id) {
        return res.status(403).send("Access denied");
    }

    adminData = await userSchema.findById(req.params.id);
    
    if (!adminData || adminData.role == "User") {
        return res.status(500).send({
            "Add": false,
            "reason": "Not Authorized Admin."
        });
    }

    // Password encrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password,salt);

    usernameFound = await userSchema.findOne({"username":req.body.username});
    if (usernameFound) {
        return res.status(500).send({
            "Add": false,
            "reason": "Username used already."
        });
    }

    emailFound = await userSchema.findOne({"email":req.body.email});
    if (emailFound) {
        return res.status(500).send({
            "Add": false,
            "reason": "Email used already."
        });
    }

    var newAdmin = new User({
        name: req.body.name, 
        username:req.body.username, 
        email:req.body.email, 
        password: hashedPassword, 
        role:"Admin"
    });
    newAdmin.save().then(function() {
        return res.status(201).send({
            "Add": true,
            "_id": newAdmin._id
        });
    }, function(err) {
        return res.status(500).send({
            "Add": false
        });
    });
     
});



// DELETE: admins/:id/adding/ -> Delete user by admin
router.delete('/:id/deleting/:target_user_id', auth, async (req, res) =>{
 
    if (req.user.role != "Admin" || req.user._id != req.params.id) {
        return res.status(403).send("Access denied");
    }

    adminData = await userSchema.findById(req.params.id).exec();
    if (!adminData || adminData.role == "User"){
        return res.status(500).send({
            "deleted": false,
            "reason": "Not Authorized Admin."
        });
    }

    userFound = await userSchema.findById(req.params.target_user_id);
    if(!userFound){
        return res.status(500).send({
            "deleted": false,
            "reason": "User not found."
        });
    }

    // Delete all tweets by target_user_id
    await tweetSchema.deleteMany({"postedBy":req.params.target_user_id});
    // Delete target_user_id from users
    userSchema.deleteOne({"_id": req.params.target_user_id}).exec().then(function() {
        return res.status(202).send({
            "deleted": true,
            "user": req.params.target_user_id,
            "by": req.params.id
        });
    }, function(err) {
        return res.status(500).send({
            "deleted": false,
        });
    });
});


module.exports = router