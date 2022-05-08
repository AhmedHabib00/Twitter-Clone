const mongoose=require('mongoose');
const jwt = require('jsonwebtoken');
const multer = require('multer')


const userSchema = new mongoose.Schema ({
    name: {type :String ,required :true,trim: true},
    username: { type :String ,trim: true, unique: true},
    email: { type :String ,required :true,trim: true, unique: true},
    password: { type: String},
    googleId:{ type:String},
    facebookId:{ type:String},
    passwordResetOTP:{type:String,minlength: 6,maxlength: 1024},
    role:{ type:String ,enum: ['User' , 'Admin'],default:'User',trim: true},
    birthdate:{type: Date},
    description: {type: String},
    profilePic: {
        type:String,
        default:'https://storage.googleapis.com/image0001/a9d1ad40-cf10-11ec-bc51-85c07c2056ff-Default_Profile_Picture.png'
    }, // TODO:add default picture url
    coverPhoto: {
        type: String,
        default:'https://storage.googleapis.com/image0001/0621cbe0-cf0f-11ec-9c8a-fd22b8475b30-Default_Cover_Photo.jpg'
    },
    location:{type: String},
    //location	
    //private: { type:Boolean ,default: false}, //whether account is private or public
    followers: [ { type: mongoose.Schema.Types.ObjectId, ref:'User'} ],
    following: [ { type: mongoose.Schema.Types.ObjectId, ref:'User'} ],
    blocks: [ { type: mongoose.Schema.Types.ObjectId, ref:'User'} ],
    likes: [ {type: mongoose.Schema.Types.ObjectId ,ref: 'Tweet' }],
    bookmarks: [ {type: mongoose.Schema.Types.ObjectId ,ref: 'Tweet' }],
    //TODO : add list of tweets (refrences tweet schema)
    tweets:[ {type: mongoose.Schema.Types.ObjectId ,ref: 'Tweet' }],
    replies:[ {type: mongoose.Schema.Types.ObjectId ,ref: 'Tweet' }],
    //add pinned tweets (refrences tweet schema)	
    // banned boolean
    banned:{type: Boolean},
    bannedBy:{type: mongoose.Schema.Types.ObjectId ,ref: 'User' },
    bannedStartDate:{type: Date},
    bannedEndDate:{type: Date},
    // ban startDate and endDate
    // banning adminID
},{timestamps: true});

userSchema.methods.generateJWT = function (){
    const token = jwt.sign({
        _id: this._id,
        email: this.email,
        role: this.role
    },process.env.JWT_SECRET_KEY ,{expiresIn :'1d'});
    return token;
}
const User= mongoose.model('User',userSchema);
module.exports = User;