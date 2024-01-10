const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var employeeSchema = new mongoose.Schema({
    first:{
        type: mongoose.Schema.ObjectId,
        ref: "Expense",
    },
    amount:{
        type:String,
        required:true,
       
    },
    addedby: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
   
  
    date: { type: Date },
    createdate: { type: Date, default: Date.now },
    status: { type: String, default: 'Active' },
 
});

//Export the model
module.exports = mongoose.model('Employee', employeeSchema);