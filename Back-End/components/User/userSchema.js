const mongoose=require('mongoose');

const userSchema = new mongoose.Schema ({
    name: {type :String ,required :true,trim: true},
    username: { type :String ,required :true,trim: true, unique: true},
    email: { type :String ,required :true,trim: true, unique: true},
    password: { type: String ,required :true},
    profilePic: {type: String}, // TODO:add default picture url
    coverPhoto: {type: String},
    birthdate:{type: Date},
    description: {type: String},
    //location	
    //private: { type:Boolean ,default: false}, //whether account is private or public
    followers: [ { type: mongoose.Schema.Types.ObjectId, ref:'User'} ],
    following: [ { type: mongoose.Schema.Types.ObjectId, ref:'User'} ],
    blocks: [ { type: mongoose.Schema.Types.ObjectId, ref:'User'} ],
    likes: [ {type: mongoose.Schema.Types.ObjectId ,ref: 'Tweet' }],
    bookmarks: [ {type: mongoose.Schema.Types.ObjectId ,ref: 'Tweet' }],
    //TODO : add list of tweets (refrences tweet schema)
    //add pinned tweets (refrences tweet schema)
    // banned boolean
    banned:{type: Boolean},
    // ban startDate and endDate
    // banning adminID
    role: {type:String}   
},{timestamps: true});

const User= mongoose.model('User',userSchema);
module.exports = User;