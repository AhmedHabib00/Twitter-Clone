const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');


const notification = express();

notification.set('view engine','ejs');


notification.use(bodyParser.urlencoded({
    extended: true
}));

notification.use(express.static("public"));




notification.post("/notifications",function(req,res){//notifies user of a block
    
    if (req.body.reason == "blocked"){

        // const newBlockNotif = new Notification({
        //     reason: req.body.reason,
        //     from: req.body.from,
        //     to: req.body.to

        // })
        console.log("User " + req.body.from + " has " + req.body.reason + " you.")


    }

    else if(req.body.reason == "liked"){

        // const newLikeNotif = new Notification({
        //     reason: req.body.reason,
        //     from: req.body.from,
        //     to: req.body.to

        // })
        console.log("User " + req.body.from + " has " + req.body.reason + " your tweet.")

    }

    else if(req.body.reason == "newTweet"){

        // const newLikeNotif = new Notification({
        //     reason: req.body.reason,
        //     from: req.body.from,
        //     to: req.body.to

        // })
        console.log("User " + req.body.from + " has posted a new tweet.")

    }



})





notification.get("/notifications",function(req,res){ // returns back the notifications of the user
    notification.find(function(err,foundNotifications){
        if(!err){
            res.send(foundNotifications);
        } else{
            res.send(err);
        }
        console.log("the found notifications are: " + foundNotifications);
    })
})



notification.listen(3000,function() {
    console.log("Server is running on port 3000");
});