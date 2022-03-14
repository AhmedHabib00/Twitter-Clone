const mongoose=require('mongoose');

const userSchema = new mongoose.Schema ({

    
    


},{timestamps: true});
const User= mongoose.model('User',userSchema);
module.exports = User;