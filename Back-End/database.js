const mongoose= require('mongoose');
//mongoose.set('debug', true);
class Database{

    constructor(){
        this.connect();
        
    }
    connect(){
        mongoose.connect('mongodb://localhost:27017/databaseName') //this connect method returns a promise
            .then(()=> console.log('Connected to MongoDB'))
            .catch(err => console.error("couldn't connect to MongoDB"))
    }
}
module.exports = new Database();