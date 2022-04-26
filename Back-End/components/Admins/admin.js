const express = require('express');
var router = express.Router();

const userSchema = require('../User/userSchema')
const User = require('../User/userSchema');
const tweetSchema = require('../Tweets/tweetsSchema');
const { ObjectId, Admin } = require('mongodb');
const auth = require('../middleware/auth');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { count } = require('../User/userSchema');

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

    try {
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
    }
    catch (error) {
        res.sendStatus(500);
    }
});



// GET: admins/users/ -> Retrieve all users
router.get('/users', auth, async (req, res, next) =>{
    
    if (req.user.role != "Admin") {
        return res.status(403).send("Access denied");
    }

    try {
        let { page, size, search, options } = req.query;
  
        // If the page is not entered in query.
        if (!page) {
            // Make the Default value 1.
            page = 1;
        }
        // If the size is not entered in query.
        if (!size) {
            size = 10;
        }
        //  Make it integer because query parameter -> string
        const limit = parseInt(size);

        // If the search is not entered in query. 
        if(!search){
            search = "";
        }

        let banned = Boolean(false);
        switch (options) {
            case "Banned":
                banned = true;
                break;

            default:
                banned =  { $ne: true };
                break
        }

        usersData = await userSchema.find({
            "role":"User",
            "banned": banned,
            "username": {$regex:  ".*"+search+".*", $options:"si"} 
        },
            '_id name username description profilePic role',
        ).limit(limit).skip(size*(page-1)).sort( 'createdAt' )
        
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
    }
    catch (error) {
        res.sendStatus(500).send("Error");
    }
});



// GET: admins/statistics/ -> Retrive statistics data about users
router.get('/statistics', auth, async (req, res) =>{
    
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
    try {
        if (req.user.role != "Admin" || req.user._id != req.params.id) {
            return res.status(403).send("Access denied");
        }

        // Get start_date and end_date
        const start_date = new Date();
        const end_date =  new Date(req.body.end_date);

        if (end_date > start_date) {
            const bannedUser = await userSchema.findById(req.params.target_user_id);
            const bannedBy = await userSchema.findById(req.params.id);

            console.log(req.params.target_user_id);
            console.log(req.params.id);

            if (bannedUser.role == "Admin") {
                return res.status(500).send("Not Authorized User.");
            }
            if (bannedBy.role == "User") {
                return res.status(500).send("Not Authorized Admin.");
            }
            // banned user contents
            bannedUser.banned = true;
            bannedUser.bannedBy = ObjectId(req.params.id);
            bannedUser.bannedStartDate = start_date;
            bannedUser.bannedEndDate = end_date;
            bannedUser.save();
            return res.status(200).send({
                "Ban": true,
                "bannedUser": ObjectId(req.params.target_user_id),
                "bannedBy": ObjectId(req.params.id),
                "bannedStartDate": start_date,
                "bannedEndDate": end_date
            });
        }else{
            return res.status(500).send("Invalid Date");
        }
    }
    catch(err){
        return res.status(500).send({"Ban": false});
    }
});



// DELETE: admins/:id/banning/:target_user_id/ -> unBan a user by admin
router.delete('/:id/banning/:target_user_id', auth, async (req, res) =>{
    try {
        if (req.user.role != "Admin" || req.user._id != req.params.id) {
            return res.status(403).send("Access denied");
        }

        const bannedUser = await userSchema.findById(req.params.target_user_id);
        const bannedBy = await userSchema.findById(req.params.id);
        if (bannedUser.role == "Admin") {
            return res.status(500).send("Not Authorized User.");
        }

        if (bannedBy.role == "User") {
            return res.status(500).send("Not Authorized User.");
        }

        // banned user contents
        bannedUser.banned = false;
        bannedUser.bannedEndDate = new Date();
        bannedUser.save();
        return res.status(200).send({
            "Ban": false,
        });
    }
    catch(err){
        return res.status(500).send({"Ban": true});
    }
});



// POST: admins/:id/adding/ -> Add a new admin
router.post('/:id/adding', auth, async (req, res) =>{
    
    if (req.user.role != "Admin" || req.user._id != req.params.id) {
        return res.status(403).send("Access denied");
    }

    userSchema.findById(req.params.id).exec(async (err, adminData) =>{
        try {
            const salt = await bcrypt.genSalt(10);
            const hasshedpPassword = await bcrypt.hash(req.body.password,salt);
            
            if (adminData.role == "Admin") {
                var newAdmin = new User({
                    name: req.body.name, 
                    username:req.body.username, 
                    email:req.body.email, 
                    password: hasshedpPassword, 
                    role:"Admin"
                })
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
            }else{
                return res.status(500).send({
                    "Add": false
                });
            }
        }
        catch(err){
            return res.status(500).send({
                "Add": false
            });
        }
    })
});



// DELETE: admins/:id/adding/ -> Delete user by admin
router.delete('/:id/deleting/:target_user_id', auth, async (req, res) =>{
    try {
        
        if (req.user.role != "Admin" || req.user._id != req.params.id) {
            return res.status(403).send("Access denied");
        }

        adminData = await userSchema.findById(req.params.id).exec();
        if (adminData.role == "Admin") {
            foundUser = await userSchema.findById(req.params.target_user_id);
            if(foundUser != null){
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
            }else{
                return res.status(500).send({
                    "deleted": false,
                    "reason": "User not found."
                });
            }
        }else{
            return res.status(500).send({
                "deleted": false,
                "reason": "Not Authorized Admin."
            });
        }
    }
    catch(err){
        return res.status(500).send({
            "deleted": false,
            "reason": "Unknown Error"
        });
    }
});


module.exports = router