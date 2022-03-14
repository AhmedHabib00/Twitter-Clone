const mongoose=require('mongoose');

const notificationsSchema = new mongoose.Schema ({

    




},{timestamps: true});
const Notification= mongoose.model('Notification',userSchema);
module.exports = Notification;