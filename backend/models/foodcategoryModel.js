const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var foodcategorySchema = new mongoose.Schema({
    foodcategoryname:{
        type:String,
        required:true,
        unique:true,
        index:true,
    },
    description:{
        type:String,
        required:true,
      
    },
   
});

//Export the model
module.exports = mongoose.model('Foodcategory', foodcategorySchema);