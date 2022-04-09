const mongoose=require('mongoose');

const notificationsSchema = new mongoose.Schema ({

    opened: {type:Boolean},
    reason: {type: String}, //indicates notification type (fro reply /retweet/ like)
    from:String,
    to:String
    // from: [{type:Schema.Types.ObjectId, ref: 'User' }],
    // to: [{type:Schema.Types.ObjectId, ref: 'User' }],




},{timestamps: true});


const notification = mongoose.model("Notification",notificationsSchema);

const notificationFromHossam = new notification({

    opened:false,
    reason:"user @Hossam3214 blocked you",
    from:"@Hossam3214",
    to:"@Moustafa25541"


})

const notificationFromAlaa = new notification({

    opened:false,
    reason:"user @Alaa52147 started follwing you",
    from:"@ALAA52147",
    to:"@Moustafa25541"


})

module.exports = notification;

mongoose.connect("mongodb://localhost:27017/Notifications", {useNewUrlParser:true});