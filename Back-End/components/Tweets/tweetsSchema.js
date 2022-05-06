const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tweetSchema = new mongoose.Schema({

    content: {type: String ,trim: true},
    //private: {type: Boolean, default: false}  
    pinned: {type: Boolean},
    postedBy: { type: Schema.Types.ObjectId, ref:'User'},
    //hashtag: {type:String},
    //bookmarked boolean
    likes: [{ type: Schema.Types.ObjectId ,ref:'User'}],
    retweeters: [{ type: Schema.Types.ObjectId ,ref: 'User'}],
    retweetInfo: [{type:Schema.Types.ObjectId, ref: 'Tweet' }],
    replyTo: {type:Schema.Types.ObjectId, ref: 'Tweet' }, //changed to object instead of array of objects
    gifs:{type:String}, //maximum of 1 gif only is allowed 
    media: [{
        type: String
    }],
    numberLikes:{type: Number},
    numberReplies:{type: Number},
    numberRetweets:{type: Number}

},{timestamps: true});

const Tweet= mongoose.model('Tweet',tweetSchema);
module.exports = Tweet;
