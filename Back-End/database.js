const mongoose= require('mongoose');
//mongoose.set('debug', true);
class Database{

    constructor(){
        this.connect();
        
    }
    connect(){
        // Online url 'mongodb+srv://nouran:Nouran12345.@cluster0.mg1bc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
        // Local url 'mongodb://localhost:27017/whisperDB'
        mongoose.connect('mongodb://localhost:27017/whisperDB') //this connect method returns a promise
            .then(()=> console.log('Connected to MongoDB'))
            .catch(err => console.error("couldn't connect to MongoDB"))
    }
}
module.exports = new Database();