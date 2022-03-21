const mongoose=require('mongoose');

const userSchema = new mongoose.Schema ({
    
    fistName: {type :String ,required :true,trim: true},
    lastName: {type :String ,required :true,trim: true},
    username: { type :String ,required :true,trim: true, unique: true},
    email: { type :String ,required :true,trim: true, unique: true},
    password: { type: String ,required :true},
    profilePic: {type: String}, // TODO:add default picture url
    coverPhoto: {type: String},
    birthDay:{type: Date},
    description: {type: String},
    //location	
    //private: { type:Boolean ,default: false}, //whether account is private or public
    followers: [ { type: Schema.Types.ObjectId, ref:'User'} ],
    following: [ { type: Schema.Types.ObjectId, ref:'User'} ],
    blocks: [ { type: Schema.Types.ObjectId, ref:'User'} ],
    likes: [ {type: Schema.Types.ObjectId ,ref: 'Tweet' }],
    bookmarks: [ {type: Schema.Types.ObjectId ,ref: 'Tweet' }]
    //TODO : add list of tweets (refrences tweet schema)
    //add pinned tweets (refrences tweet schema)	
    // banned boolean
    // ban startDate and endDate
    // banning adminID
    
    


},{timestamps: true});
const User= mongoose.model('User',userSchema);
module.exports = User;