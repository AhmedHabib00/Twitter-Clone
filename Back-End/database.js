const mongoose= require('mongoose');


class Database{

    constructor(){
        this.connect();
        
    }
    connect(){
        mongoose.connect('mongodb://localhost:27017/Whisper') //this connect method returns a promise
            .then(()=> console.log('Connected to MongoDB'))
            .catch(err => console.error('couldnt connect to MongoDB'))
    }
}
module.exports = new Database();
