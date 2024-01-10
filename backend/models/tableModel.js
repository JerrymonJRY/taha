const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var tableSchema = new mongoose.Schema({
    tablename:{
        type:String,
        required:true,
        unique:true,
        index:true,
    },
    Position :{
        type:String,
        required:true,
       
    },
    seatcapacity:{
        type:String,
        required:true,
       
    },
    description:{
        type:String,
        required:true,
    },
});

//Export the model
module.exports = mongoose.model('Table', tableSchema);