const mongoose=require('mongoose');
Schema = mongoose.Schema;

const adminSchema = new mongoose.Schema ({

    username: {type: String ,required :true,trim: true},
    password: { type: String ,required :true},
    bannedUsers: [ { type: Schema.Types.ObjectId, ref:'User'} ],

},{timestamps: true});


const Admin = mongoose.model('Admin',adminSchema);
module.exports = Admin;