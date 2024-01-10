const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var ingredientsSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
      
    },
    categoryId:
        {
            type: mongoose.Schema.ObjectId,
            ref: "Category",
          },
    
    
    unitId:
        {
            type: mongoose.Schema.ObjectId,
            ref: "Ingredientunit",
          },

    purchaseprice:{
        type:String,
        
    },
    alertquantity:{
        type:String,
        
    },
    description:{
        type:String,
      
    },
});

//Export the model
module.exports = mongoose.model('Ingredient', ingredientsSchema);