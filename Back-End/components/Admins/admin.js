const express = require('express');
const User = require('../User/userSchema');
var router = express.Router();

const userSchema = require('../User/userSchema')
const userObjectId = userSchema.ObjectId;

const tweetSchema = require('../Tweets/tweetsSchema');
const tweetObjectId = tweetSchema.ObjectId;

//GET: admins/ -> Retrieve all admins
router.get('/', async (req, res) => {
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
  
        adminsData = await userSchema.find({"role":"Admin"},'_id name username email role').limit(limit).skip(size*(page-1)).sort('createdAt')
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
router.get('/users', async (req, res, next) =>{
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
  
        //  We have to make it integer because
        // query parameter passed is string
        const limit = parseInt(size);
  
        // We pass 1 for sorting data in 
        // ascending order using ids
        usersData = await userSchema.find({"role":"User"},'_id name username email birthdate role').limit(limit).skip(size*(page-1)).sort( 'createdAt' )
        return res.status(200).send({
            page,
            size,
            Info: usersData
        });
    }
    catch (error) {
        res.sendStatus(500);
    }
});



// GET: admins/statistics/ -> Retrive statistics data about users
router.get('/statistics', async (req, res) =>{

    // Get current date
    const month = ["Jan","Feb","Mar","Apr","May","June","Jul","Aug","Sep","Oct","Nov","Dec"];

    const currDate = new Date();
    let thisMonth = currDate.getMonth();
    let thisYear = currDate.getFullYear();

    // Parameters:
    // noUsers
    let noUsers = await userSchema.count({});
    
    // noBanned
    let noBanned = await userSchema.count({"banned": true});

    // ratioTweets
    let thisMonthTweets = await tweetSchema.count({ "createdAt" : {$gte : new Date(thisYear, thisMonth, 1)} });
    let prevMonthTweets = await tweetSchema.count({ "createdAt" : {$gte : new Date(thisYear, thisMonth-1, 1) , $lte : new Date(thisYear, thisMonth, 1)} });
    // Corner Case : if prevMonthtweets = 0, then ratio = inf !
    let ratio = Number((thisMonthTweets - prevMonthTweets) / prevMonthTweets * 100)
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
        let monthUsers = await userSchema.count({ "createdAt" : {$gte : new Date(thisYear, index, 1) , $lte : new Date(thisYear, index+1, 1)} });
        noJoined.push(monthUsers)
    }

    // noAgeUsers
    noAgeUsers = Array()
    noAgeUsers.push(await rangeAgesCalculator(0, 15,  userSchema))
    noAgeUsers.push(await rangeAgesCalculator(15, 20, userSchema))
    noAgeUsers.push(await rangeAgesCalculator(20, 30, userSchema))
    noAgeUsers.push(await rangeAgesCalculator(30, 40, userSchema))
    noAgeUsers.push(await rangeAgesCalculator(40, 50, userSchema))
    noAgeUsers.push(await rangeAgesCalculator(50, 100,userSchema))

    // noMostFollowed
    let noMostFollowed = await userSchema.aggregate([
        {$unwind:"$followers"},
        {$group: {_id:'$username', "count": {$sum: 1}}},
        { $project: {_id:0, "username":'$_id', "count":'$count',} }
    ]).sort({ "count" : -1}).limit(5);
            
    // Get statistics data
    statistics = getStatisticsDate(noUsers, noBanned, ratioTweets, noTweets, noJoined, noAgeUsers, noMostFollowed);
    return res.status(200).send(statistics);
});

// Function to get all statistics data
function getStatisticsDate(noUsers=0, noBanned=0, ratioTweets=["all time","20%"], noTweets=[0,0,0,0,0,0,0,0,0,0,0,0], noJoined=[0,0,0,0,0,0,0,0,0,0,0,0], noAgeUsers=[0,0,0,0,0,0], noMostFollowed=[{"name":"undifinedUser","count":0}]) {   
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
async function rangeAgesCalculator(minRangeAge, maxRangeAge, Schema) {    
    const currDate = new Date();
    var minbirthDateYear = currDate.getFullYear() - minRangeAge;
    var maxbirthDateYear = currDate.getFullYear() - maxRangeAge; 
    let noRangeAge = await Schema.count({ "birthdate" : {$gte : new Date(maxbirthDateYear, 1, 1) , $lte : new Date(minbirthDateYear, 1, 1)} });
    return noRangeAge;
}  



// PUT: admins/:id/banning/:target_user_id/ -> Ban a user by admin
router.patch('/:id/banning/:target_user_id', async (req, res) =>{
    try {
        // Get start_date and end_date
        const start_date = new Date();
        const end_date =  new Date(req.body.end_date);

        if (end_date > start_date) {
            const bannedUser = await userSchema.findById(req.params.target_user_id);
            const bannedBy = await userSchema.findById(req.params.id);
            if (bannedBy.role == "Admin") {
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
                throw err;
            }
        }else{
            throw err;
        }
    }
    catch(err){
        return res.status(500).send({"Ban": false});
    }
});



// POST: admins/:id/adding/ -> Add a new admin
router.post('/:id/adding', function(req,res){
        userSchema.findById(req.params.id).exec(function(err, adminData){
            try {
                if (adminData.role == "Admin") {
                    var newAdmin = new User({
                        name: req.body.name, 
                        username:req.body.username, 
                        email:req.body.email, 
                        password:req.body.password, 
                        role:"Admin"
                    })

                    newAdmin.save().then(function() {
                        return res.status(201).send({"Add": true});
                    }, function(err) {
                        return res.status(500).send({
                            "Add": false
                        });
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
router.delete('/:id/deleting/:target_user_id', async (req, res) =>{
    try {
        adminData = await userSchema.findById(req.params.id).exec();
        if (adminData.role == "Admin") {
            foundUser = await userSchema.findById(req.params.target_user_id);
            if(foundUser != null){
                userSchema.deleteOne({"_id": req.params.target_user_id}).exec().then(function() {
                    return res.status(200).send({
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
                });
            }
        }
    }
    catch(err){
        return res.status(500).send({
            "deleted": false,
        });
    }









});


module.exports = router