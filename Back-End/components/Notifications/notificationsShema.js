const mongoose=require('mongoose');

const notificationsSchema = new mongoose.Schema ({

    opened: {type:Boolean},
    reason: {type: String}, //indicates notification type (fro reply /retweet/ like)
    from: [{type:Schema.Types.ObjectId, ref: 'User' }],
    to: [{type:Schema.Types.ObjectId, ref: 'User' }]
   




},{timestamps: true});
const Notification= mongoose.model('Notification',userSchema);
module.exports = Notification;