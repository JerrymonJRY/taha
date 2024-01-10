const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var supplierSchema = new mongoose.Schema({
    suppliername:{
        type:String,
        required:true,
        unique:true,
        index:true,
    },
    supplieremail:{
        type:String,
        required:true,
        unique:true,
    },
    suppliermobile:{
        type:String,
        required:true,
        unique:true,
    },
    supplieraddress:{
        type:String,
       
    },
    taxnumber:{
        type:String,
       
    },
    licensenumber:{
        type:String,
       
    },
});

//Export the model
module.exports = mongoose.model('Supplier', supplierSchema);