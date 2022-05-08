const mongoose=require('mongoose');

const notificationsSchema = new mongoose.Schema ({

    opened: {type:Boolean ,default:false},
    reason: {type: String}, //indicates notification type (fro reply /retweet/ like)
    from: [{type:mongoose.Schema.Types.ObjectId, ref: 'User' }],
    senderName:{type: String},
    to: [{type:mongoose.Schema.Types.ObjectId, ref: 'User' }],
    recieverName: {type: String},
    entityId: mongoose.Schema.Types.ObjectId, // refers to a tweet 
    blockDuration:{type: String},

},{timestamps: true});
const Notification= mongoose.model('Notification',notificationsSchema);
module.exports = Notification;