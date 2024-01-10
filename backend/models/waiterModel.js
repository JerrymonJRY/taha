const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var waiterSchema = new mongoose.Schema({
    waitername:{
        type:String,
        required:true,
      
        index:true,
    },
    designation:{
        type:String,
        required:true,
      
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
    },
    description:{
        type:String,
        required:true,
    },
});

//Export the model
module.exports = mongoose.model('Waiter', waiterSchema);