const mongoose= require('mongoose');


class Database{

    constructor(){
        this.connect();
        
    }
    connect(){
        mongoose.connect('mongodb+srv://nouran:Nouran12345.@cluster0.mg1bc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority') //this connect method returns a promise
            .then(()=> console.log('Connected to MongoDB'))
            .catch(err => console.error('couldnt connect to MongoDB'))
    }
}
module.exports = new Database();