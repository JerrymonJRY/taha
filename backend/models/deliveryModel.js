const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var deliverySchema = new mongoose.Schema({
    dliveryname:{
        type:String,
        required:true,
     
    },

    deliverymobile:{
        type:String,
        required:true,
     
    },
  
});

//Export the model
module.exports = mongoose.model('Delivery', deliverySchema);