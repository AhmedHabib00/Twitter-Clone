const mongoose=require('mongoose');

const tweetSchema = new mongoose.Schema ({

    


},{timestamps: true});
const Tweet= mongoose.model('Tweet',userSchema);
module.exports = Tweet;