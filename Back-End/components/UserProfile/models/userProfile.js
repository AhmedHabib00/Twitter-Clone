const { ObjectId } = require("mongodb");
const mongoose = require("mongoose")


const profileSchema = new mongoose.Schema ({
    name: String,
    bio: String,
    location: String,
    birthDate: String,
    profilePicture:{
        data:Buffer,
        contentType:String
    }
});
const Profile = mongoose.model("userProfile",profileSchema)

mongoose.connect("mongodb://localhost:27017/userProfile", {useNewUrlParser: true})

module.exports = Profile;