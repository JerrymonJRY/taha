const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var ingredientunitSchema = new mongoose.Schema({
    unitname:{
        type:String,
        required:true,
        unique:true,
      
    },
    description:{
        type:String,
       
        
    },
  
});

//Export the model
module.exports = mongoose.model('Ingredientunit', ingredientunitSchema);