const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var vatSchema = new mongoose.Schema({
    vatname:{
        type:String,
        required:true,
        unique:true,
        index:true,
    },
    percentage:{
        type:String,
        required:true,
        unique:true,
    },
  
});

//Export the model
module.exports = mongoose.model('Vat', vatSchema);