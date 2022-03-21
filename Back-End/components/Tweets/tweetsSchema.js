const mongoose=require('mongoose');

const tweetSchema = new mongoose.Schema ({

    content: {type: String ,trim: true ,required :true},
    //private: {type: Boolean, default: false}  
    pinned: {type: Boolean},
    postedBy: { type: Schema.Types.ObjectId, ref:'User'},
    //hashtag: {type:String},
    //bookmarked boolean
    likes: [{ type: Schema.Types.ObjectId ,ref: 'User'}],
    retweeters: [{ type: Schema.Types.ObjectId ,ref: 'User'}],
    retweetInfo: [{type:Schema.Types.ObjectId, ref: 'Tweet' }],
    replyTo: [{type:Schema.Types.ObjectId, ref: 'Tweet' }]
    //mentions    


},{timestamps: true});
const Tweet= mongoose.model('Tweet',userSchema);
module.exports = Tweet;